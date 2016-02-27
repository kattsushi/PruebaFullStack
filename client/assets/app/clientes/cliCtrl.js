(function(){
    'use strict'
    function cliCtrl($scope, $timeout, $mdSidenav,
                      $rootScope, cliServ, $mdDialog,
                      $mdMedia, $cookieStore, $location,
                      $http, $q, $log ) {
    var cli = this;
    var datos = [];
    cli.datos = datos;

    $scope.clientes = [];
    
    cliServ.query().$promise.then(function (data) {
                      data.forEach(function(e) {
                      
                        $scope.clientes.push(e);
                          
                      }, this);
                      $scope.numeroDeclientes = $scope.clientes.length;
                      
         });
             
    $scope.onClickMenu = function () {
                $mdSidenav('left').toggle();
            }
    
    var uid = 1;       
     

  
    
    

    
    $scope.saveCliente = function() {
        
        if($scope.newCliente.id == null) {
             $scope.newCliente.id = uid++;
             $scope.clientes.push($scope.newCliente);
             $scope.numeroDeclientes = $scope.clientes.length;
             
             cliServ.save($scope.newCliente);
             console.log($scope.numeroDeclientes);
        } else {
            
             for(var i in $scope.clientes) {
                    if($scope.clientes[i].id == $scope.newCliente.id) {
                        $scope.clientes[i] = $scope.newCliente;
                        
                        var data = {id: $scope.clientes[i].id };
                
                        cliServ.update($scope.newCliente,data).$promise.then(function (e) {
                            alert("elemento actualizado");
                        }, function (err) {
                        console.log(err); 
                        });
                    }
             }                
        }
        $scope.newCliente = {};
    }

    
    $scope.delete = function(id) {
        
        for(var i in $scope.clientes) {
            if($scope.clientes[i].id == id) {
                
                var data = {id: $scope.clientes[i].id };
                
                cliServ.delete({},data).$promise.then(function (e) {
                    alert("elemento eliminado");
                }, function (err) {
                   console.log(err); 
                });
                console.log($scope.clientes[i].id);              
                
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


     $scope.pageSize     = 8;
     $scope.currentPage  = 0;
     
      
     $scope.numeroDePag = function () {
         
         if ($scope.numeroDeclientes > $scope.pageSize) {
            return Math.ceil( $scope.numeroDeclientes / $scope.pageSize);            
         }else{
             return 1;
         }
       }
    }
//------------------------------------------------------------------------------------------------------
angular.module('App')
        .controller('cliCtrl',['$scope', '$timeout','$mdSidenav',
                                '$rootScope', 'cliServ', '$mdDialog',
                                '$mdMedia', '$cookieStore','$location',
                                '$http', '$q', '$log',
                                cliCtrl]);
})();
