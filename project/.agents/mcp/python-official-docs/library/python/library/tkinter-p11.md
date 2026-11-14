---
title: "tkinter --- Python interface to Tcl/Tk (part 11 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 11 of 17)

### `dtag(tagOrId, /)`

```python
dtag(tagOrId, tagToDelete, /)
```

Remove the tag *tagToDelete* (which defaults to *tagOrId*) from each of
the items given by *tagOrId*.
Items that do not have that tag are unaffected.

### `addtag(newtag, searchSpec, /, *args)`

Add the tag *newtag* to each item selected by the search specification
*searchSpec* (and any further *args*).
*searchSpec* is one of `'above'`, `'all'`, `'below'`,
`'closest'`, `'enclosed'`, `'overlapping'` or `'withtag'`; the
`addtag_*` methods below are convenient wrappers that supply each of
these forms.

### `addtag_above(newtag, tagOrId)`

Add the tag *newtag* to the item just above (after) *tagOrId* in the
display list.

### `addtag_all(newtag)`

Add the tag *newtag* to all items in the canvas.

### `addtag_below(newtag, tagOrId)`

Add the tag *newtag* to the item just below (before) *tagOrId* in the
display list.

### `addtag_closest(newtag, x, y, halo=None, start=None)`

Add the tag *newtag* to the item closest to the point (*x*, *y*).
If *halo* is given, any item within that distance of the point is treated
as overlapping it.
If *start* is given (a tag or id), select the topmost closest item that
lies below *start* in the display list, which can be used to step through
all the closest items.

### `addtag_enclosed(newtag, x1, y1, x2, y2)`

Add the tag *newtag* to every item completely enclosed within the
rectangle (*x1*, *y1*, *x2*, *y2*), where *x1* <= *x2* and *y1* <= *y2*.

### `addtag_overlapping(newtag, x1, y1, x2, y2)`

Add the tag *newtag* to every item that overlaps or is enclosed within
the rectangle (*x1*, *y1*, *x2*, *y2*), where *x1* <= *x2* and *y1* <=
*y2*.

### `addtag_withtag(newtag, tagOrId)`

Add the tag *newtag* to every item given by *tagOrId*.

### `find(searchSpec, /, *args)`

Return a tuple of the ids of all items selected by the search
specification *searchSpec* (and any further *args*), in stacking order
with the lowest item first.
The search specification has any of the forms accepted by `addtag()`.
The `find_*` methods below are more convenient wrappers around it.

### `find_above(tagOrId)`

Return a tuple containing the id of the item just above *tagOrId* in the
display list.

### `find_all()`

Return a tuple of the ids of all items in the canvas, in stacking order.

### `find_below(tagOrId)`

Return a tuple containing the id of the item just below *tagOrId* in the
display list.

### `find_closest(x, y, halo=None, start=None)`

Return a tuple containing the id of the item closest to the point (*x*,
*y*).
*halo* and *start* are interpreted as for `addtag_closest()`.

### `find_enclosed(x1, y1, x2, y2)`

Return a tuple of the ids of all items completely enclosed within the
rectangle (*x1*, *y1*, *x2*, *y2*).

### `find_overlapping(x1, y1, x2, y2)`

Return a tuple of the ids of all items that overlap or are enclosed
within the rectangle (*x1*, *y1*, *x2*, *y2*).

### `find_withtag(tagOrId)`

Return a tuple of the ids of all items given by *tagOrId*.

### `tag_raise(tagOrId, aboveThis=None, /)`

Move all items given by *tagOrId* to a new position in the display list
just above the item given by *aboveThis*, or to the top of the display
list if *aboveThis* is omitted.
When several items are moved their relative order is preserved.
This has no effect on embedded window items, whose stacking order is
controlled by `Misc.tkraise()` and `Misc.lower()` instead.
`lift()` and `tkraise()` are aliases of `tag_raise()`.

### `tag_lower(tagOrId, belowThis=None, /)`

Move all items given by *tagOrId* to a new position in the display list
just below the item given by *belowThis*, or to the bottom of the display
list if *belowThis* is omitted.
When several items are moved their relative order is preserved.
This has no effect on embedded window items.
`lower()` is an alias of `tag_lower()`.

> **Note:** On a `Canvas`, `tkraise()`/`lift()` and `lower()`
> restack canvas items,
> shadowing the inherited `Misc.tkraise()`/`Misc.lift()` and
> `Misc.lower()` methods that restack the widget itself,
> which are therefore not available.

### `tag_bind(tagOrId, sequence=None, func=None, add=None)`

