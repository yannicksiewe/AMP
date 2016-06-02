(function() {
    'use strict';

    angular
        .module('ampmember')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('amp-user', {
            parent: 'entity',
            url: '/amp-user?page&sort&search',
            data: {
                authorities: [],
                pageTitle: 'ampfrontApp.ampUser.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/amp-user/amp-users.html',
                    controller: 'AmpUserController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('ampUser');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('amp-user-detail', {
            parent: 'entity',
            url: '/amp-user/{id}',
            data: {
                authorities: [],
                pageTitle: 'ampfrontApp.ampUser.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/amp-user/amp-user-detail.html',
                    controller: 'AmpUserDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('ampUser');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'AmpUser', function($stateParams, AmpUser) {
                    return AmpUser.get({id : $stateParams.id});
                }]
            }
        })
        .state('amp-user.new', {
            parent: 'amp-user',
            url: '/new',
            data: {
                authorities: []
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/amp-user/amp-user-dialog.html',
                    controller: 'AmpUserDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                ouIdentif: null,
                                loginName: null,
                                loginAlias: null,
                                email: null,
                                fullName: null,
                                pwdHashed: null,
                                disableLogin: null,
                                accountLocked: null,
                                credtlExpir: null,
                                accountExpir: null,
                                langIso2: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('amp-user', null, { reload: true });
                }, function() {
                    $state.go('amp-user');
                });
            }]
        })
        .state('amp-user.edit', {
            parent: 'amp-user',
            url: '/{id}/edit',
            data: {
                authorities: []
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/amp-user/amp-user-dialog.html',
                    controller: 'AmpUserDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['AmpUser', function(AmpUser) {
                            return AmpUser.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('amp-user', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('amp-user.delete', {
            parent: 'amp-user',
            url: '/{id}/delete',
            data: {
                authorities: []
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/amp-user/amp-user-delete-dialog.html',
                    controller: 'AmpUserDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['AmpUser', function(AmpUser) {
                            return AmpUser.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('amp-user', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
