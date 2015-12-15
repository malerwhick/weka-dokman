/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 [object Object]
 * Licensed under the MIT license
 */

(function( $ ){
	
    /*
     * Set a State in Percent to a Progress-Bar
     * 
     * percent = int
     * 
     * return none
     * 
     */
    $.fn.setProgressbarTo = function(percent) {
    	
    	var progressBarObj = $(this);
    	var percent = Number(percent);
    	
    	// check if 'progressBarObj' is an object
    	if (progressBarObj.length > 0 && progressBarObj.has('.progress-bar')) {
    		
        	// get the max-percent of the progress-bar
        	var maxPercent = Number(progressBarObj.attr('aria-valuemax'));
        	if (maxPercent > 100) {
        		maxPercent = 100;
        	}
        	var curPercent = Number(progressBarObj.attr('aria-valuenow'));
        	if (curPercent > maxPercent) {
        		curPercent = maxPercent;
        	}
        	
    		console.log('curPercent: ' + curPercent);
    		console.log('maxPercent: ' + maxPercent);
    		
    		// reset, if bar is full 
    		// TODO: kill CSS transition animation
			if (curPercent == maxPercent && percent != 0) {
				$(this).setProgressbarTo(0);
			}
        	
			// get the outer modal box (if)
			var modalBox = progressBarObj.closest('.modal');
			
        	// animate when the curent-state is still smaller than the max-state
    		if (percent != curPercent) {
    		
    			//progressBarObj.addClass('active');
	    		progressBarObj.attr('aria-valuenow', percent).width(percent + '%');
	    		
	    		progressBarObj.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(event) {
	    			
	    	        // code to execute after animation ends
	        		//$(this).removeClass('active');
	        		
	        		// if the progressbar is full, close the modal
	        		if (percent >= maxPercent && modalBox.length > 0) {
	        			modalBox.modal('hide');
	        		}
	        		
	
	            });
    		}
	    	
    	}
    	else {
    		console.error('Element: is not a progress-bar');
    	}

    	return this;
    }; 

    
})( jQuery );

// calculate height for content
function setContentheight() {
	
	var contentHeight = $('html').height();
	var headerHeight = $('header').height();
	var demobarHeight = $('.demo-mode').height();
	var viewerbarHeight = $('.viewer-bar').height();
	
	contentHeight = contentHeight - headerHeight - 110;
	if (demobarHeight) {
		contentHeight = contentHeight - demobarHeight;
	}
	if (viewerbarHeight) {
		contentHeight = contentHeight - viewerbarHeight;
	}
	
	if (contentHeight > 0) {
		$('.auto-content-height').outerHeight(contentHeight);
	}
}

// calculate fixed header
function setFixedHeader() {
	var headerHeight = $('.get-it-fixed').height();
	
    if (headerHeight > 0) {
    	$('.page-container').css('margin-top', headerHeight + 'px');
    }
}

$(function() {

	// viewer menu collapseable 
    $(".viewer .button-collapse").click(function() {
        $(".viewer .col-viewer-menu").toggleClass("open");
    });
        
    
    
    // ### tree-menu ###
    
    $('.tree-menu li').addClass('collapsed');
    $('.tree-menu li:has(>ul)').addClass('has-sub');
    
    // add collapse arrows
    $('.tree-menu li.has-sub > a').append('<span class="icon-closed glyphicon glyphicon-triangle-right"></span><span class="icon-open glyphicon glyphicon-triangle-bottom"></span>');
    
    // first top level is opened
    $('.tree-menu li.has-sub:first').removeClass("collapsed");
    
    // open by click
    $('.tree-menu li.has-sub > a').click(function() {
    	$(this).parent('li').removeClass("collapsed");
    	// todo: toogle?
    	//$(this).parent('li').toggleClass("collapsed");
    });
    
    // close just by click on icon
    $('.tree-menu li.has-sub > a span.icon-open').click(function(event) {
    	event.stopPropagation();
    	$(this).closest('li').addClass('collapsed');
    });
    
    // open + all children
    $('.tree-menu span.icon-collapse-all').click(function(event) {
    	event.preventDefault();
    	
    	// get the current <li> for the collapsible segment
    	var curSegmentHolder = $(this).closest('li');
    	
    	// mark the 'collapse-all' button and all buttons underneath in the tree as active
    	$(this).addClass('active');
    	curSegmentHolder.find('span.icon-collapse-all').addClass('active');
    	
    	// open the current segment
    	curSegmentHolder.removeClass("collapsed");
    	// open all children, that are closed
    	curSegmentHolder.find('li').removeClass("collapsed");
    });
        
    
    
    //### tables ###
    
    // edit table rows
    $('table tr').click(function(event){
    	event.stopPropagation();

    	if ($(this).has('a.table-edit').length) {
    		$(this).addClass('edit-mode').find('a.table-edit').addClass('disabled');
    	}
    });    
    // dont active table edit-mode on every other link
    $('table tr a:not(.table-edit)').click(function(event){
    	event.stopPropagation();
    });    
     
    
    setFixedHeader();
    
    // watch on window resize
    $(window).on('resize', function() {
    	setContentheight();
    }).trigger('resize'); //on page load
    
    
    /* search input field content */
    $(document).on('submit', 'form.search-popup', function(event) {
    	event.preventDefault();
    	    	
    	// get the infos from the form
		var $form = $(this);
		var target = $form.attr('action');
		var submitLine = $form.find("*[submitted=true]").closest('tr').find('input');
		var inputContent = '';
		
    	// close the popup-box
    	$(this).closest('.modal').modal('hide');
		
		jQuery.each( submitLine, function( index  ) {

			if ($(this).val().length !== 0) {
				
				if (index + 1 !== submitLine.length) {
					inputContent += $(this).val() + ', ';
				} 
				else {
					inputContent += $(this).val();
				}
			}
		});

		// fill in input specified in form-action
		$(target).empty().val(inputContent);

		
    });
    
    // add 'clicked' attribute to the button that has submitted the form (helper)
    $("form input[type=submit], form button").click(function() {
        $("input[type=submit], button", $(this).parents("form")).removeAttr("submitted");
        $(this).attr("submitted", "true");
    });
    

});

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