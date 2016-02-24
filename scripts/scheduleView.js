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
    events: [
      {
        title: 'Ernest and Celestine',
        start: '2016-02-02T16:00:00'
      },
      {
        title: 'Long Event',
        start: '2016-02-04',
        end: '2016-02-05'
      },

      {
        title: 'Meeting',
        start: '2016-02-07T10:30:00',
        end: '2016-02-07T12:30:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2016-02-09'
      }
    ]
  });

});
