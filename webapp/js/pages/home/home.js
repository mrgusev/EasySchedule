angular.module('pages.home', [
        'resources.journal',
        'resources.product',
        'controls',
        'common.filters'] )
    .config(['$routeProvider', function ($routeProvider) {
        console.info("Config rout provider for 'home' module.");
        $routeProvider.when('/', {
            templateUrl:'js/pages/home/home.html',
            controller:'HomeController'
        });
    }])
    .controller('HomeController', ['$scope', '$routeParams', '$location', 'Journal','Product', '$rootScope', '$timeout',
        function ($scope, $routeParams,$location, Journal,Product, $rootScope, $timeout) {

            $scope.isDataLoading = true;
            $scope.selectedItem = {};
            $scope.updateJournal = function(){
                $scope.collection = []
                Journal.getFoodUsages(function(foodUsages){
                    _.each(foodUsages, function(item){
                        item.type = enums.journalItemTypes.foodUsage;
                        item.time = new Date(item.time).getTime();
                        item.date = new Date(new Date(new Date(item.time).getTime()).toDateString());
                        return item;
                    });
                    $scope.foodUsages = foodUsages;
                    $scope.collection = $scope.collection.concat(foodUsages);
                    Journal.getSugars(function(sugar){
                        _.each(sugar,function(item){
                            item.type = enums.journalItemTypes.sugar;
                            item.time = new Date(item.time).getTime();
                            item.date = new Date(new Date(new Date(item.time).getTime()).toDateString());
                            return item;
                        });
                        $scope.collection = $scope.collection.concat(sugar);
                        Journal.getInsulinUsages(function(insulinUsages){
                            _.each(insulinUsages,function(item){
                                item.type = enums.journalItemTypes.insulinUsage;
                                item.time = new Date(item.time).getTime();
                                item.date = new Date(new Date(new Date(item.time).getTime()).toDateString());
                                return item;
                            });
                            $scope.collection = _.sortBy($scope.collection.concat(insulinUsages), 'time').reverse();

//                            $scope.collection  = _.sortBy(_.filter($scope.collection, function(item){
//                                var result =  new Date().getTime() - item.time < 1000*60*60*24*3;
//                                return result;
//                            }), 'time');
                            $scope.datedCollection = [];
                            var groupedCollectionObj = _.groupBy($scope.collection, 'date');
                            for(var prop in groupedCollectionObj) {
                                if(groupedCollectionObj.hasOwnProperty(prop)){
                                    $scope.datedCollection.push({date: new Date(prop), items:groupedCollectionObj[prop]});
                                }
                            }
                            $scope.datedCollection = _.sortBy($scope.datedCollection, 'date').reverse();
                            $scope.isDataLoading = false;
                            // $timeout(drawChart,100)
                        });
                    });
                });
            };

            $scope.loadJournal = function(){
                $scope.isDataLoading = true;
                $scope.updateJournal();
            };

            function drawChart() {
                var data1 = [ ['Время', 'Сахар']];
                var data2 =[['Время','Инсулин']] ;
                var data3 = [['ID','Время','ХЕ']];
                _.each($scope.collection,function(item){
                    if(item.type == enums.journalItemTypes.sugar){
                        data1.push([new Date(item.time), item.value]);
                    }
                    if(item.type == enums.journalItemTypes.insulinUsage && (item.insulinType.id == 3 || item.insulinType.id == 1)){
                        data2.push([new Date(item.time), item.value]);
                    }
                    if(item.type == enums.journalItemTypes.foodUsage){
                        data3.push(['', new Date(item.time), item.breadUnits])
                    }
                });
                data1 = google.visualization.arrayToDataTable(data1);
                data2 = google.visualization.arrayToDataTable(data2);
              //  data3 = google.visualization.arrayToDataTable(data3);
                var joinedData = google.visualization.data.join(data2, data1, 'full',[[0,0]],[1],[1]);

                var options = {
                    seriesType: "bars",
                    series: {1: {type: "line"}},
                    curveType: 'function',
                    legend: { position: 'bottom' },
                    interpolateNulls: true
                };

                var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
                chart.draw(joinedData, options);
            };

            $scope.loadJournal();

            $scope.selectItem = function(item){
                $scope.selectedItem.selected = '';
                if($scope.selectedItem == item){
                    $scope.selectedItem = {};
                } else{
                    item.selected = 'selected';
                    $scope.selectedItem = item;
                }
            };
            $scope.deselectItem = function(){
                $scope.selectedItem.selected = '';
                $scope.selectedItem = {};
            };

            $scope.deleteItem = function(item){
                switch (item.type){
                    case enums.journalItemTypes.sugar:
                        Journal.deleteSugar(item.id);
                        break;
                    case enums.journalItemTypes.insulinUsage:
                        Journal.deleteInsulinUsage(item.id);
                        break;
                }
                removeItemFromList(item);

            };

            $scope.editItem = function(item){
                var editedItem =JSON.parse(JSON.stringify(item));
                delete editedItem.$$hashKey;
                $rootScope.showModal(editedItem.type, editedItem);
            };
            function addNewItemToList(item){
                item.hidden = 'hide';
                item.selected = '';
                var flag = false;
                _.each($scope.datedCollection, function(datedItem){
                    if(datedItem.date.toString() == new Date(new Date(new Date(item.time).getTime()).toDateString()).toString()) {
                        console.log('found dated item');
                        datedItem.items.push(item);
                        datedItem.items = _.sortBy(datedItem.items, 'time').reverse();
                        $timeout(function(){item.hidden = 'show';},300);
                        flag = true;
                    }
                });
                if(!flag){
                    var datedItem = {date: new Date(new Date(new Date(item.time).getTime()).toDateString()), items:[] };
                    datedItem.items.push(item);
                    $scope.datedCollection.push(datedItem);
                    $scope.datedCollection = _.sortBy($scope.datedCollection, 'date').reverse();
                    datedItem.items = _.sortBy(datedItem.items, 'time').reverse();
                    $timeout(function(){item.hidden = 'show';},300);
                }
                $scope.deselectItem();
            };
            function removeItemFromList(item, callback){
                if(item == $scope.selectedItem){
                    $scope.deselectItem();
                }
                item.hidden = 'hide';
            };
            $rootScope.modalCallback = function(result){
                var fakeSugarModel =  $rootScope.currentModel;;
                if(!$rootScope.isModelEdit){
                    console.log('journal updated');
                    addNewItemToList(fakeSugarModel);
                } else{
                   // var selectedIndex =
                //    if($scope.selectedItem.time != fakeSugarModel.time){
                        removeItemFromList($scope.selectedItem);
                        addNewItemToList(fakeSugarModel)

//                    } else{
//                        console.log($scope.selectedItem.time+ ' - '+fakeSugarModel.time);
//                    }
                    var updatedModel = JSON.parse(JSON.stringify(fakeSugarModel));
                    delete updatedModel.type;
                    delete updatedModel.selected;
                    delete updatedModel.hide;
                    switch (fakeSugarModel.type){
                        case enums.journalItemTypes.sugar:
                            Journal.updateSugar(updatedModel.id, updatedModel);
                            break;
                        case enums.journalItemTypes.insulinUsage:
                            Journal.updateInsulinUsage(updatedModel.id, updatedModel);
                            break;
                    }
                }
            };

    }]);