/**
 * Created by zarges on 03/12/15.
 */
'use strict';

angular.module('ZeroDay')

  .directive('zdSpyHolder', function($timeout){
    return {
      restrict: 'A',
      controller: function ($scope) {
        $scope.spies = [];
        this.registerSpy = function (spyObj) {
          $scope.spies.push(spyObj);
        };
      },
      link: function (scope, elem, attrs) {
        var bodyEl   = angular.element(document.body),
            id = attrs.id;

        if(!id){
          throw new Error('And ID has to be defined as attribute');
        }

        bodyEl.scrollspy({
          target: '#'+id
        });
      }
    };
  })

  .directive('zdSpy', function ($location, $anchorScroll) {
    return {
      restrict: "A",
      require: "^zdSpyHolder",
      link: function(scope, elem, attrs, zdSpyHolderCtrl) {
        elem.click(function (ev) {
          ev.stopImmediatePropagation();
          $location.hash(attrs.zdSpy);
          $anchorScroll();
        });

        elem.find('a').on('click', function(ev){
          ev.preventDefault();
        });

        zdSpyHolderCtrl.registerSpy(elem);

        elem.on('activate.bs.scrollspy', function(){
          console.log(elem);
        })
      }
    };
  });