angular.module('controls')
    .directive("select", ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            scope:{
                selectedItem:'=',
                items:'=',
                overlayid:'=',
                isopen:'='
            },
            templateUrl:'js/common/partials/select.html',
            link: function (scope, element, attrs, ngModel) {

                var overlay = $( '#'+scope.overlayid );

                scope.select = function(item){
                    scope.selectedItem = item;
                    scope.close();
                }
                scope.close = function(){
                    scope.isopen = false;
                    scope.number = scope.model;
                };
                scope.$watch('isopen', function () {
                    console.log(444)
                    if(scope.isopen){
                        overlay.addClass('true')
                        scope.display = 'open';
                    } else{
                        overlay.removeClass('true')
                        scope.display = '';
                    }
                });
                $rootScope.$watch('isAllModalsClosed',function(){
                    scope.isopen = false;
                });
            }
        };
    } ])