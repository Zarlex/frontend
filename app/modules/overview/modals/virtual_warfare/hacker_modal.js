/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .factory('vwHackerModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'modules/overview/modals/templates/virtual_warfare/hacker_modal.html',
      controller: 'VwHackerModalController',
      class: 'virtual-warfare-modal attributation'
    });
  })

  .controller('VwHackerModalController', function ($scope, WarfareIcons) {
    $scope.WarfareIcons = WarfareIcons;
  });