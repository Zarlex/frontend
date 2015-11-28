/**
 * Created by zarges on 14/11/15.
 */
'use strict';

angular.module('ZeroDay.Overview')
  .controller('RealImpactsController', function() {})

  .constant('RealImpactsControllerResolver', {
    test: function($q){
      var dfd = $q.defer();
      setTimeout(function(){
        console.log('DONE WAR')
        dfd.resolve();
      },500);
      return dfd.promise;
    }
  });