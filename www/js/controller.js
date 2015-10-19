/*(function() {
    'use strict';
    angular
        .module('starter.controllers', [
            'firebase',
            'ngSanitize'
        ])

        .controller('TimerController', TimeController)
        .controller('ContentController', ContentController)
        .controller('SessionController', SessionController)
        .controller('MapController', MapController)
        .contoller('PictureController', PictureController)
        .controller('VolunteerController', VolunteerController)

    function TimerController() {
        var vm = this;
        vm.countDown = countDown;

        function countDown(ts) {
            setTimeout(function() {
                vm.$apply(function() {
                    vm.times = ts.days + " Days " + ts.hours + "H: " + ts.minutes + "M: " + ts.seconds + "S"
                });
            }, 1000);
        }
        var timerId =
            countdown(new Date("February 1, 2016, 01:00:00"), countDown, countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
    }


    ContentController.$inject = ['$ionicSideMenuDelegate'];

    function ContentController($ionicSideMenuDelegate) {
        var vm = this;
        vm.toggleLeftSideMenu = toggleLeftSideMenu;

        function toggleLeftSideMenu() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }

    SessionController.$inject = ['sessUrl', 'Session'];

    function SessionContoller(sessUrl, Session) {
        var vm = this;
        var ref = new Firebase(sessUrl);
        ref.on("value", function(snapshot) {
            //console.log(snapshot.val());
            vm.session = snapshot.val();
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    function MapController() {}

    PictureController.$inject = ['$ionicLoading', '$state', 'Flickr'];

    function PictureController($ionicLoading, $state, Flickr) {
        var vm = this;
        vm.getPics = getPics;
        vm.getPic = getPic;
        var getPicInfo = getPicInfo;

        vm.photoList = [];
        $ionicLoading.show();

        function getPics(result) {
            console.log(result);
            var photoList = result.data.photosets.photoset;
            angular.forEach(photoList, function(value, key) {
                Flickr.getPhotos(value.id).then(getPic);
            });
        }

        function getPic(result) {
            var photos = result.data.photoset.photo;
            var result = result.data.photoset.title;
            angular.forEach(photos, function(photo, key) {
                var id = photo.id;
                var secret = photo.secret;
                Flickr.getInfo(id, secret).then(getPicInfo);
            });
        }

        function getPicInfo(result) {
            vm.photoList.push({
                sizes: result[0].data,
                info: result[1].data
            });
            $ionicLoading.hide();
        }
        Flickr.getPhotoSets().then(getPics);

    }

    VolunteerController.$inject = ['volUrl', 'Volunteer', '$state', '$ionicHistory', '$ionicPopup'];

    function VolunteerController(volUrl, Volunteer, $state, $ionicHistory, $ionicPopup) {
        var vm = this;
        vm.master = {};
        var exists;
        vm.volunteer = Volunteer;
        vm.informed = false;
        vm.add = function() {
            var fullName = vm.fullName;
            var email = vm.emails;
            checkIfUserExists(email);

            function checkIfUserExists(email) {
                var usersRef = new Firebase(volUrl);
                usersRef.once("value", getSnapshot)

            }

            function getSnapshot(snapshot) {
                snapshot.forEach(checkEmailExists) 
                userExistsCallback(email, exists);
            }

            function checkEmailExists(data) {
                console.log('data', data.child('email').val());

                exists = (data.child('email').val() != email);
                console.log('exist', exists);
                return exists;

            }

            function userExistsCallback(email, exists) {
                if (!exists) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Volunteer Registration',
                        template: 'Email Id already Exists!'
                    });
                    alertPopup.then(function(res) {
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        $state.go('app.home');
                        vm.fullName = '';
                        vm.emails = '';
                        vm.drupalId = '';
                        vm.interestArea = '';
                        vm.informed = false;
                        vm.volunteerfrm.$setPristine();
                    });
                } else {
                    var drupalId = vm.drupalId;
                    var interestArea = vm.interestArea;
                    var informed = vm.informed;
                    var save = vm.volunteer.$add({
                        "fullName": fullName,
                        "email": email,
                        "drupalId": drupalId,
                        "interestArea": interestArea,
                        "informed": informed
                    });
                    if (save) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Volunteer Registration',
                            template: 'Registered Successfully!'
                        });
                        alertPopup.then(function(res) {
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                            $state.go('app.home');
                            vm.fullName = '';
                            vm.emails = '';
                            vm.drupalId = '';
                            vm.interestArea = '';
                            vm.informed = false;
                            vm.volunteerfrm.$setPristine();
                        });

                    } else {
                        alert('something went wrong');
                    }
                }
            }



        }


    }

})();*/

