//controller for about page
(function(module){
  var aboutController = {};
  aboutController.index = function(ctx){
    $('#landing').hide();
    $('#filtered-films').hide();
    $('#my-films').hide();
    $('#about').show();
    $('#calendar').hide();
    $('#my-films-list').hide();
  };

  module.aboutController = aboutController;
})(window);
