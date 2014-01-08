/**
 * Created with JetBrains WebStorm.
 * User: Kirill
 * Date: 15.12.13
 * Time: 9:57
 * To change this template use File | Settings | File Templates.
 */
angular.module('controls', [])
.directive("dateTimePicker", ['$rootScope', function ($rootScope) {
    return {
        restrict: 'A',
        require: 'ngModel',
        templateUrl:'js/common/partials/datetimepicker.html',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$setViewValue(new Date());
            //scope.time =
            //        element.datepicker(
//            {
//                onSelect: function (dateText) {
//                    scope.$apply(function () {
//                        ngModel.$setViewValue(dateText);
//                    });
//                }
//            }
//        );
            scope.addMinutes = function(){
                var date = ngModel.$modelValue;
                var minutes = date.getMinutes() + 10;
                if(minutes>50)
                    minutes = 0;
                ngModel.$setViewValue(new Date(ngModel.$modelValue.setMinutes(minutes)));
            };
            scope.removeMinutes = function(){
                var date = ngModel.$modelValue;
                var minutes = date.getMinutes() - 10;
                if(minutes < 0)
                    minutes = 50;
                ngModel.$setViewValue(new Date(ngModel.$modelValue.setMinutes(minutes)));
            };
            scope.addHours = function(){
                var date = ngModel.$modelValue
                var hours = date.getHours() + 1;
                if(hours>23)
                    hours = 0;
                ngModel.$setViewValue(new Date(ngModel.$modelValue.setHours(hours)));
            };
            scope.removeHours = function(){
                var date = ngModel.$modelValue;
                var hours = date.getHours() - 1;
                if(hours<0)
                    hours = 23;
                ngModel.$setViewValue(new Date(ngModel.$modelValue.setHours(hours)));
            };
            scope.addDays = function(){
                var date = ngModel.$modelValue;
                ngModel.$setViewValue(new Date(ngModel.$modelValue.setDate(date.getDate()+1)));
            };
            scope.removeDays = function(){
                var date = ngModel.$modelValue;
                ngModel.$setViewValue(new Date(ngModel.$modelValue.setDate(date.getDate()-1)));
            };

            scope.$watch(attrs.ngModel, function () {
                //element.datepicker("setDate", ngModel.$modelValue);
            });
    }
    };
} ])