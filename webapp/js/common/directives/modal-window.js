/**
 * Created with JetBrains WebStorm.
 * User: Kirill
 * Date: 15.12.13
 * Time: 9:57
 * To change this template use File | Settings | File Templates.
 */
angular.module('controls')
    .directive("modalWindow", function () {
        return {
            restrict: 'A',
            transclude: true,
            scope:{
                isopen:'='
            },
            template:"<div class='md-modal md-effect-9' id='new-sugar-modal'><div class='md-content'> <div ng-transclude></div></div></div>",
            link: function (scope, element, attrs) {
                var overlay = $( '.md-overlay' );
                var modal = element.children( '.md-modal' );
                var close = modal.children( '.md-close' );


                function removeModal( hasPerspective ) {
                    modal.removeClass( 'md-show' );
                    overlay.removeClass('show')
                    if( hasPerspective ) {
                        classie.remove( document.documentElement, 'md-perspective' );
                    }
                }

//                function removeModalHandler() {
//                    removeModal( classie.has( el, 'md-setperspective' ) );
//                }

//                close.addEventListener( 'click', function( ev ) {
//                    ev.stopPropagation();
//                    removeModalHandler();
//                });

                scope.$watch('isopen', function () {
                    console.log(111)
                    if(scope.isopen){
                        modal.addClass ('md-show' );
                        overlay.addClass('show')
                       // overlay.removeEventListener( 'click', removeModalHandler );
                       // overlay.addEventListener( 'click', removeModalHandler );

                       // if( classie.has( el, 'md-setperspective' ) ) {
//                            setTimeout( function() {
//                                classie.add( document.documentElement, 'md-perspective' );
//                            }, 25 );
                       // }
                    } else{
                        removeModal()
                        //element.removeClass('md-show')
                    }
                });
            }
        };
    })