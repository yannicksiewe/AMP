(function() {
    'use strict';

    angular
        .module('ampmember')
        .controller('PartnerDeleteController',PartnerDeleteController);

    PartnerDeleteController.$inject = ['$uibModalInstance', 'entity', 'Partner'];

    function PartnerDeleteController($uibModalInstance, entity, Partner) {
        var vm = this;
        vm.partner = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Partner.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
