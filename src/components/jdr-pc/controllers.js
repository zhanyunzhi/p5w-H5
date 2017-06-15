/**
 * Created by zhan on 2016/4/3.
 */
import '../../lib/js/angular.min.js';                   //引入angular文件
//var angular = require('angular');//引入angular
var appModule = angular.module("ngApp",[]);
appModule.controller("IndexCtrl",
    function($scope, $http){
        //url是相对于我们的html文件的
        $http.get("./data.txt").success(function(data){
            //$scope.datas = data.data;
            //组合所有的记录contents
            $scope.thisYearAllContents = [];
            var i = 0;
            var j = 0;
            //将所有月份的详细数据保存到$scope.thisYearAllContents中
            angular.forEach(data.thisYears,function(thisYear,k){
                angular.forEach(thisYear.contents,function(content,index){
                    $scope.thisYearAllContents[i] = content;
                    $scope.thisYearAllContents[i].sort = j; //给有数据的月份重新编号，第一个有数据的编号0，第二个是1
                    if(index == 0){
                        $scope.thisYearAllContents[i].month = thisYear.month; //每个月的记录的第一条加上月份
                    }
                    i++;
                });
                if(thisYear.contents.length > 0){
                    j++;            //给有数据的月份重新编号，第一个有数据的编号0，第二个是1
                }
            })
            data.thisYearAllContents = $scope.thisYearAllContents;
            //重新将city字段组合
            $scope.citys = '';
            angular.forEach(data.historys,function(history,k){
                angular.forEach(history.contents,function(content){
                    $scope.citys += content.city + ',';
                })
                $scope.citys = $scope.citys.substring(0,$scope.citys.length-1);
                data.historys[k].citys =  $scope.citys;
                $scope.citys = '';
            })
            $scope.datas = data;
            console.log($scope.datas)
        });
        var getHexBackgroundColor = function(property) {
            var rgb = property;
            if($.browser.msie&&$.browser.version>8||$.browser.mozilla||$.browser.webkit)
            {
                rgb=rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                function hex(x)
                {
                    return ("0"+parseInt(x).toString(16)).slice(-2);
                }
                rgb="#"+hex(rgb[1])+hex(rgb[2])+hex(rgb[3]);
            }
            return rgb;
        };
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {           //数据加载完成后执行以下js，否则js执行无效
            //给每个页码绑定跳转的事件
            var eHaveData = $('.have-data');
            var eHaveDataLen = eHaveData.length;
            var eSwiper = '';
            var eSlides = '';
            var eSlidesContents = '';
            var mIndex = '';
            //var showSlide = '';
            //2017活动预告 start
            var swiper1Config = {
                observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                grabCursor: false,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                effect : 'coverflow',
                direction:'vertical',
                slidesPerView: 2,
                initialSlide :1000,
                centeredSlides: true,
                loop:true,
                //loopAdditionalSlides : 0,
                loopedSlides :1000,
                sort: 0,
                coverflow: {
                    rotate: 0,
                    stretch: 150,
                    depth: 80,
                    modifier: 1,
                    slideShadows : false
                },
                onInit: function(swiper){
                    eSwiper = $('.swiper-container1');
                    eSlides = eSwiper.find('.swiper-slide');
                    eSlidesContents = eSwiper.find('.this-year-content');
                    for(var j=0;j<eSlidesContents.length;j++){          //隐藏后面显示一部分的slide的内容
                        eSlidesContents.eq(j).hide();
                    }
                    eSlidesContents.last().show();      //slide默认显示最后一个
                    for(var k=0;k<eSlides.length;k++){      //隐藏后面不显示但是因为透明度导致看得到的slide
                        eSlides.eq(k).css('opacity','1');
                        if(eSlides.length-1-k>=4){        //当前活动页往前数，大于等于4的，隐藏
                            eSlides.eq(k).css('opacity','0');
                        }
                    }
                    eSlides.find('.swiper-slide-content').css('background-color','#dab200');
                    eSwiper.find('.swiper-button-white').css('background-color','#dab200');
                    //console.log(swiper.realIndex)
                },
                onTransitionStart: function(swiper){
                    var eSwiper = $('.swiper-container1');
                    var eSlides = eSwiper.find('.swiper-slide');
                    var eContents = eSwiper.find('.this-year-content');
                    for(var i=0;i<swiper.activeIndex-1;i++){
                        eContents.eq(i).hide();
                    }
                    eContents.eq(swiper.activeIndex).show();
                    for(var k=0;k<eSlides.length;k++){      //隐藏后面不显示但是因为透明度导致看得到的slide
                        eSlides.eq(k).css('opacity','1');
                        if(swiper.activeIndex-k>=4){        //当前活动页往前数，大于等于4的，隐藏
                            eSlides.eq(k).css('opacity','0');
                        }
                    }

                    var sort = swiper.slides.eq(swiper.realIndex).data('sort');
                    if(sort != swiper.sort){        //当前sort和上次的sort不相等，说明切换了月份
                        if(getHexBackgroundColor(eSlides.find('.swiper-slide-content').css('background-color')) == "#dab200"){
                            eSlides.find('.swiper-slide-content').css('background-color','#202f70');        //修改slide背景色
                            eSwiper.find('.swiper-button-white').css('background-color','#202f70');         //修改按钮背景色
                        }else{
                            eSlides.find('.swiper-slide-content').css('background-color','#dab200');
                            eSwiper.find('.swiper-button-white').css('background-color','#dab200');
                        }
                    }
                    swiper.sort = sort;     //记录这次的sort
                    eHaveData.eq(sort).addClass('active').siblings().removeClass('active');
                    eHaveData.eq(sort).siblings().find('p').hide();
                    eHaveData.eq(sort).find('p').show();
                    /*if(getHexBackgroundColor(eSlides.find('.swiper-slide-content').css('background-color')) == "#dab200"){
                        eSlides.find('.swiper-slide-content').css('background-color','#202f70');
                    }else{
                        eSlides.find('.swiper-slide-content').css('background-color','#dab200');
                    }*/
                    //console.log(sort)
                },
                onTouchEnd: function(swiper, translate){
                    /*console.log(swiper.isEnd);
                    console.log(swiper.isBeginning);*/
                },
            };
            var swiper = new Swiper('.swiper-container1', swiper1Config);
            //swiper.disableTouchControl();
            //2017活动预告中class为have-data的获取属性data-index的值与相应的要初始化的swiper的class相同，从而达到批量注册swiper
            eHaveData.last().addClass('active');
            eHaveData.last().find('p').show();
            $('.months').on('click','.have-data',function(){
                $(this).addClass('active').siblings().removeClass('active');
                $(this).siblings().find('p').hide();
                $(this).find('p').show();
                var eSwiper = $('.swiper-container1');
                var eSlides = eSwiper.find('.swiper-slide');
                var eContents = eSwiper.find('.this-year-content');
                var activeSlideIndex = eSlides.filter('.data-month'+$(this).data('index')).data("index");
                //console.log($('.data-month'+$(this).data('index')).data("index"))
                //console.log($(this).data('index'))
                if(getHexBackgroundColor(eSlides.find('.swiper-slide-content').css('background-color')) == "#dab200"){
                    eSlides.find('.swiper-slide-content').css('background-color','#202f70');
                    eSwiper.find('.swiper-button-white').css('background-color','#202f70');
                }else{
                    eSlides.find('.swiper-slide-content').css('background-color','#dab200');
                    eSwiper.find('.swiper-button-white').css('background-color','#dab200');
                }
                if(activeSlideIndex == 0){
                    activeSlideIndex += eSlides.length / 3;
                    /*console.log(eSlides.length)
                    console.log(swiper.activeIndex)
                    console.log(swiper.realIndex)*/
                }
                swiper.slideTo(activeSlideIndex,100,false)
                for(var i=0;i<activeSlideIndex-1;i++){
                    eContents.eq(i).hide();
                }
                eContents.eq(activeSlideIndex).show();
                for(var k=0;k<eSlides.length;k++){      //隐藏后面不显示但是因为透明度导致看得到的slide
                    eSlides.eq(k).css('opacity','1');
                    if(activeSlideIndex-k>=4){        //当前活动页往前数，大于等于4的，隐藏
                        eSlides.eq(k).css('opacity','0');
                    }
                }
                /*console.log($scope.datas.thisYears[3])
                $scope.datas.thisYears = $scope.datas.thisYears[3];
                console.log($scope.datas)
                swiper.update()*/
            })
            //2017活动预告 end

        });
        function getTransforms(translate3d){
            return {
                '-webkit-transform': translate3d,
                '-moz-transform': translate3d,
                '-ms-transform':translate3d,
                'transform': translate3d
            };
        }
        $scope.$on('ngRepeatFinishedHistory', function (ngRepeatFinishedHistoryEvent) {           //数据加载完成后执行以下js，否则js执行无效
            //历史活动 start
            var swiper2 = new Swiper('.swiper-container2', {
                observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                grabCursor: false,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                onTransitionStart: function(swiper) {
                    var year = 2016 - swiper.activeIndex;
                    $('.yellow-river').eq(0).removeClass().addClass('yellow-river river'+year);
                    $('.yellow-river').eq(0).css('clip','');
                    //$('.yellow-river').eq(0).addClass('river2016');
                }
            });
            $('#qj').fullpage({
                continuousVertical: false,
                verticalCentered: true,
                scrollOverflow:true,
                onLeave:function(index, nextIndex, direction){
                    var winH = $('.fp-section').last().height();
                    if(index == 1){
                        var translate3d = 'translate3d(0px,-'+(winH*0.2)+'px, 0px)';
                        $('#bg').css(getTransforms(translate3d));           //city的父标签位移
                    }
                    if(index == 2){
                        var translate3d = 'translate3d(0px,0px, 0px)';
                        $('#bg').css(getTransforms(translate3d));           //city的父标签位移
                    }
                },
                afterLoad:function(abchorLink, index){
                    if(index == 1){
                        $('.yellow-river').eq(0).removeClass().addClass('yellow-river');
                    }
                    if(index == 2){
                        $('.yellow-river').eq(0).addClass('river2016');
                        var winH = $('.fp-section').last().height();
                        var translate3d = 'translate3d(0px,-'+(winH*0.2)+'px, 0px)';
                        $('#bg').css(getTransforms(translate3d));           //city的父标签位移
                    }
                    swiper2.slideTo(0, 10, false);
                },
                afterRender:function(){
                    //页面滚动条
                    var winH = $('.fp-section').last().height();
                    var scrollH = $('.slimScrollBar').last().height();
                    var imgH = $('.yellow-river').height()-220;
                    var canScrollH = winH - scrollH;        //页面可滚动距离
                    var oneForHow = Math.ceil(imgH / canScrollH);       //每滚动一像素对应多长的河流
                    var slimScrollBarT = 0;            //滚动的距离
                    //slimScrollBarT = parseInt($('.slimScrollBar').last().css('top'));

                    $('.fp-scrollable').slimScroll({
                        allowPageScroll: true,
                        height: winH + 'px',
                        size: '10px',
                        alwaysVisible: true,
                        wheelStep : 1,
                    });
                    //滚动的时候处理
                    $('.fp-scrollable').scroll( function() {
                        slimScrollBarT = $('.slimScrollBar').last().position().top;
                        $('.yellow-river').eq(0).css('clip','rect(0px 895px '+ (220 + slimScrollBarT * oneForHow) + 'px 0px)');
                        if((220 + slimScrollBarT * oneForHow) >= 220 && (220 + slimScrollBarT * oneForHow) < 320){          //2016
                            swiper2.slideTo(0, 500, false);
                        }
                        if((220 + slimScrollBarT * oneForHow) >= 320 && (220 + slimScrollBarT * oneForHow) < 390){       //2015
                            swiper2.slideTo(1, 500, false);
                        }
                        if((220 + slimScrollBarT * oneForHow) >= 390 && (220 + slimScrollBarT * oneForHow) < 490){       //2014
                            swiper2.slideTo(2, 500, false);
                        }
                        if((220 + slimScrollBarT * oneForHow) >= 490 && (220 + slimScrollBarT * oneForHow) < 530){       //2013
                            swiper2.slideTo(3, 500, false);
                        }
                        if((220 + slimScrollBarT * oneForHow) >= 530 && (220 + slimScrollBarT * oneForHow) < 680){       //2012
                            swiper2.slideTo(4, 500, false);
                        }
                        if((220 + slimScrollBarT * oneForHow) >= 680 && (220 + slimScrollBarT * oneForHow) < 740){       //2011
                            swiper2.slideTo(5, 500, false);
                        }
                        if((220 + slimScrollBarT * oneForHow) >= 740 && (220 + slimScrollBarT * oneForHow) < 800){       //2010
                            swiper2.slideTo(6, 500, false);
                        }
                        if((220 + slimScrollBarT * oneForHow) >= 800 && (220 + slimScrollBarT * oneForHow) < 920){       //2009
                            swiper2.slideTo(7, 500, false);
                        }
                        if((220 + slimScrollBarT * oneForHow) >= 920 && (220 + slimScrollBarT * oneForHow) < 1212){       //2008
                            swiper2.slideTo(8, 500, false);
                        }
                    });
                }
            });

            var eHistorySwipers = $("[data-history-swiper]");
            var eHistorySwipersLen = eHistorySwipers.length;
            if(eHistorySwipersLen > 0){
                var swiper = [];
                var swiperTex = '';
                var paginationTex = '';
                for(var i=0;i<eHistorySwipersLen; i++){
                    swiperTex = eHistorySwipers.eq(i).data('history-swiper');
                    swiper[i] = swiperTex;
                    paginationTex = eHistorySwipers.eq(i).data('history-pagination');
                    swiper[i] = new Swiper('.'+swiperTex, {
                        observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
                        observeParents:true,//修改swiper的父元素时，自动初始化swiper
                        grabCursor: false,
                        pagination: '.'+paginationTex,
                        paginationType : 'custom',
                        paginationClickable: true,
                    });
                    var paginationLen = $('.'+paginationTex).find("li").length;     //city的个数
                    var paginationWidth = 100/7*paginationLen;                      //city的父标签的宽度，一般显示7个city
                    $('.'+paginationTex).width(paginationWidth+'%');
                    $('.'+paginationTex).find("li").width(100/paginationLen+'%');   //city的宽度
                    $('.'+paginationTex).find("span").css('left',$('.'+paginationTex).width()/2+'px');   //city的宽度

                    $('.'+paginationTex).on('click','li', {swiper:swiper[i]},function(event){
                        var index = $(this).data('index');
                        var city = $(this).find('span').eq(0).html();
                        //var day = $(this).find('span').eq(1).html();
                        var liWidth = $(this).parent().find('li').eq(0).width();
                        //$(this).find('span').eq(1).hide();
                        //$(this).siblings().find('span').eq(1).show();
                        //console.log($(this).siblings())
                        $(this).parent().prev("span").find('span').eq(0).html(city);
                        //$(this).parent().prev("span").find('span').eq(1).html(day);
                        var translateWidth = liWidth;
                        if(index-event.data.swiper.activeIndex<=0){
                            translateWidth = -(liWidth * index);
                        } else {
                            translateWidth = -(liWidth * index);
                        }
                        var translate3d = 'translate3d('+translateWidth+'px, 0px, 0px)';
                        $(this).parent().css(getTransforms(translate3d));           //city的父标签位移
                        event.data.swiper.slideTo(index, 500, false);//切换到指定slide，速度为1秒
                    })
                }
            }



        })
    }
);
appModule.filter(
    'toTrusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]
);
appModule.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});
appModule.directive('onFinishRenderFiltersHistory', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinishedHistory');
                });
            }
        }
    };
});
/*appModule.directive('hello', function() {
    return {
        restrict: 'E',
        template: '<div>Hi there <span ng-transclude></span></div>',
        replace: true,
        transclude: true
    };
});*/
