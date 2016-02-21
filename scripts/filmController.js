//controller for main app page
(function(module){
  var filmController = {};
  filmController.index = function(ctx){
    $('#about').hide();
    $('#filtered-films').hide();
    $('#my-films').hide();
    $('#landing').show();
    filmView.populateFilters();
    filmView.initPage(ctx.films);



  };

  filmController.getData = function(ctx, next){
    var filmData =  Film.createFilmTable(function(filmData){
      ctx.films = filmData;
      next();

    });

  };


  module.filmController = filmController;
})(window);
