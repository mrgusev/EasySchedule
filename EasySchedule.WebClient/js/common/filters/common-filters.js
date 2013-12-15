angular.module('common.filters', [])
    .filter('memberStatus', ['$rootScope', function ($rootScope) {
        return function (input) {
            var result = "";
            switch (input) {
                case 1:
                    result = $rootScope.dictionary['Invited'];
                    break;
                case 2:
                    result = $rootScope.dictionary['Accepted'];
                    break;
                case 3:
                    result = $rootScope.dictionary['Requested'];
                    break;
                case 4:
                    result = $rootScope.dictionary['Banned'];
                    break;
                case 5:
                    result = $rootScope.dictionary['Cancelled'];
                    break;
            }
            return result;
        };
    } ])
    .filter('response', ['$rootScope', function ($rootScope) {
        return function (input) {
            var result = "";
            switch (input) {
                case enums.response.yes:
                    result = $rootScope.dictionary['You_responded_Yes'];
                    break;
                case enums.response.maybe:
                    result = $rootScope.dictionary['You_responded_Maybe'];
                    break;
                case enums.response.no:
                    result = "You responded No";
                    break;
                case enums.response.notReplied:
                    result = "You have not replied";
                    break;
            }
            return result;
        };
    } ])
    .filter('link', function () {
        return function (input) {
            if (!_.contains(input, 'http')) {
                input = 'http://' + input;
            }
            return input;
        };
    })
    .filter('cut', function () {
        return function (input, param) {
            if (input.length > param && input.length > 0) {
                input = input.slice(0, param) + '..';
            }
            if (input == "undefined") {
                input = "";
            }
            return input;
        }
    })
    .filter('smartdate', ['$rootScope', '$filter', function ($rootScope, $filter) {
        return function (input) {
            var inputDate = new Date(input);
            var now = new Date();
            if (inputDate.getDate() == now.getDate() && inputDate.getMonth() == now.getMonth() && inputDate.getYear() == now.getYear())
                return $rootScope.dictionary['TODAY'];
            else {
                var str = inputDate.toDateString();
                if (inputDate.getYear() == now.getYear()) {
                    str = str.substring(0, str.length - 4);
                }
                return $filter('localeDate')(str, true);
            }
        };
    } ])
    .filter('timespan', ['$rootScope', function ($rootScope) {
        return function (input) {
            if (input < 0)
                return "";
            var minutes = input / 1000 / 60;
            var hours = Math.floor(minutes / 60);
            minutes = Math.floor(minutes);
            if (hours < 1) {
                return minutes + $rootScope.dictionary['minutes'];
            } else if (minutes % 60 == 0) {
                return hours + $rootScope.dictionary['hours'];
            } else {
                minutes = minutes - hours * 60;
                return hours + $rootScope.dictionary['hours'] + ' ' + minutes + $rootScope.dictionary['minutes'];
            }
        };
    } ])
    .filter('uppercase', function () {
        return function (input) {
            if (input) {
                return input.toUpperCase();
            } else {
                return '';
            }
        };
    }).filter('localeDate', ['$rootScope', function ($rootScope) {
        return function (input, isSmart) {
            if ($rootScope.profile.locale == 'no') {
                var day = input.substr(0, 3), month;
                if (isSmart) {
                    month = input.substr(4, 3);
                }
                else {
                    month = input.split(' ')[2];
                }
                return input.replace(day, $rootScope.dictionary[day]).replace(month, $rootScope.dictionary[month]);
            }
            return input;
        };
    } ]).filter('enDate', ['$rootScope', function ($rootScope) {
        return function (input) {
            if (!input) return input;
            if ($rootScope.profile.locale == 'no') {
                var days = {
                    "Man": "Mon",
                    "Tir": "Tue",
                    "Ons": "Wed",
                    "Tor": "Thu",
                    "Fre": "Fri",
                    "Lør": "Sat",
                    "Søn": "Sun"

                };
                var months = {
                    "Jan": "Jan",
                    "Feb": "Feb",
                    "Mar": "Mar",
                    "Apr": "Apr",
                    "Mai": "May",
                    "Jun": "Jun",
                    "Jul": "Jul",
                    "Aug": "Aug",
                    "Sep": "Sep",
                    "Oct": "Oct",
                    "Nov": "Nov",
                    "Des": "Dec"
                };
                var day = input.substr(0, 3);
                var month = input.split(' ')[2];
                return input.replace(day, days[day]).replace(month, months[month]);
            }
            return input;
        };
    } ]);
