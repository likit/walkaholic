angular.module('starter.controllers', [])

// wraps call in $ionicPlatform.ready to ensure plugin is ready
.controller('DashCtrl', function($scope, $ionicPlatform, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  $ionicPlatform.ready(function() {
    var options = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(options).then(function(location) {
      $scope.location = location; // won't automatically trigger digest
      var latLng = new google.maps.LatLng(location.coords.latitude,
                                            location.coords.longitude);
      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      $scope.map = new google.maps.Map(document.getElementById("googlemap"), mapOptions)
      google.maps.event.addListenerOnce($scope.map, 'idle', function() {
        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });
      });
    }, function(error) {
      console.log("Could not get location.")
    });
  });
  $scope.updateMap = function() {
    var options = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(options).then(function(location) {
      $scope.location = location; // won't automatically trigger digest
      console.log($scope.location.coords.latitude, $scope.location.coords.longitude);
    }, function(error) {
      console.log("Could not get location.")
    });
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});