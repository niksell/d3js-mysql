(function() {
    'use strict';

    angular
        .module('app.examples.menu')
        .controller('MenuDynamicController', MenuDynamicController);

    /* @ngInject */
    function MenuDynamicController(dynamicMenuService, triMenu) {
        var vm = this;
        // get dynamic menu service to store & keep track the state of the menu status
        vm.dynamicMenu = dynamicMenuService.dynamicMenu;
        // create toggle function
        vm.toggleExtraMenu = toggleExtraMenu;

        ////////////////

        function toggleExtraMenu(showMenu) {
            if(showMenu) {
                triMenu.addMenu({
                    name: 'Dynamic Menu-MENU',
                    icon: 'zmdi zmdi-flower-alt',
                    type: 'link',
                    priority: 0.0,
                    state: 'triangular.menu-dynamic-dummy-page'
                });
            }
            else {
                triMenu.removeMenu('triangular.menu-dynamic-dummy-page');
            }
        }
    }
})();