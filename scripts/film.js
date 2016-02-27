(function(module){
  var Film = function(opts){
    Object.keys(opts).forEach(function(e){
      this[e] = opts[e];
    },this);
    // console.log('this is the value for isFav in constructor: ' + this.isFavorite);
  };

  //    ___fetchAllFilmData___
  // Query the database
  // If any data is returned, it makes an array of Film objects and returns it
  // If no data is returned, it makes an ajax call to festivalData.json,
  // ... uses that to populate the database and returns an array of Film objects
  Film.fetchAllFilmData = function(callback){
    webDB.execute(
    'SELECT * FROM films ORDER BY "datetime";', function(data){
      if (data.length > 0){
        var arrayToReturn = data.map(function(element){
          return new Film(element);
        });
        callback(arrayToReturn);
      }else{
        $.ajax({url:'/data/festivalData.json'}, {method:'GET'})
        .done(function(data){
          var arrayToReturn = [];
          data.forEach(function(element){
            var film = new Film(element);
            film.isFavorite = false;
            film.imdbRating = 11.0;
            film.datetime = film.date + ' ' + film.time;
            arrayToReturn.push(film);
            film.insertRecord(function(){
            });
          });
          callback(arrayToReturn);
        })
        .fail(function(){
          console.log('retrieveData > fail fires');
        })
        ;
      }
    });
  };

  Film.fetchOneCriteria = function(criteria1, value1, callback){
    var arrayToReturn = [];
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM films WHERE ' + criteria1 + '=? ORDER BY date, time;',
          data: [value1]
        }
      ],function(data){
      var arrayToReturn = data.map(function(element){
        return new Film(element);
      });
      callback(arrayToReturn);
    }
  );
  };

  Film.fetchTwoCriteria = function (criteria1, value1, criteria2, value2, callback){
    var arrayToReturn = [];
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM films WHERE ' + criteria1 + '=? AND ' + criteria2 + '=? ORDER BY date, time;',
          data: [value1, value2]
        }
      ],function(data){
      var arrayToReturn = data.map(function(element){
        return new Film(element);
      });
      callback(arrayToReturn);
    }
  );
  };

  Film.fetchThreeCriteria = function (criteria1, value1, criteria2, value2, criteria3, value3, callback){
    var arrayToReturn = [];
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM films WHERE ' + criteria1 + '=? AND ' + criteria2 + '=? AND ' + criteria3 + '=? ORDER BY date, time;',
          data: [value1, value2, value3]
        }
      ],function(data){
      var arrayToReturn = data.map(function(element){
        return new Film(element);
      });
      callback(arrayToReturn);
    }
  );
  };

  Film.fetchFourCriteria = function (criteria1, value1, criteria2, value2, criteria3, value3, criteria4, value4, callback){
    var arrayToReturn = [];
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM films WHERE ' + criteria1 + '=? AND ' + criteria2 + '=? AND ' + criteria3 + '=? AND ' + criteria4 + '=? ORDER BY date, time;',
          data: [value1, value2, value3, value4]
        }
      ],function(data){
      var arrayToReturn = data.map(function(element){
        return new Film(element);
      });
      callback(arrayToReturn);
    }
  );
  };

  Film.fetchCountry = function(country, callback){
    var arrayToReturn = [];
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM films WHERE country =?;',
          data:[country]
        }
      ],function(data){
      var arrayToReturn = data.map(function(element){
        return new Film(element);
      });
      callback(arrayToReturn);
    }
    );
  };

  Film.fetchGenre = function(genre1, callback){
    var arrayToReturn = [];
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM films WHERE genre1 =?;',
          data:[genre1]
        }
      ],function(data){
      var arrayToReturn = data.map(function(element){
        return new Film(element);
      });
      callback(arrayToReturn);
    }
    );
  };

  Film.fetchVenue = function(venue, callback){
    var arrayToReturn = [];
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM films WHERE venue =?;',
          data:[venue]
        }
      ], function(data){
      var arrayToReturn = data.map(function(element){
        return new Film(element);
      });
      callback(arrayToReturn);
    }
  );
  };

  Film.createFilmTable = function(callback){
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS films (' +
      'id INTEGER PRIMARY KEY,' +
      'title VARCHAR(255) NOT NULL,'+
      'director VARCHAR(255),' +
      'description VARCHAR(255),' +
      'country VARCHAR(255),' +
      'trt INTEGER,' +
      'venue VARCHAR(255),' +
      'date VARCHAR(100),' +
      'time VARCHAR(100),' +
      'datetime DATETIME,' +
      'imagesmall VARCHAR(255),' +
      'imagelarge VARCHAR(255),' +
      'youtube VARCHAR(500),' +
      'genre1 VARCHAR(255),'+
      'genre2 VARCHAR(255),'+
      'genre3 VARCHAR(255),'+
      'isFavorite BOOL,'+
      'imdbRating FLOAT);', callback
    );
  };

  // CRUD
  Film.prototype.insertRecord = function(callback){
    // Combine date and time into one timestamp
    var datetime = this.date + ' ' + this.time;
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO films (title, director, description, country, trt, venue, date, time, datetime, imagesmall, imagelarge, youtube, genre1, genre2, genre3, isFavorite, imdbRating) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
          'data': [
            this.title,
            this.director,
            this.description,
            this.country,
            this.trt,
            this.venue,
            this.date,
            this.time,
            datetime,
            this.imagesmall,
            this.imagelarge,
            this.youtube,
            this.genre1,
            this.genre2,
            this.genre3,
            this.isFavorite,
            this.imdbRating]
        }
      ],
      callback
    );
  };
