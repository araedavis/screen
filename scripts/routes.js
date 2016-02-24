page('/', filmController.index) ;
page('/myfilms', myFilmsController.index );
page('/about', aboutController.index );

// page('/:filter', filmController.loadByFilter);

page();
