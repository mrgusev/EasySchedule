
angular.module('directives.views', ['controls', 'resources.profile', 'resources.spond'])
    .directive('spondItem', ['$timeout', '$rootScope', 'Profile', 'Spond', function ($timeout, $rootScope, Profile, Spond) {
        var linker = function (scope, element, attrs, ctrl) {
			scope.dictionary = $rootScope.dictionary;            
			scope.isReminded = false;
            scope.showMap = function(spond){
                spond.isMapVisible = !spond.isMapVisible;
                scope.respondees = [];
                if (spond.isMapVisible && spond.location.address) {
                    $timeout(function () {
                        var loc;
                        if(!spond.location.latitude || !spond.location.longitude){

                        } else{
                            loc = new google.maps.LatLng(spond.location.latitude, spond.location.longitude);
                            spond.marker = new google.maps.Marker({
                                map: spond.map,
                                position: loc
                            });
                            $timeout(function () {
                                spond.map.panTo(loc);
                                google.maps.event.trigger(spond.map, "resize");
                            }, 3);
                        }
                    }, 0);
                }
                if (!spond.creator) {
                    Profile.getProfile(spond.creatorId, function (data) {
                        spond.creator = data;
                    });
                }

            };



            scope.remind = function(){
                if(!scope.isReminded){
                    var object = {
                        sendFromServer: true,
                        messageBody: "Please respond!"
                    }
                    Spond.nag(scope.spond.spondId, scope.spond.id, object, function(){
                        scope.isReminded = true;
                    });
                }
            };

            scope.readMessage = function(message){
                Spond.updateMessage(message.id, {read: true}, function(){
                    scope.spond.messages.splice(scope.spond.messages.indexOf(message),1);
                });
            };

            scope.showAnswers = function(answer){
                var flag = false;
                scope.respondees = [];
                switch (answer) {
                    case 1:
                        flag = scope.spond.yesExpanded;
                        scope.spond.yesExpanded = !scope.spond.yesExpanded;
                        scope.spond.noExpanded = false;
                        scope.spond.notRepliedExpanded = false;
                        break;
                    case 2:
                        flag = scope.spond.noExpanded;
                        scope.spond.yesExpanded = false;
                        scope.spond.noExpanded = !scope.spond.noExpanded;
                        scope.spond.notRepliedExpanded = false;
                        break;
                    case 4:
                        flag = scope.spond.notRepliedExpanded;
                        answer = [4, 5];
                        scope.spond.yesExpanded = false;
                        scope.spond.noExpanded = false;
                        scope.spond.notRepliedExpanded = !scope.spond.notRepliedExpanded;
                        break;
                }
                Spond.getResponses(scope.spond.id, scope.spond.spondId, { response: answer }, function (data) {
                    if (!flag) {
                        scope.respondees = data;
                    }
                });
            }

            if (!scope.spond.isSingle) {
                $timeout(function () {
                    // Create the data table
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', 'Topping');
                    data.addColumn('number', 'Slices');
                    data.addRows([
                        ['Yes', scope.spond.yes],
                        ['No', scope.spond.no],
                        ['Not answered', scope.spond.notReplied]
                    ]);

                    // Set chart options
                    var options = {
                        'width': 60,
                        'height': 60,
                        'pieHole': 0.66,
                        'tooltip': { trigger: 'none' },
                        'legend': { position: 'none' },
                        'pieSliceText': 'none',
                        'enableInteractivity': false,
                        'colors': ['#008b00', '#e84444', '#ebc33f'],
                        chartArea: { left: 0, top: 0, width: "100%", height: "100%" }
                    };

                    // Instantiate and draw our chart, passing in some options.
                    var chart = new google.visualization.PieChart(document.getElementById('chart_div' + scope.spond.id.toString()));
                    chart.draw(data, options);
                }, 200);
            }

        };
        return {
            scope: {
                spond: '=',
                profile: '='
            },
            replace: true,
            templateUrl: "/js/common/partials/spond-item.xhtml",
            restrict: 'A',
            link: linker
        };
    } ]);
