(function() {
    'use strict';

    angular
        .module('ampmember')
        .controller('AmpUserDeleteController',AmpUserDeleteController);

    AmpUserDeleteController.$inject = ['$uibModalInstance', 'entity', 'AmpUser'];

    function AmpUserDeleteController($uibModalInstance, entity, AmpUser) {
        var vm = this;
        vm.ampUser = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            AmpUser.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
