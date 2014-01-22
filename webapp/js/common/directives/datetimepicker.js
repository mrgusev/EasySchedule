/**
 * Created with JetBrains WebStorm.
 * User: Kirill
 * Date: 15.12.13
 * Time: 9:57
 * To change this template use File | Settings | File Templates.
 */
angular.module('controls')
.directive("dateTimePicker", ['$rootScope', function ($rootScope) {
    return {
        restrict: 'A',
        scope:{
            time:'=',
            isopen:'=',
            minvalue:'=',
            maxvalue:'=',
            overlayid:'='
        },
        templateUrl:'js/common/partials/datetimepicker.html',
        link: function (scope, element, attrs) {

            var overlay = $( '#'+scope.overlayid );

               if(!scope.time){
                   scope.model = new Date();
               }
            //scope.timeView = new Date();
            scope.addMinutes = function(){
                var date = scope.model;
                var minutes = date.getMinutes() + 10;
                if(minutes>50)
                    minutes = 0;
                scope.model =(new Date(scope.model.setMinutes(minutes)));
                if(scope.model > scope.maxvalue){
                    scope.model = new Date(scope.maxvalue);
                }
            };
            scope.removeMinutes = function(){
                var date = scope.model;
                var minutes = date.getMinutes() - 10;
                if(minutes < 0)
                    minutes = 50;
                scope.model =(new Date(scope.model.setMinutes(minutes)));
                if(scope.model < scope.minvalue){
                    scope.model = new Date(scope.minvalue);
                }
            };
            scope.addHours = function(){
                var date = scope.model;
                var hours = date.getHours() + 1;
                if(hours>23)
                    hours = 0;
                scope.model =(new Date(scope.model.setHours(hours)));
                if(scope.model > scope.maxvalue){
                    scope.model = new Date(scope.maxvalue);
                }
            };
            scope.removeHours = function(){
                var date = scope.model;
                var hours = date.getHours() - 1;
                if(hours<0)
                    hours = 23;
                scope.model =(new Date(scope.model.setHours(hours)));
                if(scope.model < scope.minvalue){
                    scope.model = new Date(scope.minvalue);
                }
            };
            scope.addDays = function(){
                var date = scope.model;
                scope.model= new Date(scope.model.setDate(date.getDate()+1));
                if(scope.model > scope.maxvalue){
                    scope.model = new Date(scope.maxvalue);
                }
            };
            scope.removeDays = function(){
                var date = scope.model;
                scope.model = new Date(scope.model.setDate(date.getDate()-1));
                if(scope.model < scope.minvalue){
                    scope.model = new Date(scope.minvalue);
                }
            };
            scope.close = function(){
                scope.isopen = false;
                scope.time = scope.model;
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
            scope.$watch('time',function(){
                scope.model = new Date(scope.time);
            });
            $rootScope.$watch('isAllModalsClosed',function(){
                   scope.isopen = false;
            });
    }
    };
}])