/**
 * Created by zarges on 14/11/15.
 */
'use strict';

angular.module('ZeroDay', [
    'ngRoute',
    'ngAnimate',

    'ZeroDay.Start'
  ])

  .config(function ($routeProvider) {

    $routeProvider

      .when('/', {redirectTo: '/start'});

  });
