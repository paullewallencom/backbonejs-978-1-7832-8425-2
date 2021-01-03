Books.module('CartApp', {
    startWithParent: false,
    define: function (CartApp, App, Backbone, Marionette, $, _) {
        'use strict';

        var Router = Backbone.Router.extend({
            routes: {
                "(:category)(/:id)": "init"
                
            },
            
            before: function () {
                App.startSubApp('CartApp', {
                    mainRegion: App.main,
                });
            },

            init: function (category,id) {
                Books.CartApp.controller.loadProducts(category,id);
            },

            showHistory : function () {
                Books.CartApp.controller.showHistory();
            }
        });

        App.addInitializer(function () {
            var router = new Router();
        });
    }
});