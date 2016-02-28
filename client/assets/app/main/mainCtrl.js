(function(){
    'use strict'
    function mainCtrl($scope, $timeout, $mdSidenav,
                      $rootScope, mainServ, prodServ, $mdDialog,
                      $mdMedia, $cookieStore, $location,
                      $http, $q, $log, $window ) {
    var vm = this;
    
 
     //   var data = {documento: doc };
       
     $scope.buscar = function () {
            
            var data = {documento: $scope.documento };
            $scope.compras =  [];
            mainServ.get(data).$promise.then(function (data) {
                data.forEach(function(e) {
                   $scope.compras.push(e);
                   $scope.cliente = e.Compras.Cliente.nombres;
                   $scope.precioTotal = e.Compras.precio
                }, this);
            });
            
    $scope.print = function () {
            console.log('modal print');
        
            var tabla = document.querySelector('.table').innerHTML;
            var miWindow = $window.open('', '', 'width=800, height=600');
            miWindow.document.write(tabla);
            miWindow.print();
    };
     }
}
//------------------------------------------------------------------------------------------------------
angular.module('App')
        .controller('mainCtrl',['$scope', '$timeout','$mdSidenav',
                                '$rootScope', 'mainServ', 'prodServ', '$mdDialog',
                                '$mdMedia', '$cookieStore','$location',
                                '$http', '$q', '$log', '$window',
                                mainCtrl]);
})();
