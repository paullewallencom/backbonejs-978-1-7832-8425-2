Books.module('CartApp', function (CartApp, App) {
    'use strict';

    CartApp.Controller = App.AppController.extend({

        initialize: function (options) {
            var self = this;
            this.orderCollection = new App.BookCollection();
            this.bookDetailList = new App.BooksDetailCollection(Books.CartApp.BooksDetails);
            this.totals = new App.TotalsModel();
            this.cartLayout = new CartApp.Layout();
            this.mainRegion.show(this.cartLayout);
            App.vent.on("itemAdded", function (model) {
                self.addProduct(model);
            });

            App.vent.on("itemRemoved", function (model) {
                self.removeProduct(model);
            });

            App.vent.on("displayDetail", function (model) {
                self.showBook(model.get("id"));
            });
        },


        addProduct: function (model) {
            this.orderCollection.add(model,{merge: true});
            this.orderView.render();
        },

        removeProduct: function(model){
            this.orderCollection.remove(model);
            this.orderView.render();
        },

        showBook : function(id) {
            var bookDetail = this.bookDetailList.get(id);
            this.bookDetailView = new CartApp.BookDetailView({model:bookDetail});
            this.cartLayout.book.show( this.bookDetailView)
        },

        loadProducts: function(category,id){
            this.bookList = new App.BookCollection(Books.CartApp.Books);
            this.displayCategories();
            if(category){
                var matched = this.bookList.where({category:category});
                this.bookList.reset(matched);
            }
            this.bookListView = new CartApp.BookListView({
                collection: this.bookList
            });
            this.cartLayout.products.show(this.bookListView);
            if(!this.orderView){
                 this.orderView = new CartApp.OrderListView({ model :this.totals , collection: this.orderCollection});
                 this.cartLayout.order.show(this.orderView);
            }
        },
       
        displayCategories: function () {
            this.categories = new App.Categories();
            var categoriesData = this.bookList.groupBy("category");
            for (var key in categoriesData) {
                var category = new App.Category({
                    name:key,
                    booksOnCategory:categoriesData[key].length
                });
                this.categories.add(category);
                
            }
            this.categoriesView = new CartApp.CategoriesView({collection:this.categories});
            this.cartLayout.categories.show(this.categoriesView);
        }

    });

    CartApp.addInitializer(function (args) {
        CartApp.controller = new CartApp.Controller({
            mainRegion: args.mainRegion,
        });
        CartApp.controller.show();
    });

    CartApp.addFinalizer(function () {
        if (CartApp.controller) {
            CartApp.controller.close();
            delete CartApp.controller;
        }
    });

});