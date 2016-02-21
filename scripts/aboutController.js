//controller for about page
(function(module){
  var aboutController = {};
  aboutController.index = function(ctx){
    $('#landing').hide();
    $('#filtered-films').hide();
    $('#my-films').hide();
    $('#about').show();



  };




  module.aboutController = aboutController;
})(window);
