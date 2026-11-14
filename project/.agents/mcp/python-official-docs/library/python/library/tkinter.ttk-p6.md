---
title: "tkinter.ttk --- Tk themed widgets (part 6 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.ttk.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter.ttk --- Tk themed widgets (part 6 of 6)

## Additional widgets

The following themed widgets complete the `tkinter.ttk` widget set.
Each is the themed counterpart of the like-named classic `tkinter` widget
and inherits the common methods of `Widget`.

### class `Button(master=None, **kw)`

Ttk `Button` widget, displays a textual label and/or image, and
evaluates a command when pressed.
It is the themed counterpart of `tkinter.Button` and inherits the
common widget methods from `Widget`.

### `invoke()`

Invoke the command associated with the button and return its result.

### class `Checkbutton(master=None, **kw)`

Ttk `Checkbutton` widget, used to control a boolean variable that is
toggled on and off.
It is the themed counterpart of `tkinter.Checkbutton` and inherits
the common widget methods from `Widget`.

### `invoke()`

Toggle the button between its selected and deselected states, invoke the
command associated with the button, and return its result.

### class `Entry(master=None, widget=None, **kw)`

Ttk `Entry` widget, displays a one-line text string and allows the
user to edit it.
It is the themed counterpart of `tkinter.Entry` and inherits the
common widget methods from `Widget` as well as the editing methods
from `tkinter.Entry`.

### `bbox(index)`

Return a tuple `(x, y, width, height)` giving the bounding box of the
character at the given *index*.

This shadows the inherited `Misc.bbox()`;
use `grid_bbox()` for the grid bounding box.

### `identify(x, y)`

Return the name of the element under the point given by *x* and *y*, or
the empty string if no element is present at that location.

### `validate()`

Force validation of the entry and return `True` if validation
succeeded, and `False` otherwise.

### class `Frame(master=None, **kw)`

Ttk `Frame` widget, a container used to group and lay out other
widgets.
It is the themed counterpart of `tkinter.Frame` and inherits the
common widget methods from `Widget`.

### class `Label(master=None, **kw)`

Ttk `Label` widget, displays a textual label and/or image.
It is the themed counterpart of `tkinter.Label` and inherits the
common widget methods from `Widget`.

### class `Labelframe(master=None, **kw)`

Ttk `Labelframe` widget, a container that draws a border and a title
label around its contents.
It is the themed counterpart of `tkinter.LabelFrame` and inherits the
common widget methods from `Widget`.

### class `Menubutton(master=None, **kw)`

Ttk `Menubutton` widget, displays a textual label and/or image, and
pops up a menu when pressed.
It is the themed counterpart of `tkinter.Menubutton` and inherits the
common widget methods from `Widget`.

### class `OptionMenu(master, variable, default=None, *values, **kwargs)`

Ttk `OptionMenu` widget, a `Menubutton` that pops up a menu of
mutually exclusive choices.
*variable* is the variable that tracks the currently selected value,
*default* is the value to set initially, and *values* are the entries to
display in the menu.
A *command* keyword argument may be given to specify a callable that is
invoked with the selected value whenever the selection changes; the *style*
keyword argument sets the style used by the underlying menubutton; the
*direction* keyword argument sets where the menu is posted relative to the
menubutton (one of `'above'`, `'below'` (the default), `'left'`,
`'right'` or `'flush'`); and the *name* keyword argument sets the Tk
widget name.

### `set_menu(default=None, *values)`

Replace the entries of the menu with *values*.
If *default* is given, also set it as the current value of the
*variable*.

### `destroy()`

Destroy this widget and its associated menu.

> *Changed in version 3.14.*
> Added support for the *name* keyword argument.

### class `Panedwindow(master=None, **kw)`

Ttk `Panedwindow` widget, displays a number of subwindows stacked
either vertically or horizontally.
The user may adjust the relative sizes of the subwindows by dragging the
sash between panes.
It is the themed counterpart of `tkinter.PanedWindow` and inherits
the common widget methods from `Widget`, as well as the `add()`
and `panes()` methods from `tkinter.PanedWindow`.

