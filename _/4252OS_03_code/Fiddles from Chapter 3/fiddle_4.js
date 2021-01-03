CategoryModel = Backbone.Model.extend({
        defaults :{
            name : '',
            booksOnCategory:0
        }
    });

CategoriesCollection = Backbone.Collection.extend({
        model: CategoryModel
});

var categories = new CategoriesCollection([
    {name : "Math",booksOnCategory : 3},
    {name : "Science",booksOnCategory : 4},
    {name : "Hisotry",booksOnCategory : 5},
    {name : "Sports",booksOnCategory : 7},
]);

var CategoryView = Backbone.Marionette.ItemView.extend({
        tagName : 'li',
        template: "#categoryTemplate",
        events : {      
            "mouseenter .info" : "showDetails", 
            "mouseleave .info" : "hideDetails"     
        },
        showDetails : function() {
            this.$(".info").popover({
                title:this.model.get('name'), 
                content:this.model.get('booksOnCategory')
            });    
            this.$(".info").popover('show');        
        },
        hideDetails : function() {
            this.$(".info").popover('hide');   
        },
});

CategoriesView = Backbone.Marionette.CollectionView.extend({
        tagName : 'ul',
        className : 'unstyled',
        itemView: CategoryView
});
    
var categoriesView = new CategoriesView({collection:categories, el : "#container"});
categoriesView.render();
    
    
    
    