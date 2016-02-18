(function(module){

var filmView = {}

var render = function(film){
  var template = Handlebars.compile($('#film-template').text());
  var dateAsString = new Date(film.datetime).toDateString();
  film.datetime = dateAsString;
  return template(film);
}





filmView.initPage = function(){
  Film.fetchAllFilmData(function(returnedArray){
    returnedArray.forEach(function(element){
        $('#filtered-films').append(render(element));
    });
  });
}

filmView.initPage();

})(window);
