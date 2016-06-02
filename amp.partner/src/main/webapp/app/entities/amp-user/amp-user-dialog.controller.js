(function() {
    'use strict';

    angular
        .module('ampmember')
        .controller('AmpUserDialogController', AmpUserDialogController);

    AmpUserDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'AmpUser'];

    function AmpUserDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, AmpUser) {
        var vm = this;
        vm.ampUser = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('ampfrontApp:ampUserUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.ampUser.id !== null) {
                AmpUser.update(vm.ampUser, onSaveSuccess, onSaveError);
            } else {
                AmpUser.save(vm.ampUser, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.credtlExpir = false;
        vm.datePickerOpenStatus.accountExpir = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