angular.module('starter.controllers', ['firebase', 'ngSanitize'])
    .controller('TimerCtrl', function($scope) {
        var timerId =
            countdown(
                new Date("February 1, 2016, 01:00:00"),
                function(ts) {
                    setTimeout(function() {
                        $scope.$apply(function() {
                            $scope.times = ts.days + " Days " + ts.hours + "H: " + ts.minutes + "M: " + ts.seconds + "S"
                        });
                    }, 1000);
                },
                countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
    })

.controller('ContentController', ['$scope', '$ionicSideMenuDelegate',
    function($scope, $ionicSideMenuDelegate) {
        $scope.toggleLeftSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }
])

.controller('VolunteerCtrl', function($scope, volUrl, Volunteer, $state, $ionicHistory, $ionicPopup) {
    $scope.master = {};
    var exists;
    $scope.volunteer = Volunteer;
    $scope.informed = false;
    $scope.add = function() {
        var fullName = $scope.fullName;
        var email = $scope.emails;
        checkIfUserExists(email);

        function checkIfUserExists(email) {
            var usersRef = new Firebase(volUrl);
            usersRef.once("value", function(snapshot) {
                snapshot.forEach(function(data) {

                    console.log('data', data.child('email').val());

                    exists = (data.child('email').val() != email);
                    console.log('exist', exists);


                });
                userExistsCallback(email, exists);
            });


        }

        function userExistsCallback(email, exists) {
            if (!exists) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Volunteer Registration',
                    template: 'Email Id already Exists!'
                });
                alertPopup.then(function(res) {
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go('app.home');
                    $scope.fullName = '';
                    $scope.emails = '';
                    $scope.drupalId = '';
                    $scope.interestArea = '';
                    $scope.informed = false;
                    $scope.volunteerfrm.$setPristine();
                });
            } else {
                var drupalId = $scope.drupalId;
                var interestArea = $scope.interestArea;
                var informed = $scope.informed;
                var save = $scope.volunteer.$add({
                    "fullName": fullName,
                    "email": email,
                    "drupalId": drupalId,
                    "interestArea": interestArea,
                    "informed": informed
                });
                if (save) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Volunteer Registration',
                        template: 'Registered Successfully!'
                    });
                    alertPopup.then(function(res) {
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        $state.go('app.home');
                        $scope.fullName = '';
                        $scope.emails = '';
                        $scope.drupalId = '';
                        $scope.interestArea = '';
                        $scope.informed = false;
                        $scope.volunteerfrm.$setPristine();
                    });

                } else {
                    alert('something went wrong');
                }
            }
        }



    }

})
    .controller('VideoCtrl', ['$scope', '$sce', '$ionicPopup', '$state', '$ionicHistory',
        function($scope, $sce, $ionicPopup, $state, $ionicHistory) {
            if (window.Connection) {

                if (navigator.connection.type == Connection.NONE) {

                    $ionicPopup.alert({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                        .then(function(result) {
                            if (result) {

                                //ionic.Platform.exitApp();
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                                $state.go('app.home');
                            }

                        });
                } else {

                    $scope.video = undefined;
                    var urls = [{
                        "url": "https://www.youtube.com/embed/uKxNqXQhcnQ",
                        "text": "Top Ten places to See in Mumbai / Bombay ! Some Historical , Some monumental...some for art lovers...Mumbai has it all"
                    }, {
                        "url": "https://www.youtube.com/embed/YqRjzfnPAqg",
                        "text": "Take a walk with Deepa through the bustling bazaars of Mumbai."
                    }, {
                        "url": "https://www.youtube.com/embed/uDwDRzkRtc4",
                        "text": "All kinds of fascinating antiques can be found here."
                    }, {
                        "url": "https://www.youtube.com/embed/_bHQct5zNxc",
                        "text": "Mumbai, India offers some of the finest Victorian architecture in the world."
                    }, {
                        "url": "https://www.youtube.com/embed/HNV_IJisUy8",
                        "text": "Premjit explores what inspires Ananya, a painter who resides in Mumbai."
                    }];
                    var item = urls[Math.floor(Math.random() * urls.length)];
                    $scope.video = $sce.trustAsResourceUrl(item.url);
                    $scope.videotext = item.text;
                    console.log('item-' + $scope.video);
                }
            }

        }
    ])

.controller('SessionCtrl', function($scope, sessUrl, Session) {
    var ref = new Firebase(sessUrl);


    $scope.doRefresh = function() {
        ref.on("value", function(snapshot) {
            //console.log(snapshot.val());
            $scope.session = snapshot.val();
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
        $scope.$broadcast('scroll.refreshComplete');


    }
    $scope.doRefresh();
})
    .controller('MapCtrl', ['$scope',
        function($scope) {
            // Code will be here
        }
    ])

.controller('PicCtrl', function($scope, $ionicLoading, $state, Flickr, $ionicModal, $ionicSlideBoxDelegate) {
    $scope.photoList = [];
    $ionicLoading.show();

    function getPics(result) {
        console.log(result);
        var photoList = result.data.photosets.photoset;
        angular.forEach(photoList, function(value, key) {
            Flickr.getPhotos(value.id).then(getPic);
        });
    }

    function getPic(result) {
        var photos = result.data.photoset.photo;
        var result = result.data.photoset.title;
        angular.forEach(photos, function(photo, key) {
            var id = photo.id;
            var secret = photo.secret;
            Flickr.getInfo(id, secret).then(getPicInfo);
        });
    }

    function getPicInfo(result) {
        $scope.photoList.push({
            sizes: result[0].data,
            info: result[1].data
        });
        $ionicLoading.hide();
    }
    Flickr.getPhotoSets().then(getPics);

    $ionicModal.fromTemplateUrl('open-pic.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal
    })

    $scope.openModal = function() {
        $scope.modal.show();
        $ionicSlideBoxDelegate.update();
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
    };
     $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
  
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };
  
    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    /*Flickr.getPhotoSets().then(function(result) {
            var photoList = result.data.photosets.photoset;
            angular.forEach(photoList, function(value, key) {
                Flickr.getPhotos(value.id).then(function(result) {
                    var photos = result.data.photoset.photo;
                    var result = result.data.photoset.title;
                    angular.forEach(photos, function(photo, key) {
                        var id = photo.id;
                        var secret = photo.secret;
                        Flickr.getInfo(id, secret).then(function(result) {
                            $scope.photoList.push({
                                sizes: result[0].data,
                                info: result[1].data
                            });
                            $ionicLoading.hide();
                        });
                    })
                })
            });

        });*/
});