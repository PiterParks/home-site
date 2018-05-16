
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {
	
	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), 30);
		$("#top-navbar-1").removeClass("in");
	});
	// toggle "navbar-no-bg" class
	$('.top-content .text').waypoint(function() {
		$('nav').toggleClass('navbar-no-bg');
	},{ offset: 0});
	
    /*
        Background slideshow
    */
    // $('.top-content').backstretch("img/backgrounds/newbannerBg2.jpg");

    var loadImg = new Image();
    loadImg.src = 'img/backgrounds/newbannerBg2.jpg';
    loadImg.onload = function(){
        // 加载完成
        $(".loader").fadeOut("fast");
    }

    $('.solution-container').backstretch("img/backgrounds/pork.jpg");
    
    /*
        Wow
    */
    new WOW().init();


    /*
        btm animation
    */
    $(".vision-container .features-box-icon").hover(
        function () {
            $(this).addClass("swing");
        },
        function () {
            $(this).removeClass("swing");
        }
    );
    $(".activityEnterBtn").hover(
        function () {
            $(this).addClass("shake");
        },
        function () {
            $(this).removeClass("shake");
        }
    );

    /* video play*/
    var swiperVideo = new Swiper ('#swiperVideo', {
        autoplay:5000,
        speed:1000,
        loop:true,
        pagination: '.swiper-pagination',
        paginationClickable :true,
        autoplayDisableOnInteraction : false,
        onSlideChangeEnd: function(){
            $("video").each(function (i) {
                var that = $("video").eq(i);
                that[0].pause();
            })
        }
    })
    //鼠标覆盖停止自动切换
    swiperVideo.container[0].onmouseover=function(){
        swiperVideo.stopAutoplay();
    }
    //鼠标移出开始自动切换
    swiperVideo.container[0].onmouseout=function(){
        swiperVideo.startAutoplay();
    }

    $(".startPlay").each(function(i){
        var that = $(".startPlay").eq(i);
        that.on("click",function () {
            that.parent().hide();
            var videos = that.parents(".videoItem").find("video");
            videos[0].play();
            swiperVideo.stopAutoplay();
        })
    })

    /* 页面滚动到视频版块自动显示官方宣传片*/
    var videoTop = true;
    $(window).scroll(function () {
        var teamTop = $(".video-container").offset().top;
        var teamH = $(".video-container").height();
        var teamScroll = teamTop - teamH;
        if(!videoTop){
            return;
        }else {
            videoTop = $("html").scrollTop();
        }
        if(videoTop > teamScroll - 500 ){
            videoTop = false;
            swiperVideo.slideTo(1, 1000, false);
        }

    });

    /*  已阅读按钮事件 */
    $(".disclaimerBtn").on("click",function () {
        $(".navbar").addClass("showDisclaimer");
        $(".disclaimerBox").removeClass("wow bounceIn");
        $("body").removeClass("showDisclaimer");
        $(".top-disclaimer").show();
        $(".disclaimerContianer").addClass("wow bounceOutUp");
    })

    /* 关闭免责条款*/
    $(".closeTopDisclaimer").on("click",function () {
        $(".top-disclaimer").hide();
        $(".navbar").removeClass("showDisclaimer");
    })

    $(".disclaimerBox").addClass("wow bounceIn");
});

function showDis() {
    $(".disclaimerContianer").removeClass("wow bounceOutUp");
    $("body").addClass("showDisclaimer");
    $(".disclaimerBox").addClass("wow bounceIn");
}


jQuery(window).load(function() {

});

