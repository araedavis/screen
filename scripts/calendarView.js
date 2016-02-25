(function(module) { // document ready

  var calendarView = {};

  calendarView.loadCalendar = function(array){


    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2016-02-01',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: array,
      eventRender: function(event, element) {
        // element.find('.fc-title').append('<br/> '+ event.description);
      }
    });


  };
  module.calendarView = calendarView;
})(window);
