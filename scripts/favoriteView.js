//favorites page view
(function(module){

  var favoriteView = {};

  favoriteView.initMyFilms = function(){
    Film.fetchAllFilmData(function(returnedArray){
      return returnedArray.filter(function(film){
        //if film is favorited
        return (film.isFavorite === 'true');
      })
      .forEach(function(element){
        $('#my-films').append(filmView.render(element));
      });
    });

    // twttr.widgets.createHashtagButton(
    //   'TestHash',
    //   document.getElementById('tweet'),
    //   {
    //     size: 'large'
    //   }
    // );
  };






  module.favoriteView = favoriteView;

})(window);
