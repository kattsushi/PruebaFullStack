
(function(){
  'use strict'
  function sedesServ ($resource, $location) {
      var uri = $location.protocol() +'://'+location.host+'/api/sedes/:id'
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
         .factory('sedesServ', ['$resource','$location',sedesServ]);

})();