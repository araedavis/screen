page('/', filmController.index) ;
page('/myfilms', myFilmsController.index );
page('/about', aboutController.index );
page('/mycalendar', myCalendarController.index );

// page('/:filter', filmController.loadByFilter);

page();