Bind the callback *func* to the event *sequence* for all items given by
*tagOrId*, so that *func* is invoked whenever that event occurs for one
of the items.
This is like `Widget.bind()` but operates on canvas items
rather than on whole widgets; only mouse, keyboard and virtual events may
be bound.
Mouse events are directed to the current item and keyboard events to the
focus item (see `focus()`).
If *add* is true the new binding is added to any existing bindings for
the same sequence, rather than replacing them.
Return the identifier of the bound function, which can be passed to
`tag_unbind()`.

### `tag_unbind(tagOrId, sequence, funcid=None)`

Remove for all items given by *tagOrId* the binding for the event
*sequence*.
If *funcid* is given, only that callback (as returned by
`tag_bind()`) is unbound and deregistered.

> *Changed in version 3.13.*
> If *funcid* is given, only that callback is unbound.

### `bbox(tagOrId, /, *tagOrIds)`

Return a 4-tuple `(x1, y1, x2, y2)` giving an approximate bounding box,
in pixels, that encloses all the items given by *tagOrId* and any further
*tagOrIds*.
The result may overestimate the true bounding box by a few pixels.
Return `None` if no item matches or the matching items have nothing to
display.

This shadows the inherited `Misc.bbox()`;
use `grid_bbox()` for the grid bounding box.

### `canvasx(screenx, gridspacing=None)`

Given a window x-coordinate *screenx*, return the canvas x-coordinate
displayed at that location.
If *gridspacing* is given, the result is rounded to the nearest multiple
of *gridspacing* units.

### `canvasy(screeny, gridspacing=None)`

Given a window y-coordinate *screeny*, return the canvas y-coordinate
displayed at that location.
If *gridspacing* is given, the result is rounded to the nearest multiple
of *gridspacing* units.

### `focus()`

```python
focus(tagOrId, /)
```

With *tagOrId*, set the keyboard focus for the canvas to the first item
given by *tagOrId* that supports the insertion cursor; the focus is left
unchanged if no such item exists.
If *tagOrId* is an empty string, reset the focus so that no item has it.
With no argument, return the id of the item that currently has the focus,
or an empty string if none does.
An item only displays the insertion cursor when both it is the focus item
and its canvas has the input focus.

This shadows the inherited `Misc.focus()`;
use `focus_set()` to focus the widget itself.

### `icursor(tagOrId, index, /)`

Set the insertion cursor of the items given by *tagOrId* to just before
the character given by *index*.
Items that do not support an insertion cursor are unaffected.
The cursor is only displayed when the item has the focus, but its
position may be set at any time.

### `index(tagOrId, index, /)`

Return as an integer the numerical index within *tagOrId* corresponding
to *index*, which is a textual description of a position (for text items
an index into the characters, for line and polygon items an index into
the coordinates).
If *tagOrId* matches several items, the first one that supports indexing
is used.

### `select_adjust(tagOrId, index)`

Adjust the end of the selection in *tagOrId* nearest to *index* so that
it is at *index*, and make the other end the anchor point for future
`select_to()` calls.
If the selection is not currently in *tagOrId*, this behaves like
`select_to()`.

### `select_clear()`

Clear the selection if it is in this canvas; otherwise do nothing.

### `select_from(tagOrId, index)`

Set the selection anchor point to just before the character given by
*index* in the item given by *tagOrId*.
This does not change the selection itself; it sets the fixed end for
future `select_to()` calls.

### `select_item()`

Return the id of the item that holds the selection, or `None` if the
selection is not in this canvas.
Unlike `find()` and the `find_*` methods, this returns the id as a
string rather than an integer.

### `select_to(tagOrId, index)`

Set the selection to the characters of *tagOrId* between the selection
anchor point and *index*, inclusive of *index*.
The anchor point is the one set by the most recent `select_adjust()`
or `select_from()` call.

### `scan_mark(x, y)`

Record *x*, *y* and the current view, for use with later
`scan_dragto()` calls.
This is typically bound to a mouse button press in the widget.

### `scan_dragto(x, y, gain=10)`

Scroll the canvas by *gain* times the difference between *x*, *y* and the
coordinates passed to the last `scan_mark()` call.
This is typically bound to mouse motion events in the widget, producing
the effect of dragging the canvas at high speed through its window.

### `postscript(cnf={}, **kw)`

Generate a PostScript (Encapsulated PostScript, version 3.0)
representation of part or all of the canvas.
If the *file* or *channel* option is given, the PostScript is written
there and an empty string is returned; otherwise it is returned as a
string.
By default only the area currently visible in the window is generated, so
it is usually necessary either to call `update()` first or to
use the *width* and *height* options.
Supported options include *colormap*, *colormode*, *file*, *fontmap*,
*height*, *pageanchor*, *pageheight*, *pagewidth*, *pagex*, *pagey*,
*rotate*, *width*, *x* and *y*.

