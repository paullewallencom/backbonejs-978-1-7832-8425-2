BookStoreApp = new Backbone.Marionette.Application({});
	BookStoreApp.addRegions({mainRegion: '#main'});

	CatalogLayout = Backbone.Marionette.Layout.extend({
        template: "#CatalogLayout",
        regions: {
            categories : '#categories',
            products : '#products',
            order : '#order',
            book: '#book'
        }
    });

	BookStoreController = Backbone.Marionette.Controller.extend({
		initialize: function(options){
            this.region = options.region
        },
		displayBooks : function (){
			console.log("I will display books...");
		} 
    });   

    BookStoreRouter = Backbone.Marionette.AppRouter.extend({
		controller :  BookStoreController,
	    appRoutes: {
	        "": "displayBooks"
	    }
    });

    BookStoreApp.addInitializer(function () {
        var controller = new BookStoreController({region: BookStoreApp.mainRegion});
        layout = new CatalogLayout();
        controller.region.show(layout);
        var router = new BookStoreRouter({controller:controller});
    });

    BookStoreApp.on('initialize:after', function () {
		if (Backbone.history) {
	    	Backbone.history.start();
	    }
	});
    BookStoreApp.start();