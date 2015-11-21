/**
 * Created by zarges on 14/11/15.
 */
'use strict';

var getRelativeScrollPos = function () {
  var screenHeight = angular.element(window).height(),
    scrollPos = window.scrollY;
  return scrollPos / screenHeight * 100;
};

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
  })

  .directive('zdSetBackgroundPositionOnScroll', function () {
    return {
      scope: {
        parallaxOffset: '='
      },
      link: function (scope, el) {
        var setBackgroundPosition = function (posY) {
          el.css('background-position', '0 ' + posY + ', 0 0');
        };

        var throttled = _.throttle(function () {
          var relativeScrollPos = getRelativeScrollPos(),
            parallaxOffset = scope.parallaxOffset || 1,
            backgroundPosY = relativeScrollPos * parallaxOffset * -1;

          setBackgroundPosition(backgroundPosY + '%');
        }, 10);

        angular.element(window).on('scroll', throttled);
      }
    };
  })

  .directive('zdFadeToColorOnScroll', function () {
    return {
      scope: {
        maxOpactiy: '=',
        color: '@'
      },
      link: function (scope, el) {
        var setBackgroundColor = function(color, opacity){
          el.css({
            backgroundColor: color,
            opacity: opacity
          });
        };

        var throttled = _.throttle(function () {
          var relativeScrollPos = getRelativeScrollPos(),
              opacityVal = relativeScrollPos > scope.maxOpactiy ? scope.maxOpactiy : relativeScrollPos,
              color = scope.color || 'white';

          setBackgroundColor(color,opacityVal/100 );

        });
        angular.element(window).on('scroll', throttled);
      }
    };
  })

  .directive('zdCalculateStaticWidth', function () {
    return {
      link: function (scope, el, attrs) {
        var setWidth = function(){
          var windowWidth = angular.element(window).width(),
            factor = parseInt(attrs.zdCalculateStaticWidth,10),
            width = windowWidth * (factor / 100);

          el.css('width',width);
        };

        var throtteledFn = _.throttle(setWidth,1000);

        setWidth();
        angular.element(window).resize(throtteledFn)
      }
    };
  });