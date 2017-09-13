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
var ADS_COUNT = 8;
var ads = []; //  создаем массив
var pinMap = document.querySelector('.tokyo__pin-map');
var dialogTitleImage = document.querySelector('.dialog__title > img');
var dialogPanel = document.querySelector('.dialog__panel');
var LODGE_TEMPLATE = document.querySelector('#lodge-template').content;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var HALF_PIN_WIDTH = PIN_WIDTH / 2;
var LODGE_TYPE_DESCRIPTIONS = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var pinElement;
var pinElementDialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
dialogClose.setAttribute('tabindex', 0);

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getAvatarUrl = function (number) {
  return 'img/avatars/user0' + (+number + 1) + '.png';
};

var getRandomElement = function (array) {
  return array[getRandomInt(0, array.length)];
};

var getRandomElements = function (array) {
  var randomElements = [];
  for (var i = 0; i < array.length; i++) {
    if (Math.random() > 0.5) {
      randomElements.push(array[i]);
    }
  }
  return randomElements;
};

var mockAddData = function (number) {
  var pinTipX = getRandomInt(300 + HALF_PIN_WIDTH, 900 - HALF_PIN_WIDTH);
  var pinTipY = getRandomInt(100 + PIN_HEIGHT, 500);
  return {
    author: {
      avatar: getAvatarUrl(number)
    },
    offer: {
      title: getRandomElement(OFFER_TITLES),
      address: [pinTipX, pinTipY].join(', '),
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
  for (var i = 0; i < ADS_COUNT; i++) {
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
    pinBody.setAttribute('data-num', i);
    pinBody.style.cssText = 'left:' + ads[i].location.x + 'px; top: ' + ads[i].location.y + 'px;';
    pinImage = document.createElement('img');
    pinImage.setAttribute('src', ads[i].author.avatar);
    pinImage.className = 'rounded';
    pinImage.setAttribute('width', PIN_WIDTH);
    pinImage.setAttribute('height', PIN_HEIGHT);
    pinImage.setAttribute('tabindex', 0);
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
  for (var i = 0; i < arrayFeatures.offer.features.length; ++i) {
    feature = document.createElement('span');
    feature.className = 'feature__image feature__image--' + arrayFeatures.offer.features[i];
    featuresContainer.appendChild(feature);
  }
  return featuresContainer;
};

var renderLodgeTemplate = function (dialogData) {
  var lodgeContents = LODGE_TEMPLATE.cloneNode(true);
  lodgeContents.querySelector('.lodge__title').textContent = dialogData.offer.title;
  lodgeContents.querySelector('.lodge__address').textContent = dialogData.offer.address;
  lodgeContents.querySelector('.lodge__price').innerHTML = dialogData.offer.price + '&#x20bd;' + '/ночь';
  lodgeContents.querySelector('.lodge__type').textContent = getLodgeTypeDescription(dialogData.offer.type);
  lodgeContents.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + dialogData.offer.guests + ' гостей в ' + dialogData.offer.rooms + ' комнатах';
  lodgeContents.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + dialogData.offer.checkin + ', выезд до ' + dialogData.offer.checkout;
  lodgeContents.querySelector('.lodge__features').appendChild(generateLodgeFeaturesDOM(dialogData));
  lodgeContents.querySelector('.lodge__description').textContent = dialogData.offer.description;
  //dialogTitleImage.setAttribute('src', dialogData.author.avatar);
  return lodgeContents;
};

var removeContents = function (array) {
  for (var i = array.childNodes.length - 1; i >= 0; i--) {
    array.removeChild(array.childNodes[i]);
  }
};

var renderDialogPanel = function (number) { //  Функция очистки диалога и добавления новых данныъ из массива
  removeContents(dialogPanel);
  dialogPanel.appendChild(renderLodgeTemplate(ads[number]));
  dialogTitleImage.setAttribute('src', ads[number].author.avatar);
};
/*
removeContents(pinMap);
mockAdsData();
renderAds();

pinElement = pinMap.querySelectorAll('.pin');
*/
//var pinElementDialog = document.querySelector('.dialog');
//var dialogClose = document.querySelector('.dialog__close');
//var ESC_KEYCODE = 27;
//var ENTER_KEYCODE = 13;
//dialogClose.setAttribute('tabindex', 0);
//              обработчики событий
var addClassTo = function (element, className) {
  return element.classList.add(className);
};

var removeClassFrom = function (element, className) {
  return element.classList.remove(className);
};

var deactivatePin = function (element) {
  var statusPin = element.querySelector('.pin--active');
  if (statusPin) {
    removeClassFrom(statusPin,'pin--active');
  }
};

var showElement = function (element) {
  if (element.classList.contains('hidden')) {
    removeClassFrom(element,'hidden');
  } 
};

var hideElement = function (element) {
  if (!(element.classList.contains('hidden'))) {
    addClassTo(element, 'hidden');
  }
};

var getDataNum = function (dataNum) { //получение номера из data -атрибута
  return dataNum.getAttribute('data-num');
};

var onPinClick = function (event) {
  var pin =  event.currentTarget;
  deactivatePin(pinMap);
  showElement(pinElementDialog);
  addClassTo(pin, 'pin--active');
  renderDialogPanel(getDataNum(pin)); 
};  

var onPinKeyEnter = function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    onPinClick(event);
  }
};

var onCloseDialogClick = function () {
  deactivatePin(pinMap);
  hideElement(pinElementDialog);
};

var onEscKeyPress = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    onCloseDialogClick();
  }
};

var setEventHandlers = function () {
  removeContents(pinMap);
  mockAdsData();
  renderAds();
  pinElement = pinMap.querySelectorAll('.pin');
  for (var i= 0; i < pinElement.length; i++){
    pinElement[i].addEventListener('click', onPinClick);
    pinElement[i].addEventListener('keydown', onPinKeyEnter)
  };

  dialogClose.addEventListener('click', onCloseDialogClick);
  document.addEventListener('keydown', onEscKeyPress);
};

setEventHandlers();
