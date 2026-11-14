---
title: "turtle --- Turtle graphics (part 5 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/turtle.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# turtle --- Turtle graphics (part 5 of 6)

### `setup(width=_CFG["width"], height=_CFG["height"], startx=_CFG["leftright"], starty=_CFG["topbottom"])`

Set the size and position of the main window.  Default values of arguments
are stored in the configuration dictionary and can be changed via a
`turtle.cfg` file.

- **param `width`:** if an integer, a size in pixels, if a float, a fraction of the
screen; default is 50% of screen
- **param `height`:** if an integer, the height in pixels, if a float, a fraction of
the screen; default is 75% of screen
- **param `startx`:** if positive, starting position in pixels from the left
edge of the screen, if negative from the right edge, if `None`,
center window horizontally
- **param `starty`:** if positive, starting position in pixels from the top
edge of the screen, if negative from the bottom edge, if `None`,
center window vertically

```python

>>> screen.setup (width=200, height=200, startx=0, starty=0)
>>>              # sets window to 200x200 pixels, in upper left of screen
>>> screen.setup(width=.75, height=0.5, startx=None, starty=None)
>>>              # sets window to 75% of screen by 50% of screen and centers
```

### `title(titlestring)`

- **param `titlestring`:** a string

Set the title of the turtle window to *titlestring*. The title is shown in
the title bar of the turtle graphics window.

```python

>>> screen.title("Welcome to the turtle zoo!")
```

### class `RawTurtle(canvas)`

```python
RawPen(canvas)
```

- **param `canvas`:** a `tkinter.Canvas`, a `ScrolledCanvas` or a
`TurtleScreen`

Create a turtle.  The turtle has all methods described above as "methods of
Turtle/RawTurtle".

### class `Turtle()`

Subclass of RawTurtle, has the same interface but draws on a default
`Screen` object created automatically when needed for the first time.

### class `TurtleScreen(cv)`

- **param `cv`:** a `tkinter.Canvas`

Provides screen oriented methods like `bgcolor()` etc. that are described
above.

### class `Screen()`

Subclass of `TurtleScreen`, with :ref:`four methods added
<screenspecific>`. Calling `Screen()` returns the single screen object.
If it does not exist yet, it is created. Otherwise the existing one is
returned.

### class `ScrolledCanvas(master)`

- **param `master`:** some Tkinter widget to contain the ScrolledCanvas, i.e.
a Tkinter-canvas with scrollbars added

Used by class Screen, which thus automatically provides a ScrolledCanvas as
playground for the turtles.

### class `Shape(type_, data)`

- **param `type\_`:** a string
- **param `data`:** depends on *type_*

Data structure modeling shapes. *type_* is one of the strings "polygon",
"image" or "compound". What *data* must be depends on *type_*: for
"polygon" a tuple of pairs of coordinates, for "image" an image (only used
internally), and for "compound" `None`, as a compound shape is built up
using the `addcomponent()` method.

### `addcomponent(poly, fill, outline=None)`

- **param `poly`:** a tuple of pairs of numbers
- **param `fill`:** a color
- **param `outline`:** a color or `None`

Add a component to a shape of type "compound". *poly* is a polygon, a
tuple of pairs of numbers. *fill* is the color the polygon is filled
with and *outline* is the color of its outline. If *outline* is not
given, *fill* is used for it as well.

Example:

```python

>>> poly = ((0,0), (10,-5), (0,10), (-10,-5))
>>> s = Shape("compound")
>>> s.addcomponent(poly, "red", "blue")
>>> # ... add more components and then use register_shape()
```

See compoundshapes.

### class `Vec2D(x, y)`

A two-dimensional vector class, used as a helper class for implementing
turtle graphics.  May be useful for turtle graphics programs too.  Derived
from tuple, so a vector is a tuple!

Provides (for *a*, *b* vectors, *k* number):

- `a + b` vector addition
- `a - b` vector subtraction
- `a * b` inner product
- `k * a` and `a * k` multiplication with scalar
- `abs(a)` absolute value of a
- `a.rotate(angle)` rotation

### Exceptions

The `turtle` module defines the following exception:

### exception `TurtleGraphicsError`

Raised for invalid arguments or operations.
For example, a malformed color string:

```python

>>> turtle.color("blau")
Traceback (most recent call last):
    ...
turtle.TurtleGraphicsError: bad color string: blau
```

## How-to guides

This section covers some typical turtle use-cases and approaches.

### How to automatically begin and end filling

Starting with Python 3.14, you can use the `fill()` context manager
instead of `begin_fill()` and `end_fill()` to automatically begin and
end fill. Here is an example:

