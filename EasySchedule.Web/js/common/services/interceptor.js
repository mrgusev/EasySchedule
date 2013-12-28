angular.module('security.interceptor', ['security.service'])
    .factory('securityInterceptor', ['$location', '$q', 'SecurityService', '$rootScope', function($location, $q, SecurityService,$rootScope) {
        return function (promise) {
            return promise.then(function (response) {
                if($rootScope.profile &&  response.headers()['x-spond-currentprofileid'] &&  response.headers()['x-spond-currentprofileid']!=$rootScope.profile.id){
                    $rootScope.profile.id = response.headers()['x-spond-currentprofileid'];
                    SecurityService.authenticate();
                  //  console.log( response.headers()['x-spond-currentprofileid']);
                }
                return response;
            }, function (response) {
                console.info(response.status);
                $rootScope.showError(response.config.url + ' - ' + response.status +' : '+response.data.message)
                if(response.status == 401 && SecurityService.isAuthenticated())
                {
                    SecurityService.authCode = 401;
                    $rootScope.isAuthenticated = false;
                    window.location.replace('/');
                }
                if(response.status == 404){
                    window.location.replace('/404.html');
                }
                return $q.reject(response);
            });
        };
    }])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.responseInterceptors.push('securityInterceptor');
    }]);
