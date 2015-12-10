/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .factory('vwInvisibleModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'modules/overview/modals/templates/virtual_warfare/invisible_modal.html',
      controller: 'VwInvisibleModalController',
      class: 'virtual-warfare-modal war'
    });
  })

  .controller('VwInvisibleModalController', function ($scope, WarfareIcons) {
    $scope.WarfareIcons = WarfareIcons;
  });