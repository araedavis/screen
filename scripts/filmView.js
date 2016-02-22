(function(module){

  var filmView = {};

  var render = function(film){
    var template = Handlebars.compile($('#film-template').text());
    var dateAsString = new Date(film.datetime).toDateString();
    film.datetime = dateAsString;
    if (film.isFavorite === 'false'){
      film.isFavorite = false;
    }
    return template(film);
  }; // end render



  filmView.addFavorites = function(){
    //D0NE: refactor the favButton to class
    $('.favButton').on('click', function(e){
      e.preventDefault();
      var favoriteId = $(e.target).data('id');
      var isFavoriteTable = $(e.target).data('favorite');
      console.log(isFavoriteTable);
      if (!$(e.target).hasClass('liked')){
        $(e.target).addClass('liked');
        Film.updateRecord(favoriteId, true);
        $(e.target).data('favorite', 'true');
        $(e.target).firstChild().addClass('fa-heart').removeClass('fa-heart-o');
      }
      else {
        $(e.target).removeClass('liked');
        Film.updateRecord(favoriteId, false);
        $(e.target).data('favorite', 'false');
        $(e.target).firstChild().addClass('fa-heart-o').removeClass('fa-heart');
      }
    });
  };

  filmView.populateFilters = function(){
    var template = Handlebars.compile($('#filter-template').text());

    Film.allDates(function(rows){

      if($('#date-filter option').length < 2) {
        $('#date-filter').append(
            rows.map(function(row){
              var dateFormatted = new Date(row.datetime);

              return template({
                val: dateFormatted.toDateString() + ' ' + dateFormatted.toTimeString().slice(0,5) });
            })
          //)
          // .sort(function(a,b){
          //  return new Date(a.datetime) - newDate(b.datetime);
        );
      };
    });

    Film.allVenues(function(rows){
      if($('#venue-filter option').length < 2) {
        $('#venue-filter').append(
            rows.map(function(row){
              return template({
                val: row.venue });
            })
          );
      };
    });

    Film.allCountries(function(rows){
      if($('#country-filter option').length < 2) {
        $('#country-filter').append(
            rows.map(function(row){
              return template({
                //returns row.country converted to title case
                val: (row.country).replace(/\w\S*/g, function(txt){
                  return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
                }) });
            })
          );
      };
    });

    Film.allGenres(function(rows){
      if($('#genre-filter option').length < 2) {
        $('#genre-filter').append(
            rows.map(function(row){
              return template({
                val: row.genre1
              });
            })
          );
      };
    });
  };

  filmView.handleFilters = function(){

//TODO:refactor handleFilters to make code DRYer

//by country
    $('#country-filter').on('change', function(e){
      var target = $(e.target).val().toUpperCase();

      Film.fetchCountry(target, function(returnedArray){
        $('#filtered-films').empty();
        returnedArray.forEach(function(element){
          $('#filtered-films').append(render(element));
        });
      });
    });

//by genre
    $('#genre-filter').on('change', function(e){
      var target = $(e.target).val();
      Film.fetchGenre(target, function(returnedArray){
        $('#filtered-films').empty();
        returnedArray.forEach(function(element){
          $('#filtered-films').append(render(element));
        });
      });
    });
  };


  filmView.initPage = function(){
    Film.fetchAllFilmData(function(returnedArray){
      returnedArray.forEach(function(element){
        $('#filtered-films').append(render(element));
      });
      filmView.addFavorites();
    });
  };

  //test function calls
    //filmView.handleFilters();
    // filmView.populateFilters();
    // filmView.initPage();



  module.filmView = filmView;

})(window);
