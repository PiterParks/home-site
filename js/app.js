var app = angular.module("myApp",['pascalprecht.translate','ngSanitize']);

var mySwiper;

var host = 'https://www.ifoodschain.com';

app.config(['$translateProvider',
    function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });

        var lang = window.localStorage.getItem("lang")||'cn';
        $translateProvider.preferredLanguage(lang);
        $translateProvider.useSanitizeValueStrategy('escapeParameters');
    }]);

app.controller("myControlller",function ($scope, $translate,$http) {

    /* ip地址请求 */
    $http({
        method: 'GET',
        url:  host + '/officialWebsite/getcountryid'
    }).then(function successCallback(response) {
        // 请求成功执行代码
        // console.log("ip端口请求成功")
        var country = JSON.parse(response.data);
        $scope.country = country.country_id;
        if($scope.country != "cn"){
            $scope.langSelectIndex = 1;
            $translate.use($scope.langs[$scope.langSelectIndex].lang);
            window.localStorage.setItem("lang",$scope.langs[$scope.langSelectIndex].lang);
            $(".disclaimerContianer").show();
            $("body").addClass("showDisclaimer");
            disclaimerLeftSec();
        }

    }, function errorCallback(response) {
        // 请求失败执行代码
        console.log("ip端口请求失败");
        $scope.country = "cn";
    });

    $scope.langs = [{
        name: "English",
        lang: "cn"
    },
        {
            name: "中文",
            lang: "en"
        }];

    var lang = window.localStorage.getItem("lang");

    if( lang == "en"){
        $scope.langSelectIndex = 1;
    }else {
        $scope.langSelectIndex = 0;
    }

    $scope.changeLangSelectIndex = function() {

        if ($scope.langSelectIndex === 0) {
            $scope.langSelectIndex = 1;
            $(".disclaimerBtn").text("confirm").removeClass("disabled");
        } else {
            $scope.langSelectIndex = 0;
            $(".disclaimerBtn").text("已阅读").removeClass("disabled");
        }
        $translate.use($scope.langs[$scope.langSelectIndex].lang);
        window.localStorage.setItem("lang",$scope.langs[$scope.langSelectIndex].lang);
        $("#top-navbar-1").removeClass("in");
    };

    /* 团队成员 */
    $http({
        method: 'GET',
        url: host + '/officialWebsite/webData/type/1'
    }).then(function successCallback(response) {
        // 请求成功执行代码

        $scope.ourTeam= response.data;

        mySwiper = new Swiper ('#swiperTeam', {
            autoplay:5000,
            speed:1000,
            pagination: '.swiper-pagination',
            loop:true,
            observer:true,
            observeParents:true,
            pagination : '.swiper-pagination',
            paginationClickable :true,
            autoplayDisableOnInteraction : false
        })

        /* 页面第一次滚动到团队版块，自动显示第一创始人 */
        var winTop = true;

        $(window).scroll(function () {
            var teamTop = $(".ourTeam-container").offset().top;
            var teamH = $(".ourTeam-container").height();
            var teamScroll = teamTop - teamH;
            if(!winTop){
                return;
            }else {
                winTop = $("html").scrollTop();
            }
            if(winTop > teamScroll - 500 ){
                winTop = false;
                mySwiper.slideTo(0, 1000, false);
                mySwiper.stopAutoplay();
                setTimeout(function () {
                    mySwiper.startAutoplay();
                },7000)
            }
        });

    }, function errorCallback(response) {
        // 请求失败执行代码

        console.log("团队请求失败")
    });

    /* 新闻请求 */
    $http({
        method: 'GET',
        url:   host + '/officialWebsite/webData/type/2?pageSize=6'
    }).then(function successCallback(response) {
        // 请求成功执行代码
        var data = response.data;
        for(var i=0;i<data.length;i++){
            var id = data[i].id;
            var ngsrc = "/active.html#/news-detail/" + id;
            data[i].originalLink = ngsrc;
        }
        $scope.News = data;

    }, function errorCallback(response) {
        // 请求失败执行代码
        console.log("新闻请求失败");
    });


    /* 查看白皮书按钮链接请求 */
    $http({
        method: 'GET',
        url:  host + '/officialWebsite/whitePage'
    }).then(function successCallback(response) {
        // 请求成功执行代码

        $scope.cnWhiteBook = response.data.cUrl;
        $scope.enWhiteBook = response.data.eUrl;
    }, function errorCallback(response) {
        // 请求失败执行代码
        console.log("白皮书请求失败");
    });

    /* 免责条款倒计时*/
    function disclaimerLeftSec() {
        var leftSecond = 10;
        var timer = setInterval(function () {
            leftSecond--;
            $(".disclaimerBtn i").text(leftSecond);
            if(!leftSecond){
                clearInterval(timer);
                if(!$scope.langSelectIndex){
                    $(".disclaimerBtn").text("已阅读").removeClass("disabled");
                }else {
                    $(".disclaimerBtn").text("confirm").removeClass("disabled");
                }

            }
        },1000)
    }

    $scope.whitepaperUadating = function () {
        $("#whitepaperModal").modal();
    }

})