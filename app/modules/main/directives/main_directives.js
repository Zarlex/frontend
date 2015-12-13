/**
 * Created by zarges on 14/11/15.
 */
'use strict';

var getRelativeScrollPos = function (axis) {
  var screenHeight = angular.element(window).height(),
    scrollPos = window['scroll' + axis.toUpperCase()];

  return scrollPos / screenHeight * 100;
};

angular.module('ZeroDay')
  .directive('zdAppendClassAccordingToRoute', function ($rootScope, $route) {
    return {
      link: function (scope, el) {
        var orgClasses = el.attr('class'),
          processFns = [];

        scope.$on('$routeChangeSuccess', function (event, current) {
          el.attr('class', orgClasses);
          el.addClass(current.cssClasses);
        });


        scope.$on('$locationChangeStart', function (event, nextPage) {
          if ($route.current.animationClasses && _.isArray($route.current.animationClasses.to)) {
            $route.current.animationClasses.to.forEach(function (animation) {
              if (animation.route && nextPage.match(animation.route)) {
                el.addClass(animation.classes);

                if (animation.process && typeof animation.process === 'function') {

                  processFns.push(function () {
                    animation.process.call(this, el, event, nextPage);
                  });
                }
              }
            });
          }
        });

        $rootScope.$on('$routeChangeSuccess', function () {
          processFns.forEach(function (processFn) {
            processFn();
          });
          processFns = [];
        });

        scope.$on('$routeChangeSuccess', function (event, params, previousPage) {
          if (previousPage) {
            var prevPage = previousPage.originalPath;
            if ($route.current.animationClasses && _.isArray($route.current.animationClasses.from)) {
              $route.current.animationClasses.from.forEach(function (animation) {
                if (animation.route && prevPage.match(animation.route)) {
                  el.addClass(animation.classes);

                  if (animation.process && typeof animation.process === 'function') {
                      animation.process.call(this, el, event);
                  }
                }
              });
            }
          }
        });
      }
    };
  })

  .directive('zdSetBackgroundPositionOnScroll', function () {
    return {
      scope: {
        parallaxOffset: '=',
        noOverlay: '='
      },
      link: function (scope, el) {
        var setBackgroundPosition = function (posY) {
          if (scope.noOverlay) {
            el.css('background-position', '0 ' + posY + ', 0 0');
          } else {
            el.css('background-position', '0 0, 0 ' + posY);
          }
        };

        var throttled = _.throttle(function () {
          var relativeScrollPos = getRelativeScrollPos('Y'),
            parallaxOffset = scope.parallaxOffset || 1,
            backgroundPosY = relativeScrollPos * parallaxOffset * -1;

          setBackgroundPosition(backgroundPosY + '%');
        }, 10);

        angular.element(window).on('scroll', throttled);
      }
    };
  })

  .directive('zdSetPropertyToScrollPos', function () {
    return {
      link: function (scope, el, attrs) {
        var property = attrs.property,
          unit = attrs.unit || 'px',
          axis = (attrs.axis || 'y').toUpperCase(),
          parallaxOffset = parseInt((attrs.parallaxOffset || 1), 10);

        var setProperty = function (property, val) {
          el.css(property, val);
        };

        var throttled = _.throttle(function () {
          var relativeScrollPos = window['scroll' + axis],
            offsetPos = relativeScrollPos * parallaxOffset;

          setProperty(property, offsetPos + unit);
        }, 10);

        angular.element(window).on('scroll', throttled);
      }
    };
  })

  .directive('zdFadeInOnScroll', function () {
    return {
      link: function (scope, el, attrs) {
        var max;

        if (attrs.maxOpacity) {
          max = parseInt(attrs.maxOpacity, 10);
        }

        var throttled = _.throttle(function () {
          var relativeScrollPos = getRelativeScrollPos('Y');
          if (max) {
            var opaVal = (relativeScrollPos / 100 * max);
            opaVal = opaVal > max ? max : opaVal;
            el.css('opacity', opaVal / 100);
          } else {
            el.css('opacity', relativeScrollPos / 100);
          }
        }, 10);

        angular.element(window).on('scroll', throttled);
      }
    }
  })

  .directive('zdFadeToColorOnScroll', function () {
    return {

      link: function (scope, el, attrs) {
        var maxOpacity = attrs.maxOpacity ? parseInt(attrs.maxOpacity, 10) : 100,
          color = attrs.color || '#fff',
          _rgbaColor = {},
          _orgBackgroundImg = '';

        var rgbaToString = function (r, g, b, a) {
          return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        };

        var rgbaToGradient = function (rgbaStr) {
          return 'linear-gradient(' + rgbaStr + ' 0%, ' + rgbaStr + ' 100%)';
        };

        var getOrgBackgroundImage = function (el) {
          if (el.css('background-image') !== 'none') {
            return el.css('background-image');
          } else {
            var bgColor = el.css('background-color');
            return rgbaToGradient(bgColor);
          }
        };

        var getRgbFromHex = function (hex) {
          var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
          hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
          });

          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          } : null;
        };

        var attachOverlayToEl = function (el, orgImg, overlayGradient) {
          var newBgImg = overlayGradient + ',' + orgImg;
          el.css('background-image', newBgImg);
        };

        var setBackgroundColor = function (opacity) {
          if (!_orgBackgroundImg) {
            _orgBackgroundImg = getOrgBackgroundImage(el);
          }

          var overlayRgbaStr = rgbaToString(_rgbaColor.r, _rgbaColor.g, _rgbaColor.b, opacity),
            overlayGradient = rgbaToGradient(overlayRgbaStr);

          attachOverlayToEl(el, _orgBackgroundImg, overlayGradient);
        };

        var throttled = _.throttle(function () {
          var relativeScrollPos = getRelativeScrollPos('y'),
            opacityVal = relativeScrollPos > maxOpacity ? maxOpacity : relativeScrollPos;

          setBackgroundColor(Math.floor(opacityVal / 10) / 10);

        });

        _rgbaColor = getRgbFromHex(color);
        angular.element(window).on('scroll', throttled);
        el.on('scroll', throttled);
      }
    };
  })

  .directive('zdCalculateStaticWidth', function () {
    return {
      link: function (scope, el, attrs) {
        var setWidth = function () {
          var windowWidth = angular.element(window).width(),
            factor = parseInt(attrs.zdCalculateStaticWidth, 10),
            width = windowWidth * (factor / 100);

          el.css('width', width);
        };

        var throtteledFn = _.throttle(setWidth, 1000);

        setWidth();
        angular.element(window).resize(throtteledFn);
      }
    };
  })

  .directive('zdCalculateStaticHeight', function () {
    return {
      link: function (scope, el, attrs) {
        var setHeight = function () {
          var windowHeight = angular.element(window).height(),
            factor = parseInt(attrs.zdCalculateStaticHeight, 10),
            height = windowHeight * (factor / 100);

          el.css('height', height);
        };

        var throtteledFn = _.throttle(setHeight, 1000);

        setHeight();
        angular.element(window).resize(throtteledFn);
      }
    };
  })

  .directive('zdGoToPageOnPageEnd', function ($location, $timeout, Icons) {
    return {
      scope: {
        path: '@zdGoToPageOnPageEnd'
      },
      template: '<div class="zd-go-to-page-on-page-end" ng-click="goToPath()"><span class="{{Icons.getIconById(\'ARROW_DOWN\')}}"></span></div>',
      link: function (scope, el, attrs) {

        var bottomDelta = 0;

        scope.Icons = Icons;

        scope.goToPath = function(){
          $location.path(scope.path);
        };

        var bottomIsReached = function(){
          var scrollTop = angular.element(window).scrollTop(),
              windowHeight = angular.element(window).height(),
              documentHeight = angular.element(document).height();

          return scrollTop + windowHeight === documentHeight;
        };

        var wheelHandler = function (event) {
          if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            bottomDelta = 0;
          }
          else if (bottomIsReached() && scope.path) {
            if(bottomDelta < event.originalEvent.wheelDelta*10*-1){
              bottomDelta += event.originalEvent.wheelDelta*-1;
            } else {
              angular.element(window).off('mousewheel DOMMouseScroll', wheelHandler);
              $timeout( function(){
                scope.goToPath();
              });
            }
          }
        };

        angular.element(window).on('mousewheel DOMMouseScroll', wheelHandler);

        scope.$on('$destroy', function(){
          angular.element(window).off('mousewheel DOMMouseScroll', wheelHandler);
        });
      }
    };
  });

