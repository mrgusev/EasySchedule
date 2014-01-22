angular.module('pages.statistic', [
        'resources.journal',
        'resources.product',
        'controls',
        'common.filters',
        'googlechart'] )
    .config(['$routeProvider', function ($routeProvider) {
        console.info("Config rout provider for 'home' module.");
        $routeProvider.when('/statistic', {
            templateUrl:'js/pages/statistic/statistic.html',
            controller:'StatisticController'
        });
    }])
    .controller('StatisticController', ['$scope', '$routeParams', '$location', 'Journal','Product', '$rootScope', '$timeout',
        function ($scope, $routeParams,$location, Journal,Product, $rootScope, $timeout) {
            $scope.isDataLoading = true;

            $scope.chart = {
                "type": "ComboChart",
                "displayed": true,
                "cssStyle": "height:300px; width:100%;",
                "options": {
                    chartArea: {top:10, width: "90%", height: "90%", backgroundColor: "#fff" },
                    vAxes: [{
                        textPosition:'out',
                        minValue:0,
                        gridlines: {
                            count: "5",
                            color: "#e8f5f4"
                        },
                        textStyle:{"color":"#808080","fontSize":12,fontFamily:"open_sanslight"},
                        baselineColor: '#F2F3EB',
                        format:"0"
                    }],
                    hAxis: {
                        baselineColor: '#F2F3EB',
                        gridlines: {
                            color: "#e8f5f4"
                        },
                        textStyle:{"color":"#808080","fontSize":12,fontFamily:"open_sanslight"}
                    },
                    curveType: "function",
                    legend: "none",
                    seriesType: "bars",
                    bar: {groupWidth: "10"},
                    series: {
                        1: {type: "line", lineWidth: 2}
                    },
                    focusTarget: "category",
                        domainAxis: {
                        direction: 1
                    },
                  //  theme: "maximized",
//                    backgroundColor: {
//                        fill:"#FAFAFA"
//                    },
                    interpolateNulls: true
                }
            };

            function drawChart() {
                var data1 = [ ['Время', 'Сахар']];
                var data2 =[['Время','Инсулин']] ;
                var data3 = [['ID','Время','ХЕ']];
                _.each($scope.collection, function(item){
                    if(item.journalItemTypeId == enums.journalItemTypes.sugar){
                        data1.push([new Date(item.time), item.value]);
                    }
                    if(item.journalItemTypeId == enums.journalItemTypes.insulinUsage && (item.insulinType.id == 3 || item.insulinType.id == 1)){
                        data2.push([new Date(item.time), item.value]);
                    }
                    if(item.journalItemTypeId == enums.journalItemTypes.foodUsage){
                        data3.push(['', new Date(item.time), item.value])
                    }
                });
                data1 = google.visualization.arrayToDataTable(data1);
                data2 = google.visualization.arrayToDataTable(data2);
                //  data3 = google.visualization.arrayToDataTable(data3);
                var joinedData = google.visualization.data.join(data2, data1, 'full',[[0,0]],[1],[1]);
                $scope.chart.data = joinedData;
            };

            function calculateStatistic(){
                $scope.todaySugarAverage = 1;
                $scope.yesterdaySugarAverage = 1;
                $scope.thisWeekSugarAverage = 1;
                $scope.previousWeekSugarAverage = 1;
            }
            $scope.updateData = function(){

                Journal.getJournal(1, function(data){
                  //  data.splice(0,12)
                    $scope.collection = data;
                    $timeout(function(){
                        drawChart();
                        $timeout(function(){
                            $scope.isDataLoading = false;
                        })

                    }, 500);
                })
            };

            $scope.updateData();

        }]);