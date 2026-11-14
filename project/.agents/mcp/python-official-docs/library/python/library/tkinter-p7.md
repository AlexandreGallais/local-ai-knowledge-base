---
title: "tkinter --- Python interface to Tcl/Tk (part 7 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 7 of 17)

### `tk_busy_hold(**kw)`

Make this widget appear busy.
A transparent window is placed in front of the widget, so that it and all
of its descendants in the widget hierarchy are blocked from pointer
events and display a busy cursor.
Normally `update()` should be called immediately afterwards to ensure
that the hold operation is in effect before the application starts its
processing.

The only supported configuration option is *cursor*, the cursor to be
displayed while the widget is busy; it may have any of the values
accepted by `configure()`.

`busy_hold()`, `busy()` and `tk_busy()` are aliases of
`tk_busy_hold()`.

> *Added in version 3.13.*

### `tk_busy_configure(cnf=None, **kw)`

Query or modify the configuration options of the busy window.
The widget must have been previously made busy by `tk_busy_hold()`.
With no arguments, return a dictionary describing all of the available
options; if *cnf* is the name of an option, return a tuple describing
that one option.
Otherwise set the given options to the given values.
Options may have any of the values accepted by `tk_busy_hold()`.

The option database is referenced through the widget name or class.
For example, if a `Frame` widget named `frame` is to be made
busy, the busy cursor can be specified for it by either of the calls:

```
w.option_add('*frame.busyCursor', 'gumby')
w.option_add('*Frame.BusyCursor', 'gumby')
```

`busy_configure()`, `busy_config()` and `tk_busy_config()`
are aliases of `tk_busy_configure()`.

> *Added in version 3.13.*

### `tk_busy_cget(option)`

Return the current value of the busy configuration *option*.
The widget must have been previously made busy by `tk_busy_hold()`,
and *option* may have any of the values accepted by that method.

`busy_cget()` is an alias of `tk_busy_cget()`.

> *Added in version 3.13.*

### `tk_busy_forget()`

Make this widget no longer busy, releasing the resources (including the
transparent window) allocated when it was made busy.
User events will again be received by the widget.
These resources are also released when the widget is destroyed.

`busy_forget()` is an alias of `tk_busy_forget()`.

> *Added in version 3.13.*

### `tk_busy_status()`

Return `True` if the widget is currently busy, `False` otherwise.

`busy_status()` is an alias of `tk_busy_status()`.

> *Added in version 3.13.*

### `tk_busy_current(pattern=None)`

Return a list of widgets that are currently busy.
If *pattern* is given, only busy widgets whose path names match the
pattern are returned.

`busy_current()` is an alias of `tk_busy_current()`.

> *Added in version 3.13.*

The methods with the `winfo_` prefix retrieve information about windows
managed by Tk.

### `winfo_atom(name, displayof=0)`

Return the integer identifier for the atom whose name is *name*, creating
a new atom if none exists.
If *displayof* is given, the atom is looked up on the display of that
window; otherwise it is looked up on the display of the application's
main window.

### `winfo_atomname(id, displayof=0)`

Return the textual name for the atom whose integer identifier is *id*.
This is the inverse of `winfo_atom()`.
If *displayof* is given, the identifier is looked up on the display of
that window; otherwise it is looked up on the display of the
application's main window.

### `winfo_cells()`

Return the number of cells in the colormap for the widget.

### `winfo_children()`

Return a list containing the widgets that are children of the widget, in
stacking order from lowest to highest.
Toplevel windows are returned as children of their logical parents.

### `winfo_class()`

Return the class name of the widget.

### `winfo_colormapfull()`

Return `True` if the colormap for the widget is known to be full,
`False` otherwise.

### `winfo_containing(rootX, rootY, displayof=0)`

Return the widget containing the point given by *rootX* and *rootY*, or
`None` if no window in this application contains the point.
The coordinates are in screen units in the coordinate system of the root
window.
If *displayof* is given, the coordinates refer to the screen containing
that window; otherwise they refer to the screen of the application's main
window.

