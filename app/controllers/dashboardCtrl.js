(function() {
    'use strict';

    dashboardApp.controller("dashboardCtrl", ['$scope', '$rootScope', 'appConfiguration', '$state', '$ajaxFactory', 'localStorageService', dashboardCtrl]);

    function dashboardCtrl($scope, $rootScope, appConfiguration, $state, $ajaxFactory, localStorageService) {
        $rootScope.loginId = localStorageService.get('email');
        if (!$rootScope.loginId) {
            $state.go(appConfiguration.signInState);
        }
        
        $scope.createProject = function(){
            alert('bootstrap dialog required');
        }
    }

})();
