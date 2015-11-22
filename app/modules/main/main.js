/**
 * Created by zarges on 14/11/15.
 */
'use strict';

angular.module('ZeroDay', [
    'ngRoute',
    'ngAnimate',

    'ZeroDay.Start',
    'ZeroDay.Overview'
  ])

  .config(function ($routeProvider) {

    $routeProvider

      .when('/', {redirectTo: '/start'});

  })

  .run(function($rootScope, $location){
    $rootScope.goTo = function(path){
      $location.path(path);
    };
  });
