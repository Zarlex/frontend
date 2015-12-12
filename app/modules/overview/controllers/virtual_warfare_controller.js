/**
 * Created by zarges on 14/11/15.
 */
'use strict';

angular.module('ZeroDay.Overview')
  .controller('VirtualWarfareController', function(
    vwAttributationModal,
    vwHackerModal,
    vwMoneyModal,
    vwTimeModal,
    vwInvisibleModal,
    WarfareIcons,
    expertQuotes) {

    this.vwAttributationModal = new vwAttributationModal();
    this.vwHackerModal = new vwHackerModal();
    this.vwMoneyModal = new vwMoneyModal();
    this.vwTimeModal = new vwTimeModal();
    this.vwInvisibleModal = new vwInvisibleModal();

    this.WarfareIcons = WarfareIcons;
    this.expertQuotes = expertQuotes;

    this.dokuModal = new vwInvisibleModal();
  })

  .constant('VirtualWarfareControllerResolver', {
    expertQuotes: ['$http', function($http){
      return $http.get('static-content/expert-quotes/virtual-warfare.json').then(function(rsp){
        return rsp.data.experts;
      });
    }]
  });