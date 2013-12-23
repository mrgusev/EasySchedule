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
            },
            addSugar: function(sugar, callback){
                $http.post('api/sugars/', sugar).success(callback);
            },
            addInsulinUsage: function(insulinUsage, callback){
                $http.post('api/insulinusages/', insulinUsage).success(callback);
            },
            addFoodUsage: function(foodUsage, callback){
                $http.post('api/foodusages/', foodUsage).success(callback);
            },
            getInsulinTypes: function(callback){
                $http.get('api/insulintypes').success(callback);
            }
        }
        return service;
    }]);
