Books.AppController = (function (App, Marionette) {
    'use strict';

    App.BookModel = Backbone.Model.extend({});
    App.BookDetailModel = Backbone.Model.extend({});

    App.BookCollection = Backbone.Collection.extend({
        model: App.BookModel,

        getTotal: function(){
            return this.reduce(
                function (total, value) {
                    return total + value.get("price") * value.get("qty")
                }, 0);
        }
    });

    App.BooksDetailCollection = Backbone.Collection.extend({
        model: App.BookDetailModel,
    });

    App.TotalsModel = Backbone.Model.extend({
        defaults: {
            subtotal: 0,
            tax : 0,
            total : 0
        }
    });
    
    App.Order = Backbone.Model.extend({
        defaults : {
            totals : new App.TotalsModel(),
            booksOrdered : new App.BookCollection(),
            datePlaced : ''
        }
    });

    App.Orders = Backbone.Collection.extend({
        model : App.Order
    });

    App.Category = Backbone.Model.extend({
        defaults :{
            name : '',
            booksOnCategory:0
        }
    });

    App.Categories = Backbone.Collection.extend({
        model: App.Category
    });

})(Books, Backbone.Marionette);
