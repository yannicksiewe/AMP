(function() {
    'use strict';

    angular
        .module('ampfrontApp')
        .controller('AmpUserDetailController', AmpUserDetailController);

    AmpUserDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'AmpUser'];

    function AmpUserDetailController($scope, $rootScope, $stateParams, entity, AmpUser) {
        var vm = this;
        vm.ampUser = entity;
        
        var unsubscribe = $rootScope.$on('ampfrontApp:ampUserUpdate', function(event, result) {
            vm.ampUser = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
