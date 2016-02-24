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
        var rendered = filmView.render(element);
        
        $('#my-films').append($(rendered).append(filmView.renderTwtter(element)));

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
