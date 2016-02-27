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
     
    $scope.clientes = [
        {id:0, 'documento': '20282731', 'nombres':'Andres Jimenez', 'detalles': '+58-426-1637-863'}
    ];
    

    
    $scope.saveCliente = function() {
        
        if($scope.newCliente.id == null) {
             $scope.newCliente.id = uid++;
             $scope.clientes.push($scope.newCliente);
             $scope.numeroDeclientes = $scope.clientes.length;
             console.log($scope.numeroDeclientes);
        } else {
            
             for(var i in $scope.clientes) {
                    if($scope.clientes[i].id == $scope.newCliente.id) {
                        $scope.clientes[i] = $scope.newCliente;
                    }
             }                
        }
        $scope.newCliente = {};
    }

    
    $scope.delete = function(id) {
        
        for(var i in $scope.clientes) {
            if($scope.clientes[i].id == id) {
                $scope.clientes.splice(i,1);
                $scope.newCliente = {};
                $scope.numeroDeclientes = $scope.clientes.length;
                console.log($scope.numeroDeclientes);
            }
        }
        
    }
    
    
    $scope.edit = function(id) {
        for(var i in $scope.clientes) {
            if($scope.clientes[i].id == id) {
                $scope.newCliente = angular.copy($scope.clientes[i]);
            }
        }
    }   


     $scope.pageSize     = 5;
     $scope.currentPage  = 0;
     
      
     $scope.numeroDePag = function () {
         
         if ($scope.numeroDeclientes > $scope.pageSize) {
            return Math.ceil( $scope.numeroDeclientes / $scope.pageSize);            
         }else{
             return 1;
         }
       }

         
            
            
    //------------------------------------------------------------------------------------------------------
    }
    
    function cliFilt () {
        return function (input, start) {
         start = +start;
        return input.slice(start);
    }
  };

        
      angular.module('App')
             .controller('cliCtrl',['$scope', '$timeout','$mdSidenav',
                                     '$rootScope', 'cliServ', '$mdDialog',
                                     '$mdMedia', '$cookieStore','$location',
                                     '$http', '$q', '$log',
                                     cliCtrl])
             .filter('startFrom',[cliFilt]);
})();