### `winfo_depth()`

Return the depth of the widget, that is, the number of bits per pixel.

### `winfo_exists()`

Return true if the widget exists, false otherwise.

### `winfo_fpixels(number)`

Return a floating-point value giving the number of pixels in the widget
corresponding to the screen distance *number* (for example,
`"2.0c"` or `"1i"`).
The result may be fractional; for a rounded integer value use
`winfo_pixels()`.

### `winfo_geometry()`

Return the geometry of the widget, in the form `widthxheight+x+y`.
All dimensions are in pixels.
The position is relative to the parent widget;
use `winfo_rootx()` and `winfo_rooty()`
for the position on the screen.
An offset can be negative; see `geometry()`.

### `winfo_height()`

Return the height of the widget in pixels.
When a window is first created its height is 1 pixel; it is eventually
changed by a geometry manager.
See also `winfo_reqheight()`.

### `winfo_id()`

Return a low-level platform-specific identifier for the widget.
On Unix this is the X window identifier, and on Windows it is the window
handle.

### `winfo_interps(displayof=0)`

Return a tuple of the names of all Tcl interpreters currently registered
for a particular display.
If *displayof* is given, the return value refers to the display of that
window; otherwise it refers to the display of the application's main
window.

### `winfo_ismapped()`

Return true if the widget is currently mapped, false otherwise.

### `winfo_manager()`

Return the name of the geometry manager currently responsible for the
widget, or an empty string if it is not managed by any geometry manager.

### `winfo_name()`

Return the widget's name within its parent, as opposed to its full path
name.

### `winfo_parent()`

Return the path name of the widget's parent, or an empty string if the
widget is the main window of the application.

### `winfo_pathname(id, displayof=0)`

Return the path name of the window whose identifier is *id*.
If *displayof* is given, the identifier is looked up on the display of
that window; otherwise it is looked up on the display of the
application's main window.

### `winfo_pixels(number)`

Return the number of pixels in the widget corresponding to the screen
distance *number* (for example, `"2.0c"` or `"1i"`).
The result is rounded to the nearest integer; for a fractional result use
`winfo_fpixels()`.

### `winfo_pointerx()`

Return the pointer's *x* coordinate, in pixels, relative to the screen's
root window (or virtual root, if one is in use).
Return `-1` if the pointer is not on the same screen as the widget.

### `winfo_pointerxy()`

Return the pointer's coordinates as an `(x, y)` tuple, in pixels,
relative to the screen's root window (or virtual root, if one is in use).
Both coordinates are `-1` if the pointer is not on the same screen as
the widget.

### `winfo_pointery()`

Return the pointer's *y* coordinate, in pixels, relative to the screen's
root window (or virtual root, if one is in use).
Return `-1` if the pointer is not on the same screen as the widget.

### `winfo_reqheight()`

Return the widget's requested height in pixels.
This is the value used by the widget's geometry manager to compute its
geometry.

### `winfo_reqwidth()`

Return the widget's requested width in pixels.
This is the value used by the widget's geometry manager to compute its
geometry.

### `winfo_rgb(color)`

Return an `(r, g, b)` tuple of the red, green, and blue intensities, in
the range 0 to 65535, that correspond to *color* in the widget.
*color* may be specified in any of the forms acceptable for a color
option.

### `winfo_rootx()`

Return the *x* coordinate, in the root window of the screen, of the
upper-left corner of the widget's border (or of the widget itself if it
has no border).

### `winfo_rooty()`

Return the *y* coordinate, in the root window of the screen, of the
upper-left corner of the widget's border (or of the widget itself if it
has no border).

### `winfo_screen()`

Return the name of the screen associated with the widget, in the form
`displayName.screenIndex`.

### `winfo_screencells()`

Return the number of cells in the default colormap for the widget's
screen.

### `winfo_screendepth()`

Return the depth of the root window of the widget's screen, that is, the
number of bits per pixel.

