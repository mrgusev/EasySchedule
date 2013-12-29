angular.module('resources.journal',[])
    .factory('Journal', ['$http', function($http){
        var service = {
            getSugars: function(callback){
                $http.get('api/v1/sugars/').success(callback);
            },
            getInsulinUsages:function(callback){
                $http.get('api/v1/insulinusages/').success(callback);
            },
            getFoodUsages:function(callback){
                $http.get('api/v1/foodusages/').success(callback);
            },
            getPortions:function(id, callback){
                $http.get('api/v1/portions/'+id).success(callback);
            },
            addSugar: function(sugar, callback){
                $http.post('api/v1/sugars/', sugar).success(callback);
            },
            addInsulinUsage: function(insulinUsage, callback){
                $http.post('api/v1/insulinusages/', insulinUsage).success(callback);
            },
            addFoodUsage: function(foodUsage, callback){
                $http.post('api/v1/foodusages/', foodUsage).success(callback);
            },
            getInsulinTypes: function(callback){
                $http.get('api/v1/insulintypes').success(callback);
            }
        }
        return service;
    }]);
