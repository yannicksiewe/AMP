(function() {
    'use strict';

    angular
        .module('ampmember')
        .controller('AmpUserController', AmpUserController);

    AmpUserController.$inject = ['$scope', '$state', 'AmpUser', 'ParseLinks', 'AlertService', 'pagingParams', 'paginationConstants'];

    function AmpUserController ($scope, $state, AmpUser, ParseLinks, AlertService, pagingParams, paginationConstants) {
        var vm = this;
        vm.loadAll = loadAll;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        //vm.loadAll();

        function initSearch(){
            var first = (pagingParams.page - 1)*paginationConstants.itemsPerPage;
            var searchInput={
                entity: {},
                start: first,
                max: first+paginationConstants.itemsPerPage,
                fieldNames: [],
                sortFieldNames: [],
                className: 'org.adorsys.amp.server.jpa.AmpUserSearchInput'
            };

            return searchInput;
        }

         function loadAll (tableState) {

            var searchInput = initSearch();

             var sortArray = sort();
             if(sortArray && sortArray.length>0){
                 searchInput = processSort(searchInput,sortArray);
             }

             if(tableState.search.predicateObject){
                 searchInput=tableStateToSearchInput(searchInput,tableState.search.predicateObject);
             }

        	AmpUser.findByLike(searchInput, onSuccess, onError);

        }

        function sort() {
            var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
            if(vm.predicate=='id'){
                result=[];
            }
            return result;
        }
        function onSuccess(data, headers) {
            vm.totalItems = data.total;
            vm.queryCount = vm.totalItems;
            vm.ampUsers = data.resultList;
            vm.page = pagingParams.page;
        }
        function onError(error) {
            AlertService.error(error.data.message);
        }


        function loadPage (page) {
            vm.page = page;
            vm.transition();
        }

        function transition () {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }
        
        function processSort(searchInput,sortTab){
            var sort = sortTab[0].split(',');
            var sortObject = {};
            sortObject.fieldName=sort[0];
            if(sort[1]=='asc'){
                sortObject.asc=true;
            }
            searchInput.sortFieldNames.push(sortObject);
            return searchInput;
        }

        function tableStateToSearchInput(searchInput, object){
            if (searchInput) {
                searchInput.entity = {}
                searchInput.fieldNames = [];
            }
            for(var key in object){
                if(object.hasOwnProperty(key)){
                    var keyValue = Object.getOwnPropertyDescriptor(object, key).value;
                    if(keyValue){
                        Object.defineProperty(searchInput.entity, key,
                            {value: keyValue, writable: true, enumerable: true, configurable: true});
                        searchInput.fieldNames.push(key);
                    }
                }
            }
            return searchInput;
        };
    }
})();
