/**
 * Created by zarges on 14/11/15.
 */
'use strict';

angular.module('ZeroDay')
  .directive('zdMenuCorner', function () {
    return {
      templateUrl: 'modules/main/directives/templates/zd_menu_corner.html',
      link: function(scope){
        scope.viewModel = {
          isOpened: false
        };

        scope.toggle = function(){
          scope.viewModel.isOpened = !scope.viewModel.isOpened;
        };
      }
    };
  });