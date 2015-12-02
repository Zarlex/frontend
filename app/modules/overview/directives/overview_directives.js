/**
 * Created by zarges on 21/11/15.
 */
'use strict';

angular.module('ZeroDay.Overview')

  .directive('zdOverviewItem', function($location){
    return {
      scope: {
        id: '@',
        url: '@',
        logoUrl: '@',
        logoFallbackUrl: '@',
        title: '@',
        copy: '@',
        holderWidth: '@'
      },
      transclude: true,
      replace: true,
      templateUrl: 'modules/overview/directives/templates/zd_overview_item.html',
      link: function(scope){
        scope.open = function(){
          $location.path(scope.url);
        };
      }
    };
  });