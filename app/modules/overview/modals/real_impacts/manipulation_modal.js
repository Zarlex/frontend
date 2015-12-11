/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .factory('RiManipulationModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'modules/overview/modals/templates/real_impacts/manipulation_modal.html',
      controller: 'RiManipulationModalController',
      class: 'real-impacts-modal manipulation'
    });
  })

  .controller('RiManipulationModalController', function ($scope, ImpactIcons) {
    $scope.ImpactIcons = ImpactIcons;
  });