/**
 * Created by zarges on 21/11/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .directive('zdOverviewItem', function ($location) {
    return {
      scope: {
        id: '@',
        url: '@',
        logoUrl: '@',
        logoFallbackUrl: '@',
        title: '@',
        copy: '@',
        holderWidth: '@'
      },
      transclude: true,
      replace: true,
      templateUrl: 'modules/overview/directives/templates/zd_overview_item.html',
      link: function (scope) {
        scope.hasUrl = function () {
          return scope.url && scope.url.length > 1;
        };

        scope.open = function () {
          if (scope.hasUrl()) {
            $location.path(scope.url);
          }
        };
      }
    };
  })

  .directive('zdExperts', function (Wizard, ExpertIcons, Icons) {
    return {
      scope: {
        experts: '=zdExperts'
      },
      templateUrl: 'modules/overview/directives/templates/zd_experts.html',
      controller: function ($scope) {
        this.wizardId = _.uniqueId('experts');
        $scope.wizard = Wizard.createWizard(this.wizardId);
      },
      link: function (scope) {

        var activeExpertId;

        scope.expertIcons = ExpertIcons;
        scope.Icons = Icons;

        scope.isQuoteOfExpertVisible = function(expert){
          if(activeExpertId && _.isArray(scope.experts)){
            var activeExpert = _.findWhere(scope.experts,{id:activeExpertId});
            if(activeExpert){
             return activeExpert.id === expert.id;
            }
          }
        };

        scope.gotoFirstQuoteOfExpert = function(expert){
          var steps = scope.wizard.getAllSteps(),
              expertFound = false;

          steps.forEach(function(step){
            if(!expertFound && step.stepGroup === expert.id){
              expertFound = true;
              scope.wizard.gotoStep(step);
            }
          });
        };

        scope.$watch(
          function () {
            return scope.wizard.getCurrentStep();
          },
          function (step) {
            if(step){
              activeExpertId = step.stepGroup;
            }
          }
        );

      }
    };
  })

  .directive('zdFillIconOnHover', function(){
    return {
      scope: {
        id: '@zdFillIconOnHover',
        constants: '='
      },
      template: '<span class="{{getIcon()}}" ng-mouseover="isHover = true" ng-mouseleave="isHover = false"></span>',
      link: function(scope){
        scope.isHover = false;
        scope.getIcon = function(){
          if(scope.isHover){
            return scope.constants.getIconById(scope.id+'_F');
          } else {
           return scope.constants.getIconById(scope.id);
          }
        }
      }
    }
  });