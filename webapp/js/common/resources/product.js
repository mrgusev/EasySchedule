angular.module('resources.product',[])
    .factory('Product', ['$http', function($http){
        var service = {
            getProducts: function(page, callback){
                $http.get('api/v1/products?page='+page).success(callback);
            },
            searchProducts: function(query, callback){
                $http.get('api/v1/products?search='+query).success(callback);
            },
            getProduct: function(id, callback){
                $http.get('api/v1/products/'+id).success(callback);
            }
        }
        return service;
    }]);
