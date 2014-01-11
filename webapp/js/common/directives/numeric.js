/**
 * Created with JetBrains WebStorm.
 * User: Kirill
 * Date: 15.12.13
 * Time: 9:57
 * To change this template use File | Settings | File Templates.
 */
angular.module('controls')

    .directive("numeric", ['$rootScope', function ($rootScope) {

        return {
            restrict: 'A',
            transclude:false,
            scope:{
                minValue:'=',
                maxValue:'=',
                isFloat:'=',
                isopen:'=',
                number:'=',
                overlayid:'='
            },
            templateUrl:'js/common/partials/numeric.html',
            link: function (scope, element, attrs, ngModel) {

                var overlay = $( '#'+scope.overlayid );
                function round(val){
                    if(scope.isFloat){
                        return Math.round(val*10)/10;
                    } else{
                        return Math.round(val);
                    }
                }
                if(!scope.number){
                    scope.number = (round(5.8));
                }
                scope.add1 = function(){
                    var val = scope.model + 1;
                    if(val > scope.maxValue)
                        val = scope.maxValue;
                    scope.model = (round(val));
                };
                scope.remove1 = function(){
                    var val = scope.model - 1;
                    if(val < scope.minValue )
                        val = scope.minValue;
                    scope.model = (round(val));
                };
                scope.add01 = function(){
                    var val = scope.model + 0.1;
                    if(round(val*10).toString().last() == '0'){
                        val-=1;
                    }
                    if(val > scope.maxValue)
                        val = scope.maxValue;
                    scope.model = (round(val));
                };
                scope.remove01 = function(){
                    var val = scope.model - 0.1;
                    if(round(val*10).toString().last() == '9'){
                        val+=1;
                    }
                    if(val < scope.minValue )
                        val = scope.minValue;
                    scope.model = (round(val));
                };
                scope.close = function(){
                    scope.isopen = false;
                    scope.number = scope.model;
                };
                scope.$watch('isopen', function () {
                    if(scope.isopen){
                        overlay.addClass('true')
                        scope.display = 'open';
                    } else{
                        overlay.removeClass('true')
                        scope.display = '';
                    }
                });
                scope.$watch('number',function(){
                    scope.model = new Object(scope.number);
                });
                $rootScope.$watch('isAllModalsClosed',function(){
                    scope.isopen = false;
                });
            }
        };
    } ])