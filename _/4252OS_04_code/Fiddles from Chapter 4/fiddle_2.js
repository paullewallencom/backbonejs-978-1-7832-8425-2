var SampleView = Backbone.Marionette.ItemView.extend({
    template : "#sample-template",
    events :{
    "click #myButton" : "callRenderer"
    }, 
    callRenderer : function () {
      var template = "#sample-template2";
      var data = {foo: "I was appended with Marionette Renderer"};
      var html = Backbone.Marionette.Renderer.render(template, data);  
      this.$el.append(html);
    }                                                    
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

