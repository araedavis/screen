//controller for my calendar
(function(module){
  var myCalendarController ={};
  myCalendarController.index = function(ctx){
    $('#landing').hide();
    $('#filtered-films').hide();
    $('#about').hide();
    $('#my-films-list').hide();
    $('#my-films').show();
    $('#calendar').show();

    var calendarArray = ctx.calendarArray;
    calendarView.loadCalendar(calendarArray);
  };

  module.myCalendarController = myCalendarController;
})(window);
