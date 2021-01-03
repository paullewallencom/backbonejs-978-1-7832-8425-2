Books.module("HistoryApp", function (HistoryApp, App, Backbone, Marionette, $, _) {
    "use strict";

    HistoryApp.HistoryItemView = Backbone.Marionette.ItemView.extend({
        template: "#historyRow",
        tagName: "tr",
        events: {
            'click #details': 'displayDetails',
        },

        displayDetails: function () {
            App.vent.trigger("displayDetails", this.model);
        },
    });

    HistoryApp.HistoryListView = Backbone.Marionette.CompositeView.extend({
        tagName: "table",
        template: "#historyGrid",
        itemView: HistoryApp.HistoryItemView,
        className: "table table-hover table-condensed",
        events: {
            'click #removeAll': 'removeAll',
        },

        removeAll: function () {
            App.vent.trigger("removeAll");
        },

        appendHtml: function (collectionView, itemView) {
            collectionView.$("tbody").append(itemView.el);
        }
    });

    HistoryApp.DetailItemView = Backbone.Marionette.ItemView.extend({
        template: "#detailRow",
        tagName: "tr"
    });


    HistoryApp.DetailListView = Backbone.Marionette.CompositeView.extend({
        tagName: "table",
        template: "#detailsGrid",
        itemView: HistoryApp.DetailItemView,
        className: "table table-hover table-condensed",
        initialize: function () {
        },

        appendHtml: function (collectionView, itemView) {
            collectionView.$("tbody").append(itemView.el);
        }

    });


});
