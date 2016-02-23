//favorites page view
(function(module){

  var favoriteView = {};

  favoriteView.initMyFilms = function(){
    var test = Film.fetchAllFilmData(function(returnedArray){
      return returnedArray.filter(function(film){
        //if film is favorited
        console.log(film.isFavorite);
        return film.isFavorite;
      });
    });

    console.log(test);
  };



  module.favoriteView = favoriteView;

})(window);
