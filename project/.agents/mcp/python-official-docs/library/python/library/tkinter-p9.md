---
title: "tkinter --- Python interface to Tcl/Tk (part 9 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 9 of 17)

### `transient(master=None)`

Mark the window as a transient window (such as a pull-down menu or
dialog) working on behalf of *master*, the path name of another top-level
window.
An empty string clears the transient status.
With no argument, return the path name of the current master, or an empty
string.
A transient window mirrors state changes in its master and may be
decorated differently by the window manager; it is an error to make a
window a transient of itself.
`wm_transient()` is an alias of `transient()`.

### `withdraw()`

Withdraw the window from the screen, unmapping it and causing the window
manager to forget about it.
If the window has never been mapped, it is instead mapped in the
withdrawn state.
It is sometimes necessary to withdraw a window and then re-map it (for
example with `deiconify()`) to make some window managers notice
changes to window attributes.
`wm_withdraw()` is an alias of `withdraw()`.

### class `Pack()`

Geometry manager that arranges widgets by packing them against the sides of
their container.
The `Pack` mix-in is inherited by all widgets (through
`Widget`) and provides the methods for managing a widget with the
*pack* geometry manager.
See also tkinter-geometry-management.

> **Note:** `Pack`, `Place` and `Grid` all define the short
> method names `forget()`, `info()`, `slaves()`,
> `content()` and `propagate()`.
> On a widget the bare names resolve to the *pack* manager's versions,
> since `Pack` and `Misc` precede `Place` and
> `Grid` in the method resolution order,
> whatever manager actually manages the widget;
> and `configure()`/`config()` configure the widget's options,
> not its geometry.
> Use the explicit `pack_*`, `grid_*` and `place_*` methods
> (and `pack`, `grid`, `place` for geometry configuration)
> to act on a specific geometry manager.

### `pack_configure(cnf={}, **kw)`

```python
pack(cnf={}, **kw)
```

Pack the widget inside its container, positioning it relative to the
siblings already packed there.
The supported options are:

*side*
Which side of the container to pack the widget against: `'top'` (the
default), `'bottom'`, `'left'` or `'right'`.

*fill*
Whether to stretch the widget to fill its parcel: `'none'` (the
default), `'x'`, `'y'` or `'both'`.

*expand*
Whether the widget should expand to consume any extra space in its
container (a boolean, default false).

*anchor*
Where to position the widget in its parcel when the parcel is larger
than the widget: an anchor such as `'n'` or `'sw'` (default
`'center'`).

*ipadx*, *ipady*
Internal padding added on the left and right (*ipadx*) or top and
bottom (*ipady*) of the widget, as a screen distance (default `0`).

*padx*, *pady*
External padding left on the left and right (*padx*) or top and bottom
(*pady*) of the widget, as a screen distance or a pair of two
distances for the two sides (default `0`).

*after*
Pack the widget after the given widget in the packing order, using the
same container.

*before*
Pack the widget before the given widget in the packing order, using
the same container.

*in_*
The container in which to pack the widget; it defaults to the parent
widget.

`pack()`, `configure()` and `config()` are aliases of
`pack_configure()`.

### `pack_forget()`

Unmap the widget and remove it from the packing order, forgetting its
packing options.
It can be packed again later with `pack_configure()`.
`forget()` is an alias of `pack_forget()`,
except on `PanedWindow`,
`ttk.Notebook` and
`ttk.PanedWindow`,
which provide their own `forget()` method.

Not to be confused with `Wm.forget()`.

### `pack_info()`

Return a dictionary of the widget's current packing options.
`info()` is an alias of `pack_info()`.

### `propagate()`

```python
propagate(flag)
```

### `pack_propagate()`

```python
pack_propagate(flag)
```

Same as `Misc.pack_propagate()`, treating this widget as a container:
enable or disable geometry propagation.
`propagate()` is an alias of `pack_propagate()`.

### `pack_slaves()`

Same as `Misc.pack_slaves()`: return the list of widgets packed in
this widget.
`slaves()` is an alias of `pack_slaves()`.

### `pack_content()`

Same as `Misc.pack_content()`.
`content()` is an alias of `pack_content()`.

> *Added in version 3.15.*

### class `Place()`

Geometry manager that places widgets at explicit positions and sizes within
their container.
The `Place` mix-in is inherited by all widgets (through
`Widget`).
See also tkinter-geometry-management.

### `place_configure(cnf={}, **kw)`

```python
place(cnf={}, **kw)
```

Place the widget inside its container at an absolute or relative
position.
The supported options are:

*x*, *y*
The absolute horizontal and vertical position of the widget's anchor
point, as a screen distance (default `0`).

*relx*, *rely*
The horizontal and vertical position of the widget's anchor point as a
fraction of the container's width and height, where `0.0` is the
left or top edge and `1.0` is the right or bottom edge.
If both the absolute and the relative option are given, their values
are summed.

