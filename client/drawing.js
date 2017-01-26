Canvas = function () {
		var self = this;
		var svg;

		var createSvg = function () { //creating canvas
			svg = d3.select('#canvas').append('svg')
				.attr('width', 1200) //setting width
				.attr('height', 600); //setting height
		};
		createSvg(); //calling fn

		self.clear = function () { //clears canvas
			d3.select('svg').remove();
			createSvg();
		};

		self.draw = function (data) {
			if (data.length < 1) {
				self.clear(); //if no points then clear
				return;
			}
			if (svg) {

				// Remember to format the data properly in markPoints

				// to draw a circle - 
				// svg.selectAll('circle').data(data, function(d) { return d._id; })
				// .enter().append('circle')
				// .attr('r', 10)
				// .attr('cx', function (d) { return d.x; })
				// .attr('cy', function (d) { return d.y; });

				//to draw a line
				svg.selectAll('line').data(data, function (d) {
						return d._id;
					})
					.enter().append('line')
					.attr('x1', function (d) {
						return d.x;
					})
					.attr('y1', function (d) {
						return d.y;
					})
					.attr('x2', function (d) {
						return d.x1;
					})
					.attr('y2', function (d) {
						return d.y1;
					})
					.attr("stroke-width", function (d) {
						return d.w;
					})
					.attr("stroke", function (d) {
						return d.c;
					})
					.attr("stroke-linejoin", "round");


			} // end of the if(svg) statement
		}; // end of the canvas.draw function







	} //end of the canvas function
