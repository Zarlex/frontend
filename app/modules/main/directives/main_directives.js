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

      link: function (scope, el, attrs) {
        var maxOpacity = attrs.maxOpacity ? parseInt(attrs.maxOpacity,10) : 100,
            color = attrs.color || '#fff',
            _rgbaColor = {},
            _orgBackgroundImg = '';

        var rgbaToString = function(r,g,b,a){
          return 'rgba('+r+','+g+','+b+','+a+')';
        };

        var rgbaToGradient = function(rgbaStr){
          return 'linear-gradient('+rgbaStr+' 0%, '+rgbaStr+' 100%)';
        };

        var getOrgBackgroundImage = function(el){
          if(el.css('background-image') !== 'none'){
            return el.css('background-image');
          } else {
            var bgColor = el.css('background-color');
            return rgbaToGradient(bgColor);
          }
        };

        var getRgbFromHex = function(hex){
          var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
          hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
          });

          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          } : null;
        };

        var attachOverlayToEl = function(el, orgImg, overlayGradient){
          var newBgImg = overlayGradient + ',' + orgImg;
          el.css('background-image', newBgImg);
        };

        var setBackgroundColor = function(opacity){
          if(!_orgBackgroundImg){
            _orgBackgroundImg = getOrgBackgroundImage(el);
          }

          var overlayRgbaStr = rgbaToString(_rgbaColor.r,_rgbaColor.g,_rgbaColor.b,opacity),
              overlayGradient = rgbaToGradient(overlayRgbaStr);

          attachOverlayToEl(el, _orgBackgroundImg, overlayGradient);
        };

        var throttled = _.throttle(function () {
          var relativeScrollPos = getRelativeScrollPos(el),
              opacityVal = relativeScrollPos > maxOpacity ? maxOpacity : relativeScrollPos;

          setBackgroundColor(Math.floor(opacityVal/10 ) / 10 );

        });

        _rgbaColor =getRgbFromHex(color);
        angular.element(window).on('scroll', throttled);
        el.on('scroll', throttled);
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
        angular.element(window).resize(throtteledFn);
      }
    };
  });