//favorites page view
(function(module){

  var favoriteView = {};

  favoriteView.initMyFilms = function(){
    var test =  Film.fetchAllFilmData(function(returnedArray){
      returnedArray.filter(function(film){
        //if film is favorited
        return film.isFavorite;
      });
    });
    console.log(test);
  };

  module.favoriteView = favoriteView;

})(window);
