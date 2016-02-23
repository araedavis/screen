//favorites page view
(function(module){

  var favoriteView = {};

  favoriteView.initMyFilms = function(){
    Film.fetchAllFilmData(function(returnedArray){
      return returnedArray.filter(function(film){
        //if film is favorited
        console.log(typeof film.isFavorite);
        return (film.isFavorite === 'true');
      })
      .forEach(function(element){
        $('#my-films').append(filmView.render(element));
      });
    });
  };


  module.favoriteView = favoriteView;

})(window);
