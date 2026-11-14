---
title: "tkinter --- Python interface to Tcl/Tk (part 5 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 5 of 17)

## Reference

This section documents the classes, methods, functions and constants of the
`tkinter` module.
Most of them wrap Tcl/Tk commands; consult the official Tcl/Tk manual pages for
the full list of widget options and further details.

### exception `TclError`

The exception raised when a call into the Tcl interpreter fails, for example
when a widget is given an unknown option or an invalid value.

### class `Misc()`

The `Misc` class is a mix-in inherited by `Tk` and, through
`BaseWidget`, by every widget.
It provides the large set of methods common to all Tk objects: querying
window information, managing event bindings and the event loop, controlling
the keyboard focus and pointer grabs, accessing the selection, clipboard and
option database, and assorted utility and introspection services.
Because they are inherited, these methods are available on every widget and
on the `Tk` application object, and are documented here once rather
than repeated for each widget.

### `cget(key)`

Return the current value of the configuration option named *key* for this
widget, as a string.
The expression `widget[key]` is equivalent and may be used instead.

### `configure(cnf=None, **kw)`

Query or modify the configuration options of the widget.
With no arguments, return a dictionary mapping every available option
name to a tuple describing it (its name, X resource name, X resource
class, default value and current value).
If a single option name is given as a string, return the tuple for just
that option.
If one or more keyword arguments are given, or a dictionary is passed as
*cnf*, set each named option to the corresponding value; the expression
`widget[key] = value` sets a single option in the same way.

`config()` is an alias of `configure()`.

### `keys()`

Return a list of the names of all configuration options of this widget.

### `getboolean(s)`

Interpret the string *s* as a Tcl boolean and return the corresponding
`bool`.
Tcl accepts values such as `'1'`, `'0'`, `'yes'`, `'no'`,
`'true'`, `'false'`, `'on'` and `'off'`.
Raise `ValueError` if *s* is not a valid boolean.

### `getdouble(s)`

Interpret the string *s* as a Tcl floating-point number and return it as
a `float`.
Raise `ValueError` if *s* is not a valid number.

> *Added in version 3.5.*

### `getint(s)`

Interpret the string *s* as a Tcl integer and return it as an
`int`.
Raise `ValueError` if *s* is not a valid integer.

### `getvar(name)`

Return the value of the Tcl global variable named *name*.

### `setvar(name, value)`

Set the Tcl global variable named *name* to *value*.

The `getvar()` and `setvar()` methods give direct access to Tcl
variables.
In most code you will instead use a `Variable` subclass such as
`StringVar` or `IntVar`, which wraps a Tcl variable and
converts its value to and from a Python type.

### `register(func, subst=None, needcleanup=1)`

Register the Python callable *func* as a Tcl command and return the name
of the new command as a string.
Whenever Tcl invokes that command, *func* is called; if *subst* is given,
it is applied to the command's arguments first.
This is the mechanism used internally to turn Python callbacks into the
command names passed to Tk options such as *command*.
Unless *needcleanup* is false, the command is deleted automatically when
the widget is destroyed.

> *Changed in version 3.13.*
> The arguments passed to *func* are no longer converted to strings.

### `deletecommand(name)`

Delete the Tcl command named *name*, such as one previously returned by
`register()`.

### `nametowidget(name)`

Return the widget instance corresponding to the Tk pathname *name*.

### `send(interp, cmd, *args)`

Send the Tcl command *cmd*, with the given *args*, to the Tcl interpreter
registered under the name *interp*, and return its result.
This is not available on all platforms.

### `destroy()`

Destroy this widget and all of its descendant widgets, and delete the Tcl
commands associated with them.

### `tkraise(aboveThis=None)`

Raise this widget in the stacking order so that it is drawn on top of its
siblings.
If *aboveThis* is given, the widget is moved to be just above it in the
stacking order instead.

`lift()` is an alias of `tkraise()`.

### `lower(belowThis=None)`

Lower this widget in the stacking order so that it is drawn beneath its
siblings.
If *belowThis* is given, the widget is moved to be just below it in the
stacking order instead.

`tkraise()`/`lift()` and `lower()` are overridden by the
`Canvas` widget,
where they restack canvas items instead.

### `image_names()`

Return the names of all images that currently exist in the Tcl
interpreter.

This is overridden by the `Text` widget,
where `image_names()` returns the names of its embedded images
instead.

