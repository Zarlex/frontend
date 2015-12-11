/**
 * Created by zarges on 05/12/15.
 */
angular.module('ZeroDay.Overview')

  .constant('ImpactIcons', {
    TV: 'icon-Informationsmedien',
    POLE: 'icon-KritischeInfrastruktur',
    MOUSE: 'icon-Manipulation',
    WRENCH: 'icon-Sabotage',
    SPYGLASS: 'icon-Spionage',
    PIGGYBANK: 'icon-WirtschaftUndFinanzmarkt',
    TV_F: 'icon-Informationsmedien_hover',
    POLE_F: 'icon-KritischeInfrastruktur_hover',
    MOUSE_F: 'icon-Manipulation_hover',
    WRENCH_F: 'icon-Sabotage_hover',
    SPYGLASS_F: 'icon-Spionage_hover',
    PIGGYBANK_F: 'icon-WirtschaftUndFinanzmarkt_hover',
    getIconById: function(id){
        if(this[id]){
            return this[id];
        } else {
            console.error('ID '+id+'could not be found', this);
        }
    }
  });