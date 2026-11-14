---
title: "turtle --- Turtle graphics (part 2 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/turtle.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# turtle --- Turtle graphics (part 2 of 6)

## Reference

### Turtle methods and functions

Most of the examples in this section refer to a Turtle instance called
`turtle`.

#### Move and draw

### `forward(distance)`

```python
fd(distance)
```

- **param `distance`:** a number

Move the turtle forward by the specified *distance*, in the direction the
turtle is headed.

```python

>>> turtle.position()
(0.00,0.00)
>>> turtle.forward(25)
>>> turtle.position()
(25.00,0.00)
>>> turtle.forward(-75)
>>> turtle.position()
(-50.00,0.00)
```

### `back(distance)`

```python
bk(distance)
backward(distance)
```

- **param `distance`:** a number

Move the turtle backward by *distance*, opposite to the direction the
turtle is headed. The turtle's heading does not change.

```python

>>> turtle.goto(0, 0)
```

```python

>>> turtle.position()
(0.00,0.00)
>>> turtle.backward(30)
>>> turtle.position()
(-30.00,0.00)
```

### `right(angle)`

```python
rt(angle)
```

- **param `angle`:** a number

Turn the turtle right by the specified *angle*. The angle is measured in
degrees by default; the unit can be changed with `degrees()` or
`radians()`. How the heading is measured depends on the turtle mode,
see `mode()`.

```python

>>> turtle.setheading(22)
```

```python

>>> turtle.heading()
22.0
>>> turtle.right(45)
>>> turtle.heading()
337.0
```

### `left(angle)`

```python
lt(angle)
```

- **param `angle`:** a number

Turn the turtle left by the specified *angle*. The angle is measured in
degrees by default; the unit can be changed with `degrees()` or
`radians()`. How the heading is measured depends on the turtle mode,
see `mode()`.

```python

>>> turtle.setheading(22)
```

```python

>>> turtle.heading()
22.0
>>> turtle.left(45)
>>> turtle.heading()
67.0
```

### `goto(x, y=None)`

```python
setpos(x, y=None)
setposition(x, y=None)
```

- **param `x`:** a number or a pair/vector of numbers
- **param `y`:** a number or `None`

Move the turtle to an absolute position. If *y* is `None`, *x* must be a
pair of coordinates or a `Vec2D`, for example as returned by
`pos()`. If the pen is down, a line is drawn. The turtle's heading does
not change.

```python

>>> turtle.goto(0, 0)
```

```python

>>> tp = turtle.pos()
>>> tp
(0.00,0.00)
>>> turtle.goto(60,30)
>>> turtle.pos()
(60.00,30.00)
>>> turtle.goto((20,80))
>>> turtle.pos()
(20.00,80.00)
>>> turtle.goto(tp)
>>> turtle.pos()
(0.00,0.00)
```

### `teleport(x=None, y=None, *, fill_gap=False)`

- **param `x`:** a number or `None`
- **param `y`:** a number or `None`
- **param `fill_gap`:** a boolean

Teleport, or instantly move, the turtle to an absolute position. Unlike
`goto()`, no line is drawn. If *x* or *y* is not given, that coordinate
is kept as it is. The turtle's heading does not change.

If the turtle is filling a shape, the shape drawn so far is finished and
filled before teleporting, and filling starts again at the new position.
Pass `fill_gap=True` to keep filling one shape instead. The teleport then
counts as an edge of the shape, as it would with `goto()`.

```python

>>> turtle.goto(0, 0)
```

```python

>>> tp = turtle.pos()
>>> tp
(0.00,0.00)
>>> turtle.teleport(60)
>>> turtle.pos()
(60.00,0.00)
>>> turtle.teleport(y=10)
>>> turtle.pos()
(60.00,10.00)
>>> turtle.teleport(20, 30)
>>> turtle.pos()
(20.00,30.00)
```

> *Added in version 3.12.*

### `setx(x)`

- **param `x`:** a number

Set the turtle's x coordinate to *x*. The y coordinate is unchanged.

```python

>>> turtle.goto(0, 240)
```

```python

>>> turtle.position()
(0.00,240.00)
>>> turtle.setx(10)
>>> turtle.position()
(10.00,240.00)
```

### `sety(y)`

