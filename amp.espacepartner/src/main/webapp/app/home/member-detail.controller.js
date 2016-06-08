(function() {
    'use strict';

    angular
        .module('ampmember')
        .controller('MemberDetailController', MemberDetailController);

    MemberDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'DataUtils', 'Member'];

    function MemberDetailController($scope, $rootScope, $stateParams, DataUtils, Member) {
        var vm = this;
        var searchInput={
            entity: {},
            start: 0,
            max: 10,
            fieldNames: [],
            sortFieldNames: [],
            className: 'org.adorsys.amp.server.jpa.MemberSearchInput'
        };
        vm.show=false;

        vm.isFill=function(){
            if(vm.member){
                console.log(vm.member);
                return true;
            }
            else{
                return false;
            }
        }

        vm.search =function(query){
            searchInput.entity.identifiant=query;
            searchInput.fieldNames.push('identifiant');
            Member.findBy(searchInput, function(data){
                if(data.resultList[0]){
                    vm.member = data.resultList[0];
                    vm.show=false;
                }else{
                    vm.show=true;
                    vm.member=undefined;
                }


            }, function(error){

            });
        }

        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
    }
})();
