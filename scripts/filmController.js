//controller for main app page
(function(module){
  var filmController = {};
  Film.createFilmTable();
  filmController.index = function(ctx){
    $('#about').hide();
    $('#filtered-films').show();
    $('#my-films').hide();
    $('#landing').show();
    filmView.populateFilters();
    filmView.initPage();



  };





  module.filmController = filmController;
})(window);
