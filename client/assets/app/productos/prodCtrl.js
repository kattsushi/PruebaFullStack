(function(){
    'use strict'
    function prodCtrl($scope, $timeout, $mdSidenav,
                      $rootScope, prodServ, cliServ, $mdDialog,
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
    
    // Comprar Producto ------------------------------------------------------------
    
   
     $scope.toBuy = function(ev, id) {
            var useFullScreen = ($mdMedia('sm') || 
                                $mdMedia('xs'))  && 
                                $scope.customFullscreen;
          
          for(var i in $scope.productos) {
                if($scope.productos[i].id == id) {
                    $scope.buyProducto = angular.copy($scope.productos[i]);
                }
            }
           $scope.clientes = [];
    
            cliServ.query().$promise.then(function (data) {
                      data.forEach(function(e) {
                       $scope.clientes.push(e); 
                      }, this); 
              
     
          $mdDialog.show({
            locals : {data : $scope.buyProducto,
                      cliente: $scope.clientes }, 
            controller: DialogController,
            templateUrl: 'app/productos/modalCompra.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
          })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
          $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
          }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
          });
          
  });
     }
   
   function DialogController($scope, $mdDialog, data, cliente) {
     
      $scope.buyProductos = data;
      
      $scope.Buscar = function (ev) {
          
        $scope.clienteCompra = [];
        cliente.forEach(function(e) {
            if (e.documento == $scope.documento){
                $scope.clienteCompra.push(e);
            }
        }, this);
        
        console.log($scope.clienteCompra)
      }
      
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
        };      
           
}

    
   
}
//----------------------------------------------------------------------------------
angular.module('App')
        .controller('prodCtrl',['$scope', '$timeout','$mdSidenav',
                                '$rootScope', 'prodServ', 'cliServ', '$mdDialog',
                                '$mdMedia', '$cookieStore','$location',
                                '$http', '$q', '$log',
                                prodCtrl]);
})();