//some sort of update for the value
  //TODO: CHANGE this method to TRUE, create one for False
  Film.updateRecord = function(id, val, callback){
    webDB.execute(
      [
        {
          sql:'UPDATE films SET isFavorite=? WHERE id=?;',
          data:[val, id]
        }
      ],
      function(){
        webDB.execute(
          [
            {
              sql:'SELECT * FROM films WHERE id=?;',
              data:[id]
            }
          ],
          function(data){
            callback(new Film(data[0]));
          }
        );
      }
    );

    //where id ==
    //UPDATE films SET isFavorite = true Where id=?
    //'data': [id]
  }; //webDB end

  Film.prototype.deleteRecord = function(callback){

  };

  Film.truncateTable = function(callback){
    webDB.execute(
      'DELETE FROM films;',callback
    );
  };

  //methods for filters
  //TODO sort dates by date, and then by time
  Film.allDates = function(callback){
    //datetime
    webDB.execute('SELECT DISTINCT date FROM films ORDER BY date, time;', callback);
  };

  Film.allVenues = function(callback){
    //venue
    webDB.execute('SELECT DISTINCT venue FROM films;', callback);
  };

  Film.allCountries = function(callback){
    //country
    webDB.execute('SELECT DISTINCT country FROM films;', callback);
  };

  Film.allGenres = function(callback){
    //genre
    webDB.execute('SELECT DISTINCT genre1 FROM films;', callback);
  };

  Film.getRating = function(film, callback){
    var queryTitle = film.title.toLowerCase().replace(/\s/g,'+');
    $.ajax({
      url: '//www.omdbapi.com/?' + 't=' + queryTitle,
      method: 'GET',
      error: function(){
        console.log('Omdb api call failed');
      },
      success: function(data){
        callback(data.imdbRating);
      }
    });
  };

  Film.getLocalRating = function(id, callback){
    Film.fetchOneCriteria('id', id, function(filmArray){
      if(filmArray[0].imdbRating !== '11'){
        Film.getRating(filmArray[0], function(apiRating){
          filmArray[0].imdbRating = apiRating;
          callback(apiRating);
        });
      } else {
        callback(filmArray[0].imdbRating);
      }
    });
  };

  // Function calls
  // Film.createFilmTable();
  //Film.getRating('Gabrielle');

  module.Film = Film;
})(window);
