/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .factory('RiSpyModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'modules/overview/modals/templates/real_impacts/spy_modal.html',
      controller: 'RiSpyModalController',
      class: 'real-impacts-modal spy'
    });
  })

  .controller('RiSpyModalController', function ($scope, ImpactIcons) {
    $scope.ImpactIcons = ImpactIcons;
  });