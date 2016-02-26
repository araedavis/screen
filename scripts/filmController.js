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
    filmView.initPage(ctx.filmArray);
  };

  filmController.rateFilms = function(ctx, next){
    ctx.filmArray.forEach(function(film){
      var test = Film.getRating(film);
      console.log(test);
    });
    next();
  };

  filmController.getFilms = function(ctx, next){
    Film.fetchAllFilmData(function(filmArray){

      ctx.filmArray = filmArray;
      next();
    });
  };

  module.filmController = filmController;
})(window);
