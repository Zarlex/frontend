/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .factory('vwAttributationModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'modules/overview/modals/templates/virtual_warfare/attributation_modal.html',
      controller: 'VwAttributationModalController',
      class: 'virtual-warfare-modal attributation'
    });
  })

  .controller('VwAttributationModalController', function ($scope, $http, WarfareIcons) {
    $scope.WarfareIcons = WarfareIcons;
    $scope.expertQuotes = [];

    $http.get('static-content/expert-quotes/virtual-warfare-ov-3.json').then(function (rsp) {
      $scope.expertQuotes = rsp.data.experts;
    });
  });