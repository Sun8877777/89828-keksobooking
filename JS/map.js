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
//var IMAGE_ADRESS_PHOTOS ='';
//var PRICE_PER_DAY = [1000, 1000000];
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

var shortDescription = function(numberTitle, namesDirectory){
  if (numberTitle <namesDirectory.length -1){
    return namesDirectory[numberTitle];
  }
};

var randomElements = function(arr){
  var arr1=[];
  for (i=0; i < arr.length -1; i++){
    if (Math.random()>0.5){
      arr1.push(arr[i]);
    } 
  }
  return arr1;
};

var createNewAds = function(){
  return {
    author:{
      avatar: avatarSelection(getRandomInt(1,8))
    },
    offer:{
      title: shortDescription(getRandomInt(0, OFFER_TITLES.length-1),OFFER_TITLES),
      address: [this.locationNearbyX, this.locationNearbyY],
      price: getRandomInt(1000, 1000000),
      type: shortDescription(getRandomInt(0, OFFER_TYPES.length-1), OFFER_TYPES),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 5),
      checkin: shortDescription(getRandomInt(0, OFFER_TIMES.length-1),OFFER_TIMES),
      
      features: randomElements(OFFER_FEATURES),
      description: '',
      photos: []
    },
    location:{
      x: locationNearbyX,
      y: locationNearbyY
    }
  }
};
createNewAds();

