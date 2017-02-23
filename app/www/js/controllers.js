angular.module('starter.controllers', [])

// wraps call in $ionicPlatform.ready to ensure plugin is ready
.controller('DashCtrl', function($scope, $ionicPlatform,
                          $ionicLoading, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  var marker;
  var markerInfo = new google.maps.InfoWindow({content: 'None'});

  $ionicPlatform.ready(function() {
    var options = {timeout: 10000, enableHighAccuracy: true};
    $ionicLoading.show();
    $cordovaGeolocation.getCurrentPosition(options).then(function(location) {
    $scope.markerLoc = {lat: location.coords.latitude,
                        lng: location.coords.longitude};
      var mapOptions = {
        center: $scope.markerLoc,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      $ionicLoading.hide();
      $scope.map = new google.maps.Map(document.getElementById("googlemap"), mapOptions)
      google.maps.event.addListener($scope.map, 'click', function(event) {
        $scope.$apply(function() {
          $scope.markerLoc.lat = event.latLng.lat();
          $scope.markerLoc.lng = event.latLng.lng();
        });
        marker.setPosition($scope.markerLoc);
        $scope.map.panTo($scope.markerLoc);
        markerInfo.close();
      });
      google.maps.event.addListenerOnce($scope.map, 'idle', function() {
        marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: $scope.markerLoc,
          title: 'Current location'
        });
        marker.addListener('click', function() {
          var infoContent = '<h5>Latitude: ' + $scope.markerLoc.lat + '<br/>';
          infoContent += 'Longitude: ' + $scope.markerLoc.lng + '</h5>';
          markerInfo.setContent(infoContent);
          markerInfo.open($scope.map, marker);
        });
      })
    }, function(error) {
      console.log("Could not get location.")
    });
  });
  $scope.updateMap = function() {
    var options = {timeout: 10000, enableHighAccuracy: true};
    $ionicLoading.show();
    $cordovaGeolocation.getCurrentPosition(options).then(function(location) {
      $scope.markerLoc.lat = location.coords.latitude;
      $scope.markerLoc.lng = location.coords.longitude;
      $scope.map.panTo($scope.markerLoc);
      $ionicLoading.hide();
      marker.setPosition($scope.markerLoc);
      marker.setAnimation(google.maps.Animation.DROP);
    }, function(error) {
      console.log("Could not get location.")
    });
  }
})

.controller('PinLocationCtrl', function($scope, $stateParams) {
  $scope.pinlat = $stateParams.lat;
  $scope.pinlng = $stateParams.lng;
  $scope.areaType = 'environment';
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