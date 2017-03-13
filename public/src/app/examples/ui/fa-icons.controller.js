(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('FaIconsController', FaIconsController);

    /* @ngInject */
    function FaIconsController($mdDialog, $document, $scope, $compile, icons) {
        var vm = this;
        vm.icons = loadIcons();
        vm.iconSource = 'Select icon below to see HTML';
        vm.selectIcon = selectIcon;

        function loadIcons() {
            var allIcons = [];
            for(var className in icons.data) {
                allIcons.push({
                    className: className,
                    name: icons.data[className]
                });
            }
            return allIcons;
        }

        function selectIcon($event, icon) {
            $mdDialog.show({
                title: '',
                template:
                    '<md-dialog>' +
                    '  <md-toolbar>' +
                    '    <h2 class="md-toolbar-tools">Here\'s the code for that icon</h2>' +
                    '  </md-toolbar>' +
                    '  <md-dialog-content>' +
                    '    <div hljs language="html"><md-icon md-font-icon="' + icon.className + '"></md-icon></div>' +
                    '  </md-dialog-content>' +
                    '  <md-dialog-actions>' +
                    '    <md-button ng-click="vm.closeDialog()" class="md-primary">' +
                    '      Close' +
                    '    </md-button>' +
                    '  </md-dialog-actions>' +
                    '</md-dialog>',
                targetEvent: $event,
                parent: angular.element($document.body),
                controller: 'IconDialogController',
                controllerAs: 'vm'
            });
        }
    }
})();
