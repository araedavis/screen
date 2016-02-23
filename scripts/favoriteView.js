//favorites page view
(function(module){

  var favoriteView = {};


  // favoriteView.addTwitterWidget = function(){
  //   var template = Handlebars.compile($('#twitter-template').text());
  //   return template;
  // };

  favoriteView.initMyFilms = function(){
    Film.fetchAllFilmData(function(returnedArray){
      return returnedArray.filter(function(film){
        //if film is favorited
        return (film.isFavorite === 'true');
      })
      .forEach(function(element){
        //var completedFilm = $(element).append(favoriteView.addTwitterWidget());

        $('#my-films').append(filmView.render(element));
      });
    });
  };




  module.favoriteView = favoriteView;

})(window);
