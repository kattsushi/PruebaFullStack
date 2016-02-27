(function(){
    'use strict'
    function mainCtrl($scope, $timeout, $mdSidenav,
                      $rootScope, mainServ, prodServ, $mdDialog,
                      $mdMedia, $cookieStore, $location,
                      $http, $q, $log ) {
    var vm = this;
    
 
     //   var data = {documento: doc };
       
     $scope.BuscarDoc = function (doc) {
        if ( doc !== '') {
            
            console.log(doc); 
            $scope.compras = [];
            mainServ.query().$promise.then(function (data) {
                data.forEach(function(e) {
                    $scope.compras.push(e);
                }, this); 
            console.log($scope.compras['productos']);              
            $scope.numeroDeCompras = $scope.compras.length;                                
            });
        } 
 
     }  

    
             
    $scope.onClickMenu = function () {
                $mdSidenav('left').toggle();
            }
    
    var uid = 1;       
    // Guardar Sede y Actualizar---------------------------------------- 
    $scope.saveSede = function() {
        if($scope.newSede.id == null) {
            $scope.newSede.id = uid++;
            $scope.compras.push($scope.newSede);
            $scope.numeroDeCompras = $scope.compras.length;
            mainServ.save($scope.newSede);
            console.log($scope.numeroDeCompras);
        } else {
            for(var i in $scope.compras) {
                if($scope.compras[i].id == $scope.newSede.id) {
                    $scope.compras[i] = $scope.newSede;
                    var data = {id: $scope.compras[i].id };
                    mainServ.update(data, $scope.newSede).$promise.then(function (e) {
                            alert("elemento actualizado");
                        }, function (err) {
                        console.log(err); 
                        });
                    }
                }                
        }   
        $scope.newSede = {};
    }

    // Eliminar Sede----------------------------------------------------- 
    // Observacion:si el Sede tiene compras no se eliminara por constrain
    // Todo : cachear el error del constrain
    $scope.delete = function(id) {
      for(var i in $scope.compras) {
        if($scope.compras[i].id == id) {
            var data = {id: $scope.compras[i].id };
            mainServ.delete({},data).$promise.then(function (e) {
                    alert("elemento eliminado");
                }, function (err) {
                   console.log(err); 
            });             
            $scope.compras.splice(i,1);
            $scope.newSede = {};
            $scope.numeroDeCompras = $scope.compras.length;
            console.log($scope.numeroDeCompras);
            }
        }
    }
    
    // Seleccionar Sede para editarlo---------------------------------
    $scope.edit = function(id) {
        console.log(id);
        for(var i in $scope.compras) {
            if($scope.compras[i].id == id) {
                $scope.newSede = angular.copy($scope.compras[i]);
            }
        }
    }   
    // Control para el paginado------------------------------------------ 
    $scope.pageSize     = 10;
    $scope.currentPage  = 0;
    $scope.numeroDePag = function () {
         
    if ($scope.numeroDeCompras > $scope.pageSize) {
            return Math.ceil( $scope.numeroDeCompras / $scope.pageSize);            
    }else{
             return 1;
    }
}
}
//------------------------------------------------------------------------------------------------------
angular.module('App')
        .controller('mainCtrl',['$scope', '$timeout','$mdSidenav',
                                '$rootScope', 'mainServ', 'prodServ', '$mdDialog',
                                '$mdMedia', '$cookieStore','$location',
                                '$http', '$q', '$log',
                                mainCtrl]);
})();
