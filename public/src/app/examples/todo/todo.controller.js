(function() {
    'use strict';

    angular
        .module('app.examples.todo')
        .controller('TodoController', TodoController);

    /* @ngInject */
    function TodoController($scope, $state, $mdDialog, TodoService) {
        var vm = this;

        vm.orderTodos = orderTodos;
        vm.removeTodo = removeTodo;
        vm.todoSelected = todoSelected;

        //////////////////////////

        function init() {
            vm.todos = TodoService.getTodos();
            TodoService.updateMenuBadge();
        }

        function orderTodos(task) {
            switch(task.priority){
                case 'high':
                    return 1;
                case 'medium':
                    return 2;
                case 'low':
                    return 3;
                default: // no priority set
                    return 4;
            }
        }

        function removeTodo(todo){
            TodoService.removeTodo(todo);
        }

        function todoSelected() {
            TodoService.updateMenuBadge();
        }

        // init

        init();

        // watches

        $scope.$on('addTodo', function( ev ){
            $mdDialog.show({
                templateUrl: 'app/examples/todo/add-todo-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'DialogController',
                controllerAs: 'vm'
            })
            .then(function(newTodo) {
                TodoService.addTodo(newTodo);
            });
        });
    }
})();