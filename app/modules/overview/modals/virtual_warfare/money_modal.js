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

  .controller('VwMoneyModalController', function ($scope, WarfareIcons) {
    $scope.WarfareIcons = WarfareIcons;
  });