//Main application module
angular.module('app', ['ngRoute',
        'pages.home',
        'pages.about',
        'pages.products',
        'pages.statistic',
        'services.foodUsage',
        'controllers',
        'controls',
        'ui.keypress',
        'infinite-scroll'
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider ) {
        //$locationProvider.html5Mode(true);
        $routeProvider.otherwise({ redirectTo: '/' });
    } ])
    .run(['$rootScope', '$location', '$routeParams', 'Journal',
        function ($rootScope, $location, $routeParams, Journal) {
            document.addEventListener("touchstart", function(){}, true);

            $rootScope.isAddSugar = false;
            $rootScope.isAddInsulin = false;
            $rootScope.isAddFood = false;

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
                $rootScope.isModalOpen = true;
                switch (type){
                    case enums.journalItemTypes.sugar:
                        $rootScope.isAddSugar = true;
                        $rootScope.modalCallback = $rootScope.saveSugar;
                        break;
                    case enums.journalItemTypes.insulinUsage:
                        $rootScope.isAddInsulin = true;
                        $rootScope.modalCallback = $rootScope.saveInsulin;
                        break;
                    case enums.journalItemTypes.foodUsage:
                        $rootScope.isAddFood = true;
                        $rootScope.modalCallback = $rootScope.saveFood;
                        break;
                }
                $rootScope.isModelEdit = model;
                $rootScope.currentModel = model;
            };

            $rootScope.saveSugar = function(model){
               // $rootScope.fakeSugarModel = JSON.parse(JSON.stringify($rootScope.sugarModel)) ;
                if(!$rootScope.isModelEdit){
                    Journal.addSugar(model, function(){
                    });
                }

                if($rootScope.onModalSave){
                    $rootScope.onModalSave(model);

                }
                $rootScope.closeModals();

            };
            $rootScope.saveInsulin = function(model){
                if(!$rootScope.isModelEdit){
                    Journal.addInsulinUsage(model, function(){
                    });
                }

                if($rootScope.onModalSave){
                    $rootScope.onModalSave(model);
                }
                $rootScope.closeModals();
            };
            $rootScope.saveFood = function(model){
               Journal.addFoodUsage(model);

                if($rootScope.onModalSave){
                    $rootScope.onModalSave(model);
                }
                $rootScope.closeModals();
            };
        } ]);

