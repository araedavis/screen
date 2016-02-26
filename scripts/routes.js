page('/', filmController.getFilms, filmController.rateFilms, filmController.index) ;
page('/myfilms', myFilmsController.index );
page('/about', aboutController.index );
page('/mycalendar', myFilmsController.getFavoriteFilms, myCalendarController.index );

// page('/:filter', filmController.loadByFilter);

page();
