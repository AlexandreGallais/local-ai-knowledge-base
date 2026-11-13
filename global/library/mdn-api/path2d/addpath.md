---
title: "Path2D: addPath() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/path2d/addpath/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Path2D: addPath() method

The **`Path2D.addPath()`** method
of the Canvas 2D API adds one `Path2D` object to another
`Path2D` object.

## Syntax

```js
addPath(path)
addPath(path, transform)
```

### Parameters

- `path`
    A `Path2D` path to add.
- `transform` (optional)
    A `DOMMatrix` to be used as the transformation matrix for the path that
    is added. (Technically an object that possesses the same properties as a `DOMMatrix` object.)

### Return value

None (`undefined`).

## Examples

### Adding a path to an existing path

This example adds one path to another.

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

First, we create two separate `Path2D` objects, each of which contains a
rectangle made using the `rect()`
method. We then create a matrix using `DOMMatrix()`. We then add the second path to the first using
`addPath()`, also applying the matrix to move the second path to the right.
Finally, we draw the first path (which now contains both rectangles) using
`fill()`.

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create first path and add a rectangle
let p1 = new Path2D();
p1.rect(0, 0, 100, 150);

// Create second path and add a rectangle
let p2 = new Path2D();
p2.rect(0, 0, 100, 75);

// Create transformation matrix that moves 200 points to the right
let m = new DOMMatrix();
m.a = 1;
m.b = 0;
m.c = 0;
m.d = 1;
m.e = 200;
m.f = 0;

// Add second path to the first path
p1.addPath(p2, m);

// Draw the first path
ctx.fill(p1);
```

#### Result

## See also

- The interface defining this method: `Path2D`
