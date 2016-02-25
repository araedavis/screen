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
        var hashtag = 'pdxfilmfestival';

        //build title hashtag string
        var titleHashtag = (element.title).toLowerCase().replace(/\s/g,'');

        $('#my-films').append(filmView.render(element));
        //twttr button creation
        twttr.ready(function(twttr){
          twttr.widgets.createHashtagButton(hashtag, document.getElementById(element.id),
          { size:'large',
          hashtags: titleHashtag
        });
          twttr.widgets.load();
        });

      });
    });
  };

  module.favoriteView = favoriteView;

})(window);
