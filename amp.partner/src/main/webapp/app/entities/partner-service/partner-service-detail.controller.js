(function() {
    'use strict';

    angular
        .module('ampmember')
        .controller('PartnerServiceDetailController', PartnerServiceDetailController);

    PartnerServiceDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'PartnerService'];

    function PartnerServiceDetailController($scope, $rootScope, $stateParams, entity, PartnerService) {
        var vm = this;
        vm.partnerService = entity;
        
        var unsubscribe = $rootScope.$on('ampfrontApp:partnerServiceUpdate', function(event, result) {
            vm.partnerService = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
