angular.module('pages.home' )
    .controller('NewItemController', ['$scope', '$routeParams', '$location', 'Journal','Product', '$rootScope', '$timeout',
        function ($scope, $routeParams,$location, Journal,Product, $rootScope, $timeout) {
            $scope.closeAfterSave = true;
            $scope.maxDate = new Date();
            $scope.insulinTypes = [
                {id:enums.insulinTypes.short, name:'короткого'},
                {id:enums.insulinTypes.ultraShort, name:'ультракороткого'},
                {id:enums.insulinTypes.long, name:'длинного'}
            ];
            $scope.sugarModel = {
                time: new Date(),
                value: 5.8
            };
            $scope.insulinModel = {
                time: new Date(),
                value: 4,
                insulinType: $scope.insulinTypes[0]
            };

            $scope.saveSugar = function(){
                $rootScope.fakeSugarModel = JSON.parse(JSON.stringify($scope.sugarModel)) ;
//                Journal.addSugar($scope.sugarModel, function(){
                    $rootScope.hasUpdates = true;
//                });
                $rootScope.closeModals();

            };
            $scope.saveInsulin = function(){
//                Journal.addInsulinUsage($scope.insulinModel, function(){
                    $rootScope.hasUpdates = true;
//                });
                $rootScope.closeModals();
            };
            $scope.$watch('sugarModel.time', function(){
                $scope.isSugarNow = new Date() - $scope.sugarModel.time < 300000;
            });
//            $scope.$watch('insulinModel.time', function(){
//                $scope.isInsulinNow = new Date() - $scope.insulinModel.time < 300000;
//            });
}]);