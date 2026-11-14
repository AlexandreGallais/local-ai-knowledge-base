---
title: "turtle --- Turtle graphics (part 6 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/turtle.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# turtle --- Turtle graphics (part 6 of 6)

## `turtledemo` --- Demo scripts

Module `turtledemo`.

The `turtledemo` package includes a set of demo scripts.  These
scripts can be run and viewed using the supplied demo viewer as follows:

```
python -m turtledemo
```

Alternatively, you can run the demo scripts individually.  For example,:

```
python -m turtledemo.bytedesign
```

The `turtledemo` package directory contains:

- A demo viewer `__main__.py` which can be used to view the sourcecode
of the scripts and run them at the same time.
- Multiple scripts demonstrating different features of the `turtle`
module.  Examples can be accessed via the Examples menu.  They can also
be run standalone.
- A `turtle.cfg` file which serves as an example of how to write
and use such files.

The demo scripts are:

```text
+------------------------+------------------------------+--------------------------------------+
| Name                   | Description                  | Features                             |
+========================+==============================+======================================+
| ``bytedesign``         | complex classical            | :func:`tracer`, :func:`delay`,       |
|                        | turtle graphics pattern      | :func:`update`                       |
+------------------------+------------------------------+--------------------------------------+
| ``chaos``              | graphs Verhulst dynamics,    | world coordinates                    |
|                        | shows that computer's        |                                      |
|                        | computations can generate    |                                      |
|                        | results sometimes against the|                                      |
|                        | common sense expectations    |                                      |
+------------------------+------------------------------+--------------------------------------+
| ``clock``              | analog clock showing time    | turtles as clock's                   |
|                        | of your computer             | hands, :func:`ontimer`               |
+------------------------+------------------------------+--------------------------------------+
| ``colormixer``         | experiment with r, g, b      | :func:`ondrag`                       |
+------------------------+------------------------------+--------------------------------------+
| ``forest``             | 3 breadth-first trees        | randomization                        |
+------------------------+------------------------------+--------------------------------------+
| ``fractalcurves``      | Hilbert & Koch curves        | recursion                            |
+------------------------+------------------------------+--------------------------------------+
| ``lindenmayer``        | ethnomathematics             | L-System                             |
|                        | (indian kolams)              |                                      |
+------------------------+------------------------------+--------------------------------------+
| ``minimal_hanoi``      | Towers of Hanoi              | Rectangular Turtles                  |
|                        |                              | as Hanoi discs                       |
|                        |                              | (:func:`shape`, :func:`shapesize`)   |
+------------------------+------------------------------+--------------------------------------+
| ``nim``                | play the classical nim game  | turtles as nimsticks,                |
|                        | with three heaps of sticks   | event driven (mouse,                 |
|                        | against the computer.        | keyboard)                            |
+------------------------+------------------------------+--------------------------------------+
| ``paint``              | super minimalistic           | :func:`onclick`                      |
|                        | drawing program              |                                      |
+------------------------+------------------------------+--------------------------------------+
| ``peace``              | elementary                   | turtle: appearance                   |
|                        |                              | and animation                        |
+------------------------+------------------------------+--------------------------------------+
| ``penrose``            | aperiodic tiling with        | :func:`stamp`                        |
|                        | kites and darts              |                                      |
+------------------------+------------------------------+--------------------------------------+
| ``planet_and_moon``    | simulation of                | compound shapes,                     |
|                        | gravitational system         | :class:`Vec2D`                       |
+------------------------+------------------------------+--------------------------------------+
| ``rosette``            | a pattern from the wikipedia | :func:`clone`,                       |
|                        | article on turtle graphics   | :func:`undo`                         |
+------------------------+------------------------------+--------------------------------------+
| ``round_dance``        | dancing turtles rotating     | compound shapes, :func:`clone`       |
|                        | pairwise in opposite         | :func:`shapesize`, :func:`tilt`,     |
|                        | direction                    | :func:`get_shapepoly`, :func:`update`|
+------------------------+------------------------------+--------------------------------------+
| ``sorting_animate``    | visual demonstration of      | simple alignment,                    |
|                        | different sorting methods    | randomization                        |
+------------------------+------------------------------+--------------------------------------+
| ``tree``               | a (graphical) breadth        | :func:`clone`                        |
|                        | first tree (using generators)|                                      |
+------------------------+------------------------------+--------------------------------------+
| ``two_canvases``       | simple design                | turtles on two                       |
|                        |                              | canvases                             |
+------------------------+------------------------------+--------------------------------------+
| ``yinyang``            | another elementary example   | :func:`circle`                       |
+------------------------+------------------------------+--------------------------------------+
```

Have fun!

```python

>>> for turtle in turtles():
...      turtle.reset()
>>> turtle.penup()
>>> turtle.goto(-200,25)
>>> turtle.pendown()
>>> turtle.write("No one expects the Spanish Inquisition!",
...      font=("Arial", 20, "normal"))
>>> turtle.penup()
>>> turtle.goto(-100,-50)
>>> turtle.pendown()
>>> turtle.write("Our two chief Turtles are...",
...      font=("Arial", 16, "normal"))
>>> turtle.penup()
>>> turtle.goto(-450,-75)
>>> turtle.write(str(turtles()))
```
