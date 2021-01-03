var SampleView = Backbone.Marionette.ItemView.extend({
    template : '#sample-template'
});

var SampleModel = Backbone.Model.extend({
    defaults : {
        value1 : "A random Value",
        value2 : "Another Random Value"
    }
})
var sampleModel = new SampleModel();
var sampleView = new SampleView({model:sampleModel, el : '#container'});
sampleView.render();