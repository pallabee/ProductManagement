(function() {
  "use strict";
  var app = angular.module("productManagement", ["common.services",
    "ui.router",
    "productResourceMock"
  ]);

  app.config(["$stateProvider",
    "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");

      $stateProvider
        .state("home", {
          url: "/",
          templateUrl: "views/welcomeView.html"
        })
      .state("productList", {
        url: "/products",
        templateUrl: "views/productListView.html",
        controller: "ProductListCtrl as vm"
      })
      .state("productEdit", {
        abstract:true,
        url: "/products/edit/:productId",
        templateUrl: "views/productEditView.html",
        controller: "ProductEditCtrl as vm",
        resolve:{
          productResource:"productResource",
          product:function(productResource,$stateParams){
                  var productId =$stateParams.productId;
                  return productResource.get({productId:productId}).$promise;
                }
              }
      })
      .state("productEdit.info", {
        url: "/info",
        templateUrl: "views/productEditInfoView.html"
      })
      .state("productEdit.price", {
        url: "/price",
        templateUrl: "views/productEditPriceView.html"
      })
      .state("productEdit.tags", {
        url: "/tags",
        templateUrl: "views/productEditTagsView.html"
      })
      .state("productDetail",{
        url:"/products/:productId",
        templateUrl:"views/productDetailView.html",
        controller:"ProductDetailCtrl as vm",
        resolve:{
          productResource:"productResource",
          product:function(productResource,$stateParams){
                  var productId =$stateParams.productId;
                  return productResource.get({productId:productId}).$promise;
                }
              }
      })

    }
  ]);

}());
