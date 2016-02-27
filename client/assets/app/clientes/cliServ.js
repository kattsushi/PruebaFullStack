(function(){
  'use strict'
  function cliServ ($resource, $location) {
      var uri = $location.protocol() +'://'+location.host+'/api/clientes/:documento'
      return $resource( uri, {},
         {get :{method:'GET',transformResponse:
              function (data, headers) {return JSON.parse(data).list; }},
              isArray: true // 
         });
   }

  angular.module('App')
         .factory('cliServ', ['$resource','$location',cliServ]);

})();