```
with fill():
    for i in range(4):
        forward(100)
        right(90)

forward(200)
```

The code above is equivalent to:

```
begin_fill()
for i in range(4):
    forward(100)
    right(90)
end_fill()

forward(200)
```

### How to use compound shapes

To use compound turtle shapes, which consist of several polygons of different
color, you must use the helper class `Shape` explicitly as described
below:

1. Create an empty `Shape` object of type "compound".
1. Add as many components to this object as desired, using the
`addcomponent()` method.

For example:

```python

>>> s = Shape("compound")
>>> poly1 = ((0,0), (10,-5), (0,10), (-10,-5))
>>> s.addcomponent(poly1, "red", "blue")
>>> poly2 = ((0,0), (10,-5), (-10,-5))
>>> s.addcomponent(poly2, "blue", "red")
```

1. Now add the Shape to the Screen's shapelist and use it:

```python

>>> register_shape("myshape", s)
>>> shape("myshape")
```

### How to use the `turtle` module namespace

Using `from turtle import *` is convenient - but be warned that it imports a
rather large collection of objects, and if you're doing anything but turtle
graphics you run the risk of a name conflict (this becomes even more an issue
if you're using turtle graphics in a script where other modules might be
imported).

The solution is to use `import turtle` - `fd()` becomes
`turtle.fd()`, `width()` becomes `turtle.width()` and so on. (If typing
"turtle" over and over again becomes tedious, use for example ``import turtle
as t`` instead.)

### How to use turtle graphics in a script

It's recommended to use the `turtle` module namespace as described
immediately above, for example:

```
import turtle as t
from random import random

for i in range(100):
    steps = int(random() * 100)
    angle = int(random() * 360)
    t.right(angle)
    t.fd(steps)
```

Another step is also required though - as soon as the script ends, Python
will also close the turtle's window. Add:

```
t.mainloop()
```

to the end of the script. The script will now wait to be dismissed and
will not exit until it is terminated, for example by closing the turtle
graphics window.

### How to use object-oriented turtle graphics

> **See also:** Explanation of the object-oriented interface

Other than for very basic <example-value> purposes, or for trying things out
as quickly as possible, it's more usual and much more powerful to use the
object-oriented approach to turtle graphics. For example, this allows
multiple turtles on screen at once.

In this approach, the various turtle commands are methods of objects (mostly of
`Turtle` objects). You *can* use the object-oriented approach in the shell,
but it would be more typical in a Python script.

The example above then becomes:

```
from turtle import Turtle
from random import random

t = Turtle()
for i in range(100):
    steps = int(random() * 100)
    angle = int(random() * 360)
    t.right(angle)
    t.fd(steps)

t.screen.mainloop()
```

Note the last line. `t.screen` is an instance of the `Screen`
that a Turtle instance exists on; it's created automatically along with
the turtle.

The turtle's screen can be customised, for example:

```
t.screen.title('Object-oriented turtle demo')
t.screen.bgcolor("orange")
```

### How to use `help()`

The public methods of the Screen and Turtle classes are documented extensively
via docstrings.  So these can be used as online-help via the Python help
facilities:

- When using IDLE, tooltips show the signatures and first lines of the
docstrings of typed in function-/method calls.

- Calling `help()` on methods or functions displays the docstrings::

```python
>>> help(Screen.bgcolor)
Help on method bgcolor in module turtle:
```

bgcolor(self, *args) unbound turtle.Screen method
Set or return backgroundcolor of the TurtleScreen.

Arguments (if given): a color string or three numbers
in the range 0..colormode or a 3-tuple of such numbers.

```python
>>> screen.bgcolor("orange")
>>> screen.bgcolor()
"orange"
>>> screen.bgcolor(0.5,0,0.5)
>>> screen.bgcolor()
"#800080"
```

```python
>>> help(Turtle.penup)
Help on method penup in module turtle:
```

penup(self) unbound turtle.Turtle method
Pull the pen up -- no drawing when moving.

Aliases: penup | pu | up

No argument

```python
>>> turtle.penup()
```

- The docstrings of the functions which are derived from methods have a modified
form:

```
>>> help(bgcolor)
Help on function bgcolor in module turtle:

bgcolor(*args)
    Set or return backgroundcolor of the TurtleScreen.

    Arguments (if given): a color string or three numbers
    in the range 0..colormode or a 3-tuple of such numbers.

    Example::

      >>> bgcolor("orange")
      >>> bgcolor()
      "orange"
      >>> bgcolor(0.5,0,0.5)
      >>> bgcolor()
      "#800080"

>>> help(penup)
Help on function penup in module turtle:

penup()
    Pull the pen up -- no drawing when moving.

    Aliases: penup | pu | up

    No argument

    Example:
    >>> penup()
```

