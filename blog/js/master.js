$(document).ready(function() {
	
	$('.section').hide();
    
    $logoContainer = $('h1#logo');
	$logo = $('h1#logo img:first').hide().css({ top: '-357px' }).show();
	$shadow = $('#logo span').css({ opacity: 0, bottom: '-30px' });
	
	// silly ie and it's hating on opacity with transparent pngs
	if(!$.support.opacity) {
	    $shadow.find('img').attr('src', '/css/images/logo-shadow-ie.png');
	}
	
	$links = $('#nav a').css({ opacity: 0, 'padding-top': '60px' });
	$currentSection = $('#home');
	$footer = $('#footer').hide();
	
	$('h1#logo a').click(function() {
	    if($currentSection.get(0) != $('#home').get(0)) {
    	    var $section = $('.current:first').stop().animate({ 'padding-top': '0', opacity: 1 }, 300).removeClass('current');
    	    $footer.fadeOut(500);
            $($section.find('a').attr('href')).fadeOut(300, function() {
                $currentSection = $('#home').fadeIn(500);
        	    $footer.fadeIn(500);
            });
            $logoContainer.animate({ marginTop: '0', width: '708px', height: '257px' }, 1000, 'easeOutBack');
	    }
	});

	$(window).load(function() {
    	setTimeout(function() {
        	$shadow.animate({ opacity: 1, bottom: 0 }, 700, 'easeOutBounce');
        	$logo.animate({ top: 0 }, 700, 'easeOutBounce', function() {
        	    $(this).css({ position: 'static' });
        	    
        	    function fadeLink(n) {
        	        if(n == $links.length) { 
        	            clearInterval(linkInterval);

                        $('#nav a').hover(function() {
                            $(this).stop().animate({ 
                    			paddingTop: '10px', 
                    			paddingBottom: '20px',
                    			'color': '#C82620',
                    			'opacity': 1
                    		}, 200, 'easeOutSine');
                        }, function() {
                            $(this).stop().animate({ 
                    			paddingTop: '20px', 
                    			paddingBottom: '10px',
                    			'color': '#277000',
                    			'opacity': 1
                    		}, 500, 'easeOutBounce');
                        }).click(function(event) {
                            $('.current:first').stop().animate({ 'padding-top': '0', opacity: 1 }, 300).removeClass('current');
                            $this = $(this);
                            $this.parent().animate({ 'padding-top': '30px', opacity: 0 }, 300, function() {
                                $this.parent().addClass('current');
                            });

                            $logoContainer.animate({ marginTop: '-90px', width: '354px', height: '170px' }, 1000, 'easeOutBack');

                    	    $footer.fadeOut(500);
                	        $currentSection.fadeOut(500, function() {
                    	        $currentSection = $($this.attr('href')).fadeIn(500);
                    	        $footer.fadeIn(500);
                    	    });
                    	    
                    	    if(pageTracker) {
                        	    pageTracker._trackPageview('/' + $this.attr('href').replace('#', ''));
                    	    }
                    	});

        	    	    if(window.location.hash && window.location.hash !== '#home') {
                	        $('a[href=' + window.location.hash + ']').trigger('click');
                	    } else {
                	        $currentSection.fadeIn(1500);
                	        $footer.fadeIn(1500);
                	    }
                        return; 
        	        }
            	    $($links.get(n)).animate({ paddingTop: '20px', opacity: 1 }, 700, 'easeOutBounce');
        	    }
        	    
        	    var i = 0;
        	    fadeLink(i);
        	    var linkInterval = setInterval(function() {
            	    i++;
            	    fadeLink(i);
        	    }, 300);
        	});
    	}, 200);
	});
	
	var $contact = $('#contact form');
	$contact.submit(function(event) {
	    event.preventDefault();
	    event.stopPropagation();
	    
	    $('p.error').remove();
	    $('.error').removeClass('error');

	    $.ajax({
	        type: 'post',
	        url: $contact.attr('action').replace('#contact', ''),
	        data: $contact.serialize(),
	        dataType: 'json',
	        success: function(data, status) {
	            if(!data) {
	                $contact.slideUp('1000', function() {
	                    $(this).after('<p class="success">Thanks for contacting us. You will hear from us as soon as superhumanly possible.</p>').next('.success').hide().slideDown('500');
	                });
	            } else {
	                $(data['bad']).each(function() {
	                    $('#' + this).addClass('error').after('<p class="error">Your ' + this + ' appears to contain malicious code fragments. Please double check and try again.').prev('label').addClass('error');
	                });
	                $(data['empty']).each(function() {
	                    $('#' + this).addClass('error').after('<p class="error">Please enter your ' + this + '.').prev('label').addClass('error');
	                });
	                $(data['invalid']).each(function() {
	                    $('#' + this).addClass('error').after('<p class="error">Your ' + this + ' was invalid. Please correct it and try again.').prev('label').addClass('error');
	                });
	            }
	        }
	    });
	   
	});
	
	/**
     * Open links to other sites in the #content section in a new window
     */
    (function() {
        var a = new RegExp('/' + window.location.host + '/');
        $('a').each(function() {
            if(!a.test(this.href)) {
                $(this).click(function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    window.open(this.href, 'newSauceWindow');
                });
            }
        });
    })();
	
});