/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .factory('vwMoneyModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'modules/overview/modals/templates/virtual_warfare/money_modal.html',
      controller: 'VwMoneyModalController',
      class: 'virtual-warfare-modal attributation'
    });
  })

  .controller('VwMoneyModalController', function ($scope, $http, WarfareIcons) {
    $scope.WarfareIcons = WarfareIcons;
    $scope.expertQuotes = [];

    $http.get('static-content/expert-quotes/virtual-warfare-ov-4.json').then(function(rsp){
      $scope.expertQuotes = rsp.data.experts;
    });
  });