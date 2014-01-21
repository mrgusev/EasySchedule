angular.module('pages.home')
    .controller('NewFoodController', ['$scope', '$routeParams', '$location', 'Journal','Product', '$rootScope', '$timeout',
        function ($scope, $routeParams,$location, Journal,Product, $rootScope, $timeout) {
            var searchCounter = -1;
            var timer = false;
            $scope.initController = function(){
                $scope.foodUsage = {portions:[]};
                $scope.searchQuery = '';
            };

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

            $rootScope.$watch('isAddFood', function(){
                if($rootScope.isAddFood){
                    $scope.initController();
                }
            });
        }]);