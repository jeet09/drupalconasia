angular.module('starter.controllers', ['firebase', 'ngSanitize'])
    .value('volUrl', 'https://blistering-torch-4937.firebaseio.com/volunteer')
    .value('sessUrl', 'https://sessionsapi.firebaseio.com/session')
    .factory("Volunteer", function(volUrl, $firebaseArray) {
        //var itemsRef = new Firebase("https://blistering-torch-4937.firebaseio.com/items");
        //return $firebaseArray(itemsRef);
        //console.log($firebaseArray(new Firebase(volUrl)));
        
        return $firebaseArray(new Firebase(volUrl));
    })

    .factory("Session", function(sessUrl, $firebaseArray) {
        return $firebaseArray(new Firebase(sessUrl));
    })
    .directive('map', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var zValue = scope.$eval(attrs.zoom);
                var lat = scope.$eval(attrs.lat);
                var lng = scope.$eval(attrs.lng);


                var myLatlng = new google.maps.LatLng(lat, lng),
                    mapOptions = {
                        zoom: zValue,
                        center: myLatlng
                    },
                    map = new google.maps.Map(element[0], mapOptions),
                    marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        draggable: false
                    });
                     google.maps.event.addListener(marker, 'dragend', function(evt) {
                console.log('Current Latitude:', evt.latLng.lat(), 'Current Longitude:', evt.latLng.lng());
            });

            }

        };

    })
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
            console.log('connection', navigator);

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
    .controller("CamCtrl", function($scope, $cordovaCamera) {

        $scope.takePicture = function() {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                // An error occured. Show a message to the user
            });
        }

    })
    .controller('SessionCtrl', function($scope, sessUrl, Session) {
        var ref = new Firebase(sessUrl);
        ref.on("value", function(snapshot) {
            //console.log(snapshot.val());
            $scope.session = snapshot.val();
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    })
     .controller('MapCtrl', ['$scope',
        function($scope) {
            // Code will be here
        }
    ]);