(function() {
    'use strict';

    angular
        .module('ampmember')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider

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
        .state('partner-detail.new-service', {
            parent: 'partner-detail',
            url: '/newservice?partnerId',
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
                                partnerId: $stateParams.partnerId,
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
        .state('partner-detail.edit-service', {
            parent: 'partner-detail',
            url: '/editservice/{serviceId}?partnerId',
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
                            return PartnerService.get({id : $stateParams.serviceId});
                        }]
                    }
                }).result.then(function() {
                        $state.go('partner-detail', {id:$stateParams.partnerId}, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('partner-detail.delete-service', {
            parent: 'partner-detail',
            url: '/deleteservice/{serviceId}?partnerId',
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
                            return PartnerService.get({id : $stateParams.serviceId});
                        }]
                    }
                }).result.then(function() {
                        $state.go('partner-detail', {id:$stateParams.partnerId}, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
