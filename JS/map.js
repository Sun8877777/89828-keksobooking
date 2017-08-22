var TYPES_OF_HOUSING =[
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var IMAGE_ADRESS_PHOTOS ='';
//var PRICE_PER_DAY = [1000, 1000000];
var TYPES_OF_ACCOMMODATION =['flat', 'house', 'bungalo'];
var TIME_OF_ARRIVAL = ['12:00', '13:00', '14:00'];
var ADVANTAGES =['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var locationNearbyX = getRandomInt(300, 900);
var locationNearbyY = getRandomInt(100, 500);

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var avatarSelection = function(number) {
  if (number <=8){
    IMAGE_ADRESS_PHOTOS ='img/avatars/user 0'+ number +'.png';
    return IMAGE_ADRESS_PHOTOS;
  } else {return "Нет аватара."};
} 

var shortDescription = function(numberTitle, namesDirectory){
  if (numberTitle <=namesDirectory.length){
    return namesDirectory[numberTitle];
  }
}

var createNewAds = function(){
  var newAds = {
    author = {
      avatar: avatarSelection(number)
    },
    offer = {
      title: shortDescription(numberTitle,TYPES_OF_HOUSING),
      address: ['locationNearbyX', 'locationNearbyX'],
      price: getRandomInt(1000, 1000000),
      type: shortDescription(numberTitle, TYPES_OF_ACCOMMODATION),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 5),
      checkin: shortDescription(numberTitle,TIME_OF_ARRIVAL),
      checkout: shortDescription(numberTitle,TIME_OF_ARRIVAL),
      features: 
    }

  }
  return newAds;
}
/*var similarAds = function() {
  for (i=0; 
};*/
  
