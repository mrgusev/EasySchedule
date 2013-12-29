angular.module('resources.product',[])
    .factory('Product', ['$http', function($http){
        var service = {
            getProducts: function(callback){
                $http.get('api/v1/products/').success(callback);
            },
            searchProducts: function(query, callback){
                $http.get('api/v1/products?search='+query).success(callback);
            }
        }
        return service;
    }]);
