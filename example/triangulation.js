var canvas = document.createElement("canvas"),
	ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Generate 20 vertices to random positions
var vertices = [];
for(var i=0;i<20;i++) {
	vertices.push(
		new delaunay.Vertex(
			Math.floor(Math.random() * canvas.width),
			Math.floor(Math.random() * canvas.height)
		)
	);
}

// Vertice for each corner
vertices.push(new delaunay.Vertex(0, 0));
vertices.push(new delaunay.Vertex(canvas.width, 0));
vertices.push(new delaunay.Vertex(0, canvas.height));
vertices.push(new delaunay.Vertex(canvas.width, canvas.height));

// Generate edge vertices
for(var i=0;i<10;i++) {
	vertices.push(
		new delaunay.Vertex(
			Math.floor(Math.random() * canvas.width),
			canvas.height * Math.round(Math.random())
		)
	);
}

for(var i=0;i<10;i++) {
	vertices.push(
		new delaunay.Vertex(
			canvas.width * Math.round(Math.random()),
			Math.floor(Math.random() * canvas.height)
		)
	);
}

var triangles = delaunay.triangulate(vertices);

var render = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.lineWidth = 1;

		triangles.forEach(function(triangle) {
			// Draw triangles
			ctx.beginPath();
			ctx.moveTo(triangle.v0.x, triangle.v0.y);
			ctx.lineTo(triangle.v1.x, triangle.v1.y);
			ctx.lineTo(triangle.v2.x, triangle.v2.y);
			ctx.closePath();
			ctx.strokeStyle = 'rgba(1, 1, 1, .1)';
			ctx.stroke();

			// Draw circumcircles
			ctx.beginPath();
			ctx.arc(triangle.center.x, triangle.center.y, triangle.radius, 0, Math.PI*2, true );
			ctx.closePath();
			ctx.strokeStyle = 'rgba(1, 1, 1, .1)';
			ctx.stroke();
		});

		// Draw vertices
		vertices.forEach(function(vertex) {
			ctx.beginPath();
			ctx.arc(vertex.x, vertex.y, 2, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fillStyle = '#999';
			ctx.fill();
		});
};

render();