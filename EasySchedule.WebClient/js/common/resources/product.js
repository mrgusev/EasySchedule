angular.module('resources.product',[])
    .factory('Product', ['$http', function($http){
        var service = {
            getProducts: function(callback){
                $http.get('api/products/').success(callback);
            }
        }
        return service;
    }]);