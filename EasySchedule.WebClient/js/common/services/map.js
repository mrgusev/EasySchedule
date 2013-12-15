angular.module('services.map', [])
    .service('MapService', ['$timeout', function ($timeout) {

        var filterText = '';

        var tempFilterText = '', filterTextTimeout;

        var service = {
            updateSearchText: function(val){
                if(val == ""){
                    service.setMyLocation();
                }
                else{
                    if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
                    tempFilterText = val;
                    filterTextTimeout = $timeout(function() {
                        filterText = tempFilterText;
                        service.searchLocation(filterText);
                    },500);
                }
            },
            map:{},
            mapOptions : {
                center: new google.maps.LatLng(59.9494, 10.7564),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            addMarker: function(loc) {
                if(service.marker){
                   service.marker.setMap(null);
                }
                console.log('Create a marker');
                service.marker = new google.maps.Marker({
                    map: service.map,
                    position: loc
                });
                service.map.panTo(loc);
            },
            mapClick: function($event) {
                console.log('Map clicked');
                service.addMarker($event.latLng);
            },
            searchLocation: function(address){
                console.log('search button click');
                console.log(address);
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': address}, function(result, status){
                    if (status == google.maps.GeocoderStatus.OK) {
                        var loc = result[0].geometry.location;
                        console.log('geocode ok');
                        service.addMarker(loc);
                        service.map.panTo(loc);
                    }
                    else {
                        // alert("Not found: " + status);
                    }
                });
            },
            setMyLocation: function(){
                console.log('Create a marker 1111');
                navigator.geolocation.getCurrentPosition(function(position) {
                    console.log(JSON.stringify(position));
                  //  if(navigator.geolocation){
                        service.addMarker(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
                   // }
                });
            }
        };

        return service;
    }]);