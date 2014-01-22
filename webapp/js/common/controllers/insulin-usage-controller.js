angular.module('controllers')
    .controller('InsulinUsageController', ['$rootScope','$scope','$timeout','Product',
        function($rootScope, $scope, $timeout, Product){

            $scope.insulinUsageTypes = [
                {id: enums.insulinTypes.long, name:'длинного'},
                {id: enums.insulinTypes.short, name:'короткого'},
                {id: enums.insulinTypes.ultraShort, name:'ультракороткого'}
            ];

            //---Init modal-------------------------------------------------
            $rootScope.$watch('isAddInsulin', function(val){
                if(val){
                    $scope.callback = $rootScope.modalCallback;
                    if($rootScope.isModelEdit){
                        $scope.model = $rootScope.currentModel;
                    }  else{
                        $scope.model = {
                            journalItemTypeId: enums.journalItemTypes.insulinUsage,
                            time: new Date(),
                            insulinType: $scope.insulinUsageTypes[2],
                            value: 4
                        };
                    }
                }
            });

            $scope.save = function(){
                $scope.searchQuery = '';
                $scope.callback($scope.model);
            };
        }])