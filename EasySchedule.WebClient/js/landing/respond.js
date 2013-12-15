angular.module('app', [
        'directives.views',
        'controls',
        'resources.spond',
        'resources.profile',
        'common.filters',
        'services.localization',
        'ui',
        'ngRoute'])
    .controller('RespondController',['$rootScope', '$scope', '$routeParams', '$route', 'Spond', 'Profile', '$timeout', 'LocalizationService',
        function( $rootScope, $scope, $routeParams,$route, Spond, Profile, $timeout, LocalizationService){
        angular.element('#main-loader').hide();
        angular.element(".main, .popup-list").show();
        $scope.isMenuVisible = false;
        $scope.isDataLoading = true;
        $scope.spond = {isSingle: true};
        LocalizationService.setLang(getURLParameter('locale') || 'en');
            $rootScope.dictionary = LocalizationService.dictionary;
        function getURLParameter(name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
        }

        Profile.getProfile(getURLParameter('profileId'), function(data){
            $scope.isLoggedIn = true;
        });


        Spond.respond({
            response: getURLParameter('action'),
            memberId: getURLParameter('membershipId'),
            responseCode: getURLParameter('responseCode')
        }, getURLParameter('spondId'), getURLParameter('spondInstanceId'),function(data){
            fillView()
        });
        function fillView(){
            Spond.getSpondInstance(getURLParameter('spondInstanceId'), getURLParameter('spondId'), function(data){
                var spond = data;
                spond.mapOptions = { center: new google.maps.LatLng(59.9494, 10.7564),
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                spond.isRepeated = spond.repeat != enums.spondRepeat.once;
                spond.response = 'notreplied';
                spond.map = {};
                spond.isMapVisible = true;
                spond.isExpanded = true;
                spond.creator = {name: data.creatorName};
                spond.respond = function(item, response, type){
                    response.isLoading = true;
                    Spond.respond({response: type, memberId: response.memberId, responseCode: getURLParameter('responseCode')}, getURLParameter('spondId'), getURLParameter('spondInstanceId'),function(data){
                        response.yesActive = type == enums.response.yes ? "active" : "";
                        response.noActive = type == enums.response.no ? "active" : "";
                        response.response = type;
                        if(_.where(item.responses, {response: enums.response.no}).length > 0){item.response = 'no';}
                        if(_.where(item.responses, {response: enums.response.yes}).length > 0){item.response = 'yes';}
                        response.isLoading = false;
                    }, getURLParameter('responseCode'));
                };
                spond.respondToAll = function(instance){
                    instance.respondToAllLoading = true;
                    var response = instance.responses[0];
                    Spond.respond({response: response.response, memberId: response.memberId}, instance.spondId, '*',function(data){
                        $rootScope.showMessage($rootScope.dictionary['You_have_answered_to_all_sponds']);
                        response.isLoading = false;
                    });
                };
                Spond.getResponses( getURLParameter('spondInstanceId'), getURLParameter('spondId'), {profileId: getURLParameter('profileId')}, function(data){
                    spond.responses = _.filter(data, function(item){return item.status == enums.membershipStatus.accepted || item.status == enums.membershipStatus.invited});
                    _.each(spond.responses,function(item){
                        item.isLoading = false;
                        item.yesActive = item.response == enums.response.yes ? "active" : "";
                        item.noActive = item.response == enums.response.no ? "active" : "";
                        return item;
                    });
                    if(_.where(data, {response: enums.response.no}).length > 0){spond.response = 'no';}
                    if(_.where(data, {response: enums.response.yes}).length > 0){spond.response = 'yes';}

                    Spond.getMessages({ spondInstanceId: getURLParameter('spondInstanceId'), type: [enums.messageType.updated, enums.messageType.extraMessage]}, function(data){
                        spond.messages = data;
                        _.each(data,function(item){
                            if(item.type == enums.messageType.updated){
                                item.messageBody = 'This spond was updated';
                            }
                            return item;
                        });
                        $scope.isDataLoading = false;
                        $scope.spond = spond;
                        showMap();
                    }, getURLParameter('responseCode'));
                }, getURLParameter('responseCode'));
            }, getURLParameter('responseCode'));
        }

        function showMap(){
            if($scope.spond.location){
                $timeout(function(){
                    google.maps.event.trigger($scope.spond.map, "resize");
                    var loc = new google.maps.LatLng($scope.spond.location.latitude,$scope.spond.location.longitude);
                    if($scope.spond.marker){
                        $scope.spond.marker.setMap(null);
                    }
                    $scope.spond.marker = new google.maps.Marker({
                        map: $scope.spond.map,
                        position: loc
                    });
                    $timeout(function(){
                        $scope.spond.map.panTo(loc);
                        google.maps.event.trigger($scope.spond.map, "resize");
                    },3);
                });
            }
        }

    }]);


