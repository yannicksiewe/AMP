(function() {
    'use strict';

    angular
        .module('ampmember')
        .controller('PartnerServiceDialogController', PartnerServiceDialogController);

    PartnerServiceDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'PartnerService'];

    function PartnerServiceDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, PartnerService) {
        var vm = this;
        vm.partnerService = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('ampfrontApp:partnerServiceUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.partnerService.id !== null) {
                PartnerService.update(vm.partnerService, onSaveSuccess, onSaveError);
            } else {
                PartnerService.save(vm.partnerService, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
