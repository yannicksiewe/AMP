(function() {
    'use strict';
    angular
        .module('ampmember')
        .factory('PartnerService', PartnerService);

    PartnerService.$inject = ['$resource', 'SERVER_URL'];

    function PartnerService ($resource,SERVER_URL) {
        var resourceUrl =  SERVER_URL+'/rest/partnerservice/:id';

        return $resource(resourceUrl, {id: '@id'}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' },
            'findByLike': {
                method: 'POST',
                url: SERVER_URL+'/rest/partnerservice/findByLike'
            }
        });
    }
})();
