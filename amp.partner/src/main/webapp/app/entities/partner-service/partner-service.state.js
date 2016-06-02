(function() {
    'use strict';

    angular
        .module('ampmember')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('partner-service', {
            parent: 'entity',
            url: '/partner-service?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ampfrontApp.partnerService.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/partner-service/partner-services.html',
                    controller: 'PartnerServiceController',
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
                    $translatePartialLoader.addPart('partnerService');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('partner-service-detail', {
            parent: 'entity',
            url: '/partner-service/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ampfrontApp.partnerService.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/partner-service/partner-service-detail.html',
                    controller: 'PartnerServiceDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('partnerService');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'PartnerService', function($stateParams, PartnerService) {
                    return PartnerService.get({id : $stateParams.id});
                }]
            }
        })
        .state('partner-service.new', {
            parent: 'partner-service',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/partner-service/partner-service-dialog.html',
                    controller: 'PartnerServiceDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                serviceName: null,
                                description: null,
                                partnerId: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('partner-service', null, { reload: true });
                }, function() {
                    $state.go('partner-service');
                });
            }]
        })
        .state('partner-service.edit', {
            parent: 'partner-service',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/partner-service/partner-service-dialog.html',
                    controller: 'PartnerServiceDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['PartnerService', function(PartnerService) {
                            return PartnerService.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('partner-service', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('partner-service.delete', {
            parent: 'partner-service',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/partner-service/partner-service-delete-dialog.html',
                    controller: 'PartnerServiceDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['PartnerService', function(PartnerService) {
                            return PartnerService.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('partner-service', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
