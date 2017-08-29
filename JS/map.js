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
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min )) + min;
};

var avatarSelection = function() {
  for (var i = 1; i <qtyAds; i++) {
      return'img/avatars/user0'+ i +'.png';
    }
    return "Нет аватара."  
  };

var getRundomNumbers = function(namesDirectory){
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
  var locationNearbyX = getRandomInt(300, 900);
  var locationNearbyY = getRandomInt(100, 500);
  return {
    author:{
      avatar: avatarSelection()
    },
    offer:{
      title: getRundomNumbers(OFFER_TITLES),
      address: [locationNearbyX, locationNearbyY],
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

var arrSimularAds = [];
for (var i=0; i<qtyAds; i++){
  arrSimularAds[i] = getSimilarAds();
};

var LODGE_TEMPLATE = document.querySelector('#lodge-template');
var importDynamicSimilarAds = document.querySelector('.tokyo__pin-map');//

var generateSimularAds = function(){
  var fragmentSumularAds = document.createDocumentFragment();
  for (var i = 0; i <arrSimularAds.length; i++){
    var avatarImageSimularAds = document.createElement('div');
    avatarImageSimularAds.className = 'pin';
    avatarImageSimularAds.style.cssText = 'left:' + arrSimularAds[i].location.x + 'px; top: '+ arrSimularAds[i].location.y +'px;';  
    var avatarImage = document.createElement('img');
    avatarImage.setAttribute('src', arrSimularAds[i].author.avatar);
    avatarImage.className = 'rounded';
    avatarImage.setAttribute('width', 40);
    avatarImage.setAttribute('height', 40)
    
    avatarImageSimularAds.appendChild(avatarImage);

    //avatarImageSimularAds.innerHTML = '<img src="' + arrSimularAds[i].author.avatar + '" class="rounded" width="40" height="40">';

    fragmentSumularAds.appendChild(avatarImageSimularAds);
    //fragmentSumularAds.innerHTML = '<div class="pin" style="left: ' + arrSimularAds[i].location.x + 'px; top: ' + arrSimularAds[i].location.y + 'px><img src="' + arrSimularAds[i].author.avatar + '" class="rounded" width="40" height="40"> </div>';
    //fragmentSumularAds.appendChild(importDynamicSimilarAds);
  }
  return fragmentSumularAds;
};

importDynamicSimilarAds.appendChild(generateSimularAds());

/*var getAvatarImageSimularAds = function(locationX, locationY, imageAddress){
  var avatarImageSimularAds = document.createElement('div');
  avatarImageSimularAds.className = 'pin';
  avatarImageSimularAds.style.cssText = 'left:' + locationX + 'px; top: '+ locationY +'px;'
  if (imageAddress) {
    var getAvatarImage = function(imageAddress){  
      var avatarImage = document.createElement('img');
      avatarImage.setAttribute('src',imageAddress);
      avatarImage.className = 'rounded';
      avatarImage.setAttribute('width', 40);
      avatarImage.setAttribute('height', 40)
      return document.createDocumentFragment().appendChild(avatarImage);
    }
  }
  return document.createDocumentFragment().appendChild(avatarImageSimularAds);
};
*/
//getAvatarImageSimularAds(getSimilarAds().location.x, getSimilarAds().location.y, getSimilarAds().author.avatar);


//importDynamicSimilarAds.appendChild(getAvatarImageSimularAds()) +importDynamicSimilarAds.appendChild(getAvatarImage()) ;

