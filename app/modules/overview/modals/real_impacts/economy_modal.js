/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .factory('RiEconomyModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'modules/overview/modals/templates/real_impacts/economy_modal.html',
      controller: 'RiEconomyModalController',
      class: 'real-impacts-modal economy'
    });
  })

  .controller('RiEconomyModalController', function ($scope, $http, ImpactIcons) {
    $scope.ImpactIcons = ImpactIcons;
    $scope.expertQuotes = [];

    $http.get('static-content/expert-quotes/real-impacts-ov-2.json').then(function (rsp) {
      $scope.expertQuotes = rsp.data.experts;
    });
  });