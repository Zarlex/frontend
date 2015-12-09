/**
 * Created by zarges on 03/12/15.
 */
'use strict';

angular.module('ZeroDay')

  .directive('zdAffix', function () {
    return {
      restrict: 'A',
      link: function (scope, el, attrs) {
        el.affix({
          offset: {
            top: function () {
              var offsetTop = el.offset().top,
                manualOffset = attrs.offset;

              return (this.top = offsetTop - manualOffset);
            }
          }
        })

      }
    };
  });