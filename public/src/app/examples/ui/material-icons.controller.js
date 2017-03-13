(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('MaterialIconsController', MaterialIconsController);

    /* @ngInject */
    function MaterialIconsController($mdDialog, $document, $compile, $scope, icons) {
        var vm = this;
        vm.groups = [];
        vm.icons = [];
        vm.iconSource = 'Select icon below to see HTML';
        vm.selectIcon = selectIcon;
        vm.icons = icons.data;

        function selectIcon($event, className) {
            $mdDialog.show({
                title: '',
                template:
                    '<md-dialog>' +
                    '  <md-toolbar>' +
                    '    <h2 class="md-toolbar-tools">Here\'s the code for that icon</h2>' +
                    '  </md-toolbar>' +
                    '  <md-dialog-content>' +
                    '    <div hljs language="html"><md-icon md-font-icon="' + className + '"></md-icon></div>' +
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
