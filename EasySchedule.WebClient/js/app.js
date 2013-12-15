//Main application module
angular.module('app', ['ngRoute',
    'pages.home'
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider.otherwise({ redirectTo: '/' });
    } ])
    .run(['$rootScope', '$location', '$routeParams',
        function ($rootScope, $location, $routeParams) {
            $rootScope.scrollTo = function (id) {
                $location.hash(id);
                $anchorScroll();
            }
            $rootScope.redirect = function(path) {
                $location.path(path);
            };

        } ]);

