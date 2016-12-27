(function(){
  "use strict";
  var app =angular.module("productManagement",
                ["common.services",
                "ui.router",
                "productResourceMock"]);

  app.config(["$stateProvider",function($stateProvider){
            $stateProvider
            .state("productList",{
              url: "/products",
              templateUrl: "views/productListView.html",
              //template: "<div>hi</div>",
              controller: "ProductListCtrl as vm"
            });
        }]);

}());
