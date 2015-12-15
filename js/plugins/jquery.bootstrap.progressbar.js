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