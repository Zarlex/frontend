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
        cssClasses: 'overview index',
        animationClasses: {
          to: [
            {
              route: '/overview/virtual-warfare',
              classes: 'virtual-warfare-enter',
              process: function(el){
                var holderEl = el.find('.entry.warfare .holder');

                holderEl.animate({
                  width: holderEl.width()*2
                },1000);
              }
            },
            {
              route: '/overview/real-impacts',
              classes: 'real-impacts-enter',
              process: function(el){
                var holderEl = el.find('.entry.impacts .holder');

                holderEl.animate({
                  width: holderEl.width()*2
                },1000);
              }
            },
            {
              route: '/overview/current-attacks',
              classes: 'current-attacks-enter',
              process: function(el){
                var holderEl = el.find('.entry.attacks .holder');

                holderEl.animate({
                  width: holderEl.width()*2
                },1000);
              }
            },
            {
              route: '/overview/potential-threads',
              classes: 'potential-threads-enter',
              process: function(el){
                var holderEl = el.find('.entry.threads .holder');

                holderEl.animate({
                  width: holderEl.width()*2
                },1000);
              }
            }
          ]
        }
      })

      .when('/overview/virtual-warfare', {
        templateUrl: 'modules/overview/templates/virtual_warfare/virtual_warfare.html',
        controller: 'VirtualWarfareController',
        controllerAs: 'virtualWarfareCtrl',
        resolve: $injector.get('VirtualWarfareControllerResolver'),
        cssClasses: 'overview virtual-warfare',
        animationClasses: {
          to: [
            {
              route: '/overview',
              classes: 'index-enter',
              process: function(el){
                var holderEl = el.find('.entry.warfare .holder');

                holderEl.animate({
                  width: (holderEl.width()/2)+'px'
                },1000);
              }
            },
            {
              route: '/overview/real-impacts',
              classes: 'real-impacts-enter',
              process: function(el){
                var holderEl = el.find('.entry.warfare .holder');

                holderEl.animate({
                  width: (holderEl.width()/2)+'px'
                },1000);
              }
            }
          ]
        }
      })

      .when('/overview/real-impacts', {
        templateUrl: 'modules/overview/templates/real_impacts/real_impacts.html',
        controller: 'RealImpactsController',
        controllerAs: 'realImpactsCtrl',
        resolve: $injector.get('RealImpactsControllerResolver'),
        cssClasses: 'overview real-impacts',
        animationClasses: {
          to: [
            {
              route: '/overview',
              classes: 'index-enter',
              process: function(el){
                var holderEl = el.find('.entry.impacts .holder');

                holderEl.animate({
                  width: (holderEl.width()/2)+'px'
                },1000);
              }
            },
            {
              route: '/overview/virtual-warfare',
              classes: 'virtual-warfare-enter',
              process: function(el){
                var holderEl = el.find('.entry.impacts .holder');

                holderEl.animate({
                  width: (holderEl.width()/2)+'px'
                },1000);
              }
            },
            {
              route: '/overview/current-attacks',
              classes: 'current-attacks-enter',
              process: function(el){
                var holderEl = el.find('.entry.impacts .holder');

                holderEl.animate({
                  width: (holderEl.width()/2)+'px'
                },1000);
              }
            }
          ]
        }
      })

      .when('/overview/current-attacks', {
        templateUrl: 'modules/overview/templates/current_attacks/current_attacks.html',
        controller: 'CurrentAttacksController',
        controllerAs: 'currentAttacksCtrl',
        resolve: $injector.get('CurrentAttacksControllerResolver'),
        cssClasses: 'overview current-attacks',
        animationClasses: {
          to: [
            {
              route: '/overview',
              classes: 'index-enter',
              process: function(el){
                var holderEl = el.find('.entry.attacks .holder');

                holderEl.animate({
                  width: (holderEl.width()/2)+'px'
                },1000);
              }
            },
            {
              route: '/overview/real-impacts',
              classes: 'real-impacts-enter',
              process: function(el){
                var holderEl = el.find('.entry.attacks .holder');

                holderEl.animate({
                  width: (holderEl.width()/2)+'px'
                },1000);
              }
            },
            {
              route: '/overview/potential-threads',
              classes: 'potential-threads-enter',
              process: function(el){
                var holderEl = el.find('.entry.attacks .holder');

                holderEl.animate({
                  width: (holderEl.width()/2)+'px'
                },1000);
              }
            }
          ]
        }
      })

      .when('/overview/potential-threads', {
        templateUrl: 'modules/overview/templates/potential_threads/potential_threads.html',
        controller: 'PotentialThreadsController',
        controllerAs: 'potentialThreadsCtrl',
        resolve: $injector.get('PotentialThreadsControllerResolver'),
        cssClasses: 'overview potential-threads',
        animationClasses: {
          to: [
            {
              route: '/overview',
              classes: 'index-enter',
              process: function(el){
                var holderEl = el.find('.entry.threads .holder');

                holderEl.animate({
                  width: (holderEl.width()/2)+'px'
                },1000);
              }
            },
            {
              route: '/overview/current-attacks',
              classes: 'current-attacks-enter',
              process: function(el){
                var holderEl = el.find('.entry.threads .holder');

                holderEl.animate({
                  width: (holderEl.width()/2)+'px'
                },1000);
              }
            }
          ]
        }
      });

  });