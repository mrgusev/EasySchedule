angular.module('resources.journal',[])
    .factory('Journal', ['$http', function($http){
        var service = {
            getSugars: function(callback){
                $http.get('api/sugars/').success(callback);
            },
            getInsulinUsages:function(callback){
                $http.get('api/insulinusages/').success(callback);
            },
            getFoodUsages:function(callback){
                $http.get('api/foodusages/').success(callback);
            },
            getPortions:function(id, callback){
                $http.get('api/portions/'+id).success(callback);
            }
        }
        return service;
    }]);
