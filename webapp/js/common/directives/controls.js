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
                var searchCounter = -1;
                scope.searchKeypressed = function ($event) {
                    console.log('search123')
                    if(scope.products.length > 0){
                        if (scope.products[searchCounter]) {
                            scope.products[searchCounter].selected = '';
                        }
                        if ($event.which == 38 && scope.products[searchCounter - 1]) {
                            searchCounter--;
                        }
                        if ($event.which == 40 && scope.products[searchCounter + 1]) {
                            searchCounter++;
                        }
                        if ($event.which == 13 && scope.products[searchCounter]) {
                            scope.select(scope.products[searchCounter]);
                        }
                        scope.products[searchCounter].selected = 'selected';
                    } else{
                        searchCounter = -1;
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
                        scope.itemVisible = '';
                        $timeout(function(){
                            scope.products = scope.items;
                        }, 100);

                        $timeout(function(){
                            scope.itemVisible = 'visible';
                        }, 200);
                        scope.openResults = 'open';
                    } else{
                        scope.openResults = '';

                    }
                });
            }
        };
    }])