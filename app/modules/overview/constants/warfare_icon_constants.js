/**
 * Created by zarges on 05/12/15.
 */
angular.module('ZeroDay.Overview')

  .constant('WarfareIcons', {
    GUY: 'icon-Attributationsproblem',
    MONEYBAG: 'icon-GeringesRiskoKleinesGeld',
    BRAIN: 'icon-HoheHackerkompetenz',
    TV: 'icon-Informationsmedien',
    STOPWATCH: 'icon-KriegOhneRaumUndZeit',
    POLE: 'icon-KritischeInfrastruktur',
    MOUSE: 'icon-Manipulation',
    WRENCH: 'icon-Sabotage',
    SPYGLASS: 'icon-Spionage',
    GHOST: 'icon-UnsichtbareAngriffe',
    PIGGYBANK: 'icon-WirtschaftUndFinanzmarkt',
    GUY_F: 'icon-Attributationsproblem_hover',
    MONEYBAG_F: 'icon-GeringesRiskoKleinesGeld_hover',
    BRAIN_F: 'icon-HoheHackerkompetenz_hover',
    TV_F: 'icon-Informationsmedien_hover',
    STOPWATCH_F: 'icon-KriegOhneRaumUndZeit_hover',
    POLE_F: 'icon-KritischeInfrastruktur_hover',
    MOUSE_F: 'icon-Manipulation_hover',
    WRENCH_F: 'icon-Sabotage_hover',
    SPYGLASS_F: 'icon-Spionage_hover',
    GHOST_F: 'icon-UnsichtbareAngriffe_hover',
    PIGGYBANK_F: 'icon-WirtschaftUndFinanzmarkt_hover',
    getIconById: function(id){
        if(this[id]){
            return this[id];
        } else {
            console.error('ID '+id+'could not be found', this);
        }
    }
  });