*anchor*
Which point of the widget is placed at the given position: an anchor
such as `'n'` or `'se'` (default `'nw'`).

*width*, *height*
The absolute width and height of the widget, as a screen distance.
By default the widget's requested size is used.

*relwidth*, *relheight*
The width and height of the widget as a fraction of the container's
width and height.
If both the absolute and the relative option are given, their values
are summed.

*bordermode*
How the container's border affects placement: `'inside'` (the
default) measures the area inside the border, `'outside'` measures
the area including the border, and `'ignore'` uses the official X
area.

*in_*
The container relative to which the widget is placed; it must be the
widget's parent or a descendant of the parent, and defaults to the
parent.

`place()`, `configure()` and `config()` are aliases of
`place_configure()`.

### `place_forget()`

Unmap the widget and remove it from the placement, forgetting its place
options.

### `place_info()`

Return a dictionary of the widget's current place options.

### `place_slaves()`

Same as `Misc.place_slaves()`: return the list of widgets placed in
this widget.

### `place_content()`

Same as `Misc.place_content()`.

> *Added in version 3.15.*

### class `Grid()`

Geometry manager that arranges widgets in a two-dimensional grid of rows and
columns within their container.
The `Grid` mix-in is inherited by all widgets (through
`Widget`).
See also tkinter-geometry-management.

### `grid_configure(cnf={}, **kw)`

```python
grid(cnf={}, **kw)
```

Position the widget in a cell of its container's grid.

Not to be confused with `Wm.grid()`.

The supported options are:

*row*, *column*
The row and column of the cell to place the widget in, counting from
`0`.
*column* defaults to the column after the previous widget placed in
the same `grid_configure()` call (or `0`), and *row* defaults
to the next empty row.

*rowspan*, *columnspan*
The number of rows and columns the widget should span (default `1`).

*sticky*
How to position or stretch the widget when its cell is larger than the
widget: a string containing zero or more of the characters `'n'`,
`'s'`, `'e'` and `'w'`, naming the cell sides the widget sticks
to.
Specifying both `'n'` and `'s'` (or `'e'` and `'w'`) stretches
the widget to fill the height (or width) of the cell.
The default is `''`, which centers the widget at its requested size.

*ipadx*, *ipady*
Internal padding added on the left and right (*ipadx*) or top and
bottom (*ipady*) of the widget, as a screen distance (default `0`).

*padx*, *pady*
External padding left on the left and right (*padx*) or top and bottom
(*pady*) of the widget, as a screen distance or a pair of two
distances for the two sides (default `0`).

*in_*
The container in whose grid to place the widget; it defaults to the
parent widget.

`grid()`, `configure()` and `config()` are aliases of
`grid_configure()`.

### `grid_forget()`

Unmap the widget and remove it from the grid, forgetting its grid
options.

### `grid_remove()`

Unmap the widget and remove it from the grid, but remember its grid
options so that it is restored to the same cell if it is gridded again.

### `grid_info()`

Return a dictionary of the widget's current grid options.

### `grid_bbox(column=None, row=None, col2=None, row2=None)`

Same as `Misc.grid_bbox()`.
`bbox()` is an alias of `grid_bbox()`,
except on `Canvas`, `Listbox`, `Spinbox`,
`Text`, `ttk.Entry` and
`ttk.Treeview`,
which provide their own `bbox()` method.

### `grid_columnconfigure(index, cnf={}, **kw)`

Same as `Misc.grid_columnconfigure()`: query or set the options (such
as *weight*, *minsize*, *pad* and *uniform*) of a grid column.
`columnconfigure()` is an alias of `grid_columnconfigure()`.

### `grid_rowconfigure(index, cnf={}, **kw)`

Same as `Misc.grid_rowconfigure()`: query or set the options of a
grid row.
`rowconfigure()` is an alias of `grid_rowconfigure()`.

### `grid_location(x, y)`

Same as `Misc.grid_location()`: return the `(column, row)` of the
cell that covers the pixel at *x*, *y*.
`location()` is an alias of `grid_location()`.

### `grid_size()`

Same as `Misc.grid_size()`: return a `(columns, rows)` tuple giving
the size of the grid.
`size()` is an alias of `grid_size()`,
except on the `Listbox` widget,
which provides its own `size()` method.

### `propagate()`

```python
propagate(flag)
```

### `grid_propagate()`

```python
grid_propagate(flag)
```

Same as `Misc.grid_propagate()`.

### `grid_slaves(row=None, column=None)`

Same as `Misc.grid_slaves()`: return the widgets managed in the grid,
optionally restricted to a *row* and/or *column*.

### `grid_content(row=None, column=None)`

Same as `Misc.grid_content()`.

> *Added in version 3.15.*

### class `XView()`

