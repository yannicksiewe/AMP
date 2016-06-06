(function() {
    'use strict';

    angular
        .module('ampmember')
        .controller('AmpUserController', AmpUserController);

    AmpUserController.$inject = ['$scope', '$state', 'AmpUser', 'ParseLinks', 'AlertService', 'pagingParams', 'paginationConstants'];

    function AmpUserController ($scope, $state, AmpUser, ParseLinks, AlertService, pagingParams, paginationConstants) {
        var vm = this;
        vm.initPartnerUser = initPartnerUser;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;


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

         function initPartnerUser (partnerId) {

            var searchInput = initSearch();
             searchInput.entity.ouIdentif=partnerId;
             searchInput.fieldNames.push("ouIdentif");

        	AmpUser.findByLike(searchInput, onSuccess, onError);

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
        
    }
})();
