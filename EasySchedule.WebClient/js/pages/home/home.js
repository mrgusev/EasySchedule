angular.module('pages.home', ['resources.journal','controls','common.filters'] )
    .config(['$routeProvider', function ($routeProvider) {
        console.info("Config rout provider for 'home' module.");
        $routeProvider.when('/', {
            templateUrl:'js/pages/home/home.xhtml',
            controller:'HomeController'
        });
    }])
    .controller('HomeController', ['$scope', '$routeParams', '$location', 'Journal','$rootScope',
        function ($scope, $routeParams,$location, Journal, $rootScope ) {
            $scope.collection = [];
            $scope.isDataLoading = true;

            Journal.getFoodUsages(function(foodUsages){
                _.each(foodUsages, function(item){
                    item.type = enums.journalItemTypes.foodUsage;
                    item.date = new Date(new Date(item.time).getTime() - 14400000).toDateString();
                    return item;
                });
                $scope.foodUsages = foodUsages;
                $scope.collection = $scope.collection.concat(foodUsages);
                Journal.getSugars(function(sugar){
                    _.each(sugar,function(item){
                        item.type = enums.journalItemTypes.sugar;
                        item.date = new Date(new Date(item.time).getTime() - 14400000).toDateString();
                        return item;
                    });
                    $scope.collection = $scope.collection.concat(sugar);
                    Journal.getInsulinUsages(function(insulinUsages){
                        _.each(insulinUsages,function(item){
                            item.type = enums.journalItemTypes.insulinUsage;
                            item.date = new Date(new Date(item.time).getTime() - 14400000).toDateString();
                            return item;
                        });
                        $scope.collection = $scope.collection.concat(insulinUsages);
                        $scope.collection  = _.sortBy($scope.collection, 'time');
                        $scope.datedCollection = _.groupBy($scope.collection, 'date');
                        $scope.isDataLoading = false;
                    });
                });
            });

            $scope.loadPortions = function(item){
                if(!item.portions){
                    Journal.getPortions(item.id, function(data){
                        item.portions = data;
                    });
                }
            };


    }]);