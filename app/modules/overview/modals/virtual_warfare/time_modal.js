/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .factory('vwTimeModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'modules/overview/modals/templates/virtual_warfare/time_modal.html',
      controller: 'VwTimeModalController',
      class: 'virtual-warfare-modal time'
    });
  })

  .controller('VwTimeModalController', function ($scope, WarfareIcons) {
    $scope.WarfareIcons = WarfareIcons;
  });