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
var PRICE_PER_DAY = [1000, 1000000];
var TYPES_OF_ACCOMMODATION =['flat', 'house', 'bungalo'];
var TIME_OF_ARRIVAL = ['12:00', '13:00', '14:00'];
var ADVANTAGES =['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var locationNearby = [locationX, locationY];
var createNewAds = function(){
  var newAds = {
    author = {
      avatar: function(number) {
        for (i = 1; i <=number && number <=8; i++){
          IMAGE_ADRESS_PHOTOS ='img/avatars/user 0'+ number +'.png';
          return IMAGE_ADRESS_PHOTOS;
        }
      } 
    },
    offer = {
      title: function(number) {
        
      }
    }

  }
  return newAds;
}
/*var similarAds = function() {
  for (i=0; 
};*/
  