### `insert(pos, child, **kw)`

Insert a pane containing *child* at the position *pos*.
*pos* is either the string `'end'`, an integer index, or the name of a
managed subwindow.
If *child* is already managed by the paned window, move it to the
specified position.
Any keyword arguments set pane options.

### `forget(child)`

Remove *child*, which may be either an integer index or the name of a
managed subwindow, from the panes.

This shadows the inherited geometry-manager `forget()`;
use `pack_forget()`, `grid_forget()`
or `place_forget()` to remove the widget itself from
its manager.

### `pane(pane, option=None, **kw)`

Query or modify the options of the specified *pane*, where *pane* is
either an integer index or the name of a managed subwindow.
If no arguments are given, return a dictionary of the pane option values.
If *option* is specified, return the value of that option.
Otherwise, set the options given as keyword arguments to their
corresponding values.

### `sashpos(index, newpos=None)`

If *newpos* is specified, set the position of sash number *index* and
return its new position.
This may adjust the positions of adjacent sashes to ensure that positions
are monotonically increasing; positions are also constrained to be
between 0 and the total size of the widget.
If *newpos* is omitted, return the current position of the sash.

### class `Radiobutton(master=None, **kw)`

Ttk `Radiobutton` widget, used as part of a group to control a single
shared variable by selecting one of several mutually exclusive values.
It is the themed counterpart of `tkinter.Radiobutton` and inherits
the common widget methods from `Widget`.

### `invoke()`

Set the option variable to the button's value, select the button, invoke
the command associated with the button, and return its result.

### class `Scale(master=None, **kw)`

Ttk `Scale` widget, displays a slider that lets the user select a
numeric value from a range by moving the slider along a trough.
It is the themed counterpart of `tkinter.Scale` and inherits the
common widget methods from `Widget`.

### `configure(cnf=None, **kw)`

Modify or query the widget options, like
`Widget.configure()`.
In addition, this method clips the `from` and `to` values so that the
current value stays within the range defined by them.

> *Changed in version 3.9.*
> Now returns the configuration value, like
> `Widget.configure()`.

### `get(x=None, y=None)`

Return the current value of the scale.
If *x* and *y* are given, return the value corresponding to the pixel
coordinate *x*, *y* instead.

### class `Scrollbar(master=None, **kw)`

Ttk `Scrollbar` widget, controls the viewport of an associated
scrollable widget such as a `Treeview`, `Entry` or
`tkinter.Text`.
It is the themed counterpart of `tkinter.Scrollbar` and inherits the
common widget methods from `Widget`, as well as the `set()` and
`get()` methods from `tkinter.Scrollbar`.

### class `Separator(master=None, **kw)`

Ttk `Separator` widget, displays a horizontal or vertical separator
line.
It has no direct counterpart in `tkinter` and inherits the common
widget methods from `Widget`.

### class `Sizegrip(master=None, **kw)`

Ttk `Sizegrip` widget, displays a grip that allows the user to resize
the containing toplevel window by pressing and dragging the grip, typically
placed in the bottom-right corner.
It has no direct counterpart in `tkinter` and inherits the common
widget methods from `Widget`.

### class `LabeledScale(master=None, variable=None, from_=0, to=10, **kw)`

A `Frame` containing a `Scale` and a `Label` that shows
the scale's current value.
*variable* is the `IntVar` tracked by the scale (one is
created if it is not given), and *from_* and *to* define the range of the
scale.

### `destroy()`

Destroy this widget and remove the trace callback registered on the
associated variable.

### class `LabelFrame(master=None, **kw)`

Alias of `Labelframe`, kept for naming compatibility with
`tkinter.LabelFrame`.

### class `PanedWindow(master=None, **kw)`

Alias of `Panedwindow`, kept for naming compatibility with
`tkinter.PanedWindow`.
