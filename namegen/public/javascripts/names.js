angular.module('names', [])
    .controller('mainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.currentName = "No Name Yet";
            $scope.favNames = [];
            
            $scope.getName = function() {
                return $http.get('/generate').success(function(data) {
                    console.log(data);
                    $scope.currentName = data;
                });
            };
            $scope.addFavorite = function() {
                console.log("Adding to favorites");
                var newName = { name: $scope.currentName, upvotes: 0 };
                $http.post('/names', newName).success(function(data) {
                    $scope.favNames.push(data);
                });
            };
            $scope.incrementUpvotes = function(name) {
                $http.put('/names/' + name._id + '/upvote')
                    .success(function(data) {
                        console.log("upvote worked");
                        name.upvotes += 1;
                    });
            };

            $scope.getAll = function() {
                console.log("Getting favorite names");
                return $http.get('/names').success(function(data) {
                    //$scope.favNames = data;
                    angular.copy(data, $scope.favNames);
                    console.log($scope.favNames);
                });
            };
            $scope.getAll();
            console.log($scope.favNames);
        }
    ]);
