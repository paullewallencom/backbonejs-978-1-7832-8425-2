Books.module('HistoryApp', {
    startWithParent: false,
    define: function (HistoryApp, App, Backbone, Marionette, $, _) {
        'use strict';

        var Router = Backbone.Router.extend({
            routes: {
                "history/orders": "showHistory",
            },

            before: function () {
                App.startSubApp('HistoryApp', {
                    mainRegion: App.main,
                    modalRegion: App.modal
                });
            },

            showHistory: function () {
                Books.HistoryApp.controller.displayOrders();
            }
        });

        App.addInitializer(function () {
            var router = new Router();
        });
    }
});