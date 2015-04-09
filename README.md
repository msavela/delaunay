![delaunay](https://raw.githubusercontent.com/msavela/delaunay/master/screenshot.png)

# delaunay
Delaunay Triangulation based on Bowyer–Watson algorithm

## Usage

Script element within HTML document:

```HTML
<script type="text/javascript" src="delaunay.js"></script>
```

Node.js / io.js module import:

```javascript
var delaunay = require('delaunay');
```

## Example

```javascript
var vertices = [],
	width = 640,
	height = 480;

// Generate 20 vertices to random positions
for(var i=0;i<20;i++) {
	vertices.push(
		new delaunay.Vertex(
			Math.floor(Math.random() * width),
			Math.floor(Math.random() * height)
		)
	);
}

// Perform triangulation
var triangles = delaunay.triangulate(vertices);
```

### Draw to canvas

```javascript
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
	ctx.arc(triangle.center.x, triangle.center.y, triangle.radius, 0, Math.PI * 2, true);
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
```
