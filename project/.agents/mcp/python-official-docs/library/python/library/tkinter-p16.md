---
title: "tkinter --- Python interface to Tcl/Tk (part 16 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 16 of 17)

### `copy(*, from_coords=None, zoom=None, subsample=None)`

Return a new `PhotoImage` with a copy of this image.

*from_coords* specifies a rectangular sub-region of the source image to
be copied.
It must be a tuple or a list of 1 to 4 integers `(x1, y1, x2, y2)`.
`(x1, y1)` and `(x2, y2)` specify diagonally opposite corners of the
rectangle.
If *x2* and *y2* are not specified, they default to the bottom-right
corner of the source image.
The pixels copied include the left and top edges of the rectangle but not
the bottom or right edges.
If *from_coords* is not given, the whole source image is copied.

If *zoom* or *subsample* are specified, the image is transformed as in
the `zoom()` or `subsample()` methods.
The value must be a single integer or a pair of integers.

> *Changed in version 3.13.*
> Added the *from_coords*, *zoom* and *subsample* parameters.

### `copy_replace(sourceImage, *, from_coords=None, to=None, \`

```python
shrink=False, zoom=None, subsample=None, \
compositingrule=None)
```

Copy a region from *sourceImage* (which must be a `PhotoImage`)
into this image, possibly with pixel zooming and/or subsampling.
If no options are specified, the whole of *sourceImage* is copied into
this image, starting at coordinates `(0, 0)`.

*from_coords* specifies a rectangular sub-region of the source image to
be copied, as in the `copy()` method.

*to* specifies a rectangular sub-region of the destination image to be
affected.
It must be a tuple or a list of 1 to 4 integers `(x1, y1, x2, y2)`.
If *x2* and *y2* are not specified, they default to `(x1, y1)` plus the
size of the source region (after subsampling and zooming, if specified).
If *x2* and *y2* are specified, the source region is replicated if
necessary to fill the destination region in a tiled fashion.

If *shrink* is true, the size of the destination image is reduced, if
necessary, so that the region being copied into is at the bottom-right
corner of the image.

If *zoom* or *subsample* are specified, the image is transformed as in
the `zoom()` or `subsample()` methods.
The value must be a single integer or a pair of integers.

*compositingrule* specifies how transparent pixels in the source image
are combined with the destination image.
With `'overlay'` (the default), the old contents of the destination
image remain visible, as if the source image were printed on a piece of
transparent film and placed over the top of the destination.
With `'set'`, the old contents of the destination image are discarded
and the source image is used as-is.

> *Added in version 3.13.*

### `data(format=None, *, from_coords=None, background=None, \`

```python
grayscale=False)
```

Return the image data.

*format* specifies the name of the image file format handler to use.
If it is not given, the data is returned as a tuple (one element per row)
of strings containing space-separated (one element per pixel/column)
colors in `#RRGGBB` format.

*from_coords* specifies a rectangular region of the image to be returned.
It must be a tuple or a list of 1 to 4 integers `(x1, y1, x2, y2)`.
If only *x1* and *y1* are specified, the region extends from `(x1, y1)`
to the bottom-right corner of the image.
If all four coordinates are given, they specify diagonally opposite
corners of the region, including `(x1, y1)` and excluding `(x2, y2)`.
If *from_coords* is not given, the whole image is returned.

If *background* is specified, the data does not contain any transparency
information; in all transparent pixels the color is replaced by the
specified color.

If *grayscale* is true, the data does not contain color information; all
pixel data is transformed into grayscale.

> *Added in version 3.13.*

### `get(x, y)`

Return the color of the pixel at coordinates (*x*, *y*) as an
`(r, g, b)` tuple of three integers between 0 and 255, representing the
red, green and blue components respectively.

### `put(data, to=None)`

Set pixels of the image to the colors given in *data*, which must be a
string or a nested sequence of horizontal rows of pixel colors (for
example `"{red green} {blue yellow}"`).

*to* specifies the coordinates of the region of the image into which the
data are copied.
It must be a tuple or a list of 2 or 4 integers `(x1, y1)` or
`(x1, y1, x2, y2)` giving the top-left corner, and optionally the
bottom-right corner, of the region.
The default position is `(0, 0)`.

### `read(filename, format=None, *, from_coords=None, to=None, \`

```python
shrink=False)
```

Read image data from the file named *filename* into the image.

*format* specifies the format of the image data in the file.

*from_coords* specifies a rectangular sub-region of the image file data
to be copied to the destination image.
It must be a tuple or a list of 1 to 4 integers `(x1, y1, x2, y2)`.
If only *x1* and *y1* are specified, the region extends from `(x1, y1)`
to the bottom-right corner of the image in the file.
If all four coordinates are given, they specify diagonally opposite
corners of the region.
If *from_coords* is not given, the whole of the image in the file is
read.

