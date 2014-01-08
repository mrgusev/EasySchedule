/**
 * Created with JetBrains WebStorm.
 * User: Kirill
 * Date: 15.12.13
 * Time: 9:57
 * To change this template use File | Settings | File Templates.
 */
angular.module('controls', [])
    .directive("integerNumeric", ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            scope:{
                minValue:'=',
                maxValue:'=',
                isFloat: '='
            },
            require: 'ngModel',
            templateUrl:'js/common/partials/integer-numeric.html',
            link: function (scope, element, attrs, ngModel) {
                scope.add = function(){
                    var value = ngModel.$modelValue + 1;
                    if(value > scope.maxValue)
                        value = scope.maxValue;
                    ngModel.$setViewValue(value);
                };
                scope.remove = function(){
                    var value = ngModel.$modelValue - 1;
                    if(value < scope.minValue )
                        value = scope.minValue;
                    ngModel.$setViewValue(value);
                };

                scope.$watch(attrs.ngModel, function () {
                    scope.number = ngModel.$modelValue;
                });
            }
        };
    } ])
    .directive("floatNumeric", ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            scope:{
                minValue:'=',
                maxValue:'='
            },
            require: 'ngModel',
            templateUrl:'js/common/partials/float-numeric.html',
            link: function (scope, element, attrs, ngModel) {
                scope.add1 = function(){
                    var value = ngModel.$modelValue + 1;
                    if(value > scope.maxValue)
                        value = scope.maxValue;
                    ngModel.$setViewValue(value);
                };
                scope.remove1 = function(){
                    var value = ngModel.$modelValue - 1;
                    if(value < scope.minValue )
                        value = scope.minValue;
                    ngModel.$setViewValue(value);
                };
                scope.add01 = function(){
                    var value = ngModel.$modelValue + 0.1;
                    if(value > scope.maxValue)
                        value = scope.maxValue;
                    ngModel.$setViewValue(value);
                };
                scope.remove01 = function(){
                    var value = ngModel.$modelValue - 0.1;
                    if(value < scope.minValue )
                        value = scope.minValue;
                    ngModel.$setViewValue(value);
                };

                scope.$watch(attrs.ngModel, function () {
                    element.datepicker("setDate", ngModel.$modelValue);
                });
            }
        };
    } ])