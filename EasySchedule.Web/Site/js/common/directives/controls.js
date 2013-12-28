angular.module('controls', [])
    .directive("datepicker", ['$rootScope', function ($rootScope) {
        angular.element(document).bind('click', function (event) {
            if (!(angular.element(event.target).hasClass('ui-datepicker') || $(event.target).parents('.date').length > 0 || $(event.target).parents('.ui-datepicker-header').length > 0)) {
                angular.element('.datepicker-div').addClass("ng-hide");
                angular.element('.gor-arrow').removeClass('open-true').addClass('open-false');
                event.stopPropagation();
                return true;
            }
            return true;
        });
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.datepicker(
                    {
                        onSelect: function (dateText) {
                            scope.$apply(function () {
                                ngModel.$setViewValue(dateText);
                            });
                            angular.element('.datepicker-div').addClass("ng-hide");
                            angular.element('.gor-arrow').removeClass('open-true').addClass('open-false');
                        }
                    }
                );


                scope.$watch(attrs.ngModel, function () {
                    element.datepicker("setDate", ngModel.$modelValue);
                });
            }
        };
    } ])
    .directive("autoResize", function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.autoResize({ extraSpace: 0 });
            }
        };
    })
    .directive("timepicker",['$timeout', function ($timeout) {
        var times =[];
        var k = 0;
        for (var i = 0; i < 24; i++) {
            if (i < 10) {
                times.push({ val: "0" + i + ":00 ", hours: i, minutes: 0, id: k++ });
                times.push({ val: "0" + i + ":15 ", hours: i, minutes: 15, id: k++ });
                times.push({ val: "0" + i + ":30 ", hours: i, minutes: 30, id: k++ });
                times.push({ val: "0" + i + ":45 ", hours: i, minutes: 45, id: k++ });
            } else {
                times.push({ val: i + ":00 ", hours: i, minutes: 0, id: k++ });
                times.push({ val: i + ":15 ", hours: i, minutes: 15, id: k++ });
                times.push({ val: i + ":30 ", hours: i, minutes: 30, id: k++ });
                times.push({ val: i + ":45 ", hours: i, minutes: 45, id: k++ });
            }
        }
        function getTimesIndex(datetime) {
            datetime = new Date(datetime);
            var hours = datetime.getHours();
            var minutes = datetime.getMinutes();
            if (minutes >= 0 && minutes < 15) minutes = 0;
            if (minutes >= 15 && minutes < 30) minutes = 15;
            if (minutes >= 30 && minutes < 45) minutes = 30;
            if (minutes >= 45 && minutes < 60) minutes = 45;

            for (var i = 0; i < times.length; i++) {
                if (hours == times[i].hours && minutes == times[i].minutes) {
                    console.log(times[i].val);
                    return i;
                }
            }
        };
        return {
            restrict: 'A',
            template:'<select  ng-model="timeItem" ng-options="time.val for time in times" ></select>',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                scope.times = times;
                scope.timeItem = scope.times[0];

                scope.$watch('timeItem', function(val){
                    $timeout(function(){
                        var date = ngModel | new Date();
                        scope.$apply(function () {
                            ngModel.$setViewValue(new Date(new Date(new Date(date).setMinutes(scope.timeItem.minutes)).setHours(scope.timeItem.hours)));
                        });
                        console.log(JSON.stringify(ngModel))
                    });
                });
                scope.$watch(attrs.ngModel, function () {
                    scope.timeItem = scope.times[getTimesIndex(ngModel.$modelValue)];
                });
            }
        };
    }])

    .directive("dateTimePicker",['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            template:'<div class="date-time-picker"><input type="text" ng-model="date" datepicker></input>' +
                '<div timepicker ng-model="time"></div></div>',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                scope.date = new Date();
                scope.$watch('time', function(val){
                    $timeout(updateModel);
                });

                scope.$watch('date', function(val){
                    $timeout(updateModel);
                });
                function updateModel(){
                    scope.$apply(function () {
                        ngModel.$setViewValue(new Date(new Date(new Date(scope.date)
                            .setHours(scope.time.getHours())).setMinutes(scope.time.getMinutes())));
                    });
                };
                scope.$watch(attrs.ngModel, function () {
                    var date = new Date(ngModel.$modelValue);
                    if(scope.time != date ){
                        scope.time = date;
                    }
                    if(scope.date != date){
                        scope.date = date;
                    }
                });
            }
        };
    }])


