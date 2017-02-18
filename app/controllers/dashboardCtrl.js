(function() {
    'use strict';

    dashboardApp.controller("dashboardCtrl", ['$scope', '$rootScope', 'appConfiguration', '$state', '$ajaxFactory', 'localStorageService', dashboardCtrl]);

    function dashboardCtrl($scope, $rootScope, appConfiguration, $state, $ajaxFactory, localStorageService) {
        $rootScope.loginId = localStorageService.get('email');
        $scope.isCollapsePanel = true;
        if (!$rootScope.loginId) {
            $state.go(appConfiguration.signInState);
        }

        $scope.createProject = function() {
            alert('bootstrap dialog required');
        }

        $scope.removePanel = function(event) {
            event.preventDefault();
            var hpanel = $(event.target).closest('div.cpanel');
            hpanel.remove();
            $scope.isCollapsePanel = false;
            $('.drawingArea-data').css("border-bottom", "solid #3a3d47");
        }
        $scope.showHidePanel = function() {
            event.preventDefault();
            var hpanel = $(event.target).closest('div.cpanel');
            var icon = $(event.target).closest('i');
            var body = hpanel.find('div.cpanel-body');
            var footer = hpanel.find('div.cpanel-footer');
            body.slideToggle(300);
            footer.slideToggle(200);

            // Toggle icon from up to down
            icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
            hpanel.toggleClass('').toggleClass('cpanel-collapse');
            setTimeout(function() {
                hpanel.resize();
                hpanel.find('[id^=map-]').resize();
            }, 50);

            $('.drawingArea-data').css("height", "100%");
        }
    }

})();
