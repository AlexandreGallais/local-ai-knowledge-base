---
title: "turtle --- Turtle graphics (part 4 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/turtle.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# turtle --- Turtle graphics (part 4 of 6)

### `bgcolor()`

```python
bgcolor(color, /)
bgcolor(r, g, b, /)
```

Return or set the background color of the TurtleScreen.

Four input formats are allowed:

`bgcolor()`
Return the current background color as a color specification string or
as a tuple (see example).  May be used as input to another
`color()`, `pencolor()`, `fillcolor()` or `bgcolor()`
call.

`bgcolor(colorstring)`
Set the background color to *colorstring*, which is a Tk color
specification string, such as `"red"`, `"yellow"`, or `"#33cc8c"`.

`bgcolor((r, g, b))`
Set the background color to the RGB color represented by the tuple of
*r*, *g*, and *b*.
Each of *r*, *g*, and *b* must be between 0 and colormode, where
colormode is either 1.0 or 255 (see `colormode()`).

`bgcolor(r, g, b)`
Set the background color to the RGB color represented by *r*, *g*, and
*b*. Each of *r*, *g*, and *b* must be between 0 and colormode.

```python

>>> screen.bgcolor("orange")
>>> screen.bgcolor()
'orange'
>>> screen.bgcolor("#800080")
>>> screen.bgcolor()
(128.0, 0.0, 128.0)
```

### `bgpic(picname=None)`

- **param `picname`:** a string, name of an image file (PNG, GIF, PGM, and PPM)
or `"nopic"`, or `None`

Set background image or return name of current backgroundimage.  If *picname*
is a filename, set the corresponding image as background.  If *picname* is
`"nopic"`, delete background image, if present.  If *picname* is `None`,
return the filename of the current backgroundimage.:

```
>>> screen.bgpic()
'nopic'
>>> screen.bgpic("landscape.gif")
>>> screen.bgpic()
"landscape.gif"
```

### `clear()`

> **Note:** This TurtleScreen method is available as a global function only under the
> name `clearscreen`.  The global function `clear` is a different one
> derived from the Turtle method `clear`.

### `clearscreen()`

Delete all drawings and all turtles from the TurtleScreen.  Reset the now
empty TurtleScreen to its initial state: white background, no background
image, no event bindings and tracing on.

### `reset()`

> **Note:** This TurtleScreen method is available as a global function only under the
> name `resetscreen`.  The global function `reset` is another one
> derived from the Turtle method `reset`.

### `resetscreen()`

Reset all turtles on the screen to their initial state.

### `screensize(canvwidth=None, canvheight=None, bg=None)`

- **param `canvwidth`:** positive integer, new width of canvas in pixels
- **param `canvheight`:** positive integer, new height of canvas in pixels
- **param `bg`:** colorstring or color-tuple, new background color

If no arguments are given, return current (canvaswidth, canvasheight).  Else
resize the canvas the turtles are drawing on.  Do not alter the drawing
window.  To observe hidden parts of the canvas, use the scrollbars. With this
method, one can make visible those parts of a drawing which were outside the
canvas before.

```python

>>> screen.screensize()
(400, 300)
>>> screen.screensize(2000,1500)
>>> screen.screensize()
(2000, 1500)
```

e.g. to search for an erroneously escaped turtle ;-)

### `setworldcoordinates(llx, lly, urx, ury)`

- **param `llx`:** a number
- **param `lly`:** a number
- **param `urx`:** a number
- **param `ury`:** a number

Set up a user-defined coordinate system. *llx* and *lly* are the x and y
coordinates of the lower left corner of the canvas. *urx* and *ury* are the
x and y coordinates of the upper right corner. Switch to mode "world" if
necessary, which performs a reset. If mode "world" is already active, all
drawings are redrawn according to the new coordinates. In user-defined
coordinate systems, angles may appear distorted, see `mode()`.

```python

>>> screen.reset()
>>> screen.setworldcoordinates(-50,-7.5,50,7.5)
>>> for _ in range(72):
...     left(10)
...
>>> for _ in range(8):
...     left(45); fd(2)   # a regular octagon
```

```python

>>> screen.reset()
>>> for t in turtles():
...      t.reset()
```

#### Animation control

### `no_animation()`

Temporarily turn off turtle animation. The code inside the `with`
block is not animated. Once the block is exited, the drawing appears. This
is useful for drawing complex shapes where even the fastest speed setting
is too slow.

```python

>>> with screen.no_animation():
...     for dist in range(2, 400, 2):
...         fd(dist)
...         rt(90)
```

> *Added in version 3.14.*

### `delay(delay=None)`

- **param `delay`:** a nonnegative integer or `None`

