'use strict';
var OFFER_TITLES =[
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_TYPES =['flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES =['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var adsCount = 8;
var ads = []; // создаем массив
var pinMap = document.querySelector('.tokyo__pin-map');
var dialogTitleImage = document.querySelector('.dialog__title > img');
var dialogPanel = document.querySelector('.dialog__panel');
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var lodgeTypeDescriptions = {
  flat: "Квартира",
  house: "Дом",
  bungalo: "Бунгало"
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min )) + min;
};

var getAvatarUrl = function(number) {
      return'img/avatars/user0'+ (+number + 1) +'.png';
  };

var getRandomElement = function(array){
    return array[getRandomInt( 0, array.length-1)];
};

var getRandomElements = function(array){
  var randomElements=[];
  for (var i=0; i < array.length -1; i++){
    if (Math.random()>0.5){
      randomElements.push(array[i]);
    }
  }
  return randomElements;
};

var mockAddData = function(number){
  var halfPinWidth = PIN_WIDTH / 2;
  var pinTipX = getRandomInt(300 + halfPinWidth, 900 - halfPinWidth);
  var pinTipY = getRandomInt(100 + PIN_HEIGHT, 500);
  return {
    author:{
      avatar: getAvatarUrl(number)
    },
    offer:{
      title: getRandomElement(OFFER_TITLES),
      address: [pinTipX, pinTipY],
      price: getRandomInt(1000, 1000000),
      type: getRandomElement(OFFER_TYPES),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 5),
      checkin: getRandomElement(OFFER_TIMES),
      checkout: getRandomElement(OFFER_TIMES),
      features: getRandomElements(OFFER_FEATURES),
      description: '',
      photos: []
    },
    location:{
      x: pinTipX,
      y: pinTipY
    }
  }
};

var mockAdsData = function(){
  for (var i=0; i < adsCount; i++){
  ads.push(mockAddData(i));
  }
};

var renderAds = function(){
  var fragmentSumularAds = document.createDocumentFragment();
  //var avatarImageSimularAds = document.createElement('div');
  //var avatarImage = document.createElement('img');
  for (var i = 0; i <ads.length; i++){
    var avatarImageSimularAds = document.createElement('div');
    avatarImageSimularAds.className = 'pin';
    avatarImageSimularAds.style.cssText = 'left:' + ads[i].location.x + 'px; top: '+ ads[i].location.y +'px;';  
    var avatarImage = document.createElement('img');
    avatarImage.setAttribute('src', ads[i].author.avatar);
    avatarImage.className = 'rounded';
    avatarImage.setAttribute('width', PIN_WIDTH);
    avatarImage.setAttribute('height', PIN_HEIGHT)   
    avatarImageSimularAds.appendChild(avatarImage);
    fragmentSumularAds.appendChild(avatarImageSimularAds);
  }
  return fragmentSumularAds;
};

var getLodgeTypeDescription = function(lodgeType){ //для генерирования вида жилья
   return lodgeTypeDescriptions[lodgeType];
};

var generateLodgeFeaturesDOM = function(arrayFeatures){ //для получения списка преимуществ
  var fraghmentFeatures = document.createDocumentFragment();
  for (var i = 0; i < arrayFeatures.offer.features.length; i++){
    var featuresElement = document.createElement('span');
    featuresElement.className = 'feature__image feature__image--'+ arrayFeatures.offer.features[i];
    fraghmentFeatures.appendChild(featuresElement);
  }
  return fraghmentFeatures;
};

var generateDialogDOM = function(dialogData) {
  var LODGE_TEMPLATE = document.querySelector('#lodge-template').content;
  var elementDialogPanel = LODGE_TEMPLATE.cloneNode(true);
  elementDialogPanel.querySelector('.lodge__title').textContent = dialogData .offer.title;
  elementDialogPanel.querySelector('.lodge__address').textContent = dialogData .offer.address;
  elementDialogPanel.querySelector('.lodge__price').innerHTML = dialogData .offer.price + '&#x20bd;' + '/ночь';
  elementDialogPanel.querySelector('.lodge__type').textContent = getLodgeTypeDescription(dialogData .offer.type);
  elementDialogPanel.querySelector('.lodge__rooms-and-guests').textContent = 'Для '+ dialogData .offer.guests +' гостей в '+ dialogData .offer.rooms +' комнатах';
  elementDialogPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после '+ dialogData .offer.checkin +', выезд до '+ dialogData .offer.checkout;
  elementDialogPanel.querySelector('.lodge__features').appendChild(generateLodgeFeaturesDOM(dialogData ));
  elementDialogPanel.querySelector('.lodge__description').textContent = dialogData .offer.description;
  dialogTitleImage.setAttribute('src',  dialogData .author.avatar);
  return elementDialogPanel;
};

var clearDialog = function(){
  for (var i = dialogPanel.childNodes.length - 1; i >=0; i--){
    dialogPanel.removeChild(dialogPanel.childNodes[i]);
  }
  return dialogPanel;
};

var renderDialogPanel = function(){ //Функция очистки диалога и добавления новых данныъ из массива
  clearDialog();
  dialogPanel.appendChild(generateDialogDOM(ads[0]));
};

mockAdsData();
pinMap.appendChild(renderAds());
renderDialogPanel();