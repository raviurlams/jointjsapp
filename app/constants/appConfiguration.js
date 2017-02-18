(function() {
    'use strict';
    dashboardApp.constant('appConfiguration', {
        datafiles: '/data/',
        templatePath: './app/templates/',
        debugmode: false,
        signIn: '/login',
        signInState: 'signIn',
        signUp: '/signUp',
        signUpState: 'signUp',
        forgetPwd: '/resetPassword',
        forgetPwdState: 'resetPwd',
        dashboard: '/dashboard',
        dashboardState: 'Dashboard',
    });
})();
