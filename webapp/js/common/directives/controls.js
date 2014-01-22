angular.module('controls', [])
    .directive("searchBox", ['$rootScope','$timeout', function ($rootScope,$timeout) {
        return {
            restrict: 'A',
            scope:{
                query:'=',
                items:'=',
                selectedItem:'=',
                isFocused:'=',
                callback: '&'
            },
            templateUrl:'js/common/partials/search.html',
            link: function (scope, element, attrs) {
                var focusInput = function(){
                    $timeout(function(){
                        $('#input-search').focus();
                    },500)
                    console.log('focus input');
                };
                var searchCounter = 0;
                scope.searchKeypressed = function ($event) {
                    console.log('search...')
                    if(scope.items.length > 0){
                        if (scope.items[searchCounter]) {
                            scope.items[searchCounter].selected = '';
                        }
                        if ($event.which == 38 && scope.items[searchCounter - 1]) {
                            searchCounter--;
                        }
                        if ($event.which == 40 && scope.items[searchCounter + 1]) {
                            searchCounter++;
                        }
                        if ($event.which == 13 && scope.items[searchCounter]) {
                            scope.select(scope.items[searchCounter]);
                        }
                        scope.items[searchCounter].selected = 'selected';
                    } else{
                        searchCounter = 0;
                    }
                };
                scope.query = '';
                scope.select = function(item){
                    scope.selectedItem = item;
                    scope.callback({item:item});
                    focusInput();
                    searchCounter = 0;
                };

                scope.$watch('isFocused', function(){
                    if(scope.isFocused){
                        focusInput();
                    }
                });

                scope.$watch('items', function(){
                    if(scope.items.length > 0){
                        scope.items[0].selected = 'selected';
                    }
                });
            }
        };
    }])