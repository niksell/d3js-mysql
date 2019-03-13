(function() {
    'use strict';

    angular
        .module('app')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig(triSettingsProvider, triRouteProvider) {
        var now = new Date();
        // set app name & logo (used in loader, sidemenu, footer, login pages, etc)
      //  triSettingsProvider.setName('');
        triSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' Aggro-base');
        triSettingsProvider.setLogo('dist/assets/images/Eurozone-Agriculture.png');
        // set current version of app (shown in footer)
        triSettingsProvider.setVersion('0.0.1');
        // set the document title that appears on the browser tab
        triRouteProvider.setTitle('Eurozone Agricultar');
        triRouteProvider.setSeparator('|');
    }
})();
