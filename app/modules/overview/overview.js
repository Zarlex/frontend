/**
 * Created by zarges on 14/11/15.
 */
'use strict';

angular.module('ZeroDay.Overview', ['ZeroDay'])

  .config(function ($routeProvider, $injector) {

    $routeProvider

      .when('/overview', {
        templateUrl: 'modules/overview/templates/overview.html',
        controller: 'OverviewController',
        controllerAs: 'overviewCtrl',
        resolve: $injector.get('OverviewControllerResolver'),
        cssClasses: 'overview'
      })

      .when('/overview/virtual-warfare', {
        templateUrl: 'modules/overview/templates/virtual_warfare/virtual_warfare.html',
        controller: 'VirtualWarfareController',
        controllerAs: 'virtualWarfareCtrl',
        resolve: $injector.get('VirtualWarfareControllerResolver'),
        cssClasses: 'overview virtual-warfare'
      });

  });