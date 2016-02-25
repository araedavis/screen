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
        //build hashtag string
        var titleHashtag = (element.title).toLowerCase().replace(/\s/g,'');
        console.log(titleHashtag);

        //twttr button creation
        twttr.ready(function(twttr){
          twttr.widgets.createHashtagButton(hashtag, document.getElementById(''),
          {size:'large'});
          twttr.widgets.load();
        });

          //figure out how to add secondary hashtags
        $('#my-films').append(filmView.render(element));

      });
    });



  };

  module.favoriteView = favoriteView;

})(window);
