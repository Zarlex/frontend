/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .factory('vwWarModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'modules/overview/modals/templates/virtual_warfare/war.html',
      controller: 'VwWarModalController',
      class: 'virtual-warfare-modal war'
    });
  })

  .controller('VwWarModalController', function ($scope, WarfareIcons) {
    $scope.WarfareIcons = WarfareIcons;
  });