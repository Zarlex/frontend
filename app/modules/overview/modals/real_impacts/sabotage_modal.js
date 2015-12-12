/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .factory('RiSabotageModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'modules/overview/modals/templates/real_impacts/sabotage_modal.html',
      controller: 'RiSabotageModalController',
      class: 'real-impacts-modal sabotage'
    });
  })

  .controller('RiSabotageModalController', function ($scope, ImpactIcons) {
    $scope.ImpactIcons = ImpactIcons;
  });