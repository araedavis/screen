//controller for my films/favorites
(function(module){
  var myFilmsController ={};
  myFilmsController.index = function(ctx){
    favoriteView.initMyFilms();

    $('#about').hide();
    $('#filtered-films').show();
    $('#my-films').show();
    $('#landing').hide();
  };

  Film.updateRecord();

  //film.updateRecord(id)
  //test by using th numbers the record should
  //user response event

  module.myFilmsController = myFilmsController;
})(window);
