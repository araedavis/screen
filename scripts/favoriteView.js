//favorites page view
(function(module){

  var favoriteView = {};


  // favoriteView.addTwitterWidget = function(){
  //   var template = Handlebars.compile($('#twitter-template').text());
  //   return template;
  // };

  favoriteView.initMyFilms = function(){
    $('#my-films-list').empty();
    Film.fetchAllFilmData(function(returnedArray){
      returnedArray.filter(function(film){
        //if film is favorited
        console.log('intiMyFilms fires with film.isFavorite ' + film.isFavorite);
        return (film.isFavorite === 'true');
      })
      .forEach(function(element){
        //var completedFilm = $(element).append(favoriteView.addTwitterWidget());

        $('#my-films-list').append(filmView.render(element));
      });
      filmView.modalWindow();
    });
  };




  module.favoriteView = favoriteView;

})(window);
