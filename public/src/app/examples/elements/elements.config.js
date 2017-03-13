(function() {
    'use strict';

    angular
        .module('app.examples.elements')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.elements-buttons', {
            url: '/elements/buttons',
            templateUrl: 'app/examples/elements/buttons.tmpl.html',
            controller: 'ButtonsController',
            controllerAs: 'vm',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-icons', {
            url: '/elements/icons',
            templateUrl: 'app/examples/elements/icons.tmpl.html',
            controller: 'IconsController',
            controllerAs: 'vm',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            },
            resolve: {
                icons: function($http, API_CONFIG) {
                    return $http({
                        method: 'GET',
                        url: API_CONFIG.url + 'elements/icons'
                    });
                },
                fa: function($http, API_CONFIG) {
                    return $http({
                        method: 'GET',
                        url: API_CONFIG.url + 'elements/icons-fa'
                    });
                }
            }
        })
        .state('triangular.elements-checkboxes', {
            url: '/elements/checkboxes',
            templateUrl: 'app/examples/elements/checkboxes.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-radios', {
            url: '/elements/radios',
            templateUrl: 'app/examples/elements/radios.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-toolbars', {
            url: '/elements/toolbars',
            templateUrl: 'app/examples/elements/toolbars.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-tooltips', {
            url: '/elements/tooltips',
            templateUrl: 'app/examples/elements/tooltips.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-whiteframes', {
            url: '/elements/whiteframes',
            templateUrl: 'app/examples/elements/whiteframes.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-sliders', {
            url: '/elements/sliders',
            templateUrl: 'app/examples/elements/sliders.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-toasts', {
            url: '/elements/toasts',
            templateUrl: 'app/examples/elements/toasts.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-progress', {
            url: '/elements/progress',
            templateUrl: 'app/examples/elements/progress.tmpl.html',
            controller: 'ProgressController',
            controllerAs: 'vm',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-switches', {
            url: '/elements/switches',
            templateUrl: 'app/examples/elements/switches.tmpl.html',
            controller: function() {
                this.toggleAll = function(data, value) {
                    for(var x in data) {
                        data[x] = value;
                    }
                };
            },
            controllerAs: 'vm',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-dialogs', {
            url: '/elements/dialogs',
            templateUrl: 'app/examples/elements/dialogs.tmpl.html',
            controller: 'DialogsController',
            controllerAs: 'vm',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.menus', {
            url: '/elements/menus',
            templateUrl: 'app/examples/elements/menus.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-tabs', {
            url: '/elements/tabs',
            templateUrl: 'app/examples/elements/tabs.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-sidebars', {
            url: '/elements/sidebars',
            templateUrl: 'app/examples/elements/sidebars.tmpl.html',
            controller: function($mdSidenav) {
                this.openSidebar = function(id) {
                    $mdSidenav(id).toggle();
                };
            },
            controllerAs: 'vm',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-grids', {
            url: '/elements/grids',
            templateUrl: 'app/examples/elements/grids.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.fab-speed', {
            url: '/elements/fab-speed',
            templateUrl: 'app/examples/elements/fab-speed.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.fab-toolbar', {
            url: '/elements/fab-toolbar',
            templateUrl: 'app/examples/elements/fab-toolbar.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-selects', {
            url: '/elements/selects',
            templateUrl: 'app/examples/elements/selects.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-tables', {
            url: '/elements/tables',
            templateUrl: 'app/examples/elements/tables.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-textangular', {
            url: '/elements/textangular',
            templateUrl: 'app/examples/elements/textangular.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-lists', {
            url: '/elements/lists',
            templateUrl: 'app/examples/elements/lists.tmpl.html',
            controller: function(emails) {
                this.emails = emails.data.splice(0, 5);
            },
            controllerAs: 'vm',
            resolve: {
                emails: function($http, API_CONFIG) {
                    return $http({
                        method: 'GET',
                        url: API_CONFIG.url + 'email/inbox'
                    });
                }
            },
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-chips', {
            url: '/elements/chips',
            templateUrl: 'app/examples/elements/chips.tmpl.html',
            controller: 'ChipsController',
            controllerAs: 'vm',
            resolve: {
                contacts: function($http, API_CONFIG) {
                    return $http({
                        method: 'GET',
                        url: API_CONFIG.url + 'email/contacts'
                    });
                }
            },
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-cards', {
            url: '/elements/cards',
            templateUrl: 'app/examples/elements/cards.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-upload', {
            url: '/elements/upload',
            templateUrl: 'app/examples/elements/upload.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-loader', {
            url: '/elements/loader',
            templateUrl: 'app/examples/elements/loader.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })
        .state('triangular.elements-datepicker', {
            url: '/elements/datepicker',
            templateUrl: 'app/examples/elements/datepicker.tmpl.html',
            data: {
                permissions: {
                    only: ['viewElements']
                },
                layout: {
                    contentClass: 'layout-column'
                }
            }
        });

        triMenuProvider.addMenu({
            name: 'Elements',
            icon: 'zmdi zmdi-graduation-cap',
            type: 'dropdown',
            priority: 3.1,
            permission: 'viewElements',
            children: [{
                name: 'Buttons',
                type: 'link',
                state: 'triangular.elements-buttons'
            },{
                name: 'Cards',
                type: 'link',
                state: 'triangular.elements-cards'
            },{
                name: 'Checkboxes',
                type: 'link',
                state: 'triangular.elements-checkboxes'
            },{
                name: 'Chips',
                type: 'link',
                state: 'triangular.elements-chips'
            },{
                name: 'Datepicker',
                type: 'link',
                state: 'triangular.elements-datepicker'
            },{
                name: 'Dialogs',
                type: 'link',
                state: 'triangular.elements-dialogs'
            },{
                name: 'FAB Speed Dial',
                type: 'link',
                state: 'triangular.fab-speed'
            },{
                name: 'FAB Toolbar',
                type: 'link',
                state: 'triangular.fab-toolbar'
            },{
                name: 'Grids',
                type: 'link',
                state: 'triangular.elements-grids'
            },{
                name: 'Icons',
                type: 'link',
                state: 'triangular.elements-icons'
            },{
                name: 'Lists',
                type: 'link',
                state: 'triangular.elements-lists'
            },{
                name: 'Loader',
                type: 'link',
                state: 'triangular.elements-loader'
            },{
                name: 'Menus',
                type: 'link',
                state: 'triangular.menus'
            },{
                name: 'Progress',
                type: 'link',
                state: 'triangular.elements-progress'
            },{
                name: 'Radios',
                type: 'link',
                state: 'triangular.elements-radios'
            },{
                name: 'Selects',
                type: 'link',
                state: 'triangular.elements-selects'
            },{
                name: 'Sidebars',
                type: 'link',
                state: 'triangular.elements-sidebars'
            },{
                name: 'Sliders',
                type: 'link',
                state: 'triangular.elements-sliders'
            },{
                name: 'Switches',
                type: 'link',
                state: 'triangular.elements-switches'
            },{
                name: 'Tables',
                type: 'link',
                state: 'triangular.elements-tables'
            },{
                name: 'Tabs',
                type: 'link',
                state: 'triangular.elements-tabs'
            },{
                name: 'Textangular',
                type: 'link',
                state: 'triangular.elements-textangular'
            },{
                name: 'Toasts',
                type: 'link',
                state: 'triangular.elements-toasts'
            },{
                name: 'Toolbars',
                type: 'link',
                state: 'triangular.elements-toolbars'
            },{
                name: 'Tooltips',
                type: 'link',
                state: 'triangular.elements-tooltips'
            },{
                name: 'Whiteframes',
                type: 'link',
                state: 'triangular.elements-whiteframes'
            },{
                name: 'Upload',
                type: 'link',
                state: 'triangular.elements-upload'
            }]
        });
    }
})();
