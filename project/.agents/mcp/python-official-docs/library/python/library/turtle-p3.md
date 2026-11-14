---
title: "turtle --- Turtle graphics (part 3 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/turtle.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# turtle --- Turtle graphics (part 3 of 6)

### `fillcolor()`

```python
fillcolor(color, /)
fillcolor(r, g, b, /)
```

Return or set the fillcolor.

Four input formats are allowed:

`fillcolor()`
Return the current fillcolor as color specification string, possibly
in tuple format (see example).  May be used as input to another
`color()`, `pencolor()`, `fillcolor()` or `bgcolor()`
call.

`fillcolor(colorstring)`
Set the fillcolor to *colorstring*, which is a Tk color specification
string, such as `"red"`, `"yellow"`, or `"#33cc8c"`.

`fillcolor((r, g, b))`
Set the fillcolor to the RGB color represented by the tuple of *r*, *g*,
and *b*. Each of *r*, *g*, and *b* must be between 0 and colormode, where
colormode is either 1.0 or 255 (see `colormode()`).

`fillcolor(r, g, b)`
Set the fillcolor to the RGB color represented by *r*, *g*, and *b*. Each
of *r*, *g*, and *b* must be between 0 and colormode.

If the turtle shape is a polygon, the interior of that polygon is drawn
with the newly set fillcolor.

```python

>>> turtle.fillcolor("violet")
>>> turtle.fillcolor()
'violet'
>>> turtle.pencolor()
(50.0, 193.0, 143.0)
>>> turtle.fillcolor((50, 193, 143))  # Integers, not floats
>>> turtle.fillcolor()
(50.0, 193.0, 143.0)
>>> turtle.fillcolor('#ffffff')
>>> turtle.fillcolor()
(255.0, 255.0, 255.0)
```

### `color()`

```python
color(color, /)
color(r, g, b, /)
color(pencolor, fillcolor, /)
```

Return or set the pencolor and fillcolor.

Several input formats are allowed. They use 0 to 3 arguments as
follows:

`color()`
Return the current pencolor and the current fillcolor as a pair of color
specification strings or tuples as returned by `pencolor()` and
`fillcolor()`.

`color(colorstring)`, `color((r,g,b))`, `color(r,g,b)`
Inputs as in `pencolor()`. Set both the pencolor and the fillcolor
to the given value.

`color(colorstring1, colorstring2)`, `color((r1,g1,b1), (r2,g2,b2))`
Equivalent to `pencolor(colorstring1)` and `fillcolor(colorstring2)`
and analogously if the other input format is used.

If the turtle shape is a polygon, the outline and interior of that polygon
are drawn with the newly set colors.

```python

>>> turtle.color("red", "green")
>>> turtle.color()
('red', 'green')
>>> color("#285078", "#a0c8f0")
>>> color()
((40.0, 80.0, 120.0), (160.0, 200.0, 240.0))
```

See also: Screen method `colormode()`.

##### Filling

```python

>>> turtle.home()
```

### `filling()`

Return `True` if the turtle is filling, `False` otherwise.

```python

>>> turtle.begin_fill()
>>> if turtle.filling():
...    turtle.pensize(5)
... else:
...    turtle.pensize(3)
```

### `fill()`

Fill the shape drawn in the `with turtle.fill():` block.

```python

>>> turtle.color("black", "red")
>>> with turtle.fill():
...     turtle.circle(80)
```

Using `fill()` is equivalent to adding the `begin_fill()` before the
fill-block and `end_fill()` after the fill-block:

```python

>>> turtle.color("black", "red")
>>> turtle.begin_fill()
>>> turtle.circle(80)
>>> turtle.end_fill()
```

> *Added in version 3.14.*

### `begin_fill()`

To be called just before drawing a shape to be filled.

### `end_fill()`

Fill the shape drawn after the last call to `begin_fill()`.

