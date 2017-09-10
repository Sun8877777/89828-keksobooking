'use strict';
var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var adsCount = 8;
var ads = []; //  создаем массив
var pinMap = document.querySelector('.tokyo__pin-map');
var dialogTitleImage = document.querySelector('.dialog__title > img');
var dialogPanel = document.querySelector('.dialog__panel');
var LODGE_TEMPLATE = document.querySelector('#lodge-template').content;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var LODGE_TYPE_DESCRIPTIONS = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getAvatarUrl = function (number) {
  return 'img/avatars/user0' + (+number + 1) + '.png';
};

var getRandomElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};

var getRandomElements = function (array) {
  var randomElements = [];
  for (var i = 0; i < array.length - 1; i++) {
    if (Math.random() > 0.5) {
      randomElements.push(array[i]);
    }
  }
  return randomElements;
};

var mockAddData = function (number) {
  var halfPinWidth = PIN_WIDTH / 2;
  var pinTipX = getRandomInt(300 + halfPinWidth, 900 - halfPinWidth);
  var pinTipY = getRandomInt(100 + PIN_HEIGHT, 500);
  return {
    author: {
      avatar: getAvatarUrl(number)
    },
    offer: {
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
    location: {
      x: pinTipX,
      y: pinTipY
    }
  };
};

var mockAdsData = function () {
  for (var i = 0; i < adsCount; i++) {
    ads.push(mockAddData(i));
  }
};

var generatePinsDOM = function () {
  var adsContainer = document.createDocumentFragment();
  var pinBody;
  var pinImage;
  for (var i = 0; i < ads.length; i++) {
    pinBody = document.createElement('div');
    pinBody.className = 'pin';
    pinBody.style.cssText = 'left:' + ads[i].location.x + 'px; top: ' + ads[i].location.y + 'px;';
    pinImage = document.createElement('img');
    pinImage.setAttribute('src', ads[i].author.avatar);
    pinImage.className = 'rounded';
    pinImage.setAttribute('width', PIN_WIDTH);
    pinImage.setAttribute('height', PIN_HEIGHT);
    pinBody.appendChild(pinImage);
    adsContainer.appendChild(pinBody);
  }
  return adsContainer;
};

var renderAds = function () {
  pinMap.appendChild(generatePinsDOM());
};

var getLodgeTypeDescription = function (lodgeType) { // для генерирования вида жилья
  return LODGE_TYPE_DESCRIPTIONS[lodgeType];
};

var generateLodgeFeaturesDOM = function (arrayFeatures) { //  для получения списка преимуществ
  var featuresContainer = document.createDocumentFragment();
  var feature;
  for (var i = 0; i < arrayFeatures.offer.features.length; i++) {
    feature = document.createElement('span');
    feature.className = 'feature__image feature__image--' + arrayFeatures.offer.features[i];
    featuresContainer.appendChild(feature);
  }
  return featuresContainer;
};

var dialogPanelDOM = function (dialogData) {
  var elementDialogPanel = LODGE_TEMPLATE.cloneNode(true);
  elementDialogPanel.querySelector('.lodge__title').textContent = dialogData.offer.title;
  elementDialogPanel.querySelector('.lodge__address').textContent = dialogData.offer.address;
  elementDialogPanel.querySelector('.lodge__price').innerHTML = dialogData.offer.price + '&#x20bd;' + '/ночь';
  elementDialogPanel.querySelector('.lodge__type').textContent = getLodgeTypeDescription(dialogData.offer.type);
  elementDialogPanel.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + dialogData.offer.guests + ' гостей в ' + dialogData.offer.rooms + ' комнатах';
  elementDialogPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + dialogData.offer.checkin + ', выезд до ' + dialogData.offer.checkout;
  elementDialogPanel.querySelector('.lodge__features').appendChild(generateLodgeFeaturesDOM(dialogData));
  elementDialogPanel.querySelector('.lodge__description').textConten = dialogData.offer.description;
  dialogTitleImage.setAttribute('src', dialogData.author.avatar);
  return elementDialogPanel;
};

var clearDialog = function (array) {
  for (var i = array.childNodes.length - 1; i >= 0; i--) {
    array.removeChild(array.childNodes[i]);
  }
};

var renderDialogPanel = function (number) { //  Функция очистки диалога и добавления новых данныъ из массива
  clearDialog(dialogPanel);
  dialogPanel.appendChild(dialogPanelDOM(ads[number]));
};

clearDialog(pinMap);
mockAdsData();
renderAds();
//renderDialogPanel(0);

var pinElement = pinMap.querySelectorAll('.pin');
var pinElementDialog = document.querySelectorAll('.dialog');
var dialogClose = document.querySelector('.dialog__close');

var onPinClick = function () {
  for (var i = 0; i < pinElement.length; i++){
    if (pinElement[i].classList.contains('.pin--active')) {
      pinElement[i].classList.remove('.pin--active');
    };
    pinElement[i].classList.add('.pin--active');
    renderDialogPanel(i);
  }
};  

var onCloseDialogClick = function () {
  for (var i = 0; i < pinElementDialog.length; i++) {
    if (pinElement[i].classList.contains('.pin--active')) {
      pinElement[i].classList.remove('.pin--active');
    };
    pinElementDialog[i].classList.add('hidden');
  }
};

for (var i= 0; i < pinElement.length; i++){
  pinElement[i].addEventListener('click', onPinClick);
  dialogClose.addEventListener('click', onCloseDialogClick);
};
