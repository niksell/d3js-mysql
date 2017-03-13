(function() {
    'use strict';

    angular
        .module('app.examples.todo')
        .factory('TodoService', TodoService);


    /* @ngInject */
    function TodoService(triMenu) {
        var todos = [
            {description: 'Material Design', priority: 'high', selected: true},
            {description: 'Install espresso machine', priority: 'high', selected: false},
            {description: 'Deploy to Server', priority: 'medium', selected: true},
            {description: 'Cloud Sync', priority: 'medium', selected: false},
            {description: 'Test Configurations', priority: 'low', selected: false},
            {description: 'Validate markup', priority: 'low', selected: false},
            {description: 'Debug javascript', priority: 'low', selected: true},
            {description: 'Arrange meeting', priority: 'low', selected: true}
        ];
        var todoMenu = triMenu.getMenu('todo');

        var service = {
            addTodo: addTodo,
            getTodos: getTodos,
            removeTodo: removeTodo,
            todoCount: todoCount,
            updateMenuBadge: updateMenuBadge
        };
        return service;

        ////////////////

        function addTodo(todo) {
            todos.push(todo);
            updateMenuBadge();
        }

        function getTodos() {
            return todos;
        }

        function removeTodo(todo) {
            for(var i = todos.length - 1; i >= 0; i--) {
                if(todos[i] === todo) {
                    todos.splice(i, 1);
                }
            }
            updateMenuBadge();
        }

        function todoCount() {
            var count = 0;
            for(var i = todos.length - 1; i >= 0; i--) {
                if(todos[i].selected === false) {
                    count++;
                }
            }
            return count;
        }

        function updateMenuBadge() {
            todoMenu.badge = todoCount();
        }
    }
})();