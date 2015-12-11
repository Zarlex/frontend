/**
 * Created by zarges on 14/11/15.
 */
'use strict';

angular.module('ZeroDay.Overview')
  .controller('RealImpactsController', function(
    RiEconomyModal,
    RiInformationModal,
    RiInfrastructureModal,
    RiManipulationModal,
    RiSabotageModal,
    RiSpyModal,
    ImpactIcons,
    expertQuotes) {

    this.riEconomyModal = new RiEconomyModal();
    this.riInformationModal = new RiInformationModal();
    this.riInfrastructureModal = new RiInfrastructureModal();
    this.riManipulationModal = new RiManipulationModal();
    this.riSabotageModal = new RiSabotageModal();
    this.riSpyModal = new RiSpyModal();
    this.ImpactIcons = ImpactIcons;
    this.expertQuotes = expertQuotes;
  })

  .constant('RealImpactsControllerResolver', {
    expertQuotes: ['$http', function($http){
      return $http.get('static-content/expert-quotes/virtual-warfare.json').then(function(rsp){
        return rsp.data.experts;
      });
    }]
  });