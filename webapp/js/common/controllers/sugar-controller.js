angular.module('controllers')
    .controller('SugarController', ['$rootScope','$scope','$timeout','Product',
        function($rootScope, $scope, $timeout, Product){

            //---Init modal-------------------------------------------------
            $rootScope.$watch('isAddSugar', function(val){
                if(val){
                    $scope.callback = $rootScope.modalCallback;
                    if($rootScope.isModelEdit){
                        $scope.model = $rootScope.currentModel;
                    }  else{
                        $scope.model = {
                            journalItemTypeId: enums.journalItemTypes.sugar,
                            time: new Date(),
                            value: 5.8
                        };
                    }
                }
            });

            $scope.$watch('model.time', function(){
                if($scope.model){

                    $scope.isSugarNow = new Date() - $scope.model.time < 300000;
                }
            });


            $scope.save = function(){
                $scope.searchQuery = '';
                $scope.callback($scope.model);
            };

        }])