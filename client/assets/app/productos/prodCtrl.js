(function(){
    'use strict'
    function prodCtrl($scope, $timeout, $mdSidenav,
                      $rootScope, prodServ, $mdDialog,
                      $mdMedia, $cookieStore, $location,
                      $http, $q, $log ) {
    var prod = this;
    
    $scope.productos = [];
    
    prodServ.query().$promise.then(function (data) {
                      data.forEach(function(e) {
                       $scope.productos.push(e);
                          
                      }, this);
                      $scope.numeroDeProductos = $scope.productos.length;
                    });
             
    $scope.onClickMenu = function () {
                $mdSidenav('left').toggle();
            }
    
    var uid = 1;       
    // Guardar Producto y Actualizar---------------------------------------- 
    $scope.saveProducto = function() {
        if($scope.newProducto.id == null) {
            $scope.newProducto.id = uid++;
            $scope.productos.push($scope.newProducto);
            $scope.numeroDeProductos = $scope.productos.length;
            prodServ.save($scope.newProducto);
            console.log($scope.numeroDeProductos);
        } else {
            for(var i in $scope.productos) {
                if($scope.productos[i].id == $scope.newProducto.id) {
                    $scope.productos[i] = $scope.newProducto;
                    var data = {id: $scope.productos[i].id };
                    prodServ.update(data, $scope.newProducto).$promise.then(function (e) {
                            alert("elemento actualizado");
                        }, function (err) {
                        console.log(err); 
                        });
                    }
                }                
        }   
        $scope.newProducto = {};
    }

    // Eliminar Producto----------------------------------------------------- 
    // Observacion:si el Producto tiene compras no se eliminara por constrain
    // Todo : cachear el error del constrain
    $scope.delete = function(id) {
      for(var i in $scope.productos) {
        if($scope.productos[i].id == id) {
            var data = {id: $scope.productos[i].id };
            prodServ.delete({},data).$promise.then(function (e) {
                    alert("elemento eliminado");
                }, function (err) {
                   console.log(err); 
            });             
            $scope.productos.splice(i,1);
            $scope.newProducto = {};
            $scope.numeroDeProductos = $scope.productos.length;
            console.log($scope.numeroDeProductos);
            }
        }
    }
    
    // Seleccionar Producto para editarlo---------------------------------
    $scope.edit = function(id) {
        console.log(id);
        for(var i in $scope.productos) {
            if($scope.productos[i].id == id) {
                $scope.newProducto = angular.copy($scope.productos[i]);
            }
        }
    }   
    // Control para el paginado------------------------------------------ 
    $scope.pageSize     = 8;
    $scope.currentPage  = 0;
    $scope.numeroDePag = function () {
         
    if ($scope.numeroDeProductos > $scope.pageSize) {
            return Math.ceil( $scope.numeroDeProductos / $scope.pageSize);            
    }else{
             return 1;
    }
}
}
//------------------------------------------------------------------------------------------------------
angular.module('App')
        .controller('prodCtrl',['$scope', '$timeout','$mdSidenav',
                                '$rootScope', 'prodServ', '$mdDialog',
                                '$mdMedia', '$cookieStore','$location',
                                '$http', '$q', '$log',
                                prodCtrl]);
})();
