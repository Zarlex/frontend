/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .factory('dokuModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'www.google.de',
      controller: 'dokuModalController',
      class: 'virtual-warfare-modal time'
    });
  })

  .controller('dokuModalController', function ($scope, $http, WarfareIcons) {
    $scope.WarfareIcons = WarfareIcons;
    $scope.expertQuotes = [];

    $http.get('static-content/expert-quotes/virtual-warfare-ov-1.json').then(function(rsp){
      $scope.expertQuotes = rsp.data.experts;
    });

  });