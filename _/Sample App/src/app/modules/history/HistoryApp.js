Books.module('HistoryApp', function (HistoryApp, App) {
    'use strict';

    HistoryApp.Controller = App.AppController.extend({

        initialize: function (options) {
            var self = this;
            App.vent.on("displayDetails", function (model) {
                self.displayDetails(model);
            });

            App.vent.on("removeAll", function () {
                self.deleteHistory();
            });

        },

        displayOrders: function () {
            var ordersPlaced = this.getOrders();
            var orderView = new HistoryApp.HistoryListView({ collection: ordersPlaced });
            if (ordersPlaced.length > 0)
                HistoryApp.controller.mainRegion.show(orderView);
            else
                HistoryApp.controller.mainRegion.close();
        },

        displayDetails: function (model) {
            var details = new Backbone.Collection(model.get("booksOrdered"));
            var detailsView = new HistoryApp.DetailListView({ collection: details });
            HistoryApp.controller.modalRegion.showModal(detailsView);
        },

        deleteHistory: function () {
            var ordersPlaced = this.getOrders();
            _.each(ordersPlaced.toArray(), function (model) {
                model.destroy();
            });
            this.displayOrders();
        },

        getOrders: function () {
            var ordersPlaced = new Backbone.Collection();
            ordersPlaced.localStorage = new Backbone.LocalStorage("orders");
            ordersPlaced.fetch();
            return ordersPlaced;
        }

    });

    HistoryApp.addInitializer(function (args) {
        HistoryApp.controller = new HistoryApp.Controller({
            mainRegion: args.mainRegion,
            modalRegion: args.modalRegion,
        });
        HistoryApp.controller.show();
    });

    HistoryApp.addFinalizer(function () {
        if (HistoryApp.controller) {
            HistoryApp.controller.close();
            delete HistoryApp.controller;
        }
    });

});