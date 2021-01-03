var BookView = Backbone.Marionette.ItemView.extend({
    template : '#book-template'
});

var BookModel = Backbone.Model.extend({
    defaults : {
        id : "1",
        name : "First",
    }
});

var BookCollection = Backbone.Collection.extend({
    model : BookModel
})
var bookModel = new BookModel();
var bookModel2 = new BookModel({id:"2",name:"second"});
var bookModel3 = new BookModel({id:"3",name:"third"});
var bookCollection = new BookCollection();
bookCollection.add(bookModel);
bookCollection.add(bookModel2);
bookCollection.add(bookModel3);

var bookView = new BookView({collection:bookCollection, el : '#container'});
bookView.render();