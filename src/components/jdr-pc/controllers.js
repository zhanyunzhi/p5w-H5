/**
 * Created by zhan on 2016/4/3.
 */
import '../../lib/js/angular.min.js';                   //引入angular文件
//var angular = require('angular');//引入angular
var appModule = angular.module("ngApp",[]);
appModule.controller("IndexCtrl",
    function($scope, $http){
        //url是相对于我们的html文件的
        $http.get("./data.json").success(function(data){
            //console.log(data)
            //$scope.datas = data.data;
            $scope.datas = data;
        });
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {           //数据加载完成后执行以下js，否则js执行无效
            //2017活动预告 start
            var swiper1Config = {
                observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                grabCursor: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                effect : 'coverflow',
                direction:'vertical',
                slidesPerView: 2,
                initialSlide :3,
                centeredSlides: true,
                coverflow: {
                    rotate: 0,
                    stretch: 150,
                    depth: 80,
                    modifier: 1,
                    slideShadows : false
                }
            };
            //2017活动预告中class为have-data的获取属性data-index的值与相应的要初始化的swiper的class相同，从而达到批量注册swiper
            var eHaveData = $('.have-data');
            var eHaveDataLen = eHaveData.length;
            if(eHaveDataLen > 0){
                var swiper = '';
                for(var i=0;i<eHaveDataLen; i++){
                    swiper = eHaveData.eq(i).data('index');
                    $('.'+swiper).hide();
                    swiper = new Swiper('.'+swiper, swiper1Config);
                }
                $('.'+eHaveData.eq(0).data('index')).show();
                eHaveData.eq(0).addClass('active');
            }
            //给每个页码绑定跳转的事件
            $('.months').on('click','.have-data',function(){
                if($(this).hasClass('active')) return;
                for(var i=0;i<eHaveDataLen; i++){
                    $('.'+eHaveData.eq(i).data('index')).hide();
                }
                var index = $(this).data('index');
                $(this).addClass('active').siblings().removeClass('active');
                $('.'+index).fadeIn();
            })
            //2017活动预告 end

        });
        $scope.$on('ngRepeatFinishedHistory', function (ngRepeatFinishedHistoryEvent) {           //数据加载完成后执行以下js，否则js执行无效
            //历史活动 start
            var swiper2 = new Swiper('.swiper-container2', {
                observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                grabCursor: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
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
                        paginationCustomRender: function (swiper, current, total) {
                            var _html = '';
                            var ss = $('.'+paginationTex).data('city').split(',');
                            for (var i = 1; i <= total; i++) {
                                if (current == i) {
                                    _html += '<li class="" data-index="' + i + '"><img src="./assets/coordinate.png" /><span>' + ss[i-1] + '</span><span class="active">' + ss[i-1] +'</span></li>';
                                }else{
                                    _html += '<li class="" data-index="' + i + '"><img src="./assets/coordinate.png" /><span>' + ss[i-1]  + '</span></li>';
                                }
                            }
                            return _html;//返回所有的页码html
                        }
                    });
                    $('.'+swiperTex).on('click','li', {swiper:swiper[i]},function(event){
                        var index = $(this).data('index');
                        event.data.swiper.slideTo(index-1, 500, false);//切换到第一个slide，速度为1秒
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
