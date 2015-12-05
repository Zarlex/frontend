/**
 * Created by zarges on 05/12/15.
 */
angular.module('ZeroDay.Overview')

  .constant('ExpertIcons', {
    PETER_SINGER: 'icon-Peter_W_Singer',
    SANDRO_GAYCKEN: 'icon-Sandro_Gaycken',
    FELIX_LINDNER: 'icon-Felix_Lindner',
    FRANCOIS_DELERUE: 'icon-Francois_Delerue',
    RICHARD_CLARKE: 'icon-Richard_A_Clarke',
    HEIKE_KRIEGER: 'icon-Heike_Krieger',
    IAN_J_WEST: 'icon-Ian_J_West',
    JOEL_BRENNER: 'icon-Joel_Brenner',
    MALTE_HERWIG: 'icon-Malte_Herwig',
    THOMAS_RID: 'icon-Thomas_Rid',
    YVONNE_HOFSTETTER: 'icon-Yvonne_Hofstetter',
    getIconById: function (id) {
      if (this[id]) {
        return this[id];
      } else {
        console.error('ID ' + id + 'could not be found', this);
      }
    }
  });