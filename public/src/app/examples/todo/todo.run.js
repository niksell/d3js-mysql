(function() {
    'use strict';

    angular
        .module('app.examples.todo')
        .run(runFunction);

    /* @ngInject */
    function runFunction(TodoService) {
        // Update todo badge when app first runs.

        TodoService.updateMenuBadge();
    }
})();
