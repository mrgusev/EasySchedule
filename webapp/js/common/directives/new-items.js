/**
 * Created with JetBrains WebStorm.
 * User: Kirill
 * Date: 15.12.13
 * Time: 9:57
 * To change this template use File | Settings | File Templates.
 */
angular.module('controls')
    .directive("newSugar", ['$rootScope', function ($rootScope) {
        return {}
//            restrict: 'A',
//            templateUrl:'js/common/partials/new-sugar.html',
//            scope:{
//                onsave:'&onsave'
//            },
//            link: function (scope, element, attrs, ngModel) {
//                scope.closeAfterSave = true;
//                scope.model = {
//                    time: new Date(),
//                    sugarLevel: 5.8
//                };
//                scope.showDateTimePicker = function(){
//
//                };
//
//                scope.showValuePicker = function(){
//
//                };
//                scope.close = function(){
//
//                };
//                scope.save = function(){
//                    scope.onsave({model:scope.model});
//                    if(scope.closeAfterSave){
//                        scope.close();
//                    }
//                };
//                scope.$watch('model', function(){
//                    scope.isNow = new Date() - scope.model.time < 300000;
//                });
//            }
//        };
    } ])