
//-----------------------------------Support Request--------------------------------------------------------//

(function () {
    'use strict';

    angular.module('client.crud')
        .config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('site.support-requests', {
                url: '/support-requests',
                abstract: true,
                resolve: {
                    supportRequests: getAllSupportRequest
                },
                views: {
                    'content@site': {
                        templateUrl: 'client/crud/support-requests/support-requests.html',
                        controller: 'supportRequestsHeaderController',
                        controllerAs: 'creCtrl'
                    }
                }
            })
            .state('site.support-requests.list', {
                url: '/list',
                templateUrl: 'client/crud/support-requests/list/support-request-list.html',
                controller: 'supportRequestController',
                controllerAs: 'Ctrl',
            })
            .state('site.support-requests.list.edit', {
                url: '/edit/:id',
                templateUrl: 'client/crud/support-requests/modify/support-request-modify.html',
                controller: 'modifyController',
                controllerAs: 'supReqCtrl'
            })
            .state('site.support-requests.create', {
                url: '/create',
                templateUrl: 'client/crud/support-requests/modify/support-request-modify.html',
                controller: 'modifyController',
                controllerAs: 'supReqCtrl'
            })
            .state('site.support-requests.details', {
                url: '/:id',
                templateUrl: 'client/crud/support-requests/detail/support-request-details.html',
                controller: 'srDetailsController',
                controllerAs: 'ReqDetsCtrl'
            })
    }

    getAllSupportRequest.$inject = ['supportRequestsService']


    function getAllSupportRequest(supportRequestService) {
        return supportRequestService.readAll()
            .then(data => {
                console.log(data);
                return data;
            });
    }
})();
