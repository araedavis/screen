(function(module){

  var filmView = {};

  filmView.render = function(film){
    var template = Handlebars.compile($('#film-template').text());
    var dateAsString = new Date(film.datetime).toDateString();
    film.datetime = dateAsString;
    if (film.isFavorite === 'false'){
      film.isFavorite = false;
    }
    return template(film);
  }; // end render

  filmView.modalWindow = function(){
    $('.filmButton').on('click', function(e){
      console.log('hello');
      e.preventDefault();
      var filmId = $(e.target).data('film-id');
      $('.modalDialog').hide();
      $('.modalDialog-'+ filmId).show('slow', function() {
      });
      $('html').addClass('scrollprevent');
    });

    $('.close').on('click', function(e){
      e.preventDefault();
      $('.modalDialog').hide('slow', function(){
      });
      $('html').removeClass('scrollprevent');
    });
  };

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
        $(e.target).first().addClass('fa-heart').removeClass('fa-heart-o');
      }
      else {
        $(e.target).removeClass('liked');
        Film.updateRecord(favoriteId, false);
        $(e.target).data('favorite', 'false');
        $(e.target).first().addClass('fa-heart-o').removeClass('fa-heart');
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
      var arrayOfActiveFilters = filmView.getStateOfFilters();
      filmView.performFilter(arrayOfActiveFilters);


      // var target = $(e.target).val().toUpperCase();
      // if (target === 'ALL'){
      //   $('#filtered-films').empty();
      //   filmView.initPage();
      //   return;
      // };
      // Film.fetchCountry(target, function(returnedArray){
      //   $('#filtered-films').empty();
      //   returnedArray.forEach(function(element){
      //     $('#filtered-films').append(render(element));
      //   });
      // });
    });

//by genre
    $('#genre-filter').on('change', function(e){
      var arrayOfActiveFilters = filmView.getStateOfFilters();
      filmView.performFilter(arrayOfActiveFilters);


      // var target = $(e.target).val();
      // if (target === 'all'){
      //   $('#filtered-films').empty();
      //   filmView.initPage();
      //   return;
      // };
      // Film.fetchGenre(target, function(returnedArray){
      //   $('#filtered-films').empty();
      //   returnedArray.forEach(function(element){
      //     $('#filtered-films').append(render(element));
      //   });
      // });
    });

  //by venue
    $('#venue-filter').on('change', function(e){
      var arrayOfActiveFilters = filmView.getStateOfFilters();
      filmView.performFilter(arrayOfActiveFilters);
    });
  };



  // Takes a new filter object with properties criteria and value as a parameter
  // Makes a call to film.js for the query
  filmView.performFilter = function(array){
    var lengthOfArray = array.length;

    if (lengthOfArray === 1){
      Film.fetchOneCriteria(array[0].criteria, array[0].value, function(returnedArray){
        // console.log('this is the returned array length ' + returnedArray.length);
        $('#filtered-films').empty();
        returnedArray.forEach(function(element){
          $('#filtered-films').append(render(element));
        });
      });
    }

    if (lengthOfArray === 0){
      $('#filtered-films').empty();
      filmView.initPage();
    }

    if (lengthOfArray === 2){
      Film.fetchTwoCriteria(array[0].criteria, array[0].value, array[1].criteria, array[1].value, function(returnedArray){
        // console.log('this is the returned array length ' + returnedArray.length);
        $('#filtered-films').empty();
        returnedArray.forEach(function(element){
          $('#filtered-films').append(filmView.render(element));
        });
      });
    }
  };

  // Returns an array of objects, each has two properties: criteria and value
  filmView.getStateOfFilters = function(){
    var returnArray = [];
    $('.filter-layout').each(function(index, element){
      var filterValue = $(element).find('select').val();
      var filterCriteria = $(element).find('select').attr('id');
      var lastIndex = filterCriteria.lastIndexOf('-');
      var filterCriteria = filterCriteria.substring(0, lastIndex);
      if (filterValue !== 'all'){
        if (filterCriteria === 'genre'){
          filterCriteria = 'genre1';
        }
        if (filterCriteria === 'country'){
          filterValue = filterValue.toUpperCase();
        }
        var object = {criteria:filterCriteria, value:filterValue};
        returnArray.push(object);
      }
    });
    console.log('array to return ' + returnArray);
    return returnArray;
  };

  filmView.initPage = function(){
    Film.fetchAllFilmData(function(returnedArray){
      returnedArray.forEach(function(element){
        $('#filtered-films').append(filmView.render(element));
      });
      filmView.addFavorites();
      filmView.modalWindow();
    });
  };

  //test function calls
    //filmView.handleFilters();
    // filmView.populateFilters();
    // filmView.initPage();



  module.filmView = filmView;

})(window);
