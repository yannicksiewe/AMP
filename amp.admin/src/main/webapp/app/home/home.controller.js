(function() {
    'use strict';

    angular
        .module('ampfrontApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state'];

    function HomeController ($scope, Principal, LoginService, $state) {
        var vm = this;


    }
})();
