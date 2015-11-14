/**
 * Created by zarges on 14/11/15.
 */
'use strict';

angular.module('ZeroDay')
  .directive('zdAppendClassAccordingToRoute', function () {
    return {
      link: function (scope, elm) {
        var orgClasses = elm.attr('class');
        scope.$on('$routeChangeSuccess', function (event, current) {
          elm.attr('class', orgClasses);
          elm.addClass(current.cssClasses);
        });
      }
    };
  });