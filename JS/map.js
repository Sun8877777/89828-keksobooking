//'use strict';
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

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min )) + min;
};
var locationNearbyX = getRandomInt(300, 900);
var locationNearbyY = getRandomInt(100, 500);

var avatarSelection = function(number) {
  if (number <=8 && number>=1){
    return'img/avatars/user0'+ number +'.png';
  } else {return "Нет аватара."};
}; 

var getRundomNumbers = function(namesDirectory){
    return namesDirectory[getRandomInt( 0, namesDirectory.length-1)];
};

var getRandomElements = function(arr){
  var randomElements=[];
  for (i=0; i < arr.length -1; i++){
    if (Math.random()>0.5){
      randomElements.push(arr[i]);
    } 
  }
  return randomElements;
};

var getSimilarAds = function(){
  return {
    author:{
      avatar: avatarSelection(getRandomInt(1,8))
    },
    offer:{
      title: getRundomNumbers(OFFER_TITLES),
      address: [this.locationNearbyX, this.locationNearbyY],
      price: getRandomInt(1000, 1000000),
      type: getRundomNumbers(OFFER_TYPES),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 5),
      checkin: getRundomNumbers(OFFER_TIMES),
      
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

var LODGE_TEMPLATE = document.querySelector('#lodge-template');
LODGE_TEMPLATE.classList.remove('hidden');

var templateFragment = document.createDocumentFragment();
for (var i = 0; i< getSimilarAds().length; i++){
  var avatarImageWrapper = document.createElement('div');
  avatarImageWrapper.className = 'pin';
  avatarImageWrapper.style.cssText = 'left:' + getSimilarAds().location.x + 'px; top: '+ getSimilarAds().location.y +'px;'
  
  var avatarImage = document.createElement('img');
  avatarImage.className = 'rounded';
  avatarImage.setAttribute('width', 40);
  avatarImage.setAttribute('height', 40)

  templateFragment.appendChild(avatarImage);
  templateFragment.appendChild(avatarImageWrapper);
}


