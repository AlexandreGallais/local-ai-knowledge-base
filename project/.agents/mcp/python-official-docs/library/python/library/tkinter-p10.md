---
title: "tkinter --- Python interface to Tcl/Tk (part 10 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 10 of 17)

### `tk`

The Tk application object created by instantiating `Tk`.  This
provides access to the Tcl interpreter.  Each widget that is attached
the same instance of `Tk` has the same value for its `tk`
attribute.

### `master`

The widget object that contains this widget.
For `Tk`, the `master` is `None` because it is the
main window.
The terms *master* and *parent* are similar and sometimes used
interchangeably as argument names; however, calling
`winfo_parent()` returns a string of the widget name whereas
`master` returns the object.
*parent*/*child* reflects the tree-like relationship while *master* (or
*container*)/*content* reflects the container structure.

### `children`

The immediate descendants of this widget as a `dict` with the
child widget names as the keys and the child instance objects as the
values.

### `destroy()`

Destroy this and all descendant widgets and, for the main window, end the
connection to the underlying Tcl interpreter.

### `loadtk()`

Finish loading and initializing the Tk subsystem.
This is needed only when the interpreter was created without Tk (for
example through `Tcl()`); it is called automatically when *useTk* is
true.

### `readprofile(baseName, className)`

Read and source the user's profile files `.{className}.tcl` and
`.{baseName}.tcl` into the Tcl interpreter, and execute the
corresponding `.{className}.py` and `.{baseName}.py` files.
This is called during initialization; see the description of the
constructor above.

### `report_callback_exception(exc, val, tb)`

Report a callback exception.
This is called when an exception propagates out of a Tkinter callback;
*exc*, *val* and *tb* are the exception type, value and traceback as
returned by `sys.exc_info()`.
The default implementation prints a traceback to `sys.stderr`.
It can be overridden to customize error handling, for example to display
the traceback in a dialog.

### class `Toplevel(master=None, cnf={}, **kw)`

A `Toplevel` widget is a top-level window, similar to a
`Frame` except that its X parent is the root window of a screen
rather than its logical parent.
Its primary purpose is to serve as a container for dialog boxes and other
collections of widgets; its only visible features are its background and an
optional 3-D border.
Notable options include *menu*, which installs a `Menu` as the
window's menubar.
Inherits from `BaseWidget` and `Wm`, so a toplevel is managed
by the window manager.
Refer to the Tk `toplevel` manual page for the full list of options.

### class `Button(master=None, cnf={}, **kw)`

A `Button` widget displays a textual string, bitmap or image and
invokes a command when the user presses it (by clicking mouse button 1 over
the button or, when the button has focus, by pressing the space key).
Inherits from `Widget`.
In addition to the standard widget options, a button accepts the options
documented in the Tk `button` manual page, such as *command* (the callback
invoked when the button is pressed), *textvariable*, *state* and *default*.

### `invoke()`

Invoke the command associated with the button, if there is one, and
return its result, or an empty string if no command is associated with
the button.
This is ignored if the button's state is `disabled`.

### `flash()`

Flash the button by redisplaying it several times, alternating between
the active and normal colors.
At the end of the flash the button is left in the same normal or active
state as when the method was called.
This is ignored if the button's state is `disabled`.

### class `Canvas(master=None, cnf={}, **kw)`

A `Canvas` widget implements structured graphics.
It displays any number of *items*, such as arcs, lines, ovals, polygons,
rectangles, text, bitmaps, images and embedded windows, which may be drawn,
moved, re-colored and bound to events.
Inherits from `Widget`, `XView` and `YView`, so the
view can be scrolled horizontally and vertically with `xview()`
and `yview()`.
Refer to the Tk `canvas` manual page for the full list of widget and item
options.

Each item has a unique integer *id*, assigned when it is created, and zero
or more string *tags*.
A tag is an arbitrary string that does not have the form of an integer; the
same tag may be shared by many items, which makes tags convenient for
grouping items.
The special tag `'all'` matches every item in the canvas, and
`'current'` matches the topmost item under the mouse pointer.
Most methods take a *tagOrId* argument that may be an integer id naming a
single item, or a tag naming zero or more items; as described in the Tk
`canvas` manual page, a tag may also be a logical expression of tags
combined with the operators `&&`, `||`, `^`, `!` and parentheses.
When a method that operates on a single item is given a *tagOrId* matching
several items, it normally uses the lowest matching item in the display
list.

The items are kept in a *display list* that determines drawing order: items
later in the list are drawn on top of earlier ones.
A newly created item is placed at the top of the list; the order can be
changed with `tag_raise()` and `tag_lower()`.

### `create_arc(*args, **kw)`

```python
create_bitmap(*args, **kw)
create_image(*args, **kw)
create_line(*args, **kw)
create_oval(*args, **kw)
create_polygon(*args, **kw)
create_rectangle(*args, **kw)
create_text(*args, **kw)
create_window(*args, **kw)
```

Create a new item of the corresponding type and return its integer id.
Each method is called as `create_TYPE(coord..., **options)`: the
leading positional arguments give the coordinates that define the item
(as separate numbers, as a single sequence of numbers, or as coordinate
pairs), and the keyword arguments set item-specific options.
Coordinates and screen distances may be given as numbers (interpreted as
pixels) or as strings with a unit suffix (`'m'`, `'c'`, `'i'` or
`'p'` for millimetres, centimetres, inches or printer's points), but
are always stored and returned in pixels.

The item types are: `arc` (an arc-shaped region that is a section of an
oval, defined by two diagonally opposite corners `x1, y1, x2, y2` of
the enclosing rectangle); `bitmap` (a two-color bitmap positioned at a
point `x, y`); `image` (a Tk image positioned at a point `x, y`);
`line` (a line or curve through the points `x1, y1, ..., xn, yn`);
`oval` (a circle or ellipse inscribed in the rectangle
`x1, y1, x2, y2`); `polygon` (a closed polygon through the points
`x1, y1, ..., xn, yn`); `rectangle` (a rectangle with corners
`x1, y1, x2, y2`); `text` (a string of text positioned at a point
`x, y`); and `window` (a child widget embedded in the canvas at a
point `x, y`, specified with the *window* option).

Most item types accept a common set of *standard item options*, plus a
few options specific to each type.
Option names are passed as keyword arguments, without the leading
hyphen.

The standard item options are:

*fill*
The color used to fill the item's interior, or to draw a *line*
item or the characters of a *text* item.
An empty string (the default for all types except *line* and *text*)
leaves the item unfilled.

*outline*
The color used to draw the item's outline.
An empty string draws no outline.

*width*
The width of the outline, defaulting to `1.0`.
Has no effect if *outline* is empty.

*dash*
A dash pattern for the outline, given either as a sequence of
segment lengths in pixels or as a string of the characters
`'.'`, `','`, `'-'`, `'_'` and space.
An empty pattern (the default) draws a solid outline.

*dashoffset*
The starting offset in pixels into the *dash* pattern.
Ignored if there is no *dash* pattern.

*stipple*
A bitmap used as a stipple pattern when filling the item.
Only well supported on X11.

*outlinestipple*
A bitmap used as a stipple pattern when drawing the outline.
Has no effect if *outline* is empty.

*offset*, *outlineoffset*
The offset of the fill and outline stipple patterns, given as
`'x,y'` or as a side such as `'n'`, `'se'` or `'center'`.
Stipple offsets are only supported on X11.

*state*
Overrides the canvas state for this item; one of `'normal'`,
`'disabled'` or `'hidden'`.

*tags*
A single tag or a sequence of tags to associate with the item,
replacing any existing tags.

Many of these options have *active...* and *disabled...* variants
(such as *activefill*, *disabledfill*, *activewidth*, *disableddash*,
*activeoutline*, *disabledstipple*) that override the base option when
the item is the active item (under the mouse pointer) or is in the
disabled state.

The following item types support additional options.

For `arc` items:

*start*
The start of the arc's angular range, in degrees measured
counter-clockwise from the 3-o'clock position.

*extent*
The size of the angular range, in degrees counter-clockwise from
*start*.

*style*
How the arc is drawn: `'pieslice'` (the default), `'chord'` or
`'arc'`.

For `line` items:

*arrow*
Where to draw arrowheads: `'none'` (the default), `'first'`,
`'last'` or `'both'`.

*arrowshape*
A sequence of three distances describing the shape of the
arrowheads.

*capstyle*
How line ends are drawn: `'butt'` (the default), `'projecting'`
or `'round'`.

*joinstyle*
How line vertices are drawn: `'round'` (the default), `'bevel'`
or `'miter'`.

*smooth*
The smoothing method: a false value (the default) for no smoothing,
or `'true'`/`'bezier'` or `'raw'` to draw the line as a curve.

*splinesteps*
The number of line segments approximating each spline when
*smooth* is enabled.

For `polygon` items:

*joinstyle*, *smooth*, *splinesteps*
As for `line` items, applied to the polygon's outline.

For `text` items:

*text*
The string to display; newline characters start new lines.

*font*
The font used for the text.

*justify*
How lines are justified: `'left'` (the default), `'right'` or
`'center'`.

*anchor*
How the text is positioned relative to its point, defaulting to
`'center'`.

*width*
The maximum line length; if non-zero, lines are wrapped at spaces.

*angle*
How many degrees to rotate the text counter-clockwise about its
positioning point, from `0.0` to `360.0` (default `0.0`).

*underline*
The index of a character to underline, or `-1` for none.

For `bitmap` items:

*bitmap*
The bitmap to display.

*anchor*
How the bitmap is positioned relative to its point.

*background*, *foreground*
The colors used for the bitmap's `0` and `1` pixels; an empty
*background* makes the `0` pixels transparent.
Both have *active...* and *disabled...* variants, and *bitmap* has
*activebitmap* and *disabledbitmap* variants.

For `image` items:

*image*
The Tk image to display, previously created with the image
protocols.

*anchor*
How the image is positioned relative to its point.

Both options have *active...* and *disabled...* variants
(*activeimage*, *disabledimage*) used in the active and disabled
states.

For `window` items:

*window*
The widget to embed; it must be a child of the canvas or of one of
its ancestors, and may not be a top-level window.

*anchor*
How the window is positioned relative to its point.

*width*, *height*
The size to assign to the window; if zero (the default), the window
is given its requested size.

`oval` and `rectangle` items have no type-specific options; they
use only the standard item options.

> **Note:** Tk 8.6 added the *angle* option for `text` items.

### `coords(tagOrId)`

```python
coords(tagOrId, coordList, /)
coords(tagOrId, /, *coordList)
```

Query or modify the coordinates of an item.
With only *tagOrId*, return a list of the floating-point coordinates of
the item given by *tagOrId* (the first matching item if it matches
several).
Given new coordinates, replace the coordinates of that item with them;
like the `create_*` methods, the coordinates may be given as separate
numbers, as a single sequence, or as coordinate pairs.
The returned coordinates are always in pixels, regardless of the units
used to specify them; for rectangles, ovals and arcs they are ordered
left, top, right, bottom.

> *Changed in version 3.12.*
> The arguments are now flattened: the coordinates may be given as
> separate arguments, as a single sequence, or grouped in pairs, like
> the `create_*` methods.

### `move(tagOrId, xAmount, yAmount, /)`

Move each of the items given by *tagOrId* in the canvas coordinate space
by adding *xAmount* to every x-coordinate and *yAmount* to every
y-coordinate of the item.

### `moveto(tagOrId, x='', y='')`

Move the items given by *tagOrId* so that the first coordinate pair (the
upper-left corner of the bounding box) of the lowest matching item is at
position (*x*, *y*).
*x* or *y* may be an empty string, in which case the corresponding
coordinate is unchanged.
All matching items keep their positions relative to each other.

> *Added in version 3.8.*

### `scale(tagOrId, xOrigin, yOrigin, xScale, yScale, /)`

Rescale the coordinates of all items given by *tagOrId* in canvas
coordinate space.
Each x-coordinate is adjusted so that its distance from *xOrigin* changes
by a factor of *xScale*, and each y-coordinate so that its distance from
*yOrigin* changes by a factor of *yScale* (a factor of `1.0` leaves the
coordinate unchanged).

### `delete(*tagOrIds)`

Delete each of the items given by the *tagOrIds* arguments.

### `dchars(tagOrId, first, /)`

```python
dchars(tagOrId, first, last, /)
```

Delete from each of the items given by *tagOrId* the characters (for text
items) or coordinates (for line and polygon items) in the range from
*first* to *last* inclusive; *last* defaults to *first*.
Items that do not support indexing ignore this operation.

### `insert(tagOrId, beforeThis, string, /)`

Insert *string* into each of the items given by *tagOrId* just before the
character or coordinate whose index is *beforeThis*.
For line and polygon items *string* must be a valid sequence of
coordinates.

### `itemcget(tagOrId, option)`

Return the current value of the configuration option *option* for the
item given by *tagOrId* (the lowest matching item if it matches several).
This is like `cget()` but applies to an individual item.

### `itemconfigure(tagOrId, cnf=None, **kw)`

Query or modify the configuration options of the items given by
*tagOrId*.
This mirrors `configure()`, except that it applies to
individual items rather than to the canvas as a whole.
With no options, it returns a dictionary describing the current options
of the first matching item; otherwise it sets the given options on every
matching item.
The legal options are those accepted by the corresponding `create_*`
method.
`itemconfig()` is an alias of `itemconfigure()`.

### `type(tagOrId)`

Return the type of the item given by *tagOrId* (the first matching item
if it matches several), such as `'rectangle'` or `'text'`, or
`None` if *tagOrId* does not match any item.

### `gettags(tagOrId, /)`

Return a tuple of the tags associated with the item given by *tagOrId*
(the first matching item in display-list order if it matches several).
Return an empty tuple if no item matches or the item has no tags.
