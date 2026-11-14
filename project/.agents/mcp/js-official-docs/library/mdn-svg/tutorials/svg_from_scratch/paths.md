---
title: "Paths (part 1 of 4)"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/tutorials/svg_from_scratch/paths/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Paths

The `` element is the most powerful element in the SVG library of basic shapes. It can be used to create lines, curves, arcs, and more.

Paths create complex shapes by combining multiple straight lines or curved lines. Complex shapes composed only of straight lines can be created as `<polyline>` elements. While `<polyline>` and `` elements can create similar-looking shapes, `<polyline>` elements require a lot of small straight lines to simulate curves and don't scale well to larger sizes.

A good understanding of paths is important when drawing SVGs. While creating complex paths using an XML editor or text editor is not recommended, understanding how they work will allow you to identify and repair display issues in SVGs.

The shape of a `` element is defined by one parameter: `d`. (See more in basic shapes.) The `d` attribute contains a series of commands and parameters used by those commands.

Each of the commands is instantiated (for example, creating a class, naming and locating it) by a specific letter. For instance, the "Move to" command is called with the letter `M` — to move to (`10`, `10`) you would start your command with `M 10 10`. When the parser runs into this letter, it knows it first needs to move to a point (without drawing a connecting line).

All of the commands also come in two variants. An **uppercase letter** specifies absolute coordinates on the page, and a **lowercase letter** specifies relative coordinates (e.g., _move 10px up and 7px to the left from the last point_).

Coordinates in the `d` parameter are **always unitless** and hence in the user coordinate system. Later, we will learn how paths can be transformed to suit other needs.

## Line commands

There are five line commands for `` nodes. The first command is the "Move To" or `M`, which was described above. It takes at least two parameters, starting with an `x` and `y` coordinate to move to. If the cursor was already somewhere on the page, no line is drawn to connect the two positions. The "Move To" command appears at the beginning of paths to specify where the drawing should start. For example:

```plain
M x y
(or)
m dx dy
```

More than one coordinate pair can follow a "Move To" command. Only the first pair moves the cursor; every pair after it draws a line, exactly as though a "Line To" command had been used. So `M 10 10 90 10 90 90` is equivalent to `M 10 10 L 90 10 L 90 90`. Pairs following `m` draw lines relative to the current position, in the same way.

For example, this path uses a single `M` command with three coordinate pairs to draw two connected line segments:

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 10 90 10 90 90" stroke="black" fill="none" />
</svg>
```

In the following example there's only a point at (`10`, `10`). Note, though, that it wouldn't show up if a path was just drawn normally. For example:

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 10" />
</svg>
```

```html
<svg style="display:none" xmlns="http://www.w3.org/2000/svg">
  <g id="reference">
    <circle cx="10" cy="10" r="3" fill="red" />
  </g>
</svg>
<button>Show/hide reference points and lines</button>
```

```js
const g = document.querySelector("#reference");
const svg = document.querySelector("svg");
const button = document.querySelector("button");
let isHidden = true;
button.addEventListener("click", () => {
  isHidden = !isHidden;
  if (isHidden) {
    svg.querySelector("#reference").remove();
  } else {
    svg.appendChild(g.cloneNode(true));
  }
});
```

There are three commands that draw lines. The most generic is the "Line To" command, called with `L`. `L` takes two parameters—x and y coordinates—and draws a line from the current position to a new position.

```plain
L x y
(or)
l dx dy
```

There are two abbreviated forms for drawing horizontal and vertical lines. `H` draws a horizontal line, and `V` draws a vertical line. Both commands only take one parameter since they only move in one direction.

```plain
H x
(or)
h dx

V y
(or)
v dy
```

An easy place to start is by drawing a shape. We will start with a rectangle (the same type that could be more easily made with a `<rect>` element). It's composed of horizontal and vertical lines only.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <path d="M 10 10 H 90 V 90 H 10 L 10 10" />
</svg>
```

```html
<svg style="display:none" xmlns="http://www.w3.org/2000/svg">
  <g id="reference">
    <circle cx="10" cy="10" r="3" fill="red" />
    <circle cx="90" cy="90" r="3" fill="red" />
    <circle cx="90" cy="10" r="3" fill="red" />
    <circle cx="10" cy="90" r="3" fill="red" />
  </g>
</svg>
<button>Show/hide reference points and lines</button>
```

```js
const g = document.querySelector("#reference");
const svg = document.querySelector("svg");
const button = document.querySelector("button");
let isHidden = true;
button.addEventListener("click", () => {
  isHidden = !isHidden;
  if (isHidden) {
    svg.querySelector("#reference").remove();
  } else {
    svg.appendChild(g.cloneNode(true));
  }
});
```

We can shorten the above path declaration a little bit by using the "Close Path" command, called with `Z`. This command draws a straight line from the current position back to the first unclosed point (first point after the last `Z` command if there is one, or the first point in the path otherwise), and closes off the path with a line joint. It is often placed at the end of a path node, although not always. There is no difference between the uppercase and lowercase command.

```plain
Z
(or)
z
```

So our path above could be shortened to:

```xml
<path d="M 10 10 H 90 V 90 H 10 Z" fill="none" stroke="black" />
```

The relative forms of these commands can also be used to draw the same picture. Relative commands are called by using lowercase letters, and rather than moving the cursor to an exact coordinate, they move it relative to its last position. For instance, since our rectangle is 80×80, the `` element could have been written as:

```xml
<path d="M 10 10 h 80 v 80 h -80 Z" fill="none" stroke="black" />
```

The path will move to point (`10`, `10`) and then move horizontally 80 points to the right, then 80 points down, then 80 points to the left, and then back to the start.

In these examples, it would probably be more intuitive to use the `<polygon>` or `<polyline>` elements. However, paths are used so often in drawing SVG that developers may be more comfortable using them instead. There is no real performance penalty or bonus for using one or the other.
