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
            $scope.collection = [];
            $scope.page = 1;
            $scope.updateJournal = function(){

                Journal.getJournal($scope.page, function(data){

                    _.each(data, function(item){
                        item.date = new Date(new Date(new Date(item.time).getTime()).toDateString());
                        item.time = new Date(new Date(item.time).getTime() );
                        return item;
                    });
                    $scope.collection = $scope.collection.concat(data);

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
            };
            $scope.showMore = function(){
                $scope.page++;
                $scope.updateJournal();
            };
            $scope.loadJournal = function(){
                $scope.isDataLoading = true;
                $scope.updateJournal();
            };


            $scope.loadJournal();

            $scope.selectItem = function(item){

                if(item.journalItemTypeId == enums.journalItemTypes.foodUsage){
                    Journal.getPortions(item.id, function(data){
                        item.portions = data;
                    })
                }
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
                switch (item.journalItemTypeId){
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
                $rootScope.showModal(editedItem.journalItemTypeId, editedItem);
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
            $rootScope.onModalSave = function(result){
                var fakeSugarModel =  result;
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
                    switch (fakeSugarModel.journalItemTypeId){
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