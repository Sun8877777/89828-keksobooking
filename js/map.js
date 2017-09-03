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
var qtyAds = 8;
var arrSimularAds = []; // создаем массив
var importDynamicSimilarAds = document.querySelector('.tokyo__pin-map');
var DIALOG_TITLE_IMAGE = document.querySelector('.dialog__title > img');
var DIALOG_PANEL = document.querySelector('.dialog__panel');
var WIDTH_LABEL_ADS = 40;
var HEIGHT_LABEL_ADS = 40;
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min )) + min;
};

var getAvatarUrl = function(number) {
      return'img/avatars/user0'+ number +'.png';
  };

var getRandomElement = function(namesDirectory){
    return namesDirectory[getRandomInt( 0, namesDirectory.length-1)];
};

var getRandomElements = function(arr){
  var randomElements=[];
  for (var i=0; i < arr.length -1; i++){
    if (Math.random()>0.5){
      randomElements.push(arr[i]);
    }
  }
  return randomElements;
};

var getSimilarAds = function(){
  var centerTagsWidth = WIDTH_LABEL_ADS / 2;
  var locationNearbyX = getRandomInt(300 + centerTagsWidth, 900 - centerTagsWidth);
  var locationNearbyY = getRandomInt(100 + HEIGHT_LABEL_ADS, 500);
  return {
    author:{
      avatar: getAvatarUrl()
    },
    offer:{
      title: getRandomElement(OFFER_TITLES),
      address: [locationNearbyX, locationNearbyY],
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
      x: locationNearbyX,
      y: locationNearbyY
    }
  }
};

var createArrSimularAds = function(){
  for (var indexArr=0; indexArr<qtyAds; indexArr++){
  arrSimularAds.push(getSimilarAds(indexArr));
  arrSimularAds[indexArr].author.avatar = getAvatarUrl(indexArr+1)
  }
};

createArrSimularAds();

var renderSimularAds = function(){
  var fragmentSumularAds = document.createDocumentFragment();
  for (var i = 0; i <arrSimularAds.length; i++){
    var avatarImageSimularAds = document.createElement('div');
    avatarImageSimularAds.className = 'pin';
    avatarImageSimularAds.style.cssText = 'left:' + arrSimularAds[i].location.x + 'px; top: '+ arrSimularAds[i].location.y +'px;';  
    var avatarImage = document.createElement('img');
    avatarImage.setAttribute('src', arrSimularAds[i].author.avatar);
    avatarImage.className = 'rounded';
    avatarImage.setAttribute('width', WIDTH_LABEL_ADS);
    avatarImage.setAttribute('height', HEIGHT_LABEL_ADS)   
    avatarImageSimularAds.appendChild(avatarImage);
    fragmentSumularAds.appendChild(avatarImageSimularAds);
  }
  return fragmentSumularAds;
};

importDynamicSimilarAds.appendChild(renderSimularAds());

var resultObject = {
  flat: "Квартира",
  house: "Дом",
  bungalo: "Бунгало"
};
var getLodgeTypes = function(property){ //для генерирования вида жилья
   return resultObject[property];
};

var getLodgeFeatures = function(arrayFeatures){ //для получения списка преимуществ
  var fraghmentFeatures = document.createDocumentFragment();
  for (var i = 0; i < arrayFeatures.offer.features.length; i++){
    var featuresElement = document.createElement('span');
    featuresElement.className = 'feature__image feature__image--'+ arrayFeatures.offer.features[i];
    fraghmentFeatures.appendChild(featuresElement);
  }
  return fraghmentFeatures;
};

var setNewDialogPanel = function(array) {
  var LODGE_TEMPLATE = document.querySelector('#lodge-template').content;
  var elementDialogPanel = LODGE_TEMPLATE.cloneNode(true);
  elementDialogPanel.querySelector('.lodge__title').textContent = array.offer.title;
  elementDialogPanel.querySelector('.lodge__address').textContent = array.offer.address;
  elementDialogPanel.querySelector('.lodge__price').innerHTML = array.offer.price + '&#x20bd;' + '/ночь';
  elementDialogPanel.querySelector('.lodge__type').textContent = getLodgeTypes(array.offer.type);
  elementDialogPanel.querySelector('.lodge__rooms-and-guests').textContent = 'Для '+ array.offer.guests +' гостей в '+ array.offer.rooms +' комнатах';
  elementDialogPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после '+ array.offer.checkin +', выезд до '+ array.offer.checkout;
  elementDialogPanel.querySelector('.lodge__features').appendChild(getLodgeFeatures(array));
  elementDialogPanel.querySelector('.lodge__description').textContent = array.offer.description;
  DIALOG_TITLE_IMAGE.setAttribute('src',  array.author.avatar);
  return elementDialogPanel;
};

var cleanDialogPanel = function(){
  for (var i = DIALOG_PANEL.childNodes.length - 1; i >=0; i--){
    DIALOG_PANEL.removeChild(DIALOG_PANEL.childNodes[i]);
  }
  return DIALOG_PANEL;
};

var renderDialogPanel = function(){ //Функция очистки диалога и добавления новых данныъ из массива
  DIALOG_PANEL.appendChild(setNewDialogPanel(arrSimularAds[0]));
};

renderDialogPanel();