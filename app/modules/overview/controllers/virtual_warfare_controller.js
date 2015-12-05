/**
 * Created by zarges on 14/11/15.
 */
'use strict';

angular.module('ZeroDay.Overview')
  .controller('VirtualWarfareController', function(expertQuotes) {
    this.expertQuotes = expertQuotes;
  })

  .constant('VirtualWarfareControllerResolver', {
    expertQuotes: ['$http', function($http){
      return $http.get('static-content/expert-quotes/virtual-warfare.json').then(function(rsp){
        return rsp.data.experts;
      });
    }]
  });