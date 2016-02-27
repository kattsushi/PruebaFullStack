
(function(){
  'use strict'
  function prodServ ($resource, $location) {
      var uri = $location.protocol() +'://'+location.host+'/api/productos/:id'
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
         .factory('prodServ', ['$resource','$location',prodServ]);

})();
