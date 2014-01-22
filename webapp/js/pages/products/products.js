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
        $routeProvider.when('/food/:productId', {
            templateUrl:'js/pages/products/product-view.html',
            controller:'ProductController'
        });
        $routeProvider.when('/food/:productId/edit', {
            templateUrl:'js/pages/products/product-edit.html',
            controller:'ProductEditController'
        });
    }])
    .controller('ProductsController', ['$scope', '$routeParams', '$location', 'Journal','Product', '$rootScope', '$timeout',
        function ($scope, $routeParams,$location, Journal,Product, $rootScope, $timeout) {
            $scope.isDataLoading = true;

            var timer = false;
            $scope.searchQuery = '';
            $scope.page = 1;
            $scope.products = [];
            $scope.$watch('searchQuery', function () {
                if (timer) {
                    $timeout.cancel(timer);
                }
                timer = $timeout(function () {
                    if ($scope.searchQuery.length > 2) {
                        $scope.page = 1;
                        searchProducts();
                    } else if($scope.searchQuery.length == 0){
                        $scope.products = [];
                        getProducts();
                    }
                }, 100);
            });

            function searchProducts(){
                Product.searchProducts($scope.searchQuery, function(data){
                    $scope.products = data;
                    $scope.isDataLoading = false;
                });
            };

            function getProducts(){
                Product.getProducts($scope.page, function(data){

                    $scope.products = $scope.products.concat( data);
                    $scope.isDataLoading = false;
                });
            };

            $scope.showMore = function(){
                $scope.page++;
                $scope.isDataLoading = true;
                getProducts();
            };

        }])
    .controller('ProductController', ['$scope', '$routeParams', '$location', 'Journal','Product', '$rootScope', '$timeout',
        function ($scope, $routeParams,$location, Journal,Product, $rootScope, $timeout) {
            $scope.isDataLoading = true;
            if($routeParams.productId){

                Product.getProduct($routeParams.productId, function(data){
                    $scope.product = data;
                    $scope.isDataLoading = false;
                })
            }
        }
    ])
    .controller('ProductEditController', ['$scope', '$routeParams', '$location', 'Journal','Product', '$rootScope', '$timeout',
        function ($scope, $routeParams,$location, Journal,Product, $rootScope, $timeout) {

        }
    ]);