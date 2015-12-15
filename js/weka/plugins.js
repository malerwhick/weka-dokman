$(function() {    
	
	// plugins
	$('[data-toggle="tooltip"]').tooltip();
    
    // save active state for current tabs (bootstrap) in local browser storage
    $('a[data-toggle="tab"]').on('click', function (e) {
        var tab = $(this).attr('href');
        localStorage.setItem('lastTab', tab);
      });

      //go to the latest tab, if it exists:
      var lastTab = localStorage.getItem('lastTab');
      if (lastTab) {
        $('a[href='+lastTab+']').click();
    }
      
    // accordion for tree-menu (jquery ui)
    /*
    $('#tree-accordion').accordion({
		collapsible: true,
		active: false,
		animate: 120,
		icons: false,
		heightStyle: 'content',
    });
    */
    
    // popups - bootstrap modals
    $('.popup').modal({
    	backdrop: 'static',
    	keyboard: true
	});
    
    // datepicker
    $('input.use-datepicker').datepicker({
        format: "dd.mm.yyyy",
        weekStart: 1,
        language: "de",
        autoclose: true,
        todayHighlight: true
    });
    
});