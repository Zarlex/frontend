/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .factory('RiInfrastructureModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'modules/overview/modals/templates/real_impacts/infrastructure_modal.html',
      controller: 'RiInfrastructureModalController',
      class: 'real-impacts-modal infrastructure'
    });
  })

  .controller('RiInfrastructureModalController', function ($scope, $http, ImpactIcons) {
    $scope.ImpactIcons = ImpactIcons;
    $scope.expertQuotes = [];

    $http.get('static-content/expert-quotes/real-impacts-ov-3.json').then(function (rsp) {
      $scope.expertQuotes = rsp.data.experts;
    });
  });