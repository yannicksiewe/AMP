(function() {
    'use strict';

    angular
        .module('ampmember')
        .controller('MemberDetailController', MemberDetailController);

    MemberDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'DataUtils', 'entity', 'Member'];

    function MemberDetailController($scope, $rootScope, $stateParams, DataUtils, entity, Member) {
        var vm = this;
        vm.member = entity;
        
        var unsubscribe = $rootScope.$on('ampfrontApp:memberUpdate', function(event, result) {
            vm.member = result;
        });
        $scope.$on('$destroy', unsubscribe);

        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
    }
})();
