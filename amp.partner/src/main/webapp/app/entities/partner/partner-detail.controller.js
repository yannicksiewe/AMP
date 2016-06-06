(function() {
    'use strict';

    angular
        .module('ampmember')
        .controller('PartnerDetailController', PartnerDetailController);

    PartnerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Partner','AmpUser','AlertService',
    'PartnerService'];

    function PartnerDetailController($scope, $rootScope, $stateParams, entity, Partner,AmpUser,AlertService,PartnerService) {
        var vm = this;
        vm.partner = entity;
        initPartnerUser($stateParams.id);
        initPartnerService($stateParams.id);
        
        var unsubscribe = $rootScope.$on('ampfrontApp:partnerUpdate', function(event, result) {
            vm.partner = result;
        });
        $scope.$on('$destroy', unsubscribe);


        function initPartnerUser (partnerId) {
            var searchInput={
                entity: {},
                start: 0,
                max: 100,
                fieldNames: [],
                sortFieldNames: [],
                className: 'org.adorsys.amp.server.jpa.AmpUserSearchInput'
            };
            searchInput.entity.ouIdentif=partnerId;
            searchInput.fieldNames.push("ouIdentif");

            AmpUser.findByLike(searchInput, function(data){
                vm.ampUsers = data.resultList;
            }, function(error){
                AlertService.error(error.data.message);
            });

        }

        function initPartnerService(partnerId) {
            var searchInput={
                entity: {},
                start: 0,
                max: 100,
                fieldNames: [],
                sortFieldNames: [],
                className: 'org.adorsys.amp.server.jpa.PartnerServiceSearchInput'
            };
            searchInput.entity.partnerId=partnerId;
            searchInput.fieldNames.push("partnerId");

            PartnerService.findByLike(searchInput, function(data){
                vm.partnerServices = data.resultList;
            }, function(error){
                AlertService.error(error.data.message);
            });

        }

    }
})();
