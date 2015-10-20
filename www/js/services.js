/*angular.module('starter.services', [])
    .value('Flickr_data', {
        key: '2491cf8dc49fd0e70db0ac88b93d0285',
        endpoint: 'https://api.flickr.com/services/rest/',
        user_id: '134822744@N05'
    })
    .value('volUrl', 'https://blistering-torch-4937.firebaseio.com/volunteer')

.value('sessUrl', 'https://sessionsapi.firebaseio.com/session')

.factory("Volunteer", function(volUrl, $firebaseArray) {

    return $firebaseArray(new Firebase(volUrl));
})

.factory("Session", function(sessUrl, $firebaseArray) {
    return $firebaseArray(new Firebase(sessUrl));
})

.factory('Flickr', function($http, $q, Flickr_data) {
    var result = {};

    // Getting List of Photoset in a user account.
    result.getPhotoSets = function() {
        var url = Flickr_data.endpoint +
            '?method=flickr.photosets.getList&api_key=' + Flickr_data.key +
            '&user_id=' + Flickr_data.user_id +
            '&format=json&nojsoncallback=1';

        return $http.get(url);
    };
    result.getPhotos = function(photoset_id) {
        var defer = $q.defer();

        var url = Flickr_data.endpoint +
            '?method=flickr.photosets.getPhotos&api_key=' + Flickr_data.key +
            '&user_id=' + Flickr_data.user_id +
            '&photoset_id=' + photoset_id +
            '&format=json&nojsoncallback=1';


        // Getting the Photos from a photoset
        return $http.get(url)
    };

    // Getting Info for each photo.

    result.getInfo = function(id, secret) {
        sizes = Flickr_data.endpoint +
            '?method=flickr.photos.getSizes&api_key=' + Flickr_data.key +
            '&photo_id=' + id + '&format=json&nojsoncallback=1';

        info = Flickr_data.endpoint +
            '?method=flickr.photos.getInfo&api_key=' + Flickr_data.key +
            '&photo_id=' + id + '&secret=' + secret +
            '&format=json&nojsoncallback=1';
        return $q.all([
            $http.get(sizes),
            $http.get(info)
        ]);
    };
    return result;
})*/

(function() {
    'use strict';
    angular
        .module('starter.services', [])
        .value('Flickr_data', {
            key: '2491cf8dc49fd0e70db0ac88b93d0285',
            endpoint: 'https://api.flickr.com/services/rest/',
            user_id: '134822744@N05'
        })
        .value('volUrl', 'https://blistering-torch-4937.firebaseio.com/volunteer')
        .value('sessUrl', 'https://sessionsapi.firebaseio.com/session')
        .factory("Volunteer", Volunteer)
        .factory("Session", Session)
        .factory('Flickr', Flickr)

    Volunteer.$inject = ['volUrl', '$firebaseArray'];

    function Volunteer(volUrl, $firebaseArray) {
        return $firebaseArray(new Firebase(volUrl));
    }

    Session.$inject = ['sessUrl', '$firebaseArray'];

    function Session(sessUrl, $firebaseArray) {
        return $firebaseArray(new Firebase(sessUrl));
    }

    Flickr.$inject = ['$http', '$q', 'Flickr_data'];

    function Flickr($http, $q, Flickr_data) {
        var result = {};

        // Getting List of Photoset in a user account.
        result.getPhotoSets = function() {
            var url = Flickr_data.endpoint +
                '?method=flickr.photosets.getList&api_key=' + Flickr_data.key +
                '&user_id=' + Flickr_data.user_id +
                '&format=json&nojsoncallback=1';

            return $http.get(url);
        };
        result.getPhotos = function(photoset_id) {
            var defer = $q.defer();

            var url = Flickr_data.endpoint +
                '?method=flickr.photosets.getPhotos&api_key=' + Flickr_data.key +
                '&user_id=' + Flickr_data.user_id +
                '&photoset_id=' + photoset_id +
                '&format=json&nojsoncallback=1';


            // Getting the Photos from a photoset
            return $http.get(url)
        };

        // Getting Info for each photo.

        result.getInfo = function(id, secret) {
            var sizes = Flickr_data.endpoint +
                '?method=flickr.photos.getSizes&api_key=' + Flickr_data.key +
                '&photo_id=' + id + '&format=json&nojsoncallback=1';

            var info = Flickr_data.endpoint +
                '?method=flickr.photos.getInfo&api_key=' + Flickr_data.key +
                '&photo_id=' + id + '&secret=' + secret +
                '&format=json&nojsoncallback=1';
            return $q.all([
                $http.get(sizes),
                $http.get(info)
            ]);
        };
        return result;
    }

})();
