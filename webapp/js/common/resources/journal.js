angular.module('resources.journal',[])
    .factory('Journal', ['$http', function($http){
        var service = {
            getInsulinTypes: function(callback){
                $http.get('api/v1/insulintypes').success(callback);
            },
            getJournal: function(page, callback){
                $http.get('api/v1/journal?page='+page).success(callback);
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
            updateSugar: function(id, model, callback){
                $http.put('api/v1/sugars/'+id, model).success(callback);
            },
            updateInsulinUsage: function(id, model, callback){
                $http.put('api/v1/insulinusages/'+id, model).success(callback);
            },
            deleteSugar: function(id, callback){
                $http.delete('api/v1/sugars/'+id).success(callback);
            },
            deleteInsulinUsage: function(id, callback){
                $http.delete('api/v1/insulinusages/'+id).success(callback);
            }
        }
        return service;
    }]);
