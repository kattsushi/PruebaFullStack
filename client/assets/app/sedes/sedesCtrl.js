(function(){
    'use strict'
    function sedesCtrl($scope, $timeout, $mdSidenav,
                      $rootScope, sedesServ, $mdDialog,
                      $mdMedia, $cookieStore, $location,
                      $http, $q, $log ) {
    var sedes = this;
    
    $scope.sedes = [];
    
    sedesServ.query().$promise.then(function (data) {
                      data.forEach(function(e) {
                       $scope.sedes.push(e);
                          
                      }, this);
                      $scope.numeroDeSedes = $scope.sedes.length;
                     });
             
    $scope.onClickMenu = function () {
                $mdSidenav('left').toggle();
            }
    
    var uid = 1;       
    // Guardar Sede y Actualizar---------------------------------------- 
    $scope.saveSede = function() {
        if($scope.newSede.id == null) {
            $scope.newSede.id = uid++;
            $scope.sedes.push($scope.newSede);
            $scope.numeroDeSedes = $scope.sedes.length;
            sedesServ.save($scope.newSede);
            console.log($scope.numeroDeSedes);
        } else {
            for(var i in $scope.sedes) {
                if($scope.sedes[i].id == $scope.newSede.id) {
                    $scope.sedes[i] = $scope.newSede;
                    var data = {id: $scope.sedes[i].id };
                    sedesServ.update(data, $scope.newSede).$promise.then(function (e) {
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
      for(var i in $scope.sedes) {
        if($scope.sedes[i].id == id) {
            var data = {id: $scope.sedes[i].id };
            sedesServ.delete({},data).$promise.then(function (e) {
                    alert("elemento eliminado");
                }, function (err) {
                   console.log(err); 
            });            
            $scope.sedes.splice(i,1);
            $scope.newSede = {};
            $scope.numeroDeSedes = $scope.sedes.length;
            console.log($scope.numeroDeSedes);
            }
        }
    }
    
    // Seleccionar Sede para editarlo---------------------------------
    $scope.edit = function(id) {
        console.log(id);
        for(var i in $scope.sedes) {
            if($scope.sedes[i].id == id) {
                $scope.newSede = angular.copy($scope.sedes[i]);
            }
        }
    }   
    // Control para el paginado------------------------------------------ 
    $scope.pageSize     = 8;
    $scope.currentPage  = 0;
    $scope.numeroDePag = function () {
         
    if ($scope.numeroDeSedes > $scope.pageSize) {
            return Math.ceil( $scope.numeroDeSedes / $scope.pageSize);            
    }else{
             return 1;
    }
}
}
//------------------------------------------------------------------------------------------------------
angular.module('App')
        .controller('sedesCtrl',['$scope', '$timeout','$mdSidenav',
                                '$rootScope', 'sedesServ', '$mdDialog',
                                '$mdMedia', '$cookieStore','$location',
                                '$http', '$q', '$log',
                                sedesCtrl]);
})();
