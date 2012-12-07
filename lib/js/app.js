// Setup a Router for the application.
var Router = Backbone.Router.extend({
	routes: {
		"": "home",
		"about": "about"
	},
	initialize: function() {
		Backbone.history.start();
	},
	home: function() {
		this.changePage( new Home() );
	},
	about: function() {
		this.changePage( new About() );
	},
	// Change page excepts a view instance.
	changePage: function( view ) {
		this.currentView = view;

		view.$el.appendTo( "body" );

		$.mobile.changePage( view.$el, {
            changeHash: false,
            transition: $.mobile.defaultPageTransition
        });
	}
});

var Home = Backbone.View.extend({
	template: "#home",
	initialize: function() {
		this.$el.attr( "data-role", "page" );

		this.template = _.template( $(this.template).html() );
		this.render();
	},
	render: function() {
		this.$el
			.append( new Header().el )
			.append( this.template({
				time: new Date()
			}))
			.append( new Footer().el );
	}
});

var About = Backbone.View.extend({
	template: "#about",
	initialize: function() {
		this.$el.attr( "data-role", "page" );
		
		this.template = _.template( $(this.template).html() );
		this.render();
	},
	render: function() {
		var list = new ListView({
			collection: new Contacts( [{
					firstName: "Jim",
					lastName: "Halpert"
				}, {
					firstName: "Dwight",
					lastName: "Schrute"
				}, {
					firstName: "Pam",
					lastName: "Halpert"
				}])
		});

		this.$el
			.append( new Header().el )
			.append( this.template() )
			.append( list.el )
			.append( new Footer().el );
	}
});

var Header = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.attr( "data-role", "header" )
			.html( "<h2>Header</h2>" );
	}
});

var Footer = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.attr( "data-role", "footer" )
			.html( "<h4>&copy; Demo 2012</h4>" );
	}
});

var Contact = Backbone.Model.extend({});
var Contacts = Backbone.Collection.extend({
	model: Contact,
	url: "/contacts"
});

var ListView = Backbone.View.extend({
	tagName: "ul",
	initialize: function() {
		this.$el.attr( "data-role", "listview" );
		this.collection.on( "reset", this.render, this );
		
		//this.fetch();
		//HACK
		this.collection.trigger( "reset" );
	},
	render: function() {
		this.collection.each( this.renderItem, this );
	},
	renderItem: function( model ) {
		var view = new ItemView({
			model: model
		});
		this.$el.append( view.el );
	}
});

var ItemView = Backbone.View.extend({
	tagName: "li",
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html( this.model.get("firstName") + " " + this.model.get("lastName") );
	}
});


$(function() {
	window.app = new Router();
});
