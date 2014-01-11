//Main application module
angular.module('app', ['ngRoute',
        'pages.home',
        'pages.about',
        'pages.products'
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider.otherwise({ redirectTo: '/' });
    } ])
    .run(['$rootScope', '$location', '$routeParams',
        function ($rootScope, $location, $routeParams) {
            document.addEventListener("touchstart", function(){}, true);
            $rootScope.isAddSugar = false;
            $rootScope.isAddInsulin = false;
            $rootScope.isAddFood = false;
            $rootScope.scrollTo = function (id) {
                $location.hash(id);
                $anchorScroll();
            }
            $rootScope.redirect = function(path) {
                $location.path(path);
            };
            $rootScope.closeModals = function(){
                $rootScope.isAllModalsClosed = !$rootScope.isAllModalsClosed;
                $rootScope.isModalOpen = false;
                $rootScope.isAddSugar = false;
                $rootScope.isAddInsulin = false;
                $rootScope.isAddFood = false;
            };
            $rootScope.showModal = function(type){
                switch (type){
                    case 'sugar':
                        $rootScope.isAddSugar = true;
                        break;
                    case 'insulin':
                        $rootScope.isAddInsulin = true;
                        break;
                    case 'food':
                        $rootScope.isAddFood = true;
                        break;
                }
                $rootScope.isModalOpen = true;
            }
        } ]);

