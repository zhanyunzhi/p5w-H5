/**
 * Created by zhan on 2016/4/3.
 */
import '../../lib/js/angular.min.js';                   //引入angular文件
var appModule = angular.module("ngApp",[]);
appModule.controller("IndexCtrl",
    function($scope, $http){
        //url是相对于我们的html文件的
        $http.get("./data.txt").success(function(data){
            $scope.datas = data;
        });
    }
)
appModule.filter(
    'toTrusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]
);
/*appModule.directive('hello', function() {
    return {
        restrict: 'E',
        template: '<div>Hi there <span ng-transclude></span></div>',
        replace: true,
        transclude: true
    };
});*/
