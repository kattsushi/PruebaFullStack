'use strict'

jQuery(document).ready(function(){

    //Accordion Nav
    jQuery('.mainNav').navAccordion({
      expandButtonText: '<md-buttom data-ng-show="menu.Submenu != 0" class=" botup fa fa-chevron-up" style="color:black"></md-buttom>',  //Text inside of buttons can be HTML
      collapseButtonText: '<i data-ng-show="menu.Submenu != 0" class="fa fa-chevron-down" style="color:black"></i>'
    },
    function(){
      console.log('Callback')
    });

  });
