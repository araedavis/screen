//main film view
(function(module){

  var filmView = {};

  filmView.populateFilters = function(){
    var template = Handlebars.compile($('#filter-template').text());

    Film.allDates(function(rows){
      $('#date-filter').append(
        rows.map(function(row){
          return template({val: row.datetime});
        })
      );
    });
  }

  //test function calls
  filmView.populateFilters();

  module.filmView = filmView;
})(window);
