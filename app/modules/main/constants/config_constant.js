'use strict';
/* jshint -W106 */
angular.module('ZeroDay')
  .constant('config', (function () {

    /* Those values are set by the grunt replace task */
    var __buildNumber__ = null;

    var __lastBuildTime__ = null;

    return {
      buildNumber: __buildNumber__,
      lastBuildTime: __lastBuildTime__
    };
  }()));