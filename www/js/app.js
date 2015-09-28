// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

.run(function($ionicPlatform, $cordovaSplashscreen) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    setTimeout(function() {
      $cordovaSplashscreen.hide()
       //navigator.splashscreen.hide();
    }, 100);

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'ContentController'
    })
  .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'TimerCtrl'
        }
      }  
    })
  
    .state('app.volunteer', {
      url: "/volunteer",
      views: {
        'menuContent' :{
          templateUrl: "templates/volunteer.html",
          controller: 'VolunteerCtrl'
        }

      }
    })
     .state('app.session', {
      url: "/session",
      views: {
        'menuContent' :{
          templateUrl: "templates/session.html",
          controller: 'SessionCtrl'
        }

      }
    })
    .state('app.video', {
      cache:false,
      url: "/video",
      views: {
        'menuContent' :{
          templateUrl: "templates/video.html",
          controller: 'VideoCtrl'
        }

      }
    })
    .state('app.reach', {
      cache:true,
      url: "/reach",
      views: {
        'menuContent' :{
          templateUrl: "templates/reach.html",
          controller: 'MapCtrl'
        }

      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/home');
});

