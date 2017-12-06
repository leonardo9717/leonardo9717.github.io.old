(function($){




	$(document).ready( function() {

	  "use strict";

//------------------------------------------------------------------------
//						INTRO background slideshow
//------------------------------------------------------------------------
		$('#intro').backstretch([
			'images/bg1.jpg',
			'images/bg2.jpg',
			'images/bg3.jpg',
		], {
			fade: 750,
			duration: 4000
		});


//------------------------------------------------------------------------
//						Invoke the Placeholder plugin
//------------------------------------------------------------------------
		$('input, textarea').placeholder();


//------------------------------------------------------------------------
//						Superfish menu
//------------------------------------------------------------------------
		$('.sf-menu').superfish({
			speed: 300,
			speedOut: 300,
			delay: 0,
	        autoArrows: true,
            dropShadows: false,
            animation: {opacity:'show', height:'show'},
		});
		/* prepend menu icon */
        $('#main-menu').prepend('<div id="menu-icon">Menu</div>');
        /* toggle nav */
        $("#menu-icon").on("click", function(){
        	$(".sf-menu").slideToggle();
            $(this).toggleClass("active");
        });


//------------------------------------------------------------------------
//						Menu scroll
//------------------------------------------------------------------------
$(function() {
  $('#main-menu a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      var topMenuHeight = $('#main-menu').outerHeight();
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topMenuHeight +1
        }, 1000);
        return false;
      }
    }
  });
});


//------------------------------------------------------------------------
//						TESTIMONIALS SLIDER SETTINGS
//------------------------------------------------------------------------
    var owl = $("#testimonials-carousel");
    owl.owlCarousel({
        items : 1,
        itemsDesktop : [1400,1],
        itemsDesktopSmall : [1200,1],
        itemsTablet: [900,1],
        itemsMobile : [600,1],
		autoPlay : 4000,
		stopOnHover: true
    });

    $("#client-carousel").owlCarousel({
        items : 5,
        itemsDesktop : [1400,5],
        itemsDesktopSmall : [1200,5],
        itemsTablet: [900,3],
        itemsMobile : [600,2],
		autoPlay : 4000,
		stopOnHover: true
    });

//------------------------------------------------------------------------
//						grid inner class creator
//------------------------------------------------------------------------
  function gridInnerClass() {
    var gridarr = [ '.grid1', '.grid2', '.grid3', '.grid4', '.grid5', '.grid6', '.grid7', '.grid8' ];

    for ( var i = 0, l = gridarr.length; i < l; i++ ) {
      if( $(gridarr[ i ]).length ) {
      
        $(gridarr[ i ]).each(function() {
          if(($(this).find('.col').find('.col-inner').length) == 0) {
            $(this).find('.col').parent().wrapInner( "<div class='grid-inner'></div>");
            $(this).find('.col:odd').addClass( "col-even" );
            $(this).find('.col:even').addClass( "col-odd" );
            $(this).find('.col:last').addClass( "last" );
	        $(this).find('.col').wrapInner( "<div class='col-inner'><div class='innerbg'></div></div>");

	        /* ---- equal height column in row --- */
            //$(this).find('.col').find('.innerbg').responsiveEqualHeightGrid();
          }
        });

      }
    }
  }

  gridInnerClass();  // grid inner class creater

  $( document ).ajaxStop(function() {
    gridInnerClass();  // this will be executed after the ajax call
  });


//------------------------------------------------------------------------
//						column inner class creator
//------------------------------------------------------------------------
  var columnarr = [ '.col-one-half', '.col-one-third', '.col-two-third', '.col-three-fourth', '.col-one-fourth' ];

  for ( var i = 0, l = columnarr.length; i < l; i++ ) {
    if($(columnarr[ i ]).length) {
	  $(columnarr[ i ]).wrapInner( "<div class='col-inner'><div class='innerbg'></div></div>");
    }
  }


//------------------------------------------------------------------------
//						Sticky Header
//------------------------------------------------------------------------
		$('.header-sticky-touch').waypoint(function(direction) {
			var $header = $('#header');

			if (direction == 'down') {
				$header.css( 'top', $( 'body' ).offset().top ).addClass( 'floating' );
			} else if ( direction == 'up' ) {
				$header.css( 'top', '0').removeClass( 'floating' );
			};
		}, { offset: $( 'body' ).offset().top });



