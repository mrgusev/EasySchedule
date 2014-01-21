angular.module('services.foodUsage', [])
    .service('FoodUsage', ['$timeout','Product', function ($timeout, Product) {
        var service = {};

        var filterText = '';

        var tempFilterText = '', filterTextTimeout;

        service.foodUsageTypes = [
            {id: enums.foodUsageTypes.breakfast, name:'на завтрак' },
            {id: enums.foodUsageTypes.lunch, name:'на обед' },
            {id: enums.foodUsageTypes.dinner, name:'на ужин' },
            {id: enums.foodUsageTypes.snack, name:'в перекус' }
        ];

        service.init = function(callback, model){
            service.callback = callback;
            if(model){
                service.model = model;
            } else{
                service.model = {
                    journalItemTypeId: enums.journalItemTypes.foodUsage,
                    time: new Date(),
                    foodUsageType:{id:1},
                    portions:[],
                    value: 0
                };
                service.defineFoodUsageType(service.model.time);
            }
        }

        service.updateProducts = function (query){
            Product.searchProducts(query, function(data){
                _.each(data,function(item){
                    item.breadUnits = Math.round(item.carbohydrates*10/13)/10;
                    return item;
                })
                service.products = _.take(data,5);
            });
        };

        service.calculateBreadUnits = function(portion){
            if(portion.breadUnits){
                service.model.value -= portion.breadUnits;
            }
            var koef = portion.size/100;
            portion.breadUnits = Math.round(portion.product.carbohydrates*koef/13*10)/10;
            service.model.value += portion.breadUnits;

        };

        service.defineFoodUsageType = function(date){
            var breakfastStart = new Date(new Date(new Date((new Date()).setHours(7)).setMinutes(0)).toTimeString());
            var breakfastEnd = new Date(new Date(new Date((new Date()).setHours(10)).setMinutes(30)).toTimeString());
            var lunchStart = new Date(new Date(new Date((new Date()).setHours(12)).setMinutes(30)).toTimeString());
            var lunchEnd = new Date(new Date(new Date((new Date()).setHours(14)).setMinutes(30)).toTimeString());
            var dinnerStart = new Date(new Date(new Date((new Date()).setHours(17)).setMinutes(0)).toTimeString());
            var dinnerEnd = new Date(new Date(new Date((new Date()).setHours(20)).setMinutes(0)).toTimeString());
            date = new Date(date.toTimeString());
            if(date > breakfastStart && date < breakfastEnd){
                service.model.foodUsageType = service.foodUsageTypes[0];
            } else if(date > lunchStart && date < lunchEnd){
                service.model.foodUsageType = service.foodUsageTypes[1];
            } else if(date > dinnerStart && date < dinnerEnd){
                service.model.foodUsageType = service.foodUsageTypes[2];
            } else{
                service.model.foodUsageType = service.foodUsageTypes[3];
            }

        };
        service.increasePortionSize = function(portion){
            portion.size+=50;
            service.calculateBreadUnits(portion);
        };
        service.decreasePortionSize = function(portion){
            portion.size-=50;
            if(portion.size < 1)
                portion.size = 10;
            service.calculateBreadUnits(portion);
        };
        service.portionSizeUpdated = function(portion){
            service.calculateBreadUnits(portion);
        };
        service.addPortion = function(product){
            service.products = [];
            var newPortion = {
                product:product,
                size: 100,
                unit:{name:'г', id:1},
                hide:'hidden'
            };
            service.model.portions.push(newPortion);
            service.calculateBreadUnits(newPortion);
            newPortion.hide='';
        };
        service.deletePortion = function(portion){
            portion.hide = 'hidden';
            service.model.portions.splice(service.model.portions.indexOf(portion),1);
            service.model.value -= portion.breadUnits;
        };
        service.save = function(){
            service.callback(service.model);
        };
        service.updateSearch = function(val){
            if (val.length > 2) {
                if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
                tempFilterText = val;
                filterTextTimeout = $timeout(function () {
                    filterText = tempFilterText;
                    service.updateProducts(filterText);
                }, 500);
            } else{
                service.products= [];
            }
        };


        return service;
    }]);