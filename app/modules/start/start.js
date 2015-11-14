/**
 * Created by zarges on 14/11/15.
 */
'use strict';

angular.module('ZeroDay.Start', ['ZeroDay'])

  .config(function ($routeProvider, $injector) {

    $routeProvider

      .when('/start', {
        templateUrl: 'modules/start/templates/start.html',
        controller: 'StartController',
        controllerAs: 'startCtrl',
        resolve: $injector.get('StartControllerResolver'),
        cssClasses: 'start'
      });

  });