### `image_types()`

Return the available image types, such as `'photo'` and `'bitmap'`.

### `grid_anchor(anchor=None)`

Set the anchor that controls where the grid is placed inside this
container when the container is larger than the grid and no row or column
has a non-zero weight.
*anchor* is one of the usual anchor strings, such as `'nw'` (the
default) or `'center'`.
Called with no argument, this method has no effect.

`anchor()` is an alias of `grid_anchor()`.

> *Added in version 3.3.*

### `grid_bbox(column=None, row=None, col2=None, row2=None)`

Return the bounding box, in pixels, of a region of the grid laid out in
this container, as a 4-tuple `(xoffset, yoffset, width, height)`.
With no arguments the bounding box of the whole grid is returned.
If *column* and *row* are given, the box spans from the cell at row and
column 0 to that cell; if *col2* and *row2* are also given, it spans from
the cell (*column*, *row*) to the cell (*col2*, *row2*).

`bbox()` is an alias of `grid_bbox()`,
except on `Canvas`, `Listbox`, `Spinbox`,
`Text`, `ttk.Entry` and
`ttk.Treeview`,
which provide their own `bbox()` method.

### `grid_columnconfigure(index, cnf={}, **kw)`

Query or set the properties of the column (or columns) *index* of the
grid managed by this container.
*index* may be a column number; when setting options it may also be a
list of column numbers, the string `'all'` to affect every column, or
a child widget whose occupied columns are affected.
The supported options are:

*minsize*
The column's minimum size, in pixels.

*weight*
An integer setting how much of any extra space is apportioned to the
column.
A weight of `0` keeps the column at its requested size, and a column
of weight two grows twice as fast as a column of weight one.

*uniform*
The name of a uniform group.
Columns sharing a non-empty group name are kept in sizes that are
strictly proportional to their weights.

*pad*
Extra space, in pixels, added to the largest widget in the column when
computing the column's size.

With a single option name, return that option's value; with no options,
return a dictionary of all of them.

`columnconfigure()` is an alias of `grid_columnconfigure()`.

### `grid_rowconfigure(index, cnf={}, **kw)`

Query or set the properties of the row (or rows) *index* of the grid
managed by this container.
*index* is interpreted as for `grid_columnconfigure()`, and the
supported options (*minsize*, *weight*, *uniform* and *pad*) are the
same, applied to a row instead of a column.

`rowconfigure()` is an alias of `grid_rowconfigure()`.

### `grid_location(x, y)`

Return the `(column, row)` of the grid cell that contains the pixel at
position (*x*, *y*), given in pixels relative to this container.
For locations above or to the left of the grid, `-1` is returned for
the corresponding coordinate.

### `grid_propagate()`

```python
grid_propagate(flag)
```

Enable or disable geometry propagation for this container when it manages
its children with the grid geometry manager.
When *flag* is true, the container resizes itself to fit the requested
sizes of its children; when it is false, its size is left under your
control.
Called with no argument, return the current setting as a boolean.

### `grid_size()`

Return the size of the grid managed by this container as a
`(columns, rows)` tuple.

`size()` is an alias of `grid_size()`,
except on the `Listbox` widget,
which provides its own `size()` method.

### `grid_slaves(row=None, column=None)`

Return a list of the child widgets managed in this container's grid, most
recently managed first.
If *row* or *column* is given, only the children in that row or column
are returned.

### `grid_content(row=None, column=None)`

Same as `grid_slaves()`: return the child widgets managed in this
container's grid, optionally restricted to a given *row* or *column*.

> *Added in version 3.15.*

### `propagate()`

```python
propagate(flag)
```

### `pack_propagate()`

```python
pack_propagate(flag)
```

Enable or disable geometry propagation for this container when it manages
its children with the pack geometry manager.
When *flag* is true, the container resizes itself to fit the requested
sizes of its children; when it is false, its size is left under your
control.
Called with no argument, return the current setting as a boolean.

`propagate()` is an alias of `pack_propagate()`.

### `pack_slaves()`

Return a list of the child widgets managed by this container with the
pack geometry manager, in packing order.

`slaves()` is an alias of `pack_slaves()`.

### `pack_content()`

Same as `pack_slaves()`: return the child widgets managed by this
container with the pack geometry manager, in packing order.

`content()` is an alias of `pack_content()`.

> *Added in version 3.15.*

### `place_slaves()`

