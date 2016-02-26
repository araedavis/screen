//controller for my films/favorites
(function(module){
  var myFilmsController ={};
  myFilmsController.index = function(ctx){
    favoriteView.initMyFilms();

    $('#about').hide();
    $('#filtered-films').show();
    $('#my-films').show();
    $('#landing').hide();
    $('#calendar').hide();
    $('#my-films-list').show();
  };
  //
  // Film.updateRecord();
  myFilmsController.getFavoriteFilms = function(ctx, next){
    Film.fetchOneCriteria('isFavorite', 'true', function(arrayToReturn){
      var calendarArray = [];
      var calendarArray = arrayToReturn.map(function(element){
        return {title: element.title, start: element.datetime};
      });
      ctx.calendarArray = calendarArray;
      next();
    });
  };
  //film.updateRecord(id)
  //test by using th numbers the record should
  //user response event

  module.myFilmsController = myFilmsController;
})(window);
