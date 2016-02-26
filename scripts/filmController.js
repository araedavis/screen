//controller for main app page
(function(module){
  var filmController = {};
  Film.createFilmTable();
  filmController.index = function(ctx){
    $('#about').hide();
    $('#filtered-films').show();
    $('#my-films').hide();
    $('#landing').show();
    $('#calendar').hide();
    $('#my-films-list').hide();


    filmView.populateFilters();
    filmView.handleFilters();
    filmView.initPage();
  };


  
  module.filmController = filmController;
})(window);
