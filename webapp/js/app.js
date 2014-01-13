//Main application module
angular.module('app', ['ngRoute',
        'pages.home',
        'pages.about',
        'pages.products'
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider ) {
        //$locationProvider.html5Mode(true);
        $routeProvider.otherwise({ redirectTo: '/' });
    } ])
    .run(['$rootScope', '$location', '$routeParams', 'Journal',
        function ($rootScope, $location, $routeParams, Journal) {
            document.addEventListener("touchstart", function(){}, true);
            $rootScope.insulinTypes = [
                {id:enums.insulinTypes.short, name:'короткого'},
                {id:enums.insulinTypes.ultraShort, name:'ультракороткого'},
                {id:enums.insulinTypes.long, name:'длинного'}
            ];
            $rootScope.isAddSugar = false;
            $rootScope.isAddInsulin = false;
            $rootScope.isAddFood = false;
            $rootScope.sugarModel =  {  };
            $rootScope.insulinModel =  {  };
            $rootScope.foodModel =  {  };
            $rootScope.redirect = function(path) {
                $location.path(path);
            };

            $rootScope.closeModals = function(){
                $rootScope.isAllModalsClosed = !$rootScope.isAllModalsClosed;
                $rootScope.isModalOpen = false;
                $rootScope.isAddSugar = false;
                $rootScope.isAddInsulin = false;
                $rootScope.isAddFood = false;
                if($rootScope.isModelEdit){
                    $rootScope.isModelEdit = false;
                }
            };

            $rootScope.showModal = function(type, model){
                $rootScope.maxDate = new Date();
                switch (type){
                    case enums.journalItemTypes.sugar:
                        $rootScope.sugarModel =  model || { time: new Date(), value: 5.8 };
                        $rootScope.sugarModel.journalItemTypeId = enums.journalItemTypes.sugar;
                        $rootScope.currentModel = $rootScope.sugarModel;
                        console.log(JSON.stringify(model))
                        $rootScope.isAddSugar = true;
                        break;
                    case enums.journalItemTypes.insulinUsage:
                        $rootScope.insulinModel = model || { time: new Date(), value: 4, insulinType: $rootScope.insulinTypes[0] };
                        $rootScope.insulinModel.journalItemTypeId = enums.journalItemTypes.insulinUsage;
                        $rootScope.insulinModel.insulinType = _.where($rootScope.insulinTypes, {id:$rootScope.insulinModel.insulinType.id})[0];
                        $rootScope.currentModel = $rootScope.insulinModel;
                        $rootScope.isAddInsulin = true;
                        break;
                    case enums.journalItemTypes.foodUsage:
                        $rootScope.isAddFood = true;
                        break;
                }
                $rootScope.isModalOpen = true;
                $rootScope.isModelEdit = model;
            };

            $rootScope.saveSugar = function(){
               // $rootScope.fakeSugarModel = JSON.parse(JSON.stringify($rootScope.sugarModel)) ;
                if(!$rootScope.isModelEdit){
                    Journal.addSugar($rootScope.sugarModel, function(){
                    });
                }

                if($rootScope.modalCallback){
                    $rootScope.modalCallback($rootScope.currentModel);

                }
                $rootScope.closeModals();

            };
            $rootScope.saveInsulin = function(){
                if(!$rootScope.isModelEdit){
                    Journal.addInsulinUsage($rootScope.insulinModel, function(){
                    });
                }

                if($rootScope.modalCallback){
                    $rootScope.modalCallback($rootScope.currentModel);
                }
                $rootScope.closeModals();
            };
            $rootScope.$watch('sugarModel.time', function(){
                $rootScope.isSugarNow = new Date() - $rootScope.sugarModel.time < 300000;
            });

        } ]);

