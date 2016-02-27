(function(module){

  var filmView = {};

  filmView.render = function(film){
    var template = Handlebars.compile($('#film-template').text());
    var dateAsString = new Date(film.datetime).toDateString();
    var timeAsString = new Date(film.datetime).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

    // film.imdbRating = Film.getRating(film.title);
    // console.log(film.imdbRating);
    film.datetime = dateAsString;
    film.time = timeAsString;

    if (film.isFavorite == 'true'){
      film.isFavorite = true;
    }else if (film.isFavorite !== true){
      film.isFavorite = false;
    }

    var htmlObject = template(film);
    return htmlObject;
  }; // end

  filmView.renderCarousel = function(film) {
    var template = Handlebars.compile($('#carousel-template').text());
    var htmlObject = template(film);
    return htmlObject;
  };

  filmView.displayRatings = function(imdb){

  };


  filmView.buttonClick = function(){
    $('.button-fill').hover(function () {
      $(this).children('.button-inside').addClass('full');
    }, function() {
      $(this).children('.button-inside').removeClass('full');
    });
  };

  filmView.mobileView = function(){
    $('#nav').addClass('js').before('<div id="menu">&#9776;</div>');
    $('#menu').click(function(){
      $('#nav').toggle();
    });
    $(window).resize(function(){
      if(window.innerWidth > 768) {
        if(window.innerWidth > 768) {
          $('#nav').removeAttr('style');
        }
      }
    });
  };

  filmView.addFavorites = function(){
    //D0NE: refactor the favButton to class
    $('.respond-to-film-buttons').on('click', 'button', function(e){
      e.preventDefault();

      if ($(e.target).hasClass('favButton')){
        var favoriteId = $(e.target).data('id');
        var isFavoriteTable = $(e.target).data('favorite');
        if (!$(e.target).hasClass('liked')){
          Film.updateRecord(favoriteId, true, function(returnedObject){
            $(e.target).parent().parent().replaceWith(filmView.render(returnedObject));
          });
        }else{
          Film.updateRecord(favoriteId, false, function(returnedObject){
            $(e.target).parent().parent().replaceWith(filmView.render(returnedObject));
          });
        }
      };
      if($(e.target).hasClass('imdbButton')){
        var imdbId = $(e.target).data('id');
        Film.getLocalRating(imdbId, function(review){

          $(e.target).empty();

          if(review === undefined || review === NaN){
            $(e.target).append('<i class="fa fa-star-o star-icn"></i>Film not reviewed on IMDB');

          } else {
            var starArray = [];
            var starRating = review/2;

            for(var i = 1; i <= 5; i++){
              if(starRating - i > - 0.2){
                starArray.push(1);
              } else if (starRating - i <= - 0.2 && starRating - i >= -0.6){
                starArray.push(0.5);
              } else if (starRating - i < -0.6){
                starArray.push(0);
              }
            }

            console.log(starArray);
            starArray.forEach(function(star){
              if(star === 0){
                $(e.target).append('<i class="fa fa-star-o star-icn"></i>');
              } else if (star === 0.5){
                $(e.target).append('<i class="fa fa-star-half-o star-icn"></i>');
              } else if (star === 1){
                $(e.target).append('<i class="fa fa-star star-icn"></i>');
              }
            });
          }
        });

      }
    });
  };


  filmView.addModalButtons = function(){
    $('.modalDialog').on('click', 'div', function(e){
      e.preventDefault();
      $('.youtube-player').hide();
      $('.modalDialog').hide('slow', function(){
      });
      $('html').removeClass('scrollprevent');
    });


    $('.respond-to-film-buttons').on('click', 'a', function(e){
      e.preventDefault();

      if ($(e.target).hasClass('filmButton')){
        e.preventDefault();

        // Replace youtube placeholder with <iframe>
        var ytlink = $(e.target).data('ytlink');
        var iframeString = '<div class="youtube-player"><iframe class="yt-content" title="YouTube video player" type="text/html" width="640" height="390" src="' + ytlink + '" frameborder="0" allowFullScreen></iframe></div>';
        $(e.target).parent().parent().next().find('.yt-placeholder').replaceWith(iframeString);

        var filmId = $(e.target).data('film-id');
        $('.modalDialog').hide();
        $('.modalDialog-'+ filmId).show('slow', function() {
        });
        // $('html').addClass('scrollprevent');
      };

      if ($(e.target).hasClass('close','modalDialog')){
        e.preventDefault();

        // Replace <iframe> placeholder with placeholder
        var ytlink = $(e.target).data('ytlink');
        var iframeString = '<div class="yt-placeholder"></div>';
        $(e.target).parent().parent().next().find('.yt-content').replaceWith(iframeString);

        $('.modalDialog').hide('slow', function(){
        });
        $('html').removeClass('scrollprevent');
      };

    });
  };


  filmView.populateFilters = function(){
    var template = Handlebars.compile($('#filter-template').text());

    Film.allDates(function(rows){

      // Special template just for dates
      template = Handlebars.compile($('#filter-template-date').text());

      if($('#date-filter option').length < 2) {
        $('#date-filter').append(
            rows.map(function(row){
              var dateFormatted = new Date(row.date);
              return template({
                val: dateFormatted.toDateString(),
                date: row.date
              });
            })
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
    // Without this, the filters will eventually run repeat event responders...
    // Adding duplicates of all the films
    $('.filter-container').off('change', 'select');

    $('.filter-container').on('change', 'select', function(e){
      var arrayOfActiveFilters = filmView.getStateOfFilters();
      filmView.performFilter(arrayOfActiveFilters);
    });
  };

  // Takes a new filter object with properties criteria and value as a parameter
  // Makes a call to film.js for the query
  filmView.performFilter = function(array){
    var lengthOfArray = array.length;

    if (lengthOfArray === 0){
      $('#filtered-films').empty();
      filmView.initPage();

    }else if (lengthOfArray === 1){
      Film.fetchOneCriteria(array[0].criteria, array[0].value,
        filmView.outputFilterArray);

    }else if (lengthOfArray === 2){
      Film.fetchTwoCriteria(array[0].criteria, array[0].value,
        array[1].criteria, array[1].value,
        filmView.outputFilterArray);

    }else if (lengthOfArray === 3){
      Film.fetchThreeCriteria(array[0].criteria, array[0].value,
        array[1].criteria, array[1].value,
        array[2].criteria, array[2].value,
        filmView.outputFilterArray);

    }else if(lengthOfArray === 4){
      Film.fetchFourCriteria(array[0].criteria, array[0].value,
        array[1].criteria, array[1].value,
        array[2].criteria, array[2].value,
        array[3].criteria, array[3].value,
        filmView.outputFilterArray);
    }
  };

  filmView.outputFilterArray = function(filterArray){
    if (filterArray.length === 0){
      var template = Handlebars.compile($('#no-result-template').text());
      $('#filtered-films').empty();
      $('#filtered-films').append(template());
    }else{
      $('#filtered-films').empty();
      filterArray.forEach(function(element){
        $('#filtered-films').append(filmView.render(element));
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
        if (filterCriteria === 'date'){
          filterValue = $(element).find('option[value|="' + filterValue + '"]').data('rawdate');
        }
        var object = {criteria:filterCriteria, value:filterValue};
        returnArray.push(object);
      }
    });
    return returnArray;
  };


  filmView.printPage = function(){

    var element = {};


    var map = {};
    $('h6').each(function(){
      var value = $(this).text();
      if (map[value] == null){
        map[value] = true;
      } else {
        $(this).addClass('hidePrint');
      }
    });

  };

  filmView.initPage = function(){
    $('#filtered-films').empty().append('<div class="container"></div>');


    //Carousel Logic
    Film.fetchAllFilmData(function(filmData) {

      $('#filtered-films').append(filmData.map(filmView.render));

      if(!($('#carousel-main').hasClass('flickity-enabled'))){
        $('#carousel-main').empty();
        $('#carousel-main').append(getCarouselHtml(filmData));
        $('.main-gallery').flickity({
          cellAlign: 'left',
          contain: true
        });
      }


      filmView.addFavorites();
      filmView.addModalButtons();
      filmView.buttonClick();
      filmView.printPage();

    });
  };
  filmView.mobileView();

  function getCarouselHtml(filmData) {
    return filmData.filter(uglyImages)
      .slice(0, 13)
      .sort(randomOrder)
      .map(filmView.renderCarousel);
  }

  function randomOrder() {
    return Math.floor(Math.random() * 3) - 1;
  }

  function uglyImages(film, index) {
    return [1,5,18,7].indexOf(film.id) === -1;
  }

  module.filmView = filmView;

})(window);
