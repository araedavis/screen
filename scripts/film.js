(function(module){
  Film = function(opts){
    Object.keys(opts).forEach(function(e){
      this[e] = opts[e];
    },this);
    this.isFavorite = false;
  };

  //    ___fetchAllFilmData___
  // Query the database
  // If any data is returned, it makes an array of Film objects and returns it
  // If no data is returned, it makes an ajax call to festivalData.json,
  // ... uses that to populate the database and returns an array of Film objects
  Film.fetchAllFilmData = function(callback){
    webDB.execute(
    'SELECT * FROM films;', function(data){
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
      'datetime DATETIME,' +
      'imagesmall VARCHAR(255),' +
      'imagelarge VARCHAR(255),' +
      'youtube VARCHAR(500),' +
      'isFavorite BOOL);', callback
    );
  };

  // CRUD
  Film.prototype.insertRecord = function(callback){
    // Combine date and time into one timestamp
    var datetime = this.date + ' ' + this.time
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO films (title, director, description, country, trt, venue, datetime, imagesmall, imagelarge, youtube, isFavorite) VALUES (?,?,?,?,?,?,?,?,?,?,?);',
          'data': [
            this.title,
            this.director,
            this.description,
            this.country,
            this.trt,
            this.venue,
            datetime,
            this.imagesmall,
            this.imagelarge,
            this.youtube,
            this.isFavorite]
          }
        ],
      callback
    );
  };

  Film.prototype.updateRecord = function(callback){

  };

  Film.prototype.deleteRecord = function(callback){

  };

  Film.truncateTable = function(){
    webDB.execute(
      'DELETE FROM films;',callback
    );
  };

  // Function calls
  Film.createFilmTable();
  Film.fetchAllFilmData(function(returnArray){
    console.log('retrieveData invocation callback fires and this is the returned array: ' + returnArray);
  });

  module.Film = Film;
})(window);