Return or set the drawing delay in milliseconds. This is approximately the
time interval between two consecutive canvas updates. The longer the
drawing delay, the slower the animation.

```python

>>> screen.delay()
10
>>> screen.delay(5)
>>> screen.delay()
5
```

### `tracer(n=None, delay=None)`

- **param `n`:** a nonnegative integer or `None`
- **param `delay`:** a nonnegative integer or `None`

Turn turtle animation on or off and set the drawing delay. If *n* is given,
only every n-th regular screen update is performed, which can be used to
speed up the drawing of complex graphics. If *n* is 0, animation is turned
off and the screen is only updated by calling `update()`. If *delay* is
given, it sets the drawing delay, see `delay()`. When called without
arguments, return the current value of *n*.

```python

>>> screen.tracer(8, 25)
>>> dist = 2
>>> for i in range(200):
...     fd(dist)
...     rt(90)
...     dist += 2
```

### `update()`

Perform a TurtleScreen update. To be used when tracer is turned off.

See also the RawTurtle/Turtle method `speed()`.

#### Using screen events

### `listen(xdummy=None, ydummy=None)`

Set focus on TurtleScreen (in order to collect key-events).  Dummy arguments
are provided in order to be able to pass `listen()` to the onclick method.

### `onkey(fun, key)`

```python
onkeyrelease(fun, key)
```

- **param `fun`:** a function with no arguments or `None`
- **param `key`:** a string: key (e.g. "a") or key-symbol (e.g. "space")

Bind *fun* to key-release event of key.  If *fun* is `None`, event bindings
are removed. Remark: in order to be able to register key-events, TurtleScreen
must have the focus. (See method `listen()`.)

```python

>>> def f():
...     fd(50)
...     lt(60)
...
>>> screen.onkey(f, "Up")
>>> screen.listen()
```

### `onkeypress(fun, key=None)`

- **param `fun`:** a function with no arguments or `None`
- **param `key`:** a string: key (e.g. "a") or key-symbol (e.g. "space")

Bind *fun* to key-press event of key if key is given,
or to any key-press-event if no key is given.
Remark: in order to be able to register key-events, TurtleScreen
must have focus. (See method `listen()`.)

```python

>>> def f():
...     fd(50)
...
>>> screen.onkey(f, "Up")
>>> screen.listen()
```

### `onclick(fun, btn=1, add=None)`

```python
onscreenclick(fun, btn=1, add=None)
```

- **param `fun`:** a function with two arguments or `None`
- **param `btn`:** an integer
- **param `add`:** a boolean or `None`

Bind *fun* to mouse-click events on this screen. *fun* is called with the
coordinates of the clicked point on the canvas. If *fun* is `None`,
existing bindings are removed. *btn* is the number of the mouse button and
defaults to 1, the left mouse button. If *add* is `True`, a new binding
is added, otherwise it replaces a former binding.

Example for a TurtleScreen instance named `screen` and a Turtle instance
named `turtle`:

```python

>>> screen.onclick(turtle.goto) # Subsequently clicking into the TurtleScreen will
>>>                             # make the turtle move to the clicked point.
>>> screen.onclick(None)        # remove event binding again
```

> **Note:** This TurtleScreen method is available as a global function only under the
> name `onscreenclick`.  The global function `onclick` is another one
> derived from the Turtle method `onclick`.

### `ontimer(fun, t=0)`

- **param `fun`:** a function with no arguments
- **param `t`:** a number >= 0

Install a timer that calls *fun* after *t* milliseconds.

```python

>>> running = True
>>> def f():
...     if running:
...         fd(50)
...         lt(60)
...         screen.ontimer(f, 250)
>>> f()   ### makes the turtle march around
>>> running = False
```

### `mainloop()`

```python
done()
```

Start the event loop by calling Tkinter's `mainloop()`
method. Must be the last statement in a turtle graphics program. Must
*not* be used if a script is run from within IDLE in -n mode (see
idle-no-subprocess).

#### Input methods

### `textinput(title, prompt)`

- **param `title`:** a string
- **param `prompt`:** a string

Pop up a dialog window for input of a string. *title* is the title of the
dialog window and *prompt* is a text describing what information to input.
Return the string entered. If the dialog is canceled, return `None`.:

```
>>> screen.textinput("NIM", "Name of first player:")
```

### `numinput(title, prompt, default=None, minval=None, maxval=None)`

- **param `title`:** a string
- **param `prompt`:** a string
- **param `default`:** a number or `None`
- **param `minval`:** a number or `None`
- **param `maxval`:** a number or `None`

