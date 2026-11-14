---
title: "inkex.turtle"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/turtle.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.turtle

A Python path turtle for Inkscape extensions

## class PathTurtle

```python
class PathTurtle
```

A Python path turtle

> *Changed in version 1.2.*
> pTurtle has been renamed to PathTurtle.

## PathTurtle.forward

```python
def forward(self, mag: float)
```

Move turtle forward by mag in the current direction.

## PathTurtle.backward

```python
def backward(self, mag)
```

Move turtle backward by mag in the current direction.

## PathTurtle.right

```python
def right(self, deg)
```

Rotate turtle right by deg degrees.

Changed in inkex 1.2: The turtle now rotates right (previously left) when
calling this method.

## PathTurtle.left

```python
def left(self, deg)
```

Rotate turtle left by deg degrees.

Changed in inkex 1.2: The turtle now rotates left (previously right) when
calling this method.

## PathTurtle.penup

```python
def penup(self)
```

Enable non-drawing / moving mode

## PathTurtle.pendown

```python
def pendown(self)
```

Enable drawing mode

## PathTurtle.pentoggle

```python
def pentoggle(self)
```

Switch between drawing and moving mode

## PathTurtle.home

```python
def home(self)
```

Move to home position

## PathTurtle.clean

```python
def clean(self)
```

Delete current path

## PathTurtle.clear

```python
def clear(self)
```

Delete current path and move to home

## PathTurtle.setpos

```python
def setpos(self, arg)
```

Move/draw to position, depending on the current state

## PathTurtle.getpos

```python
def getpos(self)
```

Returns the current position

## PathTurtle.setheading

```python
def setheading(self, deg)
```

Set the heading to deg degrees

## PathTurtle.getheading

```python
def getheading(self)
```

Returns the heading in degrees

## PathTurtle.sethome

```python
def sethome(self, arg)
```

Set home position

## PathTurtle.getPath

```python
def getPath(self)
```

Returns the current path

## PathTurtle.rtree

```python
def rtree(self, size, minimum, pt=False)
```

Generates a random tree

## class PathBuilder

```python
class PathBuilder
```

This helper class can be used to construct a path and insert it into a
document.

> *Added in version 1.2.*

## PathBuilder.__init__

```python
def __init__(self, style: Style)
```

Initializes a PathDrawHelper object

Args:
style (Style): Style of the path.

## PathBuilder.add

```python
def add(self, command: Union[PathCommand, List[PathCommand]])
```

Add a Path command to the Helper

Args:
command (Union[PathCommand, List[PathCommand]]): A (list of) PathCommand(s)
to be appended.

## PathBuilder.terminate

```python
def terminate(self)
```

Terminates current subpath. This method does nothing by default and is
supposed to be overridden in subclasses.

## PathBuilder.append_next

```python
def append_next(self, sibling_before: BaseElement)
```

Insert the resulting Path as `inkex.elements._polygons.PathElement`
into the document tree.

Args:
sibling_before (BaseElement): The element the resulting path will be
appended after.

## class PathGroupBuilder

```python
class PathGroupBuilder(PathBuilder)
```

This helper class can be used to construct a group of paths that all have the
same style.

> *Added in version 1.2.*

## PathGroupBuilder.terminate

```python
def terminate(self)
```

Terminates the current Path, and appends it to the group if it is not
empty.

## PathGroupBuilder.append_next

```python
def append_next(self, sibling_before: BaseElement)
```

Insert the resulting Path as `inkex.elements._groups.Group` into the
document tree.

Args:
sibling_before (BaseElement): The element the resulting group will be
appended after.
