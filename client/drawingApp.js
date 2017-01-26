points = new Meteor.Collection('pointsCollection');

setStroke = function (color) {
	lastX = 0;
	lastY = 0;
	strokeColor = color;
}


var canvas;

// we use these for drawing more interesting shapes
var lastX = 0;
var lastY = 0;
var strokeWidth = 1;
var thickness = 1;
var strokeColor = "black"; //defaults

Meteor.startup(function () { //creating canvas on startup
	canvas = new Canvas();

	Deps.autorun(function () {
		var data = points.find({}).fetch();

		if (canvas) {
			canvas.draw(data); //draw the canvas if there are points in the database
		}
	});
});



Template.wall.helpers({
	title: ["Aazir's Drawing App"]
});

Template.wall.events({

	"click button.clear": function (event) {
		Meteor.call('clear', function () {
			canvas.clear();
		});
	},

	"click #background": function (event) {
		$("#background").change(function () {
			$("body").css('background', $(this).val());
		});
	},

	"click #customColour": function (event) {
		$("#customColour").change(function () {
			strokeColor = $(this).val();
		});
	},

	"click #thick": function (event) {
		$("#thick").change(function () {
			thickness = $(this).val();
		});
	},


	//choose a color. Initialise the last vals, otherwise a stray line will appear.

	"click button.colour1": function () {
		setStroke("red");
	},

	"click button.colour2": function () {
		setStroke("blue");

	},

	"click button.colour3": function () {
		setStroke("green");

	},

	"click button.colour4": function () {
		setStroke("white");

	},

	"click button.colour5": function () {
		setStroke("yellow");

	},

	"click button.colour6": function () {
		setStroke("purple");
	},
	"click button.colour7": function () {
		setStroke("pink");
	},
	"click button.colour8": function () {
		setStroke("brown");
	},
	"click button.colour9": function () {
		setStroke("aqua");
	},
	"click button.colour10": function () {
		setStroke("grey");
	},
	"click button.colour11": function () {
		setStroke("orange");
	},
	"click button.colour12": function () {
		setStroke("black");
	},

	"click button.thicker": function () {

		thickness += 1;

	},


})

var markPoint = function () {

	var offset = $('#canvas').offset();

	// In the first frame, lastX and lastY are 0.
	// This means the line gets drawn to the top left of the screen
	// Which is annoying, so we test for this and stop it happening.

	if (lastX == 0) { // check that x was something not top-left. should probably set this to -1
		lastX = (event.pageX - offset.left);
		lastY = (event.pageY - offset.top);
	}
	points.insert({
		//this draws a point exactly where you click the mouse
		// x: (event.pageX - offset.left),
		// y: (event.pageY - offset.top)});


		//We can do more interesting stuff
		//We need to input data in the right format
		//Then we can send this to d3 for drawing


		//1) Algorithmic mouse follower
		// x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
		// y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

		//2) draw a line - requires you to change the code in drawing.js
		x: (event.pageX - offset.left),
		y: (event.pageY - offset.top),
		x1: lastX,
		y1: lastY,
		// We could calculate the line thickness from the distance
		// between current position and last position
		//w: 0.05*(Math.sqrt(((event.pageX - offset.left)-lastX) * (event.pageX - offset.left)
		//  + ((event.pageY - offset.top)-lastY) * (event.pageY - offset.top))),
		// Or we could just set the line thickness using buttons and variable
		w: thickness,
		// We can also use strokeColor, defined by a selection
		c: strokeColor,


	}); // end of points.insert()

	lastX = (event.pageX - offset.left);
	lastY = (event.pageY - offset.top);

}

Template.canvas.events({
	'click': function (event) {
		markPoint();
	},
	'mousedown': function (event) {
		Session.set('draw', true);
		lastX = 0;
	},
	'mouseup': function (event) {
		Session.set('draw', false);
		lastX = 0;
		lasyY = 0;
	},
	'mousemove': function (event) {
		if (Session.get('draw')) {
			markPoint();
		}
	}
});
