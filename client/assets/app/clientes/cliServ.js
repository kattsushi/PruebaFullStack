/* global resourceResponseHandler */
(function(){
  'use strict'
  function cliServ ($resource, $location) {
      var uri = $location.protocol() +'://'+location.host+'/api/clientes/:id'
      return $resource( uri, {},
         {
           get :{
              method:'GET',
              transformResponse: function (data, headers) {
                    return JSON.parse(data).list; 
                    }
                  },
           post:{
              method: 'POST'
           },
           delete:{
             method:'DELETE',
             params: {id: '@id'}
           },
           update : {
             method:'PUT',
             params : {id:'@id'}
           },  
           isArray: true,
         });
   }

  angular.module('App')
         .factory('cliServ', ['$resource','$location',cliServ]);

})();