*to* specifies the coordinates of the top-left corner of the region of
the image into which the data are read.
The default is `(0, 0)`.

If *shrink* is true, the size of the image is reduced, if necessary, so
that the region into which the file data are read is at the bottom-right
corner of the image.

> *Added in version 3.13.*

### `subsample(x, y='', *, from_coords=None)`

Return a new `PhotoImage` based on this image but using only every
*x*-th pixel in the X direction and every *y*-th pixel in the Y
direction.
If *y* is not given, it defaults to the same value as *x*.

*from_coords* specifies a rectangular sub-region of the source image to
be copied, as in the `copy()` method.

> *Changed in version 3.13.*
> Added the *from_coords* parameter.

### `transparency_get(x, y)`

Return `True` if the pixel at coordinates (*x*, *y*) is fully
transparent, `False` otherwise.

> *Added in version 3.8.*

### `transparency_set(x, y, boolean)`

Make the pixel at coordinates (*x*, *y*) fully transparent if *boolean*
is true, fully opaque otherwise.

> *Added in version 3.8.*

### `write(filename, format=None, from_coords=None, *, \`

```python
background=None, grayscale=False)
```

Write image data from the image to the file named *filename*.

*format* specifies the name of the image file format handler to use.
If it is not given, the format is guessed from the file extension.

*from_coords* specifies a rectangular region of the image to be written.
It must be a tuple or a list of 1 to 4 integers `(x1, y1, x2, y2)`.
If only *x1* and *y1* are specified, the region extends from `(x1, y1)`
to the bottom-right corner of the image.
If all four coordinates are given, they specify diagonally opposite
corners of the region.
If *from_coords* is not given, the whole image is written.

If *background* is specified, the data does not contain any transparency
information; in all transparent pixels the color is replaced by the
specified color.

If *grayscale* is true, the data does not contain color information; all
pixel data is transformed into grayscale.

> *Changed in version 3.13.*
> Added the *background* and *grayscale* parameters.

### `zoom(x, y='', *, from_coords=None)`

Return a new `PhotoImage` with this image magnified by a factor of
*x* in the X direction and *y* in the Y direction.
If *y* is not given, it defaults to the same value as *x*.

*from_coords* specifies a rectangular sub-region of the source image to
be copied, as in the `copy()` method.

> *Changed in version 3.13.*
> Added the *from_coords* parameter.

### class `BitmapImage(name=None, cnf={}, master=None, **kw)`

A two-color image (the Tk `bitmap` image type) created from an X11 bitmap.
Each pixel displays a foreground color, a background color, or nothing
(producing a transparent effect).
Inherits from `Image`.

The configuration options are *data* or *file* (the source bitmap, given as
a string in X11 bitmap format or as the name of a file in that format),
*maskdata* or *maskfile* (the mask bitmap, in the same forms), and
*foreground* and *background* (the two colors).
For pixels where the mask is zero the image displays nothing; for other
pixels it displays the foreground color where the source is one and the
background color where the source is zero.
If *background* is set to an empty string, the background pixels are
transparent.

`BitmapImage` has no methods of its own beyond those inherited from
`Image`.

### class `Event()`

A container for the attributes of an event passed to a callback bound with
`Misc.bind()`.
An `Event` instance has the following attributes, each corresponding
to a field of the underlying Tk event; depending on the event type, some
attributes may be set to the string `'??'` to indicate that they are not
meaningful.
See bindings-and-events.

### `serial`

The serial number of the event.

### `num`

The mouse button that was pressed or released (for button events).

### `focus`

Whether the window has the focus (for `Enter` and `Leave` events).

### `height`

```python
width
```

The new height and width of the window (for `Configure` and `Expose`
events).

### `keycode`

The keycode of the key that was pressed or released.

### `state`

The state of the event, as a number (for most events) or a string (for
`Visibility` events).

### `time`

The timestamp of the event, in milliseconds.

### `x`

```python
y
```

The pointer position relative to the widget, in pixels.

### `x_root`

```python
y_root
```

The pointer position relative to the top-left corner of the screen, in
pixels.

### `char`

The character typed, as a string (for key <example-value>).

### `send_event`

`True` if the event was sent by another application.

### `keysym`

The symbolic name of the key that was pressed or released.

### `keysym_num`

The numeric value of `keysym`.

### `type`

The `EventType` of the event.

### `widget`

The widget on which the event occurred.

### `delta`

The amount the mouse wheel was rotated (for `MouseWheel` events).

### `user_data`

The data string of a virtual event, as passed to the *data* option of
`Misc.event_generate()`.
It is `'??'` for non-virtual events.