Return a list of the child widgets managed by this container with the
place geometry manager.

### `place_content()`

Same as `place_slaves()`: return the child widgets managed by this
container with the place geometry manager.

> *Added in version 3.15.*

The methods with the `bind` and `unbind` prefixes associate event
patterns with callbacks and remove those associations.

### `bind(sequence=None, func=None, add=None)`

Bind the event pattern *sequence* on this widget to the callable *func*.

*sequence* is an event pattern, such as `''` (a mouse click)
or `'<KeyPress-a>'`, optionally a concatenation of several such
patterns that must occur shortly after one another.
When the event occurs, *func* is called with an `Event` instance
describing it as its only argument; if *func* returns the string
`'break'`, no further bindings for the event are invoked.

If *add* is true, *func* is added to any functions already bound to
*sequence*; otherwise it replaces them.
The binding applies only to this widget.

`bind()` returns a string identifier (a *funcid*) that can later be
passed to `unbind()` to remove the binding without leaking the
associated Tcl command.

If *func* is omitted, return the binding currently associated with
*sequence*; if *sequence* is also omitted, return a list of all the
sequences for which bindings exist on this widget.

### `bind_class(className, sequence=None, func=None, add=None)`

Like `bind()`, but bind *func* to the binding tag *className* rather
than to a single widget, so that the binding applies to every widget
having that tag.
*className* is usually the name of a widget class, such as `'Button'`,
in which case the binding affects all widgets of that class.
The set of binding tags for a widget can be inspected and changed with
`bindtags()`.

The remaining arguments and the return value are as for `bind()`.

### `bind_all(sequence=None, func=None, add=None)`

Like `bind()`, but bind *func* to the special binding tag `'all'`,
so that the binding applies to every widget in the application.

The remaining arguments and the return value are as for `bind()`.

### `unbind(sequence, funcid=None)`

Remove bindings for the event pattern *sequence* on this widget.

If *funcid* is given, only the function identified by it (a value
returned from a previous call to `bind()`) is removed, and its
associated Tcl command is deleted.
Otherwise all bindings for *sequence* are destroyed, leaving it unbound.

> *Changed in version 3.13.*
> If *funcid* is given, only that callback is unbound; other callbacks
> bound to *sequence* are kept.

### `unbind_class(className, sequence)`

Remove all bindings for the event pattern *sequence* from the binding tag
*className*.
See `bind_class()`.

### `unbind_all(sequence)`

Remove all bindings for the event pattern *sequence* from the special
binding tag `'all'`.
See `bind_all()`.

### `bindtags(tagList=None)`

If *tagList* is omitted, return a tuple of the binding tags associated
with this widget.
When an event occurs in a widget, it is applied to each of the widget's
binding tags in order, and for each tag the most specific matching
binding is executed.
By default a widget has four binding tags: its own pathname, its widget
class, the pathname of its nearest toplevel ancestor, and `'all'`, in
that order.

If *tagList* is given, it must be a sequence of strings; the widget's
binding tags are set to its elements, which determines the order in which
bindings are evaluated.

The methods with the `event_` prefix define virtual events and generate
events programmatically.

### `event_add(virtual, *sequences)`

Associate the virtual event *virtual*, whose name has the form
`'<<Paste>>'`, with each of the physical event patterns given by
*sequences*, so that the virtual event triggers whenever any of them
occurs.
If *virtual* is already defined, the new sequences are added to its
existing ones.

### `event_delete(virtual, *sequences)`

Remove each of *sequences* from those associated with the virtual event
*virtual*.
Sequences that are not currently associated with *virtual* are ignored.
If no *sequences* are given, all physical event sequences are removed, so
that *virtual* no longer triggers.

### `event_generate(sequence, **kw)`

Generate the event *sequence* on this widget and arrange for it to be
processed just as if it had come from the window system.
*sequence* must be a single event pattern, such as `''` or
`'<<Paste>>'`, not a concatenation of several.
Keyword arguments specify additional fields of the event, for example *x*
and *y* for the pointer position, or *when* to control when the event is
processed; refer to the Tk `event` manual page for the full list.

### `event_info(virtual=None)`

If *virtual* is omitted, return a tuple of all the virtual events that
are currently defined.
If *virtual* is given, return a tuple of the physical event sequences
currently associated with it, or an empty tuple if it is not defined.

The methods with the `after` prefix schedule callbacks to run after a
delay or when the application is idle.
