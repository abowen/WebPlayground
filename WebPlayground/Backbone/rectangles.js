(function (){
	// No special capabilities outside default
	var rectangle = Backbone.Model.extend({});

	var rectangleView = Backbone.View.extend({
		tagName : 'div', // Type of element to render for view
		className: 'rectangle', // CSS type

        events: {
            'click': 'move'
        },

		render : function() {
			this.setDimensions();
			this.setPosition();
		    this.setColor();
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
		},

        setColor: function() {
            this.$el.css('background-color', this.model.get('color'));
        },

        move: function() {
            this.$el.css('left', this.$el.position().left + 10);
        }
	});

	var models =
    [
        new rectangle({
            width: 100,
            height: 60,
            position: {
                x: 300,
                y: 150
            },
            color: '#ff0000'
        }),
        new rectangle({
            width: 100,
            height: 80,
            position: {
                x: 300,
                y: 450
            },
            color: '#00ff00'
        })
        ,
        new rectangle({
            width: 150,
            height: 60,
            position: {
                x: 50,
                y: 350
            },
            color: '#0000ff'
        })
    ];

    _(models).each(function(model) {
        var myView = new rectangleView({ model: model });

        // Select div with Id of canvas
        $('div#canvas').append(myView.render().el);
    });


})();