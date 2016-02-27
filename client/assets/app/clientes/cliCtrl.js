(function(){
    'use strict'
    function cliCtrl($scope, $timeout, $mdSidenav,
                      $rootScope, cliServ, $mdDialog,
                      $mdMedia, $cookieStore, $location,
                      $http, $q, $log ) {
    var cli = this;
    var datos = [];
    cli.datos = datos;

    var data = cliServ.dinamico.query().$promise.then(function (data) {
                    var x = 1+1;
                    return x;
         });
    cli.data = data;
    
    $scope.onClickMenu = function () {
                $mdSidenav('left').toggle();
            }
    
    var uid = 1;       
     
    $scope.contacts = [
        {id:0, 'name': 'PremAseem', 'email':'hello@gmail.com', 'phone': '123-2343-44'}
    ];
    
    
    $scope.saveContact = function() {
        
        if($scope.newcontact.id == null) {
             $scope.newcontact.id = uid++;
             $scope.contacts.push($scope.newcontact);
        } else {
            
             for(var i in $scope.contacts) {
                    if($scope.contacts[i].id == $scope.newcontact.id) {
                        $scope.contacts[i] = $scope.newcontact;
                    }
             }                
        }
        console.log($scope.contacts)
        $scope.newcontact = {};
    }

    
    $scope.delete = function(id) {
        
        for(var i in $scope.contacts) {
            if($scope.contacts[i].id == id) {
                $scope.contacts.splice(i,1);
                $scope.newcontact = {};
            }
        }
        
    }
    
    
    $scope.edit = function(id) {
        for(var i in $scope.contacts) {
            if($scope.contacts[i].id == id) {
                $scope.newcontact = angular.copy($scope.contacts[i]);
            }
        }
    }        
            
            
    //------------------------------------------------------------------------------------------------------
    }
      angular.module('App')
             .controller('cliCtrl',['$scope', '$timeout','$mdSidenav',
                                     '$rootScope', 'cliServ', '$mdDialog',
                                     '$mdMedia', '$cookieStore','$location',
                                     '$http', '$q', '$log',
                                     cliCtrl]);
})();
