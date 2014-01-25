//Main application module
angular.module('app', [
        'resources.product',
        'controls',
        'ui.keypress'
    ])
    .run(['$rootScope', '$timeout', 'Product',
        function ($rootScope, $timeout, Product) {
            document.addEventListener("touchstart", function(){}, true);

            $rootScope.isAddSugar = false;
            $rootScope.isAddInsulin = false;
            $rootScope.isAddFood = false;

            $rootScope.isDataLoading = true;

            var timer = false;
            $rootScope.searchQuery = '';
            $rootScope.page = 1;
            $rootScope.model = {
                journalItemTypeId: enums.journalItemTypes.foodUsage,
                time: new Date(),
                portions:[],
                value: 0
            };
            $rootScope.products = [];
            $rootScope.$watch('searchQuery', function () {
                console.log('searching...')
                if (timer) {
                    $timeout.cancel(timer);
                }
                timer = $timeout(function () {
                    if ($rootScope.searchQuery.length > 2) {
                        $rootScope.page = 1;
                        searchProducts();
                    } else if($rootScope.searchQuery.length == 0){
                        $rootScope.products = [];
                        // getProducts();
                    }
                }, 100);
            });

            function searchProducts(){
                Product.searchProducts($rootScope.searchQuery, function(data){
                    _.each(data,function(item){

                        item.breadUnits = Math.round(item.carbohydrates/13*10)/10;
                    })
                    if(data.length > 0){
                        //$timeout(function(){
                        //$rootScope.itemVisible = '';
                        //11 });
                      //  $timeout(function(){
                            $rootScope.products = _.take(data,5);
                      //  }, 100);

//                        $timeout(function(){
//                            $rootScope.itemVisible = 'visible';
//                        }, 200);
                        $rootScope.openResults = 'open';
                    } else{
                        $rootScope.openResults = '';

                    }


                    $rootScope.isDataLoading = false;
                });
            };
            $rootScope.calculateBreadUnits = function(portion){
                if(portion.breadUnits){
                    $rootScope.model.value -= portion.breadUnits;
                }
                var koef = portion.size/portion.product.defaultSize;
                portion.breadUnits = Math.round(portion.product.carbohydrates*koef/13*10)/10;
                $rootScope.model.value += portion.breadUnits;
                $rootScope.model.value = Math.round($rootScope.model.value*10)/10;
            };

            $rootScope.increasePortionSize = function(portion){
                portion.size+=50;
                $rootScope.calculateBreadUnits(portion);
            };

            $rootScope.decreasePortionSize = function(portion){
                portion.size-=50;
                if(portion.size < 1)
                    portion.size = 10;
                $rootScope.calculateBreadUnits(portion);
            };

            $rootScope.portionSizeUpdated = function(portion){
                $rootScope.calculateBreadUnits(portion);
            };

            $rootScope.addPortion = function(product){
                $rootScope.products = [];
                $rootScope.searchQuery = '';
                var newPortion = {
                    product:product,
                    size: product.defaultSize,
                    unit:product.defaultUnit,
                    hide:'hidden'
                };
                $rootScope.model.portions.push(newPortion);
                $rootScope.calculateBreadUnits(newPortion);
                newPortion.hide='';
            };

            $rootScope.deletePortion = function(portion){
                portion.hide = 'hidden';
                $rootScope.model.portions.splice($rootScope.model.portions.indexOf(portion),1);
                $rootScope.model.value -= portion.breadUnits;
            };
        } ]);

