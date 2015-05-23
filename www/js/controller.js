angular.module('starter.controllers', [])

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