Pop up a dialog window for input of a number. *title* is the title of the
dialog window and *prompt* is a text describing what numerical information
to input. *default* is the default value, *minval* and *maxval* are the
minimum and maximum values for input. If these are given, the number
entered must be between *minval* and *maxval*. If not, a hint is issued
and the dialog remains open for correction. Return the number entered. If
the dialog is canceled, return `None`.:

```
>>> screen.numinput("Poker", "Your stakes:", 1000, minval=10, maxval=10000)
```

#### Settings and special methods

### `mode(mode=None)`

- **param `mode`:** a string or `None`

Set the turtle mode and perform a reset. *mode* is one of the strings
"standard", "logo" or "world". If *mode* is not given, return the current
mode.

Mode "standard" is compatible with the old `turtle` module. Mode
"logo" is compatible with most Logo turtle graphics. Mode "world" uses
user-defined world coordinates, see `setworldcoordinates()`. In this
mode, angles appear distorted if the x and y units are not of equal length.

```text
============ ========================= ===================
    Mode      Initial turtle heading     positive angles
============ ========================= ===================
 "standard"    to the right (east)       counterclockwise
   "logo"        upward    (north)         clockwise
============ ========================= ===================
```

```python

>>> mode("logo")  # resets turtle heading to north
>>> mode()
'logo'
```

### `colormode(cmode=None)`

- **param `cmode`:** a number or `None`

Return the colormode or set it to 1.0 or 255. After setting it, the *r*,
*g* and *b* values of color triples have to be between 0 and *cmode*.

```python

>>> screen.colormode(1)
>>> turtle.pencolor(240, 160, 80)
Traceback (most recent call last):
     ...
TurtleGraphicsError: bad color sequence: (240, 160, 80)
>>> screen.colormode()
1.0
>>> screen.colormode(255)
>>> screen.colormode()
255
>>> turtle.pencolor(240,160,80)
```

### `getcanvas()`

Return the Canvas of this TurtleScreen.  Useful for insiders who know what to
do with a Tkinter Canvas.

```python

>>> cv = screen.getcanvas()
>>> cv
<turtle.ScrolledCanvas object ...>
```

### `getshapes()`

Return a list of names of all currently available turtle shapes.

```python

>>> screen.getshapes()
['arrow', 'blank', 'circle', ..., 'turtle']
```

### `register_shape(name, shape=None)`

```python
addshape(name, shape=None)
```

- **param `name`:** a string
- **param `shape`:** a string, a tuple of pairs of numbers, a `Shape`
object or `None`

Add a turtle shape to the TurtleScreen's shape list. It can be called in
four different ways:

(1) *name* is the name of an image file (PNG, GIF, PGM, and PPM) and
*shape* is `None`: Install the corresponding image shape.:

```python
>>> screen.register_shape("turtle.gif")
```

(2) *name* is an arbitrary string and *shape* is the name of an image file
(PNG, GIF, PGM, and PPM): Install the corresponding image shape.:

```python
>>> screen.register_shape("turtle", "turtle.gif")
```

(3) *name* is an arbitrary string and *shape* is a tuple of pairs of
coordinates: Install the corresponding polygon shape.

```python

>>> screen.register_shape("triangle", ((5,-3), (0,5), (-5,-3)))
```

(4) *name* is an arbitrary string and *shape* is a (compound) `Shape`
object: Install the corresponding compound shape.

Image shapes do not rotate when turning the turtle, so they do not display
the heading of the turtle. To use a registered shape, call `shape()`
with its name.

> *Changed in version 3.14.*
> Added support for PNG, PGM, and PPM image formats.
> Both a shape name and an image file name can be specified.

### `turtles()`

Return the list of turtles on the screen.

```python

>>> for turtle in screen.turtles():
...     turtle.color("red")
```

### `window_height()`

Return the height of the turtle window.:

```
>>> screen.window_height()
480
```

### `window_width()`

Return the width of the turtle window.:

```
>>> screen.window_width()
640
```

#### Screen-only methods

### `bye()`

Close the turtle graphics window.

### `exitonclick()`

Bind `bye()` method to mouse clicks on the Screen.

If the value "using_IDLE" in the configuration dictionary is `False`
(default value), also enter mainloop.  Remark: If IDLE with the `-n` switch
(no subprocess) is used, this value should be set to `True` in
`turtle.cfg`.  In this case IDLE's own mainloop is active also for the
client script.

### `save(filename, overwrite=False)`

Save the current turtle drawing (and turtles) as a PostScript file.

- **param `filename`:** the path of the saved PostScript file
- **param `overwrite`:** if `False` and there already exists a file with the given
filename, then the function will raise a
`FileExistsError`. If it is `True`, the file will be
overwritten.

```python

>>> screen.save("my_drawing.ps")
>>> screen.save("my_drawing.ps", overwrite=True)
```

> *Added in version 3.14.*
