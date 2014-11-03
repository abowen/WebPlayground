(function (){
	// No special capabilities outside default
	var Rectangle = Backbone.Model.extend({});

	var RectangleView = Backbone.View.extend({
		tagName : 'div', // Type of element to render for view
		className : 'rectangle', // CSS type
		render : function() {
			this.setDimensions();
			this.setPosition();
			// Convention to return view
			return this;
		},

		setDimensions: function() {
			// Get's DOM Element of view
			this.$el.css({
				width: this.model.get('width') + 'px',
				height: this.model.get('height') + 'px'
			});
		},

		setPosition: function(){
			var position = this.model.get('position');
			this.$el.css({
				left: position.x,
				top: position.y
			});
		}
	});

	var myRectangle = new Rectangle({
		width: 100,
		height: 60,
		position: {
			x: 300,
			y: 150
		}
	});

	var myView = new RectangleView({model: myRectangle});

	// Select div with Id of canvas
	$('div#canvas').append(myView.render().el);
})();