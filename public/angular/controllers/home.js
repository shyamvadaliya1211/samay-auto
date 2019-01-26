// 
// controller
// 
myHeader.controller('register', function($scope, $http, toastr, $location, $rootScope) {




    if(!$rootScope.g) {
        $rootScope.g = {};
    }

    $scope.Date =new Date;


    /**
     *
     */ 
     // User register 
    $scope.register = function() {

        $http.post('/api/user/register', {

            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            passWord: $scope.passWord

        }).success(function(data) {
                if (data.status == true) {
                    toastr.success('Email already exists');
                } else{
                    toastr.success('Registration successfully');
                }
            

        }).error(function() {

            alert('error');

        })
    };





    /**
     *
     */
     // User login
    $scope.userlogin = function() {

        $http.post('/api/user/login', {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            passWord: $scope.passWord

        }).success(function(data) {
            if (data.status == true) {
                $rootScope.g.loggedUser = data.user;
                toastr.success('login successfully');
                $location.path('/deshboard');
            } else {
                toastr.success('Invalid login');
            }
        });

    };






    $scope.profilePage = {};
    /**
     *
     */
    $scope.loadProfile = function() {

        $scope.profilePage.editObj = angular.copy($rootScope.g.loggedUser);

    };






    // Page refresh and data not change 
    $http.get('/api/user/page-refresh')
        .success(function(res) {
            if (res.status == true) {
                $rootScope.g.loggedUser = res.user;
            } else {
                console.log('false');
            }
        });

    
    /**
     *
     */
    // changeprofile
    $scope.changepro = function() {
        $http.post('/api/user/change-profile', {

            firstName: $scope.profilePage.editObj.firstName,
            lastName: $scope.profilePage.editObj.lastName,
            email: $scope.profilePage.editObj.email,

        }).success(function() {

            toastr.success('Changeprofile successfully');
        })

    };


    /**
     *
     */
    // changepassword
    $scope.changePassword = function() {
        if ($scope.newpassWord == $scope.confirmpassWord) {

            $http.post('/api/user/change-password', {

                passWord: $scope.newpassWord,

            }).success(function() {

                toastr.success('Password change successfully');

            });
            
        } else {
            toastr.success('Password not match');
        }

    }
    

    






    /**
     *
     */ 
     // User Email register 
    $scope.userEmail = function() {

        $http.post('/api/user/email-send', {
            from: $scope.profilePage.editObj.email,
            to: $scope.to,
            subject: $scope.subject,
            message: $scope.message,
            date: $scope.Date
        }).success(function() {
                        
            toastr.success('Email data successfully');
            
              
        }).error(function() {

            alert('error');

        })

        console.log($scope.to);
    };





    /**
     *
     */
    // Sent mail data fetch 
    $scope.sentMailUser = function() {

        $http.post('/sentmailuser', {
            from: $scope.profilePage.editObj.email
        }).success(function(data) {

            $rootScope.sentUserData = data.user;
            
        });

    };




    /**
     *
     */
    // Inbox mail data fetch 
    $scope.inboxMailUser = function() {
        $http.post('/inboxmailuser', {
            to: $scope.profilePage.editObj.email
        }).success(function(data) {
            $rootScope.inboxUserData = data.user;
        });
    };
 






    /**
     *
     */
    // Logout
    $scope.logout = function() {

        $http.post('/api/user/logout')
        .success(function() {
            $rootScope.g.loggedUser = {};
            $location.path('/logout');
        })
        .error(function() {
            console.log("logout fail");

        });
    };


});












myHeader.controller('listController', function($scope, $http, $rootScope, toastr, $location) {
    $scope.buttonHide = true;

    var getUserD = function(skip) {
        $http.post('/listuser/' + skip).success(function(data) {

            $scope.userData = data.user;
            for (var i = 0; i < $scope.userData.length; i++) {
                $scope.userData[i];
                
            }

            if ($scope.userData.length < 5) {
                $scope.buttonHide = false;   
            }
        });

    };

    $scope.skipNumber = 0
    $scope.init = function() {
        getUserD($scope.skipNumber);

    };

    
    $scope.load = function() {
        $scope.skipNumber = $scope.skipNumber + 5;
        getUserD($scope.skipNumber);
        
    };





    /*
     *
     */
    //Remove data
    $scope.remove = function(id) {
        $http.get('/api/member/remove/' + id)
            .success(function() {
                toastr.error('Remove  Successfully');
            });

    };




    /*
     *
     */
     // Data fetch from Model..
    $scope.userEdit = function(x) {
        
        $scope.usereditObj = angular.copy(x);
        
    };





    /*
     *
     */
     // Changeprofile model
     $scope.userchangeProfile = function() {
        $http.post('api/all/member/changeProfile', {
            _id: $scope.usereditObj._id,
            firstName: $scope.usereditObj.firstName,
            lastName: $scope.usereditObj.lastName,
            email: $scope.usereditObj.email,

        }).success(function() {

            toastr.success('Changeprofile successfully');
            console.log($scope.usereditObj._id);
        })

    };



});










myHeader.config(function($stateProvider) {



    $stateProvider.state('Home', {
        url: '/home',
        templateUrl: '/angular/templates/home.html'
    });

    $stateProvider.state('About', {
        url: '/about',
        templateUrl: '/angular/templates/about.html'
    });

    $stateProvider.state('registration', {
        url: '/registration',
        templateUrl: '/angular/templates/register.html'

    });

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/angular/templates/login.html'
    });

    $stateProvider.state('forgot', {
        url: '/forgot',
        templateUrl: '/angular/templates/forgot.html',

    });

    $stateProvider.state('changepassword', {
        url: '/changepass',
        templateUrl: '/angular/templates/changepass.html',

    });

    $stateProvider.state('deshboard', {
        url: '/deshboard',
        templateUrl: '/angular/templates/deshboard.html',

    });

    $stateProvider.state('changeprofile', {
        url: '/changeprofile',
        templateUrl: '/angular/templates/changeprofile.html',

    });


    $stateProvider.state('demo', {
        url: '/demo',
        templateUrl: '/angular/templates/demo.html',

    });

    $stateProvider.state('email', {
        url: '/email',
        templateUrl: '/angular/templates/email.html',

    });

    $stateProvider.state('sentemail', {
        url: '/sentemail',
        templateUrl: '/angular/templates/sentEmail.html',

    });

    $stateProvider.state('inboxmail', {
        url: '/inboxmail',
        templateUrl: '/angular/templates/inboxMail.html',

    });

    $stateProvider.state('logout', {
        url: '/logout',
        templateUrl: '/angular/templates/home.html',

    });


});



abc.directive('dropzone', function () {
  return function (scope, element, attrs) {
    var config, dropzone;

    config = scope[attrs.dropzone];

    // create a Dropzone for the element with the given options
    dropzone = new Dropzone(element[0], config.options);

    // bind the given event handlers
    angular.forEach(config.eventHandlers, function (handler, event) {
      dropzone.on(event, handler);
    });
  };
});

// angular.module('app', ['dropzone']);

angular.module('app').controller('someCtrl', function ($scope) {
  $scope.dropzoneConfig = {
    'options': { // passed into the Dropzone constructor
      'url': 'upload.php'
    },
    'eventHandlers': {
      'sending': function (file, xhr, formData) {
      },
      'success': function (file, response) {
      }
    }
  };
});




