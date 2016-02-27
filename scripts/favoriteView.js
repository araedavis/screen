//favorites page view
(function(module){

  var favoriteView = {};

  favoriteView.initMyFilms = function(){
    $('#filtered-films').empty();
    $('#my-films-list').empty();
    Film.fetchAllFilmData(function(returnedArray){

      returnedArray.filter(function(film){
        //if film is favorited
        console.log('intiMyFilms fires with film.isFavorite ' + film.isFavorite);
        return (film.isFavorite === 'true');
      })
      .forEach(function(element){
        var hashtag = 'pdxfilmfestival';

        //build title hashtag string
        var titleHashtag = (element.title).toLowerCase().replace(/\s/g,'');

        $('#my-films-list').append(filmView.render(element));
        //twttr button creation
        twttr.widgets.createHashtagButton(hashtag, document.getElementById(element.id),
        { size:'large',
          hashtags: titleHashtag
        });
        twttr.widgets.load();

      });

      filmView.addModalButtons();
      filmView.printPage();
    });
  };



  module.favoriteView = favoriteView;

})(window);
