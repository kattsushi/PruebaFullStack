/* global preventDefault */
(function(){
    'use strict'
    function mainCtrl($scope, $timeout, $mdSidenav,
                      $rootScope, mainServ, prodServ, $mdDialog,
                      $mdMedia, $cookieStore, $location,
                      $http, $q, $log ) {
    var vm = this;
    
 
     //   var data = {documento: doc };
       
     $scope.Buscar = function () {
           
            var doc = angular.copy($scope.documento)
            var data = {documento: doc };
            $scope.compras = [];
            
            mainServ.get(data).$promise.then(function (data) {
                data.forEach(function(e) {
                    $scope.compras.push(e);
                }, this); 
            console.log($scope.compras[1]);              
            $scope.numeroDeCompras = $scope.compras.length;                                
            });
        }  

    
             
    $scope.onClickMenu = function () {
                $mdSidenav('left').toggle();
            }
    
    var uid = 1;       
   

   
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
