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

        var $window = $(window)
        var $body   = $(document.body)

        $body.scrollspy({
          target: '.bs-docs-sidebar'
        });
        $window.on('load', function () {
          $body.scrollspy('refresh')
        });

        // Kill links
        $('.bs-docs-container [href=#]').click(function (e) {
          e.preventDefault()
        });

        // Sidenav affixing
        setTimeout(function () {
          var $sideBar = $('.calendar')

          $sideBar.affix({
            offset: {
              top: function () {
                var offsetTop      = $sideBar.offset().top
                var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10)

                return (this.top = offsetTop - sideBarMargin -20)
              }
            }
          })
        }, 100)
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