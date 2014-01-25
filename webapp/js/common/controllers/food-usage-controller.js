angular.module('controllers',[])
.controller('FoodUsageController', ['$rootScope','$scope','$timeout','Product',
        function($rootScope, $scope, $timeout, Product){
            var filterText = '';

            var tempFilterText = '', filterTextTimeout;

            $scope.foodUsageTypes = [
                {id: enums.foodUsageTypes.breakfast, name:'на завтрак' },
                {id: enums.foodUsageTypes.lunch, name:'на обед' },
                {id: enums.foodUsageTypes.dinner, name:'на ужин' },
                {id: enums.foodUsageTypes.snack, name:'в перекус' }
            ];

            //---Init modal-------------------------------------------------
            $rootScope.$watch('isAddFood', function(val){
                if(val){
                    $scope.callback = $rootScope.modalCallback;
                    $scope.searchQuery = '';

                    $scope.isSearchFocused = false;
                    $timeout(function(){
                        $scope.isSearchFocused = true;
                    })

                    if($rootScope.isModelEdit){
                        $scope.model = $rootScope.currentModel;
                    }  else{
                        $scope.model = {
                            journalItemTypeId: enums.journalItemTypes.foodUsage,
                            time: new Date(),
                            portions:[],
                            value: 0
                        };
                    }
                }
            });


            $scope.updateProducts = function (query){
                Product.searchProducts(query, function(data){
                    _.each(data,function(item){
                        item.breadUnits = Math.round(item.carbohydrates*10/13)/10;
                        return item;
                    })
                    $scope.products = _.take(data,5);
                });
            };

            $scope.calculateBreadUnits = function(portion){
                if(portion.breadUnits){
                    $scope.model.value -= portion.breadUnits;
                }
                var koef = portion.size/100;
                portion.breadUnits = Math.round(portion.product.carbohydrates*koef/13*10)/10;
                $scope.model.value += portion.breadUnits;
                $scope.model.value = Math.round($scope.model.value*10)/10;
            };

            $scope.defineFoodUsageType = function(date){
                if(date){
                    var breakfastStart = new Date(0,0,0,7,0,0,0).getTime();
                    var breakfastEnd = new Date(0,0,0,10,30,0,0).getTime();
                    var lunchStart = new Date(0,0,0,12,30,0,0).getTime();
                    var lunchEnd = new Date(0,0,0,14,30,0,0).getTime();
                    var dinnerStart = new Date(0,0,0,17,0,0,0).getTime();
                    var dinnerEnd = new Date(0,0,0,20,0,0,0).getTime();
                    date = new Date(0,0,0, date.getHours(), date.getMinutes(),0,0,0).getTime();
                    if(date > breakfastStart && date < breakfastEnd){
                        $scope.model.foodUsageType = $scope.foodUsageTypes[0];
                    } else if(date > lunchStart && date < lunchEnd){
                        $scope.model.foodUsageType = $scope.foodUsageTypes[1];
                    } else if(date > dinnerStart && date < dinnerEnd){
                        $scope.model.foodUsageType = $scope.foodUsageTypes[2];
                    } else{
                        $scope.model.foodUsageType = $scope.foodUsageTypes[3];
                    }
                }
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
                    size: 100,
                    unit:{name:'г', id:1},
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

            $scope.save = function(){
                $scope.searchQuery = '';
                $scope.callback($scope.model);
            };

            $scope.$watch('searchQuery',function(val){
                if ($scope.searchQuery && $scope.searchQuery.length > 2) {
                    if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
                    tempFilterText = val;
                    filterTextTimeout = $timeout(function () {
                        filterText = tempFilterText;
                        $scope.updateProducts(filterText);
                    }, 500);
                } else{
                    $scope.products = [];
                }
            });

            $scope.$watch('model.time', $scope.defineFoodUsageType)

        }])