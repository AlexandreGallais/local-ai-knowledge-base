---
title: "turtle --- Turtle graphics (part 1 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/turtle.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `turtle` --- Turtle graphics

Module `turtle`.

**Source code:** Lib/turtle.py

Turtle star

Turtle can draw intricate shapes using programs that repeat simple
moves.

Imagine a robotic turtle starting at (0, 0) in the x-y plane.
After an `import turtle`, give it the command `turtle.forward(15)`, and it
moves (on-screen!) 15 pixels in the direction it is facing, drawing a line as
it moves. Give it the command `turtle.right(25)`, and it rotates in-place 25
degrees clockwise.

Turtle graphics is an implementation of `the drawing tools introduced in Logo
<https://en.wikipedia.org/wiki/Turtle_(robot)>`__ in 1967. It was created as an
educational tool, and its instant, visible feedback makes it an effective way
for learners to encounter programming concepts. It is also a convenient way to
produce simple graphical output without bringing in external libraries.

This document includes four main sections:

- turtle-tutorial teaches the basics of turtle drawing.
- turtle-reference describes the functions, methods and classes this
module defines.
- turtle-howtos detail how to handle specific tasks.
- turtle-explanation provides background on the object-oriented
interface.

> **Note:** Turtle graphics requires the `tkinter` optional module.
> The python.org installers for Windows and macOS include it, but some
> Linux distributions and other platforms may package it separately. If
> `import turtle` fails with an error mentioning `_tkinter`, look for
> documentation from your distributor (that is, whoever provided Python to you).
> Check this in advance if you're planning to use turtle graphics with a learner.

## Tutorial

New users should start here. In this tutorial we'll explore some of the
basics of turtle drawing.

### Starting a turtle environment

In a Python shell, import all the objects of the `turtle` module:

```
from turtle import *
```

If you run into a `Standard library module '_tkinter' was not found` error,
you'll have to install the `Tk interface package` on your system.

Nothing appears yet. To open the turtle window, make the turtle visible:

```
showturtle()
```

A new window opens, with the turtle in the middle, shown as an arrow
heading East.

### Basic <example-value>

Send the turtle forward 100 steps:

```
forward(100)
```

You should see a line drawn by the turtle, heading East. Change the
direction of the turtle, so that it turns 120 degrees left
(anti-clockwise):

```
left(120)
```

Let's continue by drawing a triangle:

```
forward(100)
left(120)
forward(100)
```

Notice how the turtle, represented by an arrow, points in different
directions as you steer it.

Experiment with those commands, and also with `backward()` and
`right()`. Many commands also have shorter aliases, such as `fd()` for
`forward()`.

#### Pen control

Try changing the color - for example, `color('blue')` - and
width of the line - for example, `width(3)` - and then drawing again.

You can also move the turtle around without drawing, by lifting up the pen:
`up()` before moving. To start drawing again, use `down()`.

#### The turtle's position

Send your turtle back to its starting-point (useful if it has disappeared
off-screen):

```
home()
```

The home position is at the center of the turtle's screen. If you ever need to
know them, get the turtle's x-y coordinates with:

```
pos()
```

Home is at `(0, 0)`.

And after a while, it will probably help to clear the window so we can start
anew:

```
clearscreen()
```

### Making algorithmic patterns

Using loops, it's possible to build up geometric patterns:

```
for steps in range(100):
    for c in ('blue', 'red', 'green'):
        color(c)
        forward(steps)
        right(30)
```

- which of course, are limited only by the imagination!

Let's draw the star shape at the top of this page. We want red lines,
filled in with yellow:

```
color('red')
fillcolor('yellow')
```

Just as `up()` and `down()` determine whether lines will be drawn,
filling can be turned on and off:

```
begin_fill()
```

Next we'll create a loop:

```
start = pos()

while True:
    forward(200)
    left(170)
    if distance(start) < 1:
        break
```

`distance(start) < 1` is a good way to know when the turtle is back at its
start position.

Finally, complete the filling:

```
end_fill()
```

(Note that filling only actually takes place when you give the
`end_fill()` command.)
