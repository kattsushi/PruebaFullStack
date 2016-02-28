(function(){
  'use strict'
  function mainServ ($resource, $location) {
      var uri = $location.protocol() +'://'+location.host+'/api/compras/'
      return $resource( uri, {},
         {
           get :{
              method:'GET',
              transformResponse: function (data, headers) {
                    return JSON.parse(data).list; 
                    },
              params: {documento: '@documento'},      
              isArray: true,
                  },
           post:{
              method: 'POST'
           },
           delete:{
             method:'DELETE',
             params: {documento: '@documento'}
           },
           update : {
             method:'PUT',
             params : {documento:'@documento'}
           },  
           isArray: true,
         });
   }

  angular.module('App')
         .factory('mainServ', ['$resource','$location',mainServ]);

})();
