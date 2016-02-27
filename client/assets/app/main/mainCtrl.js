(function(){
    'use strict'
    function mainCtrl($scope,
                      $timeout,
                      $mdSidenav,
                      $rootScope,
                      mainService,
                      $mdDialog,
                      $mdMedia,
                      $cookieStore,
                      $location,
                      $http,
                      $q,
                      $log ) {

            var vm = this;

             

      

            //    console.log(JSON.parse(vm.titulos));

            vm.onClickMenu = function () {
                $mdSidenav('left').toggle();
            }

            /*---------------------------------------------
            Control de cookies para autenticar usuario
            */
            $scope.usrConectado = {nombre: "", nivel: '', estaConectado: ''};

            var usr = $cookieStore.get('usuario');

            if (usr != null) {
              $scope.usrConectado.nombre = usr.nombre;
              $scope.usrConectado.nivel = usr.nivel;
              $scope.usrConectado.estaConectado = true;
            }else {
              $scope.usrConectado.valogin = false
            };

            vm.salir = function() {
              $scope.usrConectado = {nombre: '', nivel: '', estaConectado: ''};

              $cookieStore.remove('estaConectado');
              $cookieStore.remove('usuario');

              $location.path('/inicio');
            };




    //------------------------------------------------------------------------------------------------------




    }
      angular.module('App')
             .controller('mainCtrl',['$scope',
                                     '$timeout',
                                     '$mdSidenav',
                                     '$rootScope',
                                     'mainService',
                                     '$mdDialog',
                                     '$mdMedia',
                                     '$cookieStore',
                                     '$location',
                                     '$http',
                                     '$q',
                                     '$log',
                                     mainCtrl]);
})();
