(function() {
    'use strict';

    angular
        .module('ampmember')
        .controller('PartnerServiceDeleteController',PartnerServiceDeleteController);

    PartnerServiceDeleteController.$inject = ['$uibModalInstance', 'entity', 'PartnerService'];

    function PartnerServiceDeleteController($uibModalInstance, entity, PartnerService) {
        var vm = this;
        vm.partnerService = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            PartnerService.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
