
angular.module('validation',[])
    .directive('uiValidateEquals', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                function validateEqual(myValue, otherValue) {
                    if (myValue === otherValue) {
                        ctrl.$setValidity('equal', true);
                        return myValue;
                    } else {
                        ctrl.$setValidity('equal', false);
                        return undefined;
                    }
                }

                scope.$watch(attrs.uiValidateEquals, function(otherModelValue) {
                    validateEqual(ctrl.$viewValue, otherModelValue);
                });

                ctrl.$parsers.unshift(function(viewValue) {
                    return validateEqual(viewValue, scope.$eval(attrs.uiValidateEquals));
                });

                ctrl.$formatters.unshift(function(modelValue) {
                    return validateEqual(modelValue, scope.$eval(attrs.uiValidateEquals));
                });
            }
        };
});

angular.module('controls', [])
    .directive('loader', ['$rootScope', function ($rootScope) {
        var linker = function (scope, element) {
            element.hide();
            scope.$watch(scope.loading, function () {
                if (scope.loading) {
                    element.show();
                }
                else {
                    element.hide();
                }
            });
        };
        return {
            scope: {
                loading: "="
            },
            templateUrl: "js/common/directives/loader.xhtml",
            restrict: 'A',
            link: linker
        }
    } ])
    .directive('counters', function () {
        var linker = function (scope, element, attrs, ctrl) {
            scope.$watch(scope.countersModel, function () {
                element.find('.yes-counter').html(scope.countersModel.yes);
                element.find('.no-counter').html(scope.countersModel.no);
                element.find('.maybe-counter').html(scope.countersModel.maybe);
                element.find('.not-replied-counter').html(scope.countersModel.notReplied);
            });
        };
        return {
            scope: {
                countersModel: '='
            },
            templateUrl: "js/common/directives/counters.xhtml",
            restrict: 'A',
            link: linker
        }
    })
    .directive('expander', function () {
        var linker = function () {

        };
        return {
            scope: {},
            templateUrl: "js/common/directives/expander.xhtml",
            transclude: true
        }
    })
    .directive('focusMe', function ($timeout) {
        return {
            scope: { trigger: '@focusMe' },
            link: function (scope, element) {
                scope.$watch('trigger', function (value) {
                    if (value === "true") {
                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                });
            }
        };
    })
    .directive('popup', function () {
        var linker = function (scope, element, attrs, ctrl) {
            scope.$watch(scope.countersModel, function () {
                element.find('.yes-counter').html(scope.countersModel.yes);
                element.find('.no-counter').html(scope.countersModel.no);
                element.find('.maybe-counter').html(scope.countersModel.maybe);
                element.find('.not-replied-counter').html(scope.countersModel.notReplied);
            });
        };
        return {
            scope: {
                countersModel: '='
            },
            templateUrl: "js/common/directives/counters.xhtml",
            restrict: 'A',
            link: linker
        }
    })
    .directive('editableSelect', function ($timeout) {
        var linker = function (scope, element, attrs, ctrl) {
            var model = attrs['ngModel'];
            var isInit = 0;
            scope.$watch(model, function () {
                isInit++;
                if (isInit < 2) {
                    element.editableSelect({
                        bg_iframe: true,
                        case_sensitive: false,
                        items_then_scroll: 10
                    });
                    element.val(model.val);
                }
            });
        };
        return {
            restrict: 'A',
            link: linker,
            terminal: true
        }
    })
    .directive("doubleSubmit", function () {
        return {
            restrict: 'A',
            scope: { login: "&doubleSubmit" },
            link: function (scope, element, attrs) {
                element.submit(function () {
                    // Block the form from being submitted until validation passes.
                    if (scope.form.$invalid) {
                        return false;
                    }

                    // Once validation passes, call login() on the controller which will call the server
                    // then upon success, "success_callback" will be executed, causing the form to submit to the url we want to
                    // redirect to. This is a hack to get Chrome's "remember password" feature to work
                    scope.login({
                        user: scope.user,
                        success_callback: function (url) {
                            element.attr("action", url);
                            element.submit();
                        }
                    });
                })
            }
        }
    })
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
                        },
                        firstDay: 1,
                        dayNamesMin: [
                            $rootScope.dictionary['sunday_letter'],
                            $rootScope.dictionary['monday_letter'],
                            $rootScope.dictionary['tuesday_letter'],
                            $rootScope.dictionary['wednesday_letter'],
                            $rootScope.dictionary['thursday_letter'],
                            $rootScope.dictionary['friday_letter'],
                            $rootScope.dictionary['saturday_letter']
                        ],
                        monthNames: [
                            $rootScope.dictionary['January'],
                            $rootScope.dictionary['February'],
                            $rootScope.dictionary['March'],
                            $rootScope.dictionary['April'],
                            $rootScope.dictionary['May'], 
                            $rootScope.dictionary['June'],
                            $rootScope.dictionary['July'],
                            $rootScope.dictionary['August'],
                            $rootScope.dictionary['September'],
                            $rootScope.dictionary['October'],
                            $rootScope.dictionary['November'],
                            $rootScope.dictionary['December']
                        ],
                        monthNamesShort: [
                            $rootScope.dictionary['Jan'],
                            $rootScope.dictionary['Feb'],
                            $rootScope.dictionary['Mar'],
                            $rootScope.dictionary['Apr'],
                            $rootScope.dictionary['May'],
                            $rootScope.dictionary['Jun'],
                            $rootScope.dictionary['Jul'],
                            $rootScope.dictionary['Aug'],
                            $rootScope.dictionary['Sep'],
                            $rootScope.dictionary['Oct'],
                            $rootScope.dictionary['Nov'],
                            $rootScope.dictionary['Dec']
                        ],
                        dayNamesShort: [
                            $rootScope.dictionary['Sun'],
                            $rootScope.dictionary['Mon'],
                            $rootScope.dictionary['Tue'],
                            $rootScope.dictionary['Wed'],
                            $rootScope.dictionary['Thu'],
                            $rootScope.dictionary['Fri'],
                            $rootScope.dictionary['Sat']
                        ],
                        dateFormat: 'D d M yy'
                    }
                );


                scope.$watch(attrs.ngModel, function () {
                    element.datepicker("setDate", ngModel.$modelValue);
                });
            }
        };
    } ]).directive("autoResize", function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.autoResize({ extraSpace: 0 });
            }
        };
    }).directive('dropdownSelect', ['$document', function ($document) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                dropdownSelect: '=',
                dropdownModel: '=',
                changeCallback: '&'
            },
            link: function (scope, element, attrs) {
                scope.$watch('dropdownModel', scope.changeCallback, true);
            },
            controller: [
                '$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    var body;

                    $scope.labelField = $attrs.dropdownItemLabel != null ? $attrs.dropdownItemLabel : 'val';
                    this.select = function (selected) {
                        $scope.dropdownModel = selected;
                    };
                    this.defaultVal = $scope.dropdownModel != undefined ? $scope.dropdownModel.val : $scope.dropdownSelect[0];
                    body = $document.find("body");
                    body.bind("click", function () {
                        $element.removeClass('active');
                    });
                    var scrollModdle = $('#startTime .dropdown').height() / 2 - 30;
                    $element.bind('click', function (event) {
                        event.stopPropagation();
                        if (!$element.hasClass('active')) {

                            angular.element('.wrap-dd-select.active').removeClass('active');
                            angular.element('.wrap-dd-select .gor-arrow').addClass('open-false').removeClass('open-true');
                            angular.element('.datepicker-div').addClass("ng-hide");
                            angular.element('.gor-arrow').removeClass('open-true').addClass('open-false');
                            //                            $('#startTime .dropdown').scrollTop(0);
                            var selectList = $('#' + $element.attr('id') + ' .dropdown');
                            var selectLi = selectList.find('li.selected-item');
                            if (selectLi.length > 0) {
                                selectList.scrollTop(0);
                                selectList.scrollTop(selectLi.position().top - scrollModdle);
                            }
                        }
                        $element.toggleClass('active');
                        $element.find('.gor-arrow').toggleClass('open-false').toggleClass('open-true');
                    });
                }
            ],
            template: "<div class='wrap-dd-select'>\n    <span class='selected'>{{dropdownModel[labelField]}}</span>\n <span class='gor-arrow right'></span>\n    <ul class='dropdown'>\n        <li ng-repeat='item in dropdownSelect'\n            dropdown-select-item='item'\n            dropdown-item-label='labelField'>\n        </li>\n    </ul>\n</div>"
        };
    }
]).directive('dropdownSelectItem', [
    function () {
        return {
            require: '^dropdownSelect',
            replace: true,
            scope: {
                dropdownItemLabel: '=',
                dropdownSelectItem: '='
            },
            link: function (scope, element, attrs, dropdownSelectCtrl) {
                scope.selectItem = function () {
                    dropdownSelectCtrl.select(scope.dropdownSelectItem);
                    element.parent().find('.selected-item').removeClass('selected-item');
                    element.addClass('selected-item');
                };
                if (scope.dropdownSelectItem.val == dropdownSelectCtrl.defaultVal) {
                    element.addClass('selected-item');
                }
            },
            template: "<li>\n    <a href=''value='{{dropdownSelectItem.val}}' class='dropdown-item'\ ng-click='selectItem()'>\n        {{dropdownSelectItem[dropdownItemLabel]}}\n    </a>\n</li>"
        };
    }
]).directive('uploadSubmit', ['$parse', '$rootScope', function ($parse, $rootScope) {
    return {
        restrict: 'AC',
        link: function (scope, element, attrs) {
            // Options (just 1 for now)
            // Each option should be prefixed with 'upload-options-' or 'uploadOptions'
            // {
            //    // specify whether to enable the submit button when uploading forms
            //    enableControls: bool
            //
            //    // sets the value of hidden input to their ng-model when the form is submitted
            //    convertHidden
            // }
            var options = {};
            options.enableControls = attrs.uploadOptionsEnableControls;

            if (attrs.hasOwnProperty("uploadOptionsConvertHidden")) {
                // Allow blank or true
                options.convertHidden = attrs.uploadOptionsConvertHidden != "false";
            }

            // submit the form - requires jQuery
            var form = angular.element(element).parents('form');

            // Retrieve the callback function
            var fn = $parse(attrs.uploadSubmit);

            if (!angular.isFunction(fn)) {
                var message = "The expression on the ngUpload directive does not point to a valid function.";
                throw message + "\n";
            }

            element.bind('click', function ($event) {
                // prevent default behavior of click
                if ($event) {
                    $event.preventDefault = true;
                }

                if (element.attr('disabled')) {
                    return;
                }

                // create a new iframe
                var iframe = angular.element("<iframe id='upload_iframe' name='upload_iframe' border='0' width='0' height='0' style='width: 0px; height: 0px; border: none; display: none' />");

                // add the new iframe to application
                form.parent().append(iframe);

                // attach function to load event of the iframe
                iframe.bind('load', function () {
                    // get content using native DOM. use of jQuery to retrieve content triggers IE bug
                    // http://bugs.jquery.com/ticket/13936
                    var nativeIframe = iframe[0];
                    var iFrameDoc = nativeIframe.contentDocument || nativeIframe.contentWindow.document;
                    var content = iFrameDoc.body.innerText || iFrameDoc.body.textContent;
                    try {
                        content = $.parseJSON(content);
                    } catch (e) {
                        if (console) { console.log('WARN: XHR response is not valid json'); }
                    }
                    // if outside a digest cycle, execute the upload response function in the active scope
                    // else execute the upload response function in the current digest
                    if (!scope.$$phase) {
                        scope.$apply(function () {
                            fn(scope, { content: content, completed: true });
                        });
                    } else {
                        fn(scope, { content: content, completed: true });
                    }
                    // remove iframe
                    if (content !== "") { // Fixes a bug in Google Chrome that dispose the iframe before content is ready.
                        setTimeout(function () { iframe.remove(); }, 250);
                    }
                    element.attr('disabled', null);
                    element.attr('title', $rootScope.dictionary['Click_to_start_upload']);
                });

                if (!scope.$$phase) {
                    scope.$apply(function () {
                        fn(scope, { content: $rootScope.dictionary['Please_wait'], completed: false });
                    });
                } else {
                    fn(scope, { content: $rootScope.dictionary['Please_wait'], completed: false });
                }

                var enabled = true;
                if (!options.enableControls) {
                    // disable the submit control on click
                    element.attr('disabled', 'disabled');
                    enabled = false;
                }
                // why do we need this???
                element.attr('title', (enabled ? '[ENABLED]: ' : '[DISABLED]: ') + $rootScope.dictionary['Uploading']);

                // If convertHidden option is enabled, set the value of hidden fields to the eval of the ng-model
                if (options.convertHidden) {
                    form.find(':hidden[ng-model]').each(function () {
                        $(this).attr('value', scope.$eval($(this).attr('ng-model')));
                    });
                }

                form.submit();

            }).attr('title', $rootScope.dictionary['Click_to_start_upload']);
        }
    };
} ])
    .directive('ngUpload', ['$parse', function ($parse) {
        return {
            restrict: 'AC',
            link: function (scope, element, attrs) {

                // Options (just 1 for now)
                // Each option should be prefixed with 'upload-options-' or 'uploadOptions'
                // {
                //    // add the Rails CSRF hidden input to form
                //    enableRailsCsrf: bool
                // }

                var options = {};
                if (attrs.hasOwnProperty("uploadOptionsEnableRailsCsrf")) {
                    // allow for blank or true
                    options.enableRailsCsrf = attrs.uploadOptionsEnableRailsCsrf != "false";
                }

                element.attr("target", "upload_iframe");
                element.attr("method", "post");
                // Append a timestamp field to the url to prevent browser caching results
                var separator = element.attr("action").indexOf('?') == -1 ? '?' : '&';
                element.attr("action", element.attr("action") + separator + "_t=" + new Date().getTime());
                element.attr("enctype", "multipart/form-data");
                element.attr("encoding", "multipart/form-data");

                // If enabled, add csrf hidden input to form
                if (options.enableRailsCsrf) {
                    $("<input />")
                        .attr("id", "upload-csrf-token")
                        .attr("type", "hidden")
                        .attr("name", $('meta[name=csrf-param]').attr('content'))
                        .val($('meta[name=csrf-token]').attr('content'))
                        .appendTo(element);

                }
            }
        };
    } ]);
//    .directive('selectable', function($timeout, $document) {
//
//        var linker = function(scope,element,attrs, ctrl) {
//            var counter = 0;
//            $document.keypress(function(e){
//                scope.collection[counter].activeState = '';
//                if ( e.which == 38 ) {
//                    e.preventDefault();
//                    counter--;
//                }
//                if ( e.which == 40 ) {
//                    e.preventDefault();
//                    counter++;
//                }
//                scope.collection[counter].activeState = 'active';
//            });
//            var timer = false;
//            scope.$watch(scope.collection, function () {
//
//            }); // initialize the watch
//        };
//        return {
//            scope: {
//                collection: '='
//            },
//            transclude: false,
//            restrict:'A',
//            link: linker
//        }
//    });

