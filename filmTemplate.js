$(function(){
  // Extract the text from the template
  var displayTemplate = $('#filmTemplate').html();
  // Complile that into an handlebars template
  var template = Handlebars.compile(displayTemplate);
  // Retrieve the placeHolder where the posts will be displayed
  var placeHolder = $('#placeHolder');
  // Fetch all portfolio items data from the server in JSON
  $.get('festivalData.json', function(data){
     // Generate the HTML for each post+
     var html = template({data});
       // Render the posts into the page
     placeHolder.append(html);
 });
});
