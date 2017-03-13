angular.module('demo-pivotal-bankui', ['ngMaterial'])
.controller('Hello', function($scope, $http) {
    $http.get('https://shadrach-hello.cfapps.io/').
        then(function(response) {
            $scope.hello = response.data;
            console.log($scope.hello.response);
        });
})
.controller('demo-pivotal-getAcountDetail', function($scope, $http) {
    $scope.depositAmount;
    $scope.withdrawalAmount;
    var data = { number: '0001' }
    $http.post('https://demo-pivotal-bankservice.cfapps.io/getAccountDetail/',data).
        then(function(response) {
            $scope.accountDetail = response.data;
            if($scope.accountDetail.amount ==null)
              $scope.accountDetail.amount = 0;
            console.log($scope.accountDetail);
        });

    $scope.deposit = function() {
      if($scope.accountDetail.amount ==null)
        $scope.accountDetail.amount = 0;
      var amount = parseInt($scope.accountDetail.amount)+parseInt($scope.depositAmount)
      var depositData = { number: '0001', amount:amount}
      $http.post('https://demo-pivotal-bankservice.cfapps.io/updateAccountBalance/',depositData).
          then(function(response) {
              $scope.accountDetail = response.data;
              console.log($scope.accountDetail);
              $scope.depositAmount = null;
          });
    };
    $scope.withdrawal = function() {
      if($scope.accountDetail.amount ==null)
        $scope.accountDetail.amount = 0;
      var amount = parseInt($scope.accountDetail.amount)-parseInt($scope.withdrawalAmount)
      var withdrawalData = { number: '0001', amount:amount}
      $http.post('https://demo-pivotal-bankservice.cfapps.io/updateAccountBalance/',withdrawalData).
          then(function(response) {
              $scope.accountDetail = response.data;
              console.log($scope.accountDetail);
              $scope.withdrawalAmount =null;
          });
    };
})
