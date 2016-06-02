(function() {
    'use strict';

    angular
        .module('ampmember')
        .controller('MemberDeleteController',MemberDeleteController);

    MemberDeleteController.$inject = ['$uibModalInstance', 'entity', 'Member'];

    function MemberDeleteController($uibModalInstance, entity, Member) {
        var vm = this;
        vm.member = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Member.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
