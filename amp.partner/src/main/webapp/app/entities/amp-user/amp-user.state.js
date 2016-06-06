(function() {
    'use strict';

    angular
        .module('ampmember')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider

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
        .state('partner-detail.new-user', {
            parent: 'partner-detail',
            url: '/new?partnerId',
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
                                ouIdentif: $stateParams.partnerId,
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
                    $state.go('partner-detail', {id:$stateParams.partnerId}, { reload: true });
                }, function() {
                        $state.go('^');
                });
            }]
        })
        .state('partner-detail.edit', {
            parent: 'partner-detail',
            url: '/edit/{ampUserId}?partnerId',
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
                            return AmpUser.get({id : $stateParams.ampUserId});
                        }]
                    }
                }).result.then(function() {
                        $state.go('partner-detail', {id:$stateParams.partnerId}, { reload: true });
                }, function() {
                        $state.go('^');
                });
            }]
        })

    }

})();