These modified docstrings are created automatically together with the function
definitions that are derived from the methods at import time.

### Translation of docstrings into different languages

There is a utility to create a dictionary the keys of which are the method names
and the values of which are the docstrings of the public methods of the classes
Screen and Turtle.

### `write_docstringdict(filename="turtle_docstringdict")`

- **param `filename`:** a string, used as filename

Create and write docstring-dictionary to a Python script with the given
filename.  This function has to be called explicitly (it is not used by the
turtle graphics classes).  The docstring dictionary will be written to the
Python script `{filename}.py`.  It is intended to serve as a template
for translation of the docstrings into different languages.

If you (or your students) want to use `turtle` with online help in your
native language, you have to translate the docstrings and save the resulting
file as e.g. `turtle_docstringdict_german.py`.

If you have an appropriate entry in your `turtle.cfg` file this dictionary
will be read in at import time and will replace the original English docstrings.

At the time of this writing there are docstring dictionaries in German and in
Italian.  (Requests please to user@example.com.)

### How to configure Screen and Turtles

The built-in default configuration mimics the appearance and behaviour of the
old turtle module in order to retain best possible compatibility with it.

If you want to use a different configuration which better reflects the features
of this module or which better fits to your needs, e.g. for use in a classroom,
you can prepare a configuration file `turtle.cfg` which will be read at import
time and modify the configuration according to its settings.

The built in configuration would correspond to the following `turtle.cfg`:

```ini
width = 0.5
height = 0.75
leftright = None
topbottom = None
canvwidth = 400
canvheight = 300
mode = standard
colormode = 1.0
delay = 10
undobuffersize = 1000
shape = classic
pencolor = black
fillcolor = black
resizemode = noresize
visible = True
language = english
exampleturtle = turtle
examplescreen = screen
title = Python Turtle Graphics
using_IDLE = False
```

Short explanation of selected entries:

- The first four lines correspond to the arguments of the `Screen.setup()`
method.
- Line 5 and 6 correspond to the arguments of the method
`Screen.screensize()`.
- *shape* can be any of the built-in shapes, e.g: arrow, turtle, etc.  For more
info try `help(shape)`.
- If you want to use no fill color (i.e. make the turtle transparent), you have
to write `fillcolor = ""` (but all nonempty strings must not have quotes in
the cfg file).
- If you want to reflect the turtle its state, you have to use ``resizemode =
auto``.
- If you set e.g. `language = italian` the docstringdict
`turtle_docstringdict_italian.py` will be loaded at import time (if
present on the import path, e.g. in the same directory as `turtle`).
- The entries *exampleturtle* and *examplescreen* define the names of these
objects as they occur in the docstrings.  The transformation of
method-docstrings to function-docstrings will delete these names from the
docstrings.
- *using_IDLE*: Set this to `True` if you regularly work with IDLE and its `-n`
switch ("no subprocess").  This will prevent `exitonclick()` to enter the
mainloop.

There can be a `turtle.cfg` file in the directory where `turtle` is
stored and an additional one in the current working directory.  The latter will
override the settings of the first one.

The `Lib/turtledemo` directory contains a `turtle.cfg` file.  You can
study it as an example and see its effects when running the demos (preferably
not from within the demo-viewer).

## Explanation

A turtle object draws on a screen object, and there a number of key <example-value> in
the turtle object-oriented interface that can be used to create them and relate
them to each other.

A `Turtle` instance will automatically create a `Screen`
instance if one is not already present.

`Turtle` is a subclass of `RawTurtle`, which *doesn't* automatically
create a drawing surface - a *canvas* will need to be provided or created for
it. The *canvas* can be a `tkinter.Canvas`, `ScrolledCanvas`
or `TurtleScreen`.

`TurtleScreen` is the basic <example-value> surface for a
turtle. `Screen` is a subclass of `TurtleScreen`, and
includes some additional methods for managing its
appearance (including size and title) and behaviour. `TurtleScreen`'s
constructor needs a `tkinter.Canvas` or a
`ScrolledCanvas` as an argument.

The functional interface for turtle graphics uses the various methods of
`Turtle` and `TurtleScreen`/`Screen`. Behind the scenes, a screen
object is automatically created whenever a function derived from a `Screen`
method is called. Similarly, a turtle object is automatically created
whenever any of the functions derived from a Turtle method is called.

To use multiple turtles on a screen, the object-oriented interface must be
used.
