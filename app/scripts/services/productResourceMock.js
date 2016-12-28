(function() {
  'use strict';
  var app = angular.module("productResourceMock", ["ngMockE2E"]);

  app.run(function($httpBackend) {
    var products = [{
      "productId": 1,
      "productName": "Leaf Rake",
      "productCode": "GDN-0011",
      "releaseDate": "March 19, 2016",
      "description": "Leaf rake with 48-inch wooden handle.",
      "price": 19.95,
      "starRating": 3.2,
      "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    }, {
      "productId": 2,
      "productName": "Garden Cart",
      "productCode": "GDN-0023",
      "releaseDate": "March 18, 2016",
      "description": "15 gallon capacity rolling garden cart",
      "price": 32.99,
      "starRating": 4.2,
      "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
    }, {
      "productId": 5,
      "productName": "Hammer",
      "productCode": "TBX-0048",
      "releaseDate": "May 21, 2016",
      "description": "Curved claw steel hammer",
      "price": 8.9,
      "starRating": 4.8,
      "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
    }, {
      "productId": 8,
      "productName": "Saw",
      "productCode": "TBX-0022",
      "releaseDate": "May 15, 2016",
      "description": "15-inch steel blade hand saw",
      "price": 11.55,
      "starRating": 3.7,
      "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
    }, {
      "productId": 10,
      "productName": "Video Game Controller",
      "productCode": "GMG-0042",
      "releaseDate": "October 15, 2015",
      "description": "Standard two-button video game controller",
      "price": 35.95,
      "starRating": 4.6,
      "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
    }];

    var productUrl = "/api/products";

   $httpBackend.whenGET(/views\/.*/).passThrough();

   $httpBackend.whenGET(productUrl).respond(products);

  var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*",'');

  $httpBackend.whenGET(editingRegex).respond(function(method,url,data){
    var product={"productId":0};
    var parameters=url.split('/');
    var length= parameters.length;
    var id = parameters[length-1];

    if(id>0){
      for(var i=0;i<products.length;i++){
        if(products[i].productId==id){
          product=products[i];
          break;
        }
      };
    }
    return [200,product,{}];
  });

  $httpBackend.whenPOST(productUrl).respond(function(method,url,data){
    var product = angular.fromJson(data);

    if(!product.productId){
      product.productId=products[products.length-1].productId+1;
      products.push(product);
    }
    else{
      for(var i=0;i<products.length;i++){
        if(products[i].productId==product.productId){
          products[i]=product;
          break;
        }
      };
    }

    return[200,product,{}];
  })
  });
}());