### `winfo_screenheight()`

Return the height of the widget's screen in pixels.

### `winfo_screenmmheight()`

Return the height of the widget's screen in millimeters.

### `winfo_screenmmwidth()`

Return the width of the widget's screen in millimeters.

### `winfo_screenvisual()`

Return the default visual class for the widget's screen, one of
`"directcolor"`, `"grayscale"`, `"pseudocolor"`, `"staticcolor"`,
`"staticgray"`, or `"truecolor"`.

### `winfo_screenwidth()`

Return the width of the widget's screen in pixels.

### `winfo_server()`

Return a string containing information about the server for the widget's
display.
The exact format of this string may vary from platform to platform.

### `winfo_toplevel()`

Return the top-of-hierarchy window containing the widget.
In standard Tk this is always a `Toplevel` widget.

### `winfo_viewable()`

Return true if the widget and all of its ancestors up through the
nearest toplevel window are mapped, false otherwise.

### `winfo_visual()`

Return the visual class for the widget, one of `"directcolor"`,
`"grayscale"`, `"pseudocolor"`, `"staticcolor"`, `"staticgray"`,
or `"truecolor"`.

### `winfo_visualid()`

Return the X identifier for the visual for the widget.

### `winfo_visualsavailable(includeids=False)`

Return a list describing the visuals available for the widget's screen.
Each item consists of a visual class (see `winfo_visual()`) followed
by an integer depth.
If *includeids* is true, the X identifier for the visual is also
included.

### `winfo_vrootheight()`

Return the height of the virtual root window associated with the widget
if there is one; otherwise return the height of the widget's screen.

### `winfo_vrootwidth()`

Return the width of the virtual root window associated with the widget if
there is one; otherwise return the width of the widget's screen.

### `winfo_vrootx()`

Return the *x* offset of the virtual root window associated with the
widget, relative to the root window of its screen.
This is normally zero or negative, and is `0` if there is no virtual
root window.

### `winfo_vrooty()`

Return the *y* offset of the virtual root window associated with the
widget, relative to the root window of its screen.
This is normally zero or negative, and is `0` if there is no virtual
root window.

### `winfo_width()`

Return the width of the widget in pixels.
When a window is first created its width is 1 pixel; it is eventually
changed by a geometry manager.
See also `winfo_reqwidth()`.

### `winfo_x()`

Return the *x* coordinate, in the widget's parent, of the upper-left
corner of the widget's border (or of the widget itself if it has no
border).

### `winfo_y()`

Return the *y* coordinate, in the widget's parent, of the upper-left
corner of the widget's border (or of the widget itself if it has no
border).

### `info_patchlevel()`

Return the Tcl/Tk patch level as a named tuple with the same five fields
as `sys.version_info`: *major*, *minor*, *micro*, *releaselevel*
and *serial*.
*releaselevel* is `'alpha'`, `'beta'` or `'final'`.
Converting it to a string gives the version in the usual Tcl/Tk notation,
for example `'9.0.3'` for a final release or `'9.1b2'` for a
pre-release.

> *Added in version 3.11.*

### class `Wm()`

The `Wm` mixin provides access to the window manager, allowing an
application to control such things as the title, geometry and icon of a
top-level window, the way it is resized, and how it responds to window
manager protocols.
It is mixed into `Tk` and `Toplevel`, so its methods are
available on every top-level window.
Each method has two equivalent spellings: a short name and a
`wm_`-prefixed name (for example, `title()` and `wm_title()`).
See also tkinter-window-manager.

### `aspect(minNumer=None, minDenom=None, maxNumer=None, maxDenom=None)`

Constrain the aspect ratio (the ratio of width to height) of the window.
If all four arguments are given, the window manager keeps the ratio
between `minNumer/minDenom` and `maxNumer/maxDenom`; passing empty
strings removes any existing restriction.
With no arguments, return a tuple of the four current values, or `None`
if no aspect restriction is in effect.
`wm_aspect()` is an alias of `aspect()`.
