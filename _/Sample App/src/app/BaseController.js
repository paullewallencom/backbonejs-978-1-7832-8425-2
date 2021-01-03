Books.AppController = (function (App, Marionette) {
    'use strict';

    var AppController = Marionette.Controller.extend({
        constructor: function (options) {
            options = options || {};
            this.mainRegion = options.mainRegion;
            this.modalRegion = options.modalRegion;
            Marionette.Controller.prototype.constructor.call(this, options);
        },

        show: function () {

        }

    });

    return AppController;
})(Books, Backbone.Marionette);