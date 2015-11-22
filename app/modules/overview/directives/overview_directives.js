/**
 * Created by zarges on 21/11/15.
 */
'use strict';

angular.module('ZeroDay.Overview')
  .directive('zdEntryFullScreenOnClick', function () {
    return {
      link: function (scope, el, attrs) {

        var done = function(){
          if(attrs.callback){
            scope.$apply(attrs.callback);
          }
        };

        el.on('click', function(){
          var prevSibling = el.prev(),
            nextSibling = el.next(),
            siblings = el.siblings();

          siblings.each(function(){
            var sisEl = angular.element(this);
            sisEl.removeClass('active entry-next entry-prev no-flex min-flex');
            if(this !== nextSibling[0] && this !== prevSibling[0]){
              sisEl.addClass('no-flex');
            }
          });

          el.removeClass('min-flex');

          if(prevSibling.length > 0 && nextSibling.length>0){
            prevSibling.addClass('min-flex');
            nextSibling.addClass('min-flex');
            el.addClass('active entries-prev-next');
          } else if(prevSibling.length>0){
            prevSibling.addClass('min-flex');
            el.addClass('active entry-prev');
          } else if(nextSibling.length>0){
            nextSibling.addClass('min-flex');
            el.addClass('active entry-next');
          }

          el.on('webkitTransitionEnd transitionEnd', done);

        });
      }
    };
  });