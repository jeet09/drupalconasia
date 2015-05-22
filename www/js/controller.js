angular.module('starter.controllers', [])

.controller('TimerCtrl', function($scope) {
    $scope.timer = function() {
        var event = new Date("February 01, 2016 10:01:40");
        var now = new Date();
        var timeDiff = event.getTime() - now.getTime();
        if (timeDiff <= 0) {
            clearTimeout(timer);

        }
        var seconds = Math.floor(timeDiff / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        $scope.updateTimer = function() {
        	$scope.timer();
            $scope.countdown = {
                hours: hours,
                minutes: minutes,
                days: days,
                secons: seconds
            }
        }
        setTimeout(function() {
        $scope.$apply(function() {
            $scope.updateTimer();
        });
    }, 1000);
        //var timer = setTimeout('cdtd()', 1000);
    }
    $scope.timer();
})