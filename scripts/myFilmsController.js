//controller for my films/favorites
(function(module){
  var myFilmsController ={};
  myFilmsController.index = function(ctx){
    $('#about').hide();
    $('#filtered-films').hide();
    $('#my-films').show();
    $('#landing').hide();
  };

  module.myFilmsController = myFilmsController;
})(window);
