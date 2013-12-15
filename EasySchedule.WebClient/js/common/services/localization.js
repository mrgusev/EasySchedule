//angular.module('services.localization', [])
//    .factory('LocalizationService', ['$http', '$locale',
//        function ($http, $locale) {
//            var updateDictionary = function (lang) {
//                $http.get('/languages/' + lang + '.json').success(function(data){
//                    service.dictionary = data;
//                });
//            };

//            var service = {
//                dictionary : {},
//                setLang: function (lang) {
//                    $locale.id = lang;
//                    updateDictionary(lang);
//                    console.log('Language updated:');
//                    console.log($locale.id);
//                }
//            };
//            return service;
//        } ]);
angular.module('services.localization', [])
    .factory('LocalizationService', ['$http', '$locale',
        function ($http, $locale) {
            var updateDictionary = function (lang, callback) {
                if (lang != 'no') {
                     lang = 'en';
                };
                $.ajax({
                    type: 'GET',
                    url: '/languages/' + lang + '.json',
                    success: function (data) {
                        service.dictionary = data;
                        $locale.id = lang;
                        if (callback)
                            callback();
                    },
                    dataType: 'json',
                    async: false
                });
            };

            var service = {
                dictionary: {},
                setLang: function (lang) {
                    updateDictionary(lang);
                    console.log('Language updated:');
                    console.log($locale.id);
                }
            };
            return service;
        } ]);