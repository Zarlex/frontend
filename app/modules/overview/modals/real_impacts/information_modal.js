/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .factory('RiInformationModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'modules/overview/modals/templates/real_impacts/information_modal.html',
      controller: 'RiInformationModalController',
      class: 'real-impacts-modal information'
    });
  })

  .controller('RiInformationModalController', function ($scope, $http, ImpactIcons) {
    $scope.ImpactIcons = ImpactIcons;
    $scope.expertQuotes = [];

    $http.get('static-content/expert-quotes/real-impacts-ov-1.json').then(function (rsp) {
      $scope.expertQuotes = rsp.data.experts;
    });
  });