//------------------------------------------------------------------------
//						Validate newsletter form
//------------------------------------------------------------------------
		$('<div class="success"></div>').hide().appendTo('.newsletter');
		$('#newsletter-form').validate({
			rules: {
				newsletter_email: { required: true, email: true }
			},
			messages: {
				newsletter_email: {
					required: 'Email address is required',
					email: 'Email address is not valid'
				}
			},
			errorElement: 'div',
			errorPlacement: function(error, element){
				error.appendTo(element.parent());
			},
			submitHandler: function(form) {
				$(form).hide();
				$.post($(form).attr('action'), $(form).serialize(), function(data){
				  $('.newsletter').find('.success').show().html('<i class="fa fa-sign-in"></i> Thank you for subscribing!').animate({opacity: 1});
				});
				return false;
			}
		});


//------------------------------------------------------------------------
//						Filterable Portfolio
//------------------------------------------------------------------------
  $('.portfolio-grid-filter a:first').addClass('active');

    $('.portfolio-grid-filter a').click(function () {

        $('.portfolio-grid-filter').children('a').removeClass('active');
        $(this).addClass('active');

        var category = $(this).attr('data-category');
        $('.portfolio-container').find('.project').removeClass('hide-project');

        if (category !== 'all') {
            $('.portfolio-container').find('.project').each(function () {

                if (!$(this).hasClass(category)) {
                    $(this).addClass('hide-project');
                }

            });
        }
      return false;
    });
    

//------------------------------------------------------------------------
//						Project Clicks with AJAX call
//------------------------------------------------------------------------
    $('.project').click(function (event) {
        event.preventDefault();
        var projectContainer = $('.portfolio-ajax-container').attr('data-container');

        if ($('.portfolio-ajax-container[data-container="' + projectContainer + '"]').hasClass('open-container')) {
            $('.portfolio-ajax-container[data-container="' + projectContainer + '"]').addClass('closed-container');
            $('.portfolio-ajax-container[data-container="' + projectContainer + '"]').removeClass('open-container');
        }

        var fileID = $(this).attr('data-project-file');

        if (fileID !== null) {
            $('html,body').animate({
                scrollTop: $('.portfolio-ajax-container[data-container="' + projectContainer + '"]').offset().top - 99
            }, 500);

        }

        $('.portfolio-ajax-container[data-container="' + projectContainer + '"]').load(fileID + " .project-body", function () {
            $('.portfolio-ajax-container[data-container="' + projectContainer + '"]').addClass('open-container');
            $('.close-project').click(function () {
                $('.portfolio-ajax-container').addClass('closed-container');
                $('.portfolio-ajax-container').removeClass('open-container');
                $('html,body').animate({
                    scrollTop: $('.portfolio-container').offset().top - 99
                }, 500);
                setTimeout(function () {
                    $('.portfolio-ajax-container').html('');
                }, 1000);
            });
            $('.project-slider').flexslider({
                directionNav: false
            });
            $('.portfolio-ajax-container[data-container="' + projectContainer + '"]').removeClass('closed-container');

            $('.close-project').click(function () {
                $('.portfolio-ajax-container[data-container="' + projectContainer + '"]').addClass('closed-container');
                $('.portfolio-ajax-container[data-container="' + projectContainer + '"]').removeClass('open-container');
                $('html,body').animate({
                    scrollTop: $('.portfolio-container[data-container="' + projectContainer + '"]').offset().top - 99
                }, 500);
                setTimeout(function () {
                    $('.portfolio-ajax-container[data-container="' + projectContainer + '"]').html('');
                }, 1000);
            });
        });

    });

//------------------------------------------------------------------------
//						Contact us
//------------------------------------------------------------------------
		$('<div class="success"></div>').hide().appendTo('.contact-form-container');
		$('#contact-form').validate({
			rules: {
				form_email: { required: true, email: true },
				form_msg: { required: true }
			},
			messages: {
				form_email: {
					required: 'Email address is required',
					email: 'Email address is not valid'
				},
				form_msg: {
					required: 'Message is required'
				}
			},
			errorElement: 'div',
			errorPlacement: function(error, element){
				error.appendTo(element.parent());
			},
			submitHandler: function(form) {
				$(form).hide();
				$.post($(form).attr('action'), $(form).serialize(), function(data){
				  $('.contact-form-container').find('.success').show().html('<i class="fa fa-sign-in"></i> Thank you, your enquiry has been sent!').animate({opacity: 1});
				});
				return false;
			}
		});



	});

})(jQuery);