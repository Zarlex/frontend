/**
 * Created by zarges on 03/12/15.
 */
'use strict';

angular.module('ZeroDay')

  .directive('zdSpyHolder', function(){
    return {
      restrict: 'A',
      controller: function ($scope) {
        $scope.spies = [];
        this.registerSpy = function (spyObj) {
          $scope.spies.push(spyObj);
        };
      },
      link: function (scope, elem, attrs) {
        var bodyEl   = angular.element(document.body),
            id = attrs.id;

        if(!id){
          throw new Error('And ID has to be defined as attribute');
        }

        bodyEl.scrollspy({
          target: '#'+id
        });

        bodyEl.data()['bs.scrollspy'].activate = function () {
          $bootstrapActivate.apply(bodyEl.data()['bs.scrollspy'], arguments);
        };
      }
    };
  })

  .directive('zdSpy', function ($location, $anchorScroll) {
    return {
      restrict: "A",
      require: "^zdSpyHolder",
      link: function(scope, elem, attrs, zdSpyHolderCtrl) {
        elem.click(function (ev) {
          ev.stopImmediatePropagation();
          $location.hash(attrs.zdSpy);
          $anchorScroll();
        });

        elem.find('a').on('click', function(ev){
          ev.preventDefault();
        });

        zdSpyHolderCtrl.registerSpy(elem);

        elem.on('activate.bs.scrollspy', function(){
          console.log(elem);
        })
      }
    };
  });

/* jshint ignore:start */
// This is the orginal bootstrap activate implementation with the only
// modification that it just removes the active class of the parent nav el and
// NOT from ALL parent elements!
var $bootstrapActivate = function (target) {
  this.activeTarget = target

  $(this.selector)
    .parents('.nav') // This is the modification part
    .find('.active')
    .removeClass('active')

  var selector = this.selector
    + '[data-target="' + target + '"],'
    + this.selector + '[href="' + target + '"]'

  var active = $(selector)
    .parents('li')
    .addClass('active')

  if (active.parent('.dropdown-menu').length) {
    active = active
      .closest('li.dropdown')
      .addClass('active')
  }

  active.trigger('activate')
}
/* jshint ignore:end */