// All prototyping js

$(function() {    
	
	// suchergebnisse ausblenden
    $(".menu-search-results").hide();
    $(".search-bar input").focusin(function(){
    	$(this).addClass("search-focus");
    	
    }).focusout(function(){
    	if ($(this).val().length === 0) {
    		$(this).removeClass("search-focus");
    		
    		// suchergebnisse zeigen (just for show)
    		$(".menu-search-results").show(); 
    	}
    });
    
    /* 
     * tree menu
     * 
     */
    
    // set to active state
    $('.tree-menu a').click(function(event) {
    	event.preventDefault();
    	$('.tree-menu li').removeClass('active');  
    	$(this).parent('li').addClass('active');                
    });
    
    
    /*
     * tables
     * 
     */
    
    // prototyping: delete row 
    $("td.table-buttons a.table-delete").click(function(){
    	$(this).closest('tr').remove();
    	
    	correctOrderButtons();
    });    
    
    // prototyping: delete dynamically added row 
    $("table").on('click', 'td.table-buttons a.table-delete', function(){
    	$(this).closest('tr').remove();
    	
    	correctOrderButtons();
    });    
    
    // prototyping: edit dynamically added row 
    $("table").on('click', 'td.table-buttons a.table-edit', function(){
    	$(this).closest('tr').addClass('edit-mode').find('a.table-edit').addClass('disabled');
    });  
    
    // prototyping: add row to table 
    $("a.table-add-row").click(function(){
    	var targetTableObj =  $('table#' + $(this).attr('data-target'));
    	var copyRowObj = targetTableObj.find('tr.copy-row').clone();
    	var addRowObj = copyRowObj.removeClass('copy-row');

    	targetTableObj.find('tbody').append(addRowObj);
    	
    	correctOrderButtons();
    });
    
    // prototyping: check the row-order buttons 
    function correctOrderButtons() {
		$("table tbody tr .table-buttons a.table-order-up, table tr .table-buttons a.table-order-down").removeClass('disabled');
		$("table:has(.table-buttons) tbody tr:first .table-buttons a.table-order-up").addClass('disabled');
		$("table:has(.table-buttons) tbody tr:last .table-buttons a.table-order-down").addClass('disabled');
    }
    
    
    /*
     * demo bar
     * 
     */
    
    //prototyping: demo button 
    $('.demo-mode a.hide-demo').click(function(){
    	$('.demo-mode').hide();
    	
    	setFixedHeader();
    	setContentheight();
    });
    $('.demo-mode a').click(function(event){
    	event.stopPropagation();
    });
    
    
    /*
     * action menu
     * 
     */
    
    // prototyping: hide-symbol 
    $('.action-menu a.action-hide, .action-menu a.action-show').click(function(){
    	$('.action-menu a.action-hide, .action-menu a.action-show').parent('li').toggleClass('collapse');
    });
    
    /*
     * progress bar
     * 
     */
    
    // prototyping: watch if the progressbar modal is opened
    $('#popup-progressbar').on('shown.bs.modal', function (event) {
		    	
    	progressBarDemo = $(this).find('.progress-bar');
    	
    	progressBarDemo.setProgressbarTo(100);
    	
    	if (progressBarDemo.width() == progressBarDemo.parent().width()) {
    		$(this).find('.collapse').show('fast');
    	}

	});
    
	$('form#set-demo-progressbar button').on('click', function(event){
		
		event.preventDefault();
		
		progressBarDemo.setProgressbarTo($('input#progressbar-percent').val());
		
	});
	
	$('.set-demo-progressbar-100').on('click', function(event){
		
		event.preventDefault();
		
		progressBarDemo.setProgressbarTo(100);
		
	});
    
});