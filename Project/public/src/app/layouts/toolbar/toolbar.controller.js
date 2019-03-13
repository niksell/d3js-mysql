(function() {
    'use strict';

    angular
        .module('triangular.components')
        .controller('ToolbarController', DefaultToolbarController);

    /* @ngInject */
    function DefaultToolbarController($scope, $injector, $rootScope, $mdMedia, $state, $element, $filter, $mdUtil, $mdSidenav, $mdToast, $timeout, $document, triBreadcrumbsService, triSettings, triLayout) {
        var vm = this;
        vm.breadcrumbs = triBreadcrumbsService.breadcrumbs;
        vm.openSideNav = openSideNav;
        vm.hideMenuButton = hideMenuButton;
        vm.toggleNotificationsTab = toggleNotificationsTab;
        vm.isFullScreen = false;



            // permissions are turned off so no UserService available
            // just set default user
            vm.currentUser = {
                displayName: 'Christos',
                username: 'christos',
                avatar: 'assets/images/avatars/avatar-5.png',
                roles: []
            };


        ////////////////

        function openSideNav(navID) {
            $mdUtil.debounce(function(){
                $mdSidenav(navID).toggle();
            }, 300)();
        }


        function hideMenuButton() {
            switch(triLayout.layout.sideMenuSize) {
                case 'hidden':
                    // always show button if menu is hidden
                    return false;
                case 'off':
                    // never show button if menu is turned off
                    return true;
                default:
                    // show the menu button when screen is mobile and menu is hidden
                    return $mdMedia('gt-sm');
            }
        }

        function toggleNotificationsTab(tab) {
            $rootScope.$broadcast('triSwitchNotificationTab', tab);
            vm.openSideNav('notifications');
        }

    }
})();
