/**
 * Created by zarges on 10/12/15.
 */
angular.module('ZeroDay')

  .constant('Icons', {
    LOGO_PRIMARY: 'icon-Logo_gross',
    ARROW_RIGHT: 'icon-Pfeil_experten',
    ARROW_LEFT: 'icon-Pfeil_experten_left',
    ARROW_DOWN: 'icon-Pfeil_experten_down',
    ARROW_TOP: 'icon-Pfeil',
    getIconById: function (id) {
      if (this[id]) {
        return this[id];
      } else {
        console.error('ID ' + id + 'could not be found', this);
      }
    }
  });