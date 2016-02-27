(function(){
  'use strict'
   function cliFilt () {
        return function (input, start) {
         if (input==0)  {return;}   
         start = +start;
        return input.slice(start);
    }
}
angular.module('App')
             .filter('startFrom',[cliFilt]);

})();
