$(function(){
  // Extract the text from the template
  var displayTemplate = $('#film-template').html();
  // Complile that into an handlebars template
  var template = Handlebars.compile(displayTemplate);
  // Retrieve the placeHolder where the posts will be displayed
  var data = $.getJSON( "festivalData.json", function(data) {
    var films = [];
    $.each(data, function( key, val ) {
      films.append( "<li id='" + key + "'>" + val + "</li>" );
  });
  $('#placeHolder').html(template(data));
  // Fetch all portfolio items data from the server in JSON
  // $.get('festivalData.json', function(data){
  //    // Generate the HTML for each post+
  //  var html = template({portfolio:data});
  //    // Render the posts into the page
  //  placeHolder.append(html);
 });
});
