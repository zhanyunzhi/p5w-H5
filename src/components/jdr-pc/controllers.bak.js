﻿/**
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
        });
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {           //数据加载完成后执行以下js，否则js执行无效
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
                initialSlide :100,
                centeredSlides: true,
                coverflow: {
                    rotate: 0,
                    stretch: 150,
                    depth: 80,
                    modifier: 1,
                    slideShadows : false
                },
                onInit: function(swiper){
                    var eHaveData = $('.have-data');
                    var eSwiper = $('.'+eHaveData.eq(0).data('index'));
                    var eSlides = eSwiper.find('.swiper-slide');
                    var eSlidesContents = eSwiper.find('.this-year-content');
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
                    /*console.log(swiper.isEnd);
                    console.log(swiper.activeIndex);*/
                },
                onTransitionStart: function(swiper){
                    var swiperTxt = $('.months .active').data('index');
                    var eSlides = $('.' + swiperTxt).find('.swiper-slide');
                    var eContents = $('.' + swiperTxt).find('.this-year-content');
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
                },
                onTouchEnd: function(swiper, translate){
                    /*console.log(swiper.isEnd);
                    console.log(swiper.isBeginning);*/
                },
            };
            //2017活动预告中class为have-data的获取属性data-index的值与相应的要初始化的swiper的class相同，从而达到批量注册swiper
            var eHaveData = $('.have-data');
            var eHaveDataLen = eHaveData.length;
            if(eHaveDataLen > 0){
                var swiper = [];
                var swiperTex = '';
                for(var i=0;i<eHaveDataLen; i++){
                    swiperTex = eHaveData.eq(i).data('index');
                    swiper[i] = swiperTex;
                    $('.'+swiperTex).hide();
                    swiper[i] = new Swiper('.'+swiperTex, swiper1Config);
                }
                $('.'+eHaveData.eq(0).data('index')).show();
                eHaveData.eq(0).addClass('active');
                $('.my-button-left').on('click', function(e) {
                    var flag = 0;
                    var eSwipers = '';
                    var eSlides = '';
                    var eSlidesContents = '';
                    for(var k=0; k<eHaveDataLen; k++){
                        $('.' + eHaveData.eq(k).data('index')).hide();            //滑到第一页的时候，隐藏所有
                        if(eHaveData.eq(k).hasClass('active')){                 //在显示当前页的上一页，达到切换的目的
                            flag = k-1;
                        }
                    }
                    if(flag < 0) {
                        flag = eHaveDataLen-1;
                    }
                    eHaveData.eq(flag).addClass('active').siblings().removeClass('active');
                    $('.' + eHaveData.eq(flag).data('index')).fadeIn();
                    //隐藏相关slide
                    eSwipers =  $('.' + eHaveData.eq(flag).data('index'));
                    eSlides =  eSwipers.find('.swiper-slide');
                    eSlidesContents = eSwipers.find('.this-year-content');
                    for(var j=0;j<eSlidesContents.length;j++){          //隐藏后面显示一部分的slide的内容
                        if(swiper[flag].activeIndex > 0) {
                            eSlidesContents.eq(j).hide();
                        }
                    }

                    if(swiper[flag].activeIndex == 100){
                        swiper[flag].activeIndex = eSlides.length - 1;
                    }
                    eSlidesContents.eq(swiper[flag].activeIndex).show();      //slide默认显示最后一个
                    for(var k=0;k<eSlides.length;k++){      //隐藏后面不显示但是因为透明度导致看得到的slide
                        //if(swiper[flag].activeIndex > 0){
                        eSlides.eq(k).css('opacity','0');
                        if(swiper[flag].activeIndex-k<4){
                            eSlides.eq(k).css('opacity','1');
                        }
                        //}
                    }

                })

                $('.my-button-right').on('click', function(e) {
                    var flag = 0;
                    for(var k=0; k<eHaveDataLen; k++){
                        $('.' + eHaveData.eq(k).data('index')).hide();            //滑到第一页的时候，隐藏所有
                        if(eHaveData.eq(k).hasClass('active')){                 //在显示当前页的上一页，达到切换的目的
                            flag = k + 1;
                        }
                    }
                    if(flag >= eHaveDataLen){
                        flag = 0;
                    }
                    eHaveData.eq(flag).addClass('active').siblings().removeClass('active');
                    $('.'+eHaveData.eq(flag).data('index')).fadeIn();
                    //隐藏相关slide
                    eSwipers =  $('.' + eHaveData.eq(flag).data('index'));
                    eSlides =  eSwipers.find('.swiper-slide');
                    eSlidesContents = eSwipers.find('.this-year-content');
                    for(var j=0;j<eSlidesContents.length;j++){          //隐藏后面显示一部分的slide的内容
                        if(swiper[flag].activeIndex > 0) {
                            eSlidesContents.eq(j).hide();
                        }
                    }
                    if(swiper[flag].activeIndex == 100){
                        swiper[flag].activeIndex = eSlides.length - 1;
                    }
                    eSlidesContents.eq(swiper[flag].activeIndex).show();      //slide默认显示最后一个
                    for(var k=0;k<eSlides.length;k++){      //隐藏后面不显示但是因为透明度导致看得到的slide
                        eSlides.eq(k).css('opacity','0');
                        if(swiper[flag].activeIndex-k<4){
                            eSlides.eq(k).css('opacity','1');
                        }
                    }
                })
            }
            //给每个页码绑定跳转的事件
            var eSwipers = '';
            var eSlides = '';
            var eSlidesContents = '';
            var mIndex = '';
            var showSlide = '';
            $('.months').on('click','.have-data',function(){
                if($(this).hasClass('active')) return;
                for(var i=0;i<eHaveDataLen; i++){
                    $('.'+eHaveData.eq(i).data('index')).hide();
                }
                mIndex = $(this).data('index');
                $(this).addClass('active').siblings().removeClass('active');
                $('.'+mIndex).fadeIn();

                var flag = 0;
                for(var k=0; k<eHaveDataLen; k++){
                    if(eHaveData.eq(k).hasClass('active')){                 //在显示当前页的上一页，达到切换的目的
                        flag = k;
                    }
                }

                eSwipers =  $('.' + mIndex);
                eSlides =  eSwipers.find('.swiper-slide');
                eSlidesContents = eSwipers.find('.this-year-content');
                for(var j=0;j<eSlidesContents.length;j++){          //隐藏后面显示一部分的slide的内容
                    eSlidesContents.eq(j).hide();
                }
                if(swiper[flag].activeIndex == 100){
                    swiper[flag].activeIndex = eSlides.length - 1;
                }
                eSlidesContents.eq(swiper[flag].activeIndex).show();      //slide默认显示最后一个
                for(var k=0;k<eSlides.length;k++){      //隐藏后面不显示但是因为透明度导致看得到的slide
                    eSlides.eq(k).css('opacity','0');
                    if(swiper[flag].activeIndex-k<4){
                        eSlides.eq(k).css('opacity','1');
                    }
                }
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
                grabCursor: true,
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
                        grabCursor: true,
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
                        $(this).parent().prev("span").html(city);
                        var translateWidth = $(this).width();
                        if(index-event.data.swiper.activeIndex<=0){
                            translateWidth = -($(this).width() * index);
                        } else {
                            translateWidth = -($(this).width() * index);
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
