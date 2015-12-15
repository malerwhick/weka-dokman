
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