- **param `y`:** a number

Set the turtle's y coordinate to *y*. The x coordinate is unchanged.

```python

>>> turtle.goto(0, 40)
```

```python

>>> turtle.position()
(0.00,40.00)
>>> turtle.sety(-10)
>>> turtle.position()
(0.00,-10.00)
```

### `setheading(to_angle)`

```python
seth(to_angle)
```

- **param `to_angle`:** a number

Set the turtle's heading to *to_angle*. Here are some common directions in
degrees:

```text
=================== ====================
 standard mode           logo mode
=================== ====================
   0 - east                0 - north
  90 - north              90 - east
 180 - west              180 - south
 270 - south             270 - west
=================== ====================
```

```python

>>> turtle.setheading(90)
>>> turtle.heading()
90.0
```

### `home()`

Move the turtle to the origin, coordinates (0,0). The turtle's heading is
set to its start orientation, which depends on the turtle mode, see
`mode()`.

```python

>>> turtle.setheading(90)
>>> turtle.goto(0, -10)
```

```python

>>> turtle.heading()
90.0
>>> turtle.position()
(0.00,-10.00)
>>> turtle.home()
>>> turtle.position()
(0.00,0.00)
>>> turtle.heading()
0.0
```

### `circle(radius, extent=None, steps=None)`

- **param `radius`:** a number
- **param `extent`:** a number or `None`
- **param `steps`:** an integer or `None`

Draw a circle with the given *radius*. The center is *radius* units left
of the turtle; *extent*, an angle, determines which part of the circle is
drawn. If *extent* is not given, draw the entire circle. If *extent* is
not a full circle, one endpoint of the arc is the current pen position.
Draw the arc in counterclockwise direction if *radius* is positive,
otherwise in clockwise direction. Finally, the turtle's heading is changed
by *extent*.

As the circle is approximated by an inscribed regular polygon, *steps*
determines the number of steps to use. If not given, it will be calculated
automatically. May be used to draw regular polygons.

```python

>>> turtle.home()
>>> turtle.position()
(0.00,0.00)
>>> turtle.heading()
0.0
>>> turtle.circle(50)
>>> turtle.position()
(-0.00,0.00)
>>> turtle.heading()
0.0
>>> turtle.circle(120, 180)  # draw a semicircle
>>> turtle.position()
(0.00,240.00)
>>> turtle.heading()
180.0
```

### `dot()`

```python
dot(size)
dot(color, /)
dot(size, color, /)
dot(size, r, g, b, /)
```

- **param `size`:** a positive integer or `None`
- **param `color`:** a colorstring or a numeric color tuple

Draw a circular dot with diameter *size*, using *color*. If *size* is not
given, the larger of `pensize + 4` and `2 * pensize` is used. If
*color* is not given, the current pencolor is used.

```python

>>> turtle.home()
>>> turtle.dot()
>>> turtle.fd(50); turtle.dot(20, "blue"); turtle.fd(50)
>>> turtle.position()
(100.00,-0.00)
>>> turtle.heading()
0.0
```

### `stamp()`

Stamp a copy of the turtle shape onto the canvas at the current turtle
position.  Return a stamp_id for that stamp, which can be used to delete
it by calling `clearstamp(stamp_id)`.

```python

>>> turtle.color("blue")
>>> stamp_id = turtle.stamp()
>>> turtle.fd(50)
```

### `clearstamp(stampid)`

- **param `stampid`:** an integer, must be return value of previous
`stamp()` call

Delete stamp with given *stampid*.

```python

>>> turtle.position()
(150.00,-0.00)
>>> turtle.color("blue")
>>> astamp = turtle.stamp()
>>> turtle.fd(50)
>>> turtle.position()
(200.00,-0.00)
>>> turtle.clearstamp(astamp)
>>> turtle.position()
(200.00,-0.00)
```

### `clearstamps(n=None)`

- **param `n`:** an integer (or `None`)

Delete all or first/last *n* of turtle's stamps.  If *n* is `None`, delete
all stamps, if *n* > 0 delete first *n* stamps, else if *n* < 0 delete
last *n* stamps.

```python

>>> for i in range(8):
...     unused_stamp_id = turtle.stamp()
...     turtle.fd(30)
>>> turtle.clearstamps(2)
>>> turtle.clearstamps(-2)
>>> turtle.clearstamps()
```

