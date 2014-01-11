angular.module('common.filters', [])
    .filter('link', function () {
        return function (input) {
            if (!_.contains(input, 'http')) {
                input = 'http://' + input;
            }
            return input;
        };
    })
    .filter('smartdate', ['$rootScope', '$filter', function ($rootScope, $filter) {
        var shortDayNames=[
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб',
            'Вс'
        ];
        return function (input) {
            var inputDate = new Date(input);
            var now = new Date();
            if (inputDate.getDate() == now.getDate() && inputDate.getMonth() == now.getMonth() && inputDate.getYear() == now.getYear()){
                return 'Сегодня';
            } else if(inputDate.getDate() == now.getDate()-1 && inputDate.getMonth() == now.getMonth() && inputDate.getYear() == now.getYear()){
                return 'Вчера';
            } else {
                var str = $filter('date')(inputDate, 'dd.MM.yyyy');
//                if (inputDate.getYear() == now.getYear()) {
//                    str = shortDayNames[inputDate.getDay()] + ' ' + inputDate.toLocaleDateString().substring(0, str.length-5);
//                }
                return str;
            }
        };
    } ])
    .filter('smartdatetime', ['$rootScope', '$filter', function ($rootScope, $filter) {
        return function (input) {
            var inputDate = new Date(input);
            var now = new Date();
            if(Math.abs(now-inputDate) < 1000*60*5){
                return 'сейчас';
            }else if (inputDate.getDate() == now.getDate() && inputDate.getMonth() == now.getMonth() && inputDate.getYear() == now.getYear()){
                return 'сегодня в ' + $filter('date')(inputDate, 'HH:mm');
            } else if(inputDate.getDate() == now.getDate()-1 && inputDate.getMonth() == now.getMonth() && inputDate.getYear() == now.getYear()){
                return 'вчера в '+ $filter('date')(inputDate, 'HH:mm');
            } else {
                var str = $filter('date')(inputDate, 'dd.MM.yyyy');
                if (inputDate.getYear() == now.getYear()) {
                    str = str.substring(0, str.length-5);
                }
                str+= 'в ' + $filter('date')(inputDate, 'HH:mm');
                return str;
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
    .filter('floatzero', ['$rootScope', '$filter', function ($rootScope, $filter) {
        return function (input) {
            if(Math.round(input) == input){
                return input.toString() + '.0'
            } else{
                return input;
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
    });