> *Added in version 3.15.*

### `detail`

A fixed detail string for `Enter`, `Leave`, `FocusIn`, `FocusOut`
and `ConfigureRequest` events (see the Tcl/Tk documentation).
It is `'??'` for other events.

> *Added in version 3.15.*

### class `EventType(*values)`

An `enum.StrEnum` enumerating the Tk event types, used as the value
of `Event.type`.
Its members include, among others, `KeyPress`, `KeyRelease`,
`ButtonPress`, `ButtonRelease`, `Motion`, `Enter`, `Leave`,
`FocusIn`, `FocusOut`, `Configure`, `Map`, `Unmap`, `Expose`,
`Destroy` and `MouseWheel`.

> *Added in version 3.6.*

### class `CallWrapper(func, subst, widget)`

Internal helper that wraps a Python callback so that it can be invoked from
Tcl.
*func* is the Python function, *subst* is an optional function that
pre-processes the Tcl arguments, and *widget* is the widget used for error
reporting.
Instances are created automatically by `Misc.register()`; this class is
not normally used directly.

### `Tcl(screenName=None, baseName=None, className='Tk', useTk=False)`

The `Tcl()` function is a factory function which creates an object much
like that created by the `Tk` class, except that it does not
initialize the Tk subsystem.
This is most often useful when driving the Tcl interpreter in an environment
where one doesn't want to create extraneous toplevel windows, or where one
cannot (such as Unix/Linux systems without an X server).
An object created by the `Tcl()` object can have a Toplevel window
created (and the Tk subsystem initialized) by calling its `loadtk()`
method.

### `NoDefaultRoot()`

Inhibit the creation of an implicit default root window.
Afterwards `tkinter` no longer creates a shared default root
automatically, and operations that rely on one --- such as constructing a
widget without an explicit *master* --- raise a `RuntimeError`.
Call this early in larger applications to make the root window explicit.

### `mainloop(n=0)`

Run the Tk main event loop on the default root window until all windows are
destroyed.
Equivalent to calling `Misc.mainloop()` on the default root.

### `getboolean(s)`

Convert the Tcl boolean string *s* (one of `'1'`, `'true'`, `'yes'`,
`'on'` and similar, or their false counterparts) to a Python
`bool`.
Raise `ValueError` for an invalid value.

### `getdouble(s)`

Convert *s* to a floating-point number.
This is the built-in `float`.

### `getint(s)`

Convert *s* to an integer.
This is the built-in `int`.

### `image_names()`

Return the names of all existing images in the default root's interpreter.

### `image_types()`

Return the available image types (such as `'photo'` and `'bitmap'`) in
the default root's interpreter.

### File handlers

Tk allows you to register and unregister a callback function which will be
called from the Tk mainloop when I/O is possible on a file descriptor.
Only one handler may be registered per file descriptor. Example code:

```
import tkinter
widget = tkinter.Tk()
mask = tkinter.READABLE | tkinter.WRITABLE
widget.tk.createfilehandler(file, mask, callback)
...
widget.tk.deletefilehandler(file)
```

This feature is not available on Windows.

Since you don't know how many bytes are available for reading, you may not
want to use the `BufferedIOBase` or `TextIOBase`
`read()` or `readline()` methods,
since these will insist on reading a predefined number of bytes.
For sockets, the `recv()` or
`recvfrom()` methods will work fine; for other files,
use raw reads or `os.read(file.fileno(), maxbytecount)`.

### `Widget.tk.createfilehandler(file, mask, func)`

Registers the file handler callback function *func*. The *file* argument
may either be an object with a `fileno()` method (such as
a file or socket object), or an integer file descriptor. The *mask*
argument is an ORed combination of any of the three constants below.
The callback is called as follows:

```
callback(file, mask)
```

### `Widget.tk.deletefilehandler(file)`

Unregisters a file handler.

### `READABLE`

```python
WRITABLE
EXCEPTION
```

Constants used in the *mask* arguments.

### Constants

The following symbolic constants are available in both the `tkinter`
and `tkinter.constants` namespaces.

### `TRUE`

```python
YES
ON
```

Truthy values, all equal to the integer `1`.

### `FALSE`

```python
NO
OFF
```

Falsy values, all equal to the integer `0`.

### `N`

```python
S
E
W
NE
NW
SE
SW
NS
EW
NSEW
CENTER
```

Compass <example-value> (`'n'`, `'s'`, `'e'`, `'w'` and the diagonals and
edges) plus `CENTER` (`'center'`), used as values for the *anchor* and
*sticky* options and by methods such as `Misc.grid_anchor()`.

### `LEFT`

```python
RIGHT
TOP
BOTTOM
```

Sides for the *side* option of the packer (see `Pack.pack_configure()`).
