Books = (function (Backbone, Marionette) {
    'use strict';

    var App = new Marionette.Application();

    var ModalRegion = Backbone.Marionette.Region.extend({
        el: "#modal",

        constructor: function () {
            _.bindAll(this);
            Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
        },

        getEl: function (selector) {
            var $el = $(selector);
            return $el;
        },

        showModal: function (view) {
            view.on("close", this.hideModal, this);
            this.show(view);
            this.$el.modal('show');
        }

    });

    App.addRegions({
        main: '#main',
        modal: ModalRegion
    });


    App.on('initialize:after', function () {
        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    App.startSubApp = function (appName, args) {
        var currentApp = App.module(appName);
        if (App.currentApp === currentApp) { return; }

        if (App.currentApp) {
            App.currentApp.stop();
        }

        App.currentApp = currentApp;
        currentApp.start(args);
    };

    return App;
})(Backbone, Backbone.Marionette);