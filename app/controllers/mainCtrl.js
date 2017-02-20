(function() {
    'use strict';

    dashboardApp.controller("mainCtrl", ['$scope', '$rootScope', 'appConfiguration', '$state', '$ajaxFactory', 'localStorageService', '$timeout', mainCtrl]);

    function mainCtrl($scope, $rootScope, appConfiguration, $state, $ajaxFactory, localStorageService, $timeout) {
        $scope.registationForm = {};
        $scope.loginFormObj = {};
        $scope.forgetPwdForm = {};
        $scope.isMatchPassword = true;
        $scope.isErorMsg = false;
        $rootScope.loginId = localStorageService.get('email');
        if (!$rootScope.loginId) {
            $state.go(appConfiguration.signInState);
        }

        $scope.validateUser = function(form) {
            if (form && form.$valid) {
                $scope.isErorMsg = false;
                $rootScope.showProcessing = true;
                $timeout(function() {
                    console.log('dsssddssdsd');
                    $scope.isErorMsg = false;
                }, 2500);
                var promiseObj = $ajaxFactory.loadJSONFile(appConfiguration.datafiles + 'users.json');
                promiseObj.then(function(d) {
                    $rootScope.showProcessing = false;
                    $scope.loginFormObj.$setPristine();
                    var isUserFound = false;
                    for (var i = 0; i < d.length; i++) {
                        if (d[i]['email'] == form.usernameStr && d[i]['password'] == form.password) {
                            localStorageService.set('email', d[i]['email']);
                            $rootScope.loginId = d[i]['email'];
                            $state.go(appConfiguration.dashboardState);
                            break;
                        }
                    }
                    $scope.isErorMsg = true;
                });
                promiseObj.catch(function(d) {
                    $rootScope.showProcessing = false;
                    console.log('catch block executed : promiseObj ', d);
                    return d;
                });
                promiseObj.finally(function(d) {
                    //console.log('finally block executed : promiseObj', d);
                });
            }
        }

        $scope.createNewUser = function(form) {
            if (form && form.$valid && $scope.validateRePassword($scope.registationForm)) {
                $scope.registationForm.$setPristine();
                console.log('createNewUser Valid', $scope.registationForm);
            }
        }

        $scope.resetPassword = function(form) {
            if (form && form.$valid) {
                $scope.forgetPwdForm.$setPristine();
                console.log('resetPassword Valid', $scope.forgetPwdForm);
            }
        }


        $scope.validateRePassword = function(obj) {
            if (!isNullOrEmpty(obj.password.$viewValue) && !isNullOrEmpty(obj.repassword.$viewValue) && (obj.password.$viewValue !== obj.repassword.$viewValue)) {
                $scope.isMatchPassword = false;
            } else {
                $scope.isMatchPassword = true;
            }
            return $scope.isMatchPassword;
        };

        function isNullOrEmpty(obj) {
            return (angular.isUndefined(obj) || obj == null || obj == 'null' || typeof obj == "undefined" || obj == "");
        };
    }

})();