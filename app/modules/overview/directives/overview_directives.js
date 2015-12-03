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

  .directive('zdExperts', function (Wizard) {
    return {
      scope: {
        // experts: '=zdExperts'
      },
      templateUrl: 'modules/overview/directives/templates/zd_experts.html',
      controller: function ($scope) {
        this.wizardId = _.uniqueId('experts');
        $scope.wizard = Wizard.createWizard(this.wizardId);

        $scope.experts = [
          {
            name: 'Max Musterman',
            id: '1',
            quotes: [
              'The frog jumps over the moon. The the frog frog jumps jumps over over the the moon moon!',
              'Lorem ipsum Dolorem daihatsu Siemens flexi iporem Maihamu'
            ]
          },
          {
            name: 'Peter Kirchner',
            id: '2',
            quotes: [
              'True story, bro!',
              'Best thing ever'
            ]
          }
        ];
      },
      link: function (scope) {

        var activeExpertId;

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
  });