### class `Checkbutton(master=None, cnf={}, **kw)`

A `Checkbutton` widget displays a textual string, bitmap or image
together with a square indicator, and toggles a boolean selection when
pressed.
It has all the behavior of a simple button and, in addition, can be
selected: when selected the indicator is drawn with a check mark and the
associated variable is set to the `onvalue`, and when deselected the
indicator is drawn empty and the variable is set to the `offvalue`.
Inherits from `Widget`.
In addition to the standard widget options, a checkbutton accepts the
options documented in the Tk `checkbutton` manual page, such as
*variable*, *onvalue*, *offvalue* and *command*.

### `invoke()`

Do just what would happen if the user pressed the checkbutton with the
mouse: toggle the selection state of the button and invoke the associated
command, if there is one.
Return the result of the command, or an empty string if no command is
associated with the checkbutton.
This is ignored if the checkbutton's state is `disabled`.

### `select()`

Select the checkbutton and set the associated variable to its
`onvalue`.

### `deselect()`

Deselect the checkbutton and set the associated variable to its
`offvalue`.

### `toggle()`

Toggle the selection state of the button, redisplaying it and modifying
its associated variable to reflect the new state.

### `flash()`

Flash the checkbutton by redisplaying it several times, alternating
between the active and normal colors.
At the end of the flash the checkbutton is left in the same normal or
active state as when the method was called.
This is ignored if the checkbutton's state is `disabled`.

### class `Entry(master=None, cnf={}, **kw)`

An `Entry` widget displays a single line of text and lets the user
edit it.
Inherits from `Widget` and `XView`; since entries can hold
strings too long to fit in the window, they support horizontal scrolling
through `xview()`.

In addition to the standard widget options, an entry accepts the options
documented in the Tk `entry` manual page.
Notable ones are *textvariable* (the name of a variable kept in sync with
the entry's contents), *show* (if set, each character is displayed as the
given character rather than its true value, useful for password entry),
*validate* and *validatecommand* (which together let a callback accept or
reject edits), and *state* (one of `'normal'`, `'disabled'` or
`'readonly'`).

Many of the methods below take an *index* argument that selects a character
in the entry's string.
As described in the Tk `entry` manual page, *index* may be a number
(counting from 0), `'insert'` (the character just after the insertion
cursor), `'end'` (just after the last character), `'anchor'` (the
selection anchor point), `'sel.first'` and `'sel.last'` (the ends of the
selection), or `@x` (the character covering pixel x-coordinate *x* in the
window).
Out-of-range indices are rounded to the nearest legal value.

### `delete(first, last=None)`

Delete the characters from index *first* up to but not including index
*last*.
If *last* is omitted, only the single character at *first* is deleted.

### `get()`

Return the entry's current string.

### `insert(index, string)`

Insert *string* just before the character given by *index*.

### `icursor(index)`

Arrange for the insertion cursor to be displayed just before the
character given by *index*.

### `index(index)`

Return the numerical index corresponding to *index*.

### `selection_adjust(index)`

Locate the end of the selection nearest to the character given by
*index*, and adjust that end to be at *index* (including but not going
beyond it); the other end becomes the anchor point for future
`selection_to()` calls.
If there is no selection in the entry, a new one is created between
*index* and the most recent anchor point, inclusive.
`select_adjust()` is an alias of `selection_adjust()`.

### `selection_clear()`

Clear the selection if it is currently in this widget.
If the selection is not in this widget the method has no effect.
`select_clear()` is an alias of `selection_clear()`.

> **Note:** This shadows the inherited `Misc.selection_clear()`,
> which clears the X selection;
> that method is not available on an `Entry`.

### `selection_from(index)`

Set the selection anchor point to just before the character given by
*index*, without changing the selection.
`select_from()` is an alias of `selection_from()`.

### `selection_present()`

Return `True` if there are characters selected in the entry, `False`
otherwise.
`select_present()` is an alias of `selection_present()`.

### `selection_range(start, end)`

Set the selection to include the characters starting with the one indexed
by *start* and ending with the one just before *end*.
If *end* refers to the same character as *start* or an earlier one, the
selection is cleared.
`select_range()` is an alias of `selection_range()`.

### `selection_to(index)`

Set the selection between the anchor point and *index*: if *index* is
before the anchor point, the selection runs from *index* up to but not
including the anchor; if *index* is after it, from the anchor up to but
not including *index*; if they coincide, nothing happens.
The anchor point is the one set by the most recent `selection_from()`
or `selection_adjust()` call.
If there is no selection in the entry, a new one is created using the
most recent anchor point.
`select_to()` is an alias of `selection_to()`.
