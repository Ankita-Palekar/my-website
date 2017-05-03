/*

	0. PAGE PRELOADER
	1. HEADER
	2. NAVIGATION
	4. WORK
	5. BLOG
	6. TOGGLE BOX (SHORTCODES)
	7. SKILLBAR (SHORTCODES)
    8. TAB CONTENT (SHORTCODES)
	9. ALERT BOX (SHORTCODES)
	10. CLEAR INPUNT

*/

(function ($) {

    'use strict';
	
	
    /* --------------------------------------------------------------------- */
    /* 0. PAGE PRELOADER
    /* --------------------------------------------------------------------- */

    var windowheight    = $(window).height();
    var windowWidth     = $(window).width();

    $(window).resize(function(){
        windowheight    = $(window).height();
        windowWidth     = $(window).width();
    });


	$(window).load(function(){
		$("#page-preloader").fadeOut(300);
	});
	
	
	

    /* --------------------------------------------------------------------- */
    /* 1. HEADER
    /* --------------------------------------------------------------------- */

    var navistatus = 0;

    $("#open-nav").click(function(){
        if(navistatus==0)
        {
            $("#header").clearQueue().animate({
                left: '0'
            },500,'swing');
            $("#page-wrapper").clearQueue().animate({
                left: '260px'
            },500,'swing');

            navistatus = 1;
        } else {
            $("#page-wrapper").clearQueue().animate({
                left: '0'
            },600,'easeOutBounce');
            $("#header").clearQueue().animate({
                left: '-260px'
            },600,'easeOutBounce');

            navistatus = 0;
        }
    });


    $(".scrollto").click(function(){
        var topoffset = 0;
        $('html, body').clearQueue().animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - topoffset
        }, 1800,'swing');
        return false;
    });




    /* --------------------------------------------------------------------- */
    /* 2. NAVIGATION
    /* --------------------------------------------------------------------- */

    $("#main-navigation li a").click(function(){
        var topoffset = 0;
        $('html, body').clearQueue().animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - topoffset
        }, 1800,'swing');
        return false;
    });
	

    var mainNav = $("#main-navigation"),
        mainItems = mainNav.find("a"),
        scrollTo = mainItems.map(function(){
            var item = $( $( this ).attr( "href" ) );
            if (item.length) { return item; }
        });

    $( window ).scroll( function () {

        var mainHeight = mainNav.height();
        var offsetTop = $( this ).scrollTop() + mainHeight + 200;

        var current = scrollTo.map( function() {
            if( $( this ).offset().top < offsetTop )
                return this;
        } );

        if( current.length ) {
            current = current[ current.length -1 ];
            var id = current.attr( "id" );

        } else {
            var id = "";
        }

        mainItems
            .removeClass( "active" )
            .filter( "[href=#"+id+"]" )
            .addClass( "active" );
    });




    /* --------------------------------------------------------------------- */
    /* 3. BANNER
    /* --------------------------------------------------------------------- */

	function sizeBanner()
	{
		var windowHeight = $(window).height();
		$("#banner").css("height",windowHeight+"px");
	}
	$(window).resize(function(){
		sizeBanner()
	});




    /* --------------------------------------------------------------------- */
    /* 4. WORK
    /* --------------------------------------------------------------------- */

    var workWrapper = $("#work-wrapper");
    var workLoader  = $("#work-loader");
    var workContent = $("#load-work-content");

   	$("#close-work-wrapper").click(function(){
        workWrapper.slideUp(1000);
        $(".work-article").fadeOut(800);
   	});

    function doafterloadwork()
    {
        var workArticle = $(".work-article");

        workLoader.css("display","none");
        workWrapper.children(".close").fadeIn(800);
        workArticle.css("minHeight",windowheight+"px");
        workArticle.fadeIn(1000);
        workWrapper.css("height","auto");

        /* === FUNCTION TO DO AFTER LOADED THE WORK DETAILS === */

        $('.work-slider').bxSlider({
            slideWidth: 1600,
            minSlides: 1,
            maxSlides: 1,
			video: true
        });
    }

    $(document).on('click', '#work-preview li a', function(){

        var folder  = 'work/',
            hash    = $(this).attr('data-work-link'),
            url     = hash.replace(/[#\#]/g, '' );

        if(workWrapper.is(":hidden"))
        {
            workWrapper.children(".close").hide();
            workLoader.css("display","block");
            workContent.html("");
            workWrapper.css("height",windowheight+"px");
            workWrapper.slideDown(1000);

            $('html, body').clearQueue().animate({
                scrollTop: workWrapper.offset().top
            },1400,function(){

                workContent.load(folder+url, function(){
                    doafterloadwork();
                });
            });
        } else {
            var getwrapperheight = workWrapper.height();
            workWrapper.css("height",getwrapperheight+"px");
            workWrapper.children(".close").fadeOut(800);
            $(".work-article").fadeOut(800);
            workLoader.delay(850).fadeIn();

            $('html, body').clearQueue().animate({
                scrollTop: workWrapper.offset().top
            },1800,function(){

                workContent.load(folder+url, function(){
                    doafterloadwork();
                });
            });
        }
    });



    /* === START MIXITUP PLUGIN === */

    var pfPreview = $( '#work-preview' );
    var pfTabs = $( '.work-tabs' );
    var pfMixed = 0;

    function startmixitup()
    {
        if ( pfTabs.length ) {
            var active = pfTabs.find( 'li.active' ).data( 'filter' );


            if ( pfPreview.length > 0 ) {
                if( pfMixed == 0) {
                    pfMixed = 1;
                    pfPreview.mixitup( {
                        targetSelector: '.mix',
                        filterSelector: '.filter',
                        showOnLoad  : active
                    } );
                } else {
                    pfPreview.mixitup( 'remix', active );
                }
            }
        }
    }

    startmixitup();



    /* === LOAD MORE WORK === */

    var loadMoreWork = 1;
    var loadingPortImg = $(".work-button .button img");

    function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }


    $( "#work-load-more a" ).click( function( e ) {

        loadingPortImg.fadeIn(300);
        e.preventDefault();

        var active = $('.work-tabs > li.active' ).data( 'filter' );
        var load = pad( loadMoreWork, 2 );

		var protocol = $(location).attr('protocol');

		if( protocol == 'file:') {
			alert('"The Buttons "Load More" not working if you open the index.html by double click and have a URL like file://../../index.html\n\nRun it on your localhost or online server and it will work.\n\nReason:\nBrowsers implement strong security measures to prevent downloaded web pages from accessing arbitrary files on the file system.');
		}

        $.get('work/load-more-' + load + '.html', function(data){

            $(data).appendTo("#work-preview");

            $( '#work-preview > li' ).each( function() { $(this).hoverdir(); } );

            startmixitup();

        }).done(function(){
            loadingPortImg.fadeOut(300);
        });

        loadMoreWork = loadMoreWork + 1;
        load = pad( loadMoreWork, 2 );

        $.get( 'work/load-more-' + load + '.html' ).fail(function() {
            $( "#work-load-more" ).hide();
        });
    } );


    /* --------------------------------------------------------------------- */
    /* 5. BLOG
    /* --------------------------------------------------------------------- */

    var minWidth    = 965;

    function setBlog()
    {
        if(windowWidth < minWidth)
        {
           $("#blog-preview li .layer").css({
                top: '25%',
                left: '0',
                width: '100%',
                opacity: '1'
           });
        } else {
        $("#blog-preview li .layer").css({
            top: '40%',
            left: '-50%',
            width: '50%',
            opacity: '0'
        });
        }
    }

    setBlog();
    $(window).resize(function(){
        setBlog();
    });


    var blog            = $('#blog');
    var blogWrapper     = $("#blog-wrapper");
    var closeWrapper    = $("#close-blog-wrapper");
    var blogLoader      = $("#blog-loader");
    var loadBlogContent = $("#load-blog-content");


    blog.on( 'mouseenter', "#blog-preview li", function(){
        if(windowWidth > minWidth)
        {
            $(this).children(".layer").clearQueue().animate({
                left: '0',
                opacity: '1'
            },400);
        }
    });

    blog.on( 'mouseleave', "#blog-preview li", function(){
		if(windowWidth > minWidth)
		{
			$(this).children(".layer").clearQueue().animate({
				left: '-50%',
				opacity: '0'
			},400);
		}
	});



    /* === LOAD BLOG DETAILS === */

    closeWrapper.click(function(){
        blogWrapper.slideUp(1000);
        $(".blog-article").fadeOut(800);
    });

    function doafterloadblog()
    {
        var blogArticle = $(".blog-article");

        blogLoader.css("display","none");
        blogWrapper.children(".close").fadeIn(800);
        blogArticle.css("minHeight",windowheight+"px");
        blogArticle.fadeIn(1000);
        blogWrapper.css("height","auto");

        /* === FUNCTION TO DO AFTER LOADED THE WORK DETAILS === */

        $('.blog-slider').bxSlider({
            slideWidth: 1600,
            minSlides: 1,
            maxSlides: 1,
			video: true
        });
    }

    blog.on( 'click' , "#blog-preview li a", function(){

        var folder  = 'blog/',
            hash    = $(this).attr('data-blog-link'),
            url     = hash.replace(/[#\#]/g, '' );

        if(blogWrapper.is(":hidden"))
        {
            blogWrapper.children(".close").hide();
            blogLoader.css("display","block");
            loadBlogContent.html("");
            blogWrapper.css("height",windowheight+"px");
            blogWrapper.slideDown(1000);

            $('html, body').clearQueue().animate({
                scrollTop: blogWrapper.offset().top
            },1400,function(){

                loadBlogContent.load(folder+url, function(){
                    doafterloadblog();
                });
            });
        } else {
            var getwrapperheight = blogWrapper.height();
            blogWrapper.css("height",getwrapperheight+"px");
            blogWrapper.children(".close").fadeOut(800);
            $(".blog-article").fadeOut(800);
            blogLoader.delay(850).fadeIn();

            $('html, body').clearQueue().animate({
                scrollTop: blogWrapper.offset().top
            },1800,function(){

                loadBlogContent.load(folder+url, function(){
                    doafterloadblog();
                });
            });
        }
    });

	var loadMoreBlog = 1;
    var loadingBlogImg = $(".blog-button .button img");


	$( "#blog-load-more a" ).click( function( e ) {

        loadingBlogImg.fadeIn(300);
		e.preventDefault();

		var load = pad( loadMoreBlog, 2 );

		var protocol = $(location).attr('protocol');

		if( protocol == 'file:') {
			alert('"The Buttons "Load More" not working if you open the index.html by double click and have a URL like file://../../index.html\n\nRun it on your localhost or online server and it will work.\n\nReason:\nBrowsers implement strong security measures to prevent downloaded web pages from accessing arbitrary files on the file system.');
		}


		$.get('blog/load-more-' + load + '.html', function(data){
			$(data).appendTo( "#blog-preview" );
			setBlog();
		}).done(function(){
            loadingBlogImg.fadeOut(300);
        });

		loadMoreBlog = loadMoreBlog + 1;
		load = pad( loadMoreBlog, 2 );

		$.get( 'blog/load-more-' + load + '.html' ).fail(function() {
			$( "#blog-load-more" ).hide();
		});
	} );



    /* --------------------------------------------------------------------- */
    /* 6. TOGGLE BOX (SHORTCODES)
    /* --------------------------------------------------------------------- */
	
	$(".toggle-box .toggle .header").click(function(){
		if($(this).parent(".toggle").children(".content").is(":hidden"))
		{
            $(this).addClass("active");
			$(this).parent(".toggle").children(".content").slideDown();
			$(this).parent(".toggle").children(".header").children(".plus").css({ display: 'none' });
			$(this).parent(".toggle").children(".header").children(".minus").css({ display: 'inline-block' });
		} else {
            $(this).removeClass("active");
			$(this).parent(".toggle").children(".content").slideUp();
			$(this).parent(".toggle").children(".header").children(".plus").css({ display: 'inline-block' });
			$(this).parent(".toggle").children(".header").children(".minus").css({ display: 'none' });
		}
	});
	
	
	
	
    /* --------------------------------------------------------------------- */
    /* 7. SKILLBAR (SHORTCODES)
    /* --------------------------------------------------------------------- */
	
	$(".skillbar").each(function(){
		var percent = $(this).attr("data-percent");
		$(this).children(".percent-bg").css("width",percent+"%");
	});




    /* --------------------------------------------------------------------- */
    /* 8. TAB CONTENT (SHORTCODES)
     /* --------------------------------------------------------------------- */

    $(".tab-content-navi").each(function(){
        var link = $(this).children("li:first-child").children("a");
        var contentId = link.attr("data-open-content");
        $("#"+contentId).css("display","block");
        link.addClass("active");
    });

    $(".tab-content-navi li a").click(function(){
        var contentId = $(this).attr("data-open-content");

        if($("#"+contentId).is(":hidden"))
        {
            var list = $(this).parent("li").parent("ul");
            list.children("li").each(function(){
                $(this).children("a").removeClass("active");
                var contentId = $(this).children("a").attr("data-open-content");
                $("#"+contentId).css("display","none");
            });
            $("#"+contentId).fadeIn(400);
            $(this).addClass("active");
        }
    });
	
	
	
	
    /* --------------------------------------------------------------------- */
    /* 9. ALERT BOX
    /* --------------------------------------------------------------------- */
	
	$(".alert-box .close").click(function(){
		$(this).parent(".alert-box ").fadeOut(350);
	});




    /* --------------------------------------------------------------------- */
    /* 10. CLEAR INPUNT
    /* --------------------------------------------------------------------- */

    var defaultvalue;
    $(".cleartext").focusin(function() {
        defaultvalue = this.defaultValue;
        if(this.value == this.defaultValue) {
            this.value = '';
        }
    }).focusout(function(){
        if($(this).val() == '')
        {
            this.value = defaultvalue;
        }
    });


})(jQuery);