Mix-in providing the horizontal-scrolling interface shared by widgets such
as `Entry`, `Canvas`, `Listbox`, `Text` and
`Spinbox`.
A widget's `xview()` method is registered as the *command* of a
horizontal `Scrollbar`.

### `xview(*args)`

Query or change the horizontal position of the view.
With no arguments, return a tuple `(first, last)` of two fractions
between 0 and 1 giving the portion of the document that is currently
visible.
Otherwise the arguments are passed to the Tk `xview` widget command and
are usually generated by a scrollbar; `xview_moveto()` and
`xview_scroll()` provide a more convenient interface.

### `xview_moveto(fraction)`

Adjust the view so that *fraction* of the total width of the document is
off-screen to the left.
*fraction* is a number between 0 and 1.

### `xview_scroll(number, what)`

Shift the view left or right by *number* units.
*what* is either `'units'` or `'pages'`; a negative *number* scrolls
left and a positive one scrolls right.
The `Text` widget accepts also `'pixels'`,
and then *number* can be a screen distance, such as `'1i'`.

### class `YView()`

Mix-in providing the vertical-scrolling interface shared by widgets such as
`Canvas`, `Listbox` and `Text`.
A widget's `yview()` method is registered as the *command* of a vertical
`Scrollbar`.

### `yview(*args)`

Query or change the vertical position of the view.
With no arguments, return a tuple `(first, last)` of two fractions
between 0 and 1 giving the portion of the document that is currently
visible.
Otherwise the arguments are passed to the Tk `yview` widget command,
usually generated by a scrollbar; `yview_moveto()` and
`yview_scroll()` provide a more convenient interface.

### `yview_moveto(fraction)`

Adjust the view so that *fraction* of the total height of the document is
off-screen above the top.
*fraction* is a number between 0 and 1.

### `yview_scroll(number, what)`

Shift the view up or down by *number* units.
*what* is either `'units'` or `'pages'`; a negative *number* scrolls
up and a positive one scrolls down.
The `Text` widget accepts also `'pixels'`,
and then *number* can be a screen distance, such as `'1i'`.

### class `BaseWidget(master, widgetName, cnf={}, kw={}, extra=())`

Internal base class for all widgets.
It inherits from `Misc` and adds the machinery that creates the
underlying Tk widget; application code normally uses `Widget` or a
concrete widget class rather than instantiating `BaseWidget`
directly.

### `destroy()`

Destroy this widget and all of its children, removing the corresponding
Tk widgets and deleting the associated Tcl commands.

### class `Widget(master, widgetName, cnf={}, kw={}, extra=())`

Internal base class for the standard widgets.
It combines `BaseWidget` with the geometry-manager mix-ins
`Pack`, `Place` and `Grid`, so that every widget can be
managed by any of the three geometry managers.
The concrete widget classes (`Button`, `Label`, and so on)
derive from `Widget`.

### class `Tk(screenName=None, baseName=None, className='Tk', useTk=True, sync=False, use=None)`

Construct a toplevel Tk widget, which is usually the main window of an
application, and initialize a Tcl interpreter for this widget.  Each
instance has its own associated Tcl interpreter.
Inherits from `Misc` and `Wm`.

To create a Tcl interpreter without initializing the Tk subsystem, use the
`Tcl()` factory function instead.

The `Tk` class is typically instantiated using all default values.
However, the following keyword arguments are currently recognized:

*screenName*
When given (as a string), sets the `DISPLAY` environment
variable. (X11 only)
*baseName*
Name of the profile file.  By default, *baseName* is derived from the
program name (`sys.argv[0]`).
*className*
Name of the widget class.  Used as a profile file and also as the name
with which Tcl is invoked (*argv0* in *interp*).
*useTk*
If `True`, initialize the Tk subsystem.  The `tkinter.Tcl()`
function sets this to `False`.
*sync*
If `True`, execute all X server commands synchronously, so that errors
are reported immediately.  Can be used for debugging. (X11 only)
*use*
Specifies the *id* of the window in which to embed the application,
instead of it being created as an independent toplevel window. *id* must
be specified in the same way as the value for the -use option for
toplevel widgets (that is, it has a form like that returned by
`winfo_id()`).

Note that on some platforms this will only work correctly if *id* refers
to a Tk frame or toplevel that has its -container option enabled.

`Tk` reads and interprets profile files, named
`.{className}.tcl` and `.{baseName}.tcl`, into the Tcl
interpreter and calls `exec()` on the contents of
`.{className}.py` and `.{baseName}.py`.  The path for the
profile files is the `HOME` environment variable or, if that
isn't defined, then `os.curdir`.

> **Note:** On Windows, creating a Tcl interpreter (by instantiating `Tk` or
> calling `Tcl()`) sets the `HOME` environment variable for
> the process, if it is not already set, to `%HOMEDRIVE%%HOMEPATH%` (or
> `USERPROFILE`, or `c:\`).  This is done by Tcl and can affect
> other code that reads `HOME`.
