$(function() { // document ready

  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    defaultDate: '2016-02-01',
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: '/data/festivalData.json',
    eventRender: function(event, element) {
      // element.find('.fc-title').append('<br/> '+ event.description);
    }
  });
});
