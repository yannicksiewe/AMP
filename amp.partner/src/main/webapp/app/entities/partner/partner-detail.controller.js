(function() {
    'use strict';

    angular
        .module('ampmember')
        .controller('PartnerDetailController', PartnerDetailController);

    PartnerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Partner'];

    function PartnerDetailController($scope, $rootScope, $stateParams, entity, Partner) {
        var vm = this;
        vm.partner = entity;
        
        var unsubscribe = $rootScope.$on('ampfrontApp:partnerUpdate', function(event, result) {
            vm.partner = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