### `undo()`

Undo (repeatedly) the last turtle action(s).  Number of available
undo actions is determined by the size of the undobuffer.

```python

>>> for i in range(4):
...     turtle.fd(50); turtle.lt(80)
...
>>> for i in range(8):
...     turtle.undo()
```

### `speed(speed=None)`

- **param `speed`:** an integer, a string or `None`

Return or set the turtle's speed. If *speed* is not given, return the
current speed. Otherwise set the turtle's speed to an integer from 0 to 10.
If *speed* is a number greater than 10 or smaller than 0.5, the speed is
set to 0. You can also use these names instead of numbers:

- "fastest": 0
- "fast": 10
- "normal": 6
- "slow": 3
- "slowest": 1

Speeds from 1 to 10 give increasingly faster animation of line drawing and
turtle turning. A speed of 0 means that no animation takes place:
`forward()` and `back()` make the turtle jump, and likewise
`left()` and `right()` make the turtle turn instantly.

```python

>>> turtle.speed()
3
>>> turtle.speed('normal')
>>> turtle.speed()
6
>>> turtle.speed(9)
>>> turtle.speed()
9
```

#### Tell Turtle's state

### `position()`

```python
pos()
```

Return the turtle's current location (x,y) as a `Vec2D` vector.

```python

>>> turtle.pos()
(440.00,-0.00)
```

### `towards(x, y=None)`

- **param `x`:** a number or a pair/vector of numbers or a turtle instance
- **param `y`:** a number if *x* is a number, else `None`

Return the angle of the line from the turtle's position to (x,y). If *y* is
`None`, *x* must be a pair of coordinates, a `Vec2D`, for example
as returned by `pos()`, or another turtle. The angle is measured from
the turtle's start orientation, which depends on the turtle mode, see
`mode()`.

```python

>>> turtle.goto(10, 10)
>>> turtle.towards(0,0)
225.0
```

### `xcor()`

Return the turtle's x coordinate.

```python

>>> turtle.home()
>>> turtle.left(50)
>>> turtle.forward(100)
>>> turtle.pos()
(64.28,76.60)
>>> print(round(turtle.xcor(), 5))
64.27876
```

### `ycor()`

Return the turtle's y coordinate.

```python

>>> turtle.home()
>>> turtle.left(60)
>>> turtle.forward(100)
>>> print(turtle.pos())
(50.00,86.60)
>>> print(round(turtle.ycor(), 5))
86.60254
```

### `heading()`

Return the turtle's current heading. The value depends on the turtle mode,
see `mode()`.

```python

>>> turtle.home()
>>> turtle.left(67)
>>> turtle.heading()
67.0
```

### `distance(x, y=None)`

- **param `x`:** a number or a pair/vector of numbers or a turtle instance
- **param `y`:** a number if *x* is a number, else `None`

Return the distance from the turtle to (x,y) in turtle step units. If *y* is
`None`, *x* must be a pair of coordinates, a `Vec2D`, for example
as returned by `pos()`, or another turtle.

```python

>>> turtle.home()
>>> turtle.distance(30,40)
50.0
>>> turtle.distance((30,40))
50.0
>>> joe = Turtle()
>>> joe.forward(77)
>>> turtle.distance(joe)
77.0
```

#### Settings for measurement

### `degrees(fullcircle=360.0)`

- **param `fullcircle`:** a number

Set the angle measurement units to degrees. The number of degrees in a full
circle is set to *fullcircle*, which defaults to 360.

```python

>>> turtle.home()
>>> turtle.left(90)
>>> turtle.heading()
90.0

>>> # Change angle measurement unit to grad (also known as gon,
>>> # grade, or gradian and equals 1/100-th of the right angle.)
>>> turtle.degrees(400.0)
>>> turtle.heading()
100.0
>>> turtle.degrees(360)
>>> turtle.heading()
90.0
```

### `radians()`

Set the angle measurement units to radians.  Equivalent to
`degrees(2 * math.pi)`.

```python

>>> turtle.home()
>>> turtle.left(90)
>>> turtle.heading()
90.0
>>> turtle.radians()
>>> turtle.heading()
1.<example-card-number>
```