Whether or not overlap regions for self-intersecting polygons
or multiple shapes are filled depends on the operating system graphics,
type of overlap, and number of overlaps.  For example, the Turtle star
above may be either all yellow or have some white regions.

```python

>>> turtle.color("black", "red")
>>> turtle.begin_fill()
>>> turtle.circle(80)
>>> turtle.end_fill()
```

##### More drawing control

### `reset()`

Delete the turtle's drawings and re-center the turtle. The turtle's
settings are restored to their default values.

```python

>>> turtle.goto(0,-22)
>>> turtle.left(100)
>>> turtle.position()
(0.00,-22.00)
>>> turtle.heading()
100.0
>>> turtle.reset()
>>> turtle.position()
(0.00,0.00)
>>> turtle.heading()
0.0
```

### `clear()`

Delete the turtle's drawings from the screen. The state and position of the
turtle as well as the drawings of other turtles are not affected.

### `write(arg, move=False, align="left", font=("Arial", 8, "normal"))`

- **param `arg`:** object to be written to the TurtleScreen
- **param `move`:** True/False
- **param `align`:** one of the strings "left", "center" or right"
- **param `font`:** a triple (fontname, fontsize, fonttype)

Write text - the string representation of *arg* - at the current turtle
position according to *align* ("left", "center" or "right") and with the given
font.  If *move* is true, the pen is moved to the bottom-right corner of the
text.  By default, *move* is `False`.

```python

>>> turtle.write("Home = ", True, align="center")
>>> turtle.write((0,0), True)
```

#### Turtle state

##### Visibility

### `hideturtle()`

```python
ht()
```

Make the turtle invisible. If the pen is down, movement still draws.

### `showturtle()`

```python
st()
```

Make the turtle visible.

### `isvisible()`

Return `True` if the turtle is visible, `False` if it's hidden.

```python

>>> turtle.hideturtle()
>>> turtle.isvisible()
False
>>> turtle.showturtle()
>>> turtle.isvisible()
True
```

##### Appearance

### `shape(name=None)`

- **param `name`:** a string or `None`

Set the turtle shape to the named shape. If *name* is not given, return the
name of the current shape. The shape must exist in the
`TurtleScreen`'s shape dictionary. Initially there are the following
shapes: "arrow", "turtle", "circle", "square", "triangle" and "classic". To
add shapes, see the `Screen` method `register_shape()`.

```python

>>> turtle.shape()
'classic'
>>> turtle.shape("turtle")
>>> turtle.shape()
'turtle'
```

### `resizemode(rmode=None)`

- **param `rmode`:** a string or `None`

Set the resizemode to "auto", "user" or "noresize". If *rmode* is not
given, return the current resizemode. The different resizemodes have the
following effects:

- "auto": the turtle is resized according to the value of `pensize()`.
- "user": the turtle is resized according to the stretch factors and
outline width, which are set by `shapesize()`.
- "noresize": the turtle is not resized.

`resizemode("user")` is called by `shapesize()` when used with
arguments.

```python

>>> turtle.resizemode()
'noresize'
>>> turtle.resizemode("auto")
>>> turtle.resizemode()
'auto'
```

### `shapesize(stretch_wid=None, stretch_len=None, outline=None)`

```python
turtlesize(stretch_wid=None, stretch_len=None, outline=None)
```

- **param `stretch_wid`:** a positive number or `None`
- **param `stretch_len`:** a positive number or `None`
- **param `outline`:** a positive number or `None`

Return or set the turtle's stretch factors and outline width. If no
arguments are given, return the current values. Otherwise set resizemode to
"user", so that the turtle is displayed stretched according to its stretch
factors:

- *stretch_wid*: the stretch factor perpendicular to the turtle's heading
- *stretch_len*: the stretch factor in the direction of the turtle's
heading
- *outline*: the width of the shape's outline

For example, `shapesize(2, 1)` makes the turtle twice as wide without
changing its length. If only *stretch_wid* is given, *stretch_len* is set to
the same value.

