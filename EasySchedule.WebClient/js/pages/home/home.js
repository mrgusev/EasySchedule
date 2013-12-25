angular.module('pages.home', [
        'resources.journal',
        'resources.product',
        'controls',
        'common.filters'] )
    .config(['$routeProvider', function ($routeProvider) {
        console.info("Config rout provider for 'home' module.");
        $routeProvider.when('/', {
            templateUrl:'js/pages/home/home.xhtml',
            controller:'HomeController'
        });
    }])
    .controller('HomeController', ['$scope', '$routeParams', '$location', 'Journal','Product', '$rootScope', '$timeout',
        function ($scope, $routeParams,$location, Journal,Product, $rootScope, $timeout) {
            ModalEffects();
            $scope.isDataLoading = true
            $scope.insulinTypes = [];
            $scope.newSugarModel = {time: new Date().getTime(), value: 4};
            $scope.isFromGlucometer = true;

            function loadProducts(){
                Product.getProducts(function(data){
                    $scope.products = data;
                })
            };

            loadProducts();

            $scope.showAddPanel = function(type){
                $scope.isAddSugar = false;
                $scope.isAddInsulinUsage = false;
                $scope.isAddFoodUsage = false;
                switch (type){
                    case enums.journalItemTypes.foodUsage:
                        $scope.isAddFoodUsage = true;
                        break;
                    case enums.journalItemTypes.insulinUsage:
                        $scope.isAddInsulinUsage = true;
                        break;
                    case enums.journalItemTypes.sugar:
                        $scope.isAddSugar = true;
                        break;
                }
            };

            $scope.loadInsulinTypes = function(){
                Journal.getInsulinTypes(function(data){
                    $scope.insulinTypes = data;
                    $scope.newInsulinUsage = {
                        insulinType: $scope.insulinTypes[0],
                        value:4,
                        time: new Date()
                    }
                });
            };

            $scope.loadInsulinTypes();

            $scope.loadJournal = function(){
                $scope.isDataLoading = true;
                $scope.newSugarModel.time = new Date($scope.newSugarModel.time - 14400000);
                $scope.collection = [];
                Journal.getFoodUsages(function(foodUsages){
                    _.each(foodUsages, function(item){
                        item.type = enums.journalItemTypes.foodUsage;
                        item.time = new Date(item.time).getTime() - 14400000;
                        item.date = new Date(new Date(item.time).getTime() - 14400000).toDateString();
                        return item;
                    });
                    $scope.foodUsages = foodUsages;
                    $scope.collection = $scope.collection.concat(foodUsages);
                    Journal.getSugars(function(sugar){
                        _.each(sugar,function(item){
                            item.type = enums.journalItemTypes.sugar;
                            item.time = new Date(item.time).getTime() - 14400000;
                            item.date = new Date(new Date(item.time).getTime() - 14400000).toDateString();
                            return item;
                        });
                        $scope.collection = $scope.collection.concat(sugar);
                        Journal.getInsulinUsages(function(insulinUsages){
                            _.each(insulinUsages,function(item){
                                item.type = enums.journalItemTypes.insulinUsage;
                                item.time = new Date(item.time).getTime() - 14400000;
                                item.date = new Date(new Date(item.time).getTime() - 14400000).toDateString();
                                return item;
                            });
                            $scope.collection = $scope.collection.concat(insulinUsages).reverse();

//                            $scope.collection  = _.sortBy(_.filter($scope.collection, function(item){
//                                var result =  new Date().getTime() - item.time < 1000*60*60*24*3;
//                                return result;
//                            }), 'time');
                            $scope.datedCollection = [];
                            var groupedCollectionObj = _.groupBy($scope.collection, 'date');
                                for(var prop in groupedCollectionObj) {
                                    if(groupedCollectionObj.hasOwnProperty(prop)){
                                        $scope.datedCollection.push({date:prop, items:groupedCollectionObj[prop]});
                                    }
                                }
                            $scope.isDataLoading = false;
                           // $timeout(drawChart,100)
                        });
                    });
                });
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

            $scope.loadPortions = function(item){
                if(!item.portions){
                     Journal.getPortions(item.id, function(data){
                        item.portions = data;
                    });
                }
            };

            $scope.addSugar = function(){
                if($scope.isFromGlucometer){
                    $scope.newSugarModel.value = Math.round(($scope.newSugarModel.value/1.12)*10)/10;
                }
                $scope.newSugarModel.time = new Date($scope.newSugarModel.time + 14400000);
                Journal.addSugar($scope.newSugarModel, $scope.loadJournal);
            };

            $scope.addInsulinUsage = function(){
                Journal.addInsulinUsage($scope.newInsulinUsage, $scope.loadJournal);
            }
    }]);