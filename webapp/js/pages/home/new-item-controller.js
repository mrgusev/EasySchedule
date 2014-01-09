angular.module('pages.home' )
    .controller('NewItemController', ['$scope', '$routeParams', '$location', 'Journal','Product', '$rootScope', '$timeout',
        function ($scope, $routeParams,$location, Journal,Product, $rootScope, $timeout) {
            $scope.closeAfterSave = true;
            $scope.maxDate = new Date();
            $scope.model = {
                time: new Date(),
                value: 5.8
            };
            $scope.save = function(){
                Journal.addSugar($scope.model);
            };
            $scope.$watch('model.time', function(){
                console.log($scope.model.time);
                $scope.isNow = new Date() - $scope.model.time < 300000;
            });
        }]);