angular.module('pages.products', [
        'resources.journal',
        'resources.product',
        'controls',
        'common.filters'] )
    .config(['$routeProvider', function ($routeProvider) {
        console.info("Config rout provider for 'products' module.");
        $routeProvider.when('/food', {
            templateUrl:'js/pages/products/products.html',
            controller:'ProductsController'
        });
    }])
    .controller('ProductsController', ['$scope', '$routeParams', '$location', 'Journal','Product', '$rootScope', '$timeout',
        function ($scope, $routeParams,$location, Journal,Product, $rootScope, $timeout) {
            ModalEffects();
           // $scope.isDataLoading = true
            var searchCounter = -1;
            var timer = false;
            $scope.searchQuery = '';
            $scope.$watch('searchQuery', function () {
                if (timer) {
                    $timeout.cancel(timer);
                }
                timer = $timeout(function () {
                    if ($scope.searchQuery.length > 2) {
                        console.log($scope.searchQuery);
                        updateProducts();
                    }
                }, 100);
            });

            function updateProducts(){
                Product.searchProducts($scope.searchQuery, function(data){
                    _.each(data,function(item){
                        item.carbohydrates = Math.round(item.carbohydrates*10/13)/10;
                        return item;
                    })
                    $scope.products = data;
                    searchCounter = -1;
                });
            }
        }]);