```python

>>> turtle.degrees(360)
```

#### Pen control

##### Drawing state

### `pendown()`

```python
pd()
down()
```

Lower the pen. The turtle draws a line when it moves.

### `penup()`

```python
pu()
up()
```

Lift the pen. The turtle does not draw when it moves.

### `pensize(width=None)`

```python
width(width=None)
```

- **param `width`:** a positive number or `None`

Return or set the line thickness. If *width* is not given, return the
current pensize. If resizemode is set to "auto" and the turtle shape is a
polygon, that polygon is drawn with the same line thickness.

```python

>>> turtle.pensize()
1
>>> turtle.pensize(10)   # from here on lines of width 10 are drawn
```

### `pen(pen=None, **pendict)`

- **param `pen`:** a dictionary with some or all of the below listed keys
- **param `pendict`:** one or more keyword-arguments with the below listed keys as keywords

Return or set the pen's attributes in a "pen-dictionary" with the following
key/value pairs:

- "shown": True/False
- "pendown": True/False
- "pencolor": color-string or color-tuple
- "fillcolor": color-string or color-tuple
- "pensize": positive number
- "speed": number in range 0..10
- "resizemode": "auto" or "user" or "noresize"
- "stretchfactor": (positive number, positive number)
- "outline": positive number
- "tilt": number

This dictionary can be used as argument for a subsequent call to `pen()`
to restore the former pen-state.  Moreover one or more of these attributes
can be provided as keyword-arguments.  This can be used to set several pen
attributes in one statement.

```python

>>> turtle.pen(fillcolor="black", pencolor="red", pensize=10)
>>> sorted(turtle.pen().items())
[('fillcolor', 'black'), ('outline', 1), ('pencolor', 'red'),
 ('pendown', True), ('pensize', 10), ('resizemode', 'noresize'),
 ('shearfactor', 0.0), ('shown', True), ('speed', 9),
 ('stretchfactor', (1.0, 1.0)), ('tilt', 0.0)]
>>> penstate=turtle.pen()
>>> turtle.color("yellow", "")
>>> turtle.penup()
>>> sorted(turtle.pen().items())[:3]
[('fillcolor', ''), ('outline', 1), ('pencolor', 'yellow')]
>>> turtle.pen(penstate, fillcolor="green")
>>> sorted(turtle.pen().items())[:3]
[('fillcolor', 'green'), ('outline', 1), ('pencolor', 'red')]
```

### `isdown()`

Return `True` if the pen is down, `False` if it's up.

```python

>>> turtle.penup()
>>> turtle.isdown()
False
>>> turtle.pendown()
>>> turtle.isdown()
True
```

##### Color control

### `pencolor()`

```python
pencolor(color, /)
pencolor(r, g, b, /)
```

Return or set the pencolor.

Four input formats are allowed:

`pencolor()`
Return the current pencolor as color specification string or
as a tuple (see example).  May be used as input to another
`color()`, `pencolor()`, `fillcolor()` or `bgcolor()`
call.

`pencolor(colorstring)`
Set the pencolor to *colorstring*, which is a Tk color specification
string, such as `"red"`, `"yellow"`, or `"#33cc8c"`.

`pencolor((r, g, b))`
Set the pencolor to the RGB color represented by the tuple of *r*, *g*,
and *b*. Each of *r*, *g*, and *b* must be between 0 and colormode, where
colormode is either 1.0 or 255 (see `colormode()`).

`pencolor(r, g, b)`
Set the pencolor to the RGB color represented by *r*, *g*, and *b*.
Each of *r*, *g*, and *b* must be between 0 and colormode.

If the turtle shape is a polygon, the outline of that polygon is drawn with
the newly set pencolor.

```python

>>> colormode()
1.0
>>> turtle.pencolor()
'red'
>>> turtle.pencolor("brown")
>>> turtle.pencolor()
'brown'
>>> tup = (0.2, 0.8, 0.55)
>>> turtle.pencolor(tup)
>>> turtle.pencolor()
(0.2, 0.8, 0.<example-card-number>)
>>> colormode(255)
>>> turtle.pencolor()
(51.0, 204.0, 140.0)
>>> turtle.pencolor('#32c18f')
>>> turtle.pencolor()
(50.0, 193.0, 143.0)
```
