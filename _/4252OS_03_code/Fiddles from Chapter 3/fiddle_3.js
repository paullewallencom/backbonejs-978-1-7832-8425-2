var SampleModel = Backbone.Model.extend({
    defaults : {value1 : "A random Value",value2 : "Another Random Value"}
})
var sampleModel = new SampleModel();

var SampleView = Backbone.Marionette.ItemView.extend({
    initialize : function () {
        this.listenTo(this.model, "change:value2", this.valueChanged);
    },
    getTemplate: function(){
       if (this.model.get("foo")) 
          return "#sample-template";
        else       
          return "#a-different-template";
    },
    triggers : { "click #button1": "trigger:alert"},
    events : { "click #button2" : "updateValue" },
    updateValue : function (){
        this.model.set({value2: "I have a new value" + Math.random()});
    },
    valueChanged :function (){
        alert(this.model.get("value2"));
    }
});


var sampleView = new SampleView({model:sampleModel, el : '#container'});
sampleView.render();

var anotherModel = new SampleModel({foo:"I rendered using the", value1 : " sample template"});
var anotherView = new SampleView({model:anotherModel, el : '#anotherContainer'});
anotherView.render();
sampleView.on("trigger:alert", function(args){
   alert(args.model.get("value2"));
});