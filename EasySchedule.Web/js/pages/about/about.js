angular.module('pages.about', [
        'resources.journal',
        'resources.product',
        'controls',
        'common.filters'] )
    .config(['$routeProvider', function ($routeProvider) {
        console.info("Config rout provider for 'about' module.");
        $routeProvider.when('/about', {
            templateUrl:'js/pages/about/about.html',
            controller:'AboutController'
        });
    }])
    .controller('AboutController', ['$scope', '$routeParams', '$location', 'Journal','Product', '$rootScope', '$timeout',
        function ($scope, $routeParams,$location, Journal,Product, $rootScope, $timeout) {

        }]);