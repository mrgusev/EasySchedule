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
                console.log('searching...')
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
                    _.each(data,function(item){

                        item.carbohydrates = Math.round(item.carbohydrates/13*10)/10;
                    })
                    if(data.length > 0){
                        //$timeout(function(){
                            $scope.itemVisible = '';
                       //11 });
                        $timeout(function(){
                            $scope.products = _.take(data,5);
                        }, 100);

                        $timeout(function(){
                            $scope.itemVisible = 'visible';
                        }, 200);
                        $scope.openResults = 'open';
                    } else{
                        $scope.openResults = '';

                    }


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
    ])
    .controller('CarbulatorController', ['$scope', '$routeParams', '$location', 'Journal','Product', '$rootScope', '$timeout',
        function ($scope, $routeParams,$location, Journal,Product, $rootScope, $timeout) {
            $scope.isDataLoading = true;

            var timer = false;
            $scope.searchQuery = '';
            $scope.page = 1;
            $scope.model = {
                journalItemTypeId: enums.journalItemTypes.foodUsage,
                time: new Date(),
                portions:[],
                value: 0
            };
            $scope.products = [];
            $scope.$watch('searchQuery', function () {
                console.log('searching...')
                if (timer) {
                    $timeout.cancel(timer);
                }
                timer = $timeout(function () {
                    if ($scope.searchQuery.length > 2) {
                        $scope.page = 1;
                        searchProducts();
                    } else if($scope.searchQuery.length == 0){
                        $scope.products = [];
                       // getProducts();
                    }
                }, 100);
            });

            function searchProducts(){
                Product.searchProducts($scope.searchQuery, function(data){
                    _.each(data,function(item){

                        item.breadUnits = Math.round(item.carbohydrates/13*10)/10;
                    })
                    if(data.length > 0){
                        //$timeout(function(){
                        $scope.itemVisible = '';
                        //11 });
                        $timeout(function(){
                            $scope.products = _.take(data,5);
                        }, 100);

                        $timeout(function(){
                            $scope.itemVisible = 'visible';
                        }, 200);
                        $scope.openResults = 'open';
                    } else{
                        $scope.openResults = '';

                    }


                    $scope.isDataLoading = false;
                });
            };
            $scope.calculateBreadUnits = function(portion){
                if(portion.breadUnits){
                    $scope.model.value -= portion.breadUnits;
                }
                var koef = portion.size/portion.product.defaultSize;
                portion.breadUnits = Math.round(portion.product.carbohydrates*koef/13*10)/10;
                $scope.model.value += portion.breadUnits;
                $scope.model.value = Math.round($scope.model.value*10)/10;
            };

            $scope.increasePortionSize = function(portion){
                portion.size+=50;
                $scope.calculateBreadUnits(portion);
            };

            $scope.decreasePortionSize = function(portion){
                portion.size-=50;
                if(portion.size < 1)
                    portion.size = 10;
                $scope.calculateBreadUnits(portion);
            };

            $scope.portionSizeUpdated = function(portion){
                $scope.calculateBreadUnits(portion);
            };

            $scope.addPortion = function(product){
                $scope.products = [];
                $scope.searchQuery = '';
                var newPortion = {
                    product:product,
                    size: product.defaultSize,
                    unit:product.defaultUnit,
                    hide:'hidden'
                };
                $scope.model.portions.push(newPortion);
                $scope.calculateBreadUnits(newPortion);
                newPortion.hide='';
            };

            $scope.deletePortion = function(portion){
                portion.hide = 'hidden';
                $scope.model.portions.splice($scope.model.portions.indexOf(portion),1);
                $scope.model.value -= portion.breadUnits;
            };
    }])