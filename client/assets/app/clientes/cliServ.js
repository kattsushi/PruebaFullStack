(function(){
  'use strict'
  function cliServ ($resource, $location) {
      var uri = $location.protocol() +'://'+location.host+'/api/clientes/:documento'
      var factory = {
         dinamico : $resource( uri, {},
         {get :{method:'GET',transformResponse:
              function (data, headers) {return JSON.parse(data).list; }},
              isArray: true //since your list property is an array
            })
            ,
          duro : []
        }
        return factory;
   }




  angular.module('App')
         .factory('cliServ', ['$resource','$location',cliServ]);

})();
