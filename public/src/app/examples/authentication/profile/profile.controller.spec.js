(function() {
    'use strict';

    describe('controllers', function() {

        beforeEach(module('app'));

        it('User profile should be Christos', inject(function($controller) {
            var vm = $controller('ProfileController');

            expect(vm.user.name === 'Christos').toBeTruthy();

        }));

        it('Scope should be isolate', inject(function($controller) {
            var vm = $controller('ProfileController');
            expect(vm).toEqual(jasmine.any(Object));
        }));
    });
})();
