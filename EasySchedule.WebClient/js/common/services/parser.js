angular.module('services.parser', [])
    .service('Parser', function () {
        var service = {
            parseEmails: function(text){
                return text.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
            }
        };
        return service;
    });

