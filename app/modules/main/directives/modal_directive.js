/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay')

  .directive('zdModal', function (Modal) {
    return {
      restrict: 'A',
      scope: {
        title: '@',
        icon: '@'
      },
      transclude: true,
      templateUrl: 'modules/main/directives/templates/zd_modal.html',
      link: function (scope) {
        scope.$emit('COMPILE:FINISHED');

        scope.close = function(){
          Modal.getOpenedModals()[0].hide();
        }
      }
    };
  })

  .directive('zdModalBody', function () {
    return {
      restrict: 'A',
      transclude: true,
      replace: true,
      template: '<div class="modal-body clearfix" ng-transclude></div>'
    };
  })

  .directive('zdModalFooter', function () {
    return {
      restrict: 'A',
      transclude: true,
      replace: true,
      template: '<div class="modal-footer" ng-transclude></div>'
    };
  });