```python

>>> turtle.shapesize()
(1.0, 1.0, 1)
>>> turtle.resizemode("user")
>>> turtle.shapesize(5, 5, 12)
>>> turtle.shapesize()
(5, 5, 12)
>>> turtle.shapesize(outline=8)
>>> turtle.shapesize()
(5, 5, 8)
```

### `shearfactor(shear=None)`

- **param `shear`:** number (optional)

Set or return the current shearfactor. Shear the turtleshape according to
the given shearfactor shear, which is the tangent of the shear angle.
Do *not* change the turtle's heading (direction of movement).
If shear is not given: return the current shearfactor, i. e. the
tangent of the shear angle, by which lines parallel to the
heading of the turtle are sheared.

```python

>>> turtle.shape("circle")
>>> turtle.shapesize(5,2)
>>> turtle.shearfactor(0.5)
>>> turtle.shearfactor()
0.5
```

### `tilt(angle)`

- **param `angle`:** a number

Rotate the turtleshape by *angle* from its current tilt-angle, but do *not*
change the turtle's heading (direction of movement).

```python

>>> turtle.reset()
>>> turtle.shape("circle")
>>> turtle.shapesize(5,2)
>>> turtle.tilt(30)
>>> turtle.fd(50)
>>> turtle.tilt(30)
>>> turtle.fd(50)
```

### `tiltangle(angle=None)`

- **param `angle`:** a number (optional)

Set or return the current tilt-angle. If angle is given, rotate the
turtleshape to point in the direction specified by angle,
regardless of its current tilt-angle. Do *not* change the turtle's
heading (direction of movement).
If angle is not given: return the current tilt-angle, i. e. the angle
between the orientation of the turtleshape and the heading of the
turtle (its direction of movement).

```python

>>> turtle.reset()
>>> turtle.shape("circle")
>>> turtle.shapesize(5,2)
>>> turtle.tilt(45)
>>> turtle.tiltangle()
45.0
```

### `shapetransform(t11=None, t12=None, t21=None, t22=None)`

- **param `t11`:** a number (optional)
- **param `t12`:** a number (optional)
- **param `t21`:** a number (optional)
- **param `t12`:** a number (optional)

Set or return the current transformation matrix of the turtle shape.

If none of the matrix elements are given, return the transformation
matrix as a tuple of 4 elements.
Otherwise set the given elements and transform the turtleshape
according to the matrix consisting of first row t11, t12 and
second row t21, t22. The determinant t11 * t22 - t12 * t21 must not be
zero, otherwise an error is raised.
Modify stretchfactor, shearfactor and tiltangle according to the
given matrix.

```python

>>> turtle = Turtle()
>>> turtle.shape("square")
>>> turtle.shapesize(4,2)
>>> turtle.shearfactor(-0.5)
>>> turtle.shapetransform()
(4.0, -1.0, -0.0, 2.0)
```

### `get_shapepoly()`

Return the current shape polygon as tuple of coordinate pairs. This
can be used to define a new shape or components of a compound shape.

```python

>>> turtle.shape("square")
>>> turtle.shapetransform(4, -1, 0, 2)
>>> turtle.get_shapepoly()
((50, -20), (30, 20), (-50, 20), (-30, -20))
```

#### Using events

### `onclick(fun, btn=1, add=None)`

- **param `fun`:** a function with two arguments or `None`
- **param `btn`:** an integer
- **param `add`:** a boolean or `None`

Bind *fun* to mouse-click events on this turtle. *fun* is called with the
coordinates of the clicked point on the canvas. If *fun* is `None`,
existing bindings are removed. *btn* is the number of the mouse button and
defaults to 1, the left mouse button. If *add* is `True`, a new binding
is added, otherwise it replaces a former binding. Example for the
anonymous turtle, that is, the procedural way:

```python

>>> def turn(x, y):
...     left(180)
...
>>> onclick(turn)  # Now clicking into the turtle will turn it.
>>> onclick(None)  # event-binding will be removed
```

### `onrelease(fun, btn=1, add=None)`

- **param `fun`:** a function with two arguments which will be called with the
coordinates of the clicked point on the canvas
- **param `btn`:** number of the mouse-button, defaults to 1 (left mouse button)
- **param `add`:** `True` or `False` -- if `True`, a new binding will be
added, otherwise it will replace a former binding

Bind *fun* to mouse-button-release events on this turtle.  If *fun* is
`None`, existing bindings are removed.

```python

>>> class MyTurtle(Turtle):
...     def glow(self,x,y):
...         self.fillcolor("red")
...     def unglow(self,x,y):
...         self.fillcolor("")
...
>>> turtle = MyTurtle()
>>> turtle.onclick(turtle.glow)     # clicking on turtle turns fillcolor red,
>>> turtle.onrelease(turtle.unglow) # releasing turns it to transparent.
```

### `ondrag(fun, btn=1, add=None)`

- **param `fun`:** a function with two arguments which will be called with the
coordinates of the clicked point on the canvas
- **param `btn`:** number of the mouse-button, defaults to 1 (left mouse button)
- **param `add`:** `True` or `False` -- if `True`, a new binding will be
added, otherwise it will replace a former binding

Bind *fun* to mouse-move events on this turtle.  If *fun* is `None`,
existing bindings are removed.

Remark: Every sequence of mouse-move-events on a turtle is preceded by a
mouse-click event on that turtle.

```python

>>> turtle.ondrag(turtle.goto)
```

Subsequently, clicking and dragging the Turtle will move it across
the screen thereby producing handdrawings (if pen is down).

#### Special Turtle methods

### `poly()`

Record the vertices of a polygon drawn in the `with turtle.poly():` block.
The first and last vertices will be connected.

```python

>>> with turtle.poly():
...     turtle.forward(100)
...     turtle.right(60)
...     turtle.forward(100)
```

> *Added in version 3.14.*

### `begin_poly()`

Start recording the vertices of a polygon. The current turtle position is
the first vertex of the polygon.

### `end_poly()`

Stop recording the vertices of a polygon. The current turtle position is
the last vertex of the polygon. This will be connected with the first vertex.

### `get_poly()`

Return the last recorded polygon.

```python

>>> turtle.home()
>>> turtle.begin_poly()
>>> turtle.fd(100)
>>> turtle.left(20)
>>> turtle.fd(30)
>>> turtle.left(60)
>>> turtle.fd(50)
>>> turtle.end_poly()
>>> p = turtle.get_poly()
>>> register_shape("myFavouriteShape", p)
```

### `clone()`

Create and return a clone of the turtle. The clone has the same position,
heading and turtle properties.

```python

>>> leonel = Turtle()
>>> marco = leonel.clone()
```

### `getturtle()`

```python
getpen()
```

Return the Turtle object itself.

Call `getturtle()` to get the turtle used by functions such as
`forward()` and `left()`:

```python

>>> pet = getturtle()
>>> pet.fd(50)
>>> pet
<turtle.Turtle object at 0x...>
```

### `getscreen()`

Return the `TurtleScreen` object the turtle is drawing on.
TurtleScreen methods can then be called for that object.

```python

>>> ts = turtle.getscreen()
>>> ts
<turtle._Screen object at 0x...>
>>> ts.bgcolor("pink")
```

### `setundobuffer(size)`

- **param `size`:** an integer or `None`

Set or disable the undo buffer. If *size* is an integer, an empty undo
buffer of the given size is installed. *size* is the maximum number of
turtle actions that can be undone by `undo()`. If *size* is `None`,
the undo buffer is disabled.

```python

>>> turtle.setundobuffer(42)
```

### `undobufferentries()`

Return the number of entries in the undo buffer.

```python

>>> while undobufferentries():
...     undo()
```

### Screen methods and functions

Most of the examples in this section refer to a TurtleScreen instance called
`screen`.

```python

>>> screen = Screen()
```

#### Window control
