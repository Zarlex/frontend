/**
 * Created by zarges on 03/12/15.
 */
'use strict';

angular.module('ZeroDay')

  .directive('zdWizard', function () {
    return {
      restrict: 'A',
      scope: {
        wizard: '=zdWizard'
      },
      transclude: true,
      template: '<div ng-transclude class="zd-wizard"></div>',
      controller: function ($scope) {

        var wizard = $scope.wizard;

        this.registerStep = function (scope, id) {
          wizard._registerStep(scope, id);
        };

        this.unRegisterStep = function (scope) {
          wizard._unRegisterStep(scope);
        };

        $scope.$on('$destroy', function () {
          wizard.destroy();
        });

      }
    };
  })

  .directive('zdWizardStep', function () {
    return {
      restrict: 'A',
      scope: true,
      transclude: true,
      replace: true,
      require: '^zdWizard',
      template: '<div class="zd-wizard-step" ng-class="{active:_isActive}" ng-show="_isActive"><div class="zd-wizard-step-inner" ng-transclude ng-if="_isActive"></div></div>',
      link: function (scope, el, attr, mwWizardCtrl) {
        scope._isActive = false;
        attr.title = attr.title || 'noname';
        attr.$observe('title', function (title) {
          if (title && title.length > 0) {
            scope.title = title;
          }
          if(attr.stepGroup){
            scope.stepGroup = attr.stepGroup;
          }
          mwWizardCtrl.registerStep(scope, attr.id);
        });

        scope.$on('$destroy', function () {
          mwWizardCtrl.unRegisterStep(scope);
        });
      }
    };
  });