---
title: "tkinter --- Python interface to Tcl/Tk (part 12 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 12 of 17)

### `scan_mark(x)`

Record *x* and the current view in the entry window, for use with later
`scan_dragto()` calls.
Typically associated with a mouse button press in the widget.

### `scan_dragto(x)`

Compute the difference between *x* and the *x* given to the last
`scan_mark()` call, and adjust the view left or right by 10 times
that difference.
Typically associated with mouse motion events, to produce the effect of
dragging the entry at high speed through the window.

### class `Frame(master=None, cnf={}, **kw)`

A `Frame` widget is a simple container.
Its primary purpose is to act as a spacer or container for complex window
layouts; its only features are its background and an optional 3-D border to
make the frame appear raised or sunken.
Inherits from `Widget`.
Refer to the Tk `frame` manual page for the full list of options.

### class `Label(master=None, cnf={}, **kw)`

A `Label` widget displays a non-interactive textual string, bitmap
or image.
The displayed text is set with the *text* option or linked to a variable
through *textvariable*, and an image can be shown using the *image* option.
Text must all be in a single font but may occupy multiple lines, and one
character may be underlined with the *underline* option.
Inherits from `Widget`.
Refer to the Tk `label` manual page for the full list of options.

### class `LabelFrame(master=None, cnf={}, **kw)`

A `LabelFrame` widget is a container that has the features of a
`Frame` plus the ability to display a label.
The label text is set with the *text* option and positioned with
*labelanchor*, or an arbitrary widget may be used as the label by giving it
as the *labelwidget* option.
Inherits from `Widget`.
Refer to the Tk `labelframe` manual page for the full list of options.

### class `Listbox(master=None, cnf={}, **kw)`

A `Listbox` widget displays a list of single-line text items, one
per line, of which the user can select one or more.
The way the selection behaves is governed by the *selectmode* option, which
is one of `browse` (the default; at most one item, which may be dragged
with the mouse), `single` (at most one item), `multiple` (any number of
items, toggled individually), or `extended` (any number of items,
including discontiguous ranges, selected by clicking and dragging).
Inherits from `Widget`, `XView` and `YView`, so the
view can be scrolled horizontally and vertically with `xview()`
and `yview()`.
Refer to the Tk `listbox` manual page for the full list of options.

Many of the methods take an *index* argument identifying a particular item.
As described in the Tk `listbox` manual page, *index* may be a numeric
index (counting from 0 at the top), `'active'` (the item with the location
cursor, set with `activate()`), `'anchor'` (the selection anchor, set
with `selection_anchor()`), `'end'` (the last item, or for
`index()` and `insert()` the position just after it), or `@x,y`
(the item covering pixel coordinates *x*, *y* in the listbox window).
Arguments named *first* and *last* are indices of the same forms.

### `insert(index, *elements)`

Insert the given *elements* as new items just before the item given by
*index*.
If *index* is `'end'`, the new items are appended to the end of the
list.

### `delete(first, last=None)`

Delete the items in the range from *first* to *last* inclusive.
If *last* is omitted, it defaults to *first*, so that a single item is
deleted.

### `get(first, last=None)`

If *last* is omitted, return the contents of the item given by *first*,
or an empty string if *first* refers to a non-existent item.
If *last* is given, return a tuple of all the items in the range from
*first* to *last* inclusive.

### `size()`

Return the total number of items in the listbox.

This shadows the inherited `Misc.size()`;
use `grid_size()` for the grid size.

### `index(index)`

Return the integer index value corresponding to *index*, or `None` if
*index* is out of range.
If *index* is `'end'`, the result is a count of the number of items in
the listbox (not the index of the last item).

### `bbox(index)`

Return a tuple `(x, y, width, height)` describing the bounding box, in
pixels relative to the widget, of the text of the item given by *index*.
Return `None` if no part of that item is visible on the screen, or if
*index* refers to a non-existent item; if the item is only partly
visible, the result still gives the full area of the item, including the
parts that are not visible.

This shadows the inherited `Misc.bbox()`;
use `grid_bbox()` for the grid bounding box.

### `nearest(y)`

Given a y-coordinate within the listbox window, return the index of the
visible item nearest to that y-coordinate.

### `see(index)`

Adjust the view so that the item given by *index* is visible.
If the item is already visible the method has no effect; if it is near an
edge of the window the listbox scrolls just enough to bring it into view
at that edge, otherwise the listbox scrolls to center the item.

### `activate(index)`

Set the active item to the one given by *index*.
If *index* is outside the range of items, the closest item is activated
instead.
The active item is drawn as specified by the *activestyle* option when
the widget has the input focus, and its index may be retrieved with the
`'active'` index.

### `curselection()`

Return a tuple containing the numerical indices of all of the items that
are currently selected, or an empty tuple if no items are selected.

### `selection_anchor(index)`

Set the selection anchor to the item given by *index*.
If *index* refers to a non-existent item, the closest item is used.
The selection anchor is the end of the selection that is fixed while
dragging out a selection with the mouse, and may afterwards be referred
to with the `'anchor'` index.
`select_anchor()` is an alias of `selection_anchor()`.

### `selection_clear(first, last=None)`

Deselect any of the items in the range from *first* to *last* inclusive
that are selected.
The selection state of items outside this range is not changed.
`select_clear()` is an alias of `selection_clear()`.

> **Note:** This shadows the inherited `Misc.selection_clear()`,
> which clears the X selection;
> that method is not available on a `Listbox`.

### `selection_includes(index)`

Return `True` if the item given by *index* is currently selected,
`False` otherwise.
`select_includes()` is an alias of `selection_includes()`.

### `selection_set(first, last=None)`

Select all of the items in the range from *first* to *last* inclusive,
without affecting the selection state of items outside that range.
`select_set()` is an alias of `selection_set()`.

### `itemcget(index, option)`

Return the current value of the configuration option *option* for the
item given by *index*.

### `itemconfigure(index, cnf=None, **kw)`

Query or modify the configuration options of the item given by *index*.
This mirrors `configure()`, except that it applies to an
individual item rather than to the listbox as a whole.
With no options, it returns a dictionary describing the current options
of the item; otherwise it sets the given options.
The supported item options are *background*, *foreground*,
*selectbackground* and *selectforeground*.
`itemconfig()` is an alias of `itemconfigure()`.

### `scan_mark(x, y)`

Record *x*, *y* and the current view, for use with later
`scan_dragto()` calls.
This is typically bound to a mouse button press in the widget.

### `scan_dragto(x, y)`

Scroll the listbox by 10 times the difference between *x*, *y* and the
coordinates passed to the last `scan_mark()` call.
This is typically bound to mouse motion events in the widget, producing
the effect of dragging the list at high speed through the window.

### class `Menu(master=None, cnf={}, **kw)`

A `Menu` widget displays a column of entries, each of which may be a
command, a checkbutton, a radiobutton, a cascade (which posts an associated
submenu) or a separator.
Menus are used as the menubar of a toplevel window, as pulldown menus posted
from a cascade entry or menubutton, and as popup menus.
Inherits from `Widget`.

Many of the entry methods take an *index* argument that selects which entry
to operate on.
As described in the Tk `menu` manual page, *index* may be a numeric index
(counting from 0 at the top), `'active'` (the currently active entry),
`'end'` or `'last'` (the bottommost entry), `'none'` (no entry at all,
written `{}` in Tcl), `@y` (the entry covering pixel y-coordinate *y* in
the menu window), or a pattern matched against the labels of the entries
from the top down.

### `add(itemType, cnf={}, **kw)`

Add a new entry to the bottom of the menu.
*itemType* is one of `'command'`, `'cascade'`, `'checkbutton'`,
`'radiobutton'` or `'separator'` and determines the type of the new
entry; the remaining options configure it.
The `add_command()`, `add_cascade()`, `add_checkbutton()`,
`add_radiobutton()` and `add_separator()` convenience methods
call this method with the corresponding *itemType*.

The entry is configured by the following options, although not every
option applies to every entry type (a separator accepts none of them):

*label*
The text to display in the entry.

*command*
The function to call when the entry is invoked (command, checkbutton
and radiobutton entries).

*accelerator*
A string displayed at the right of the entry to advertise an
accelerator keystroke; it does not itself create the binding.

*underline*
The index of a character in the label to underline for keyboard
traversal.

*state*
One of `'normal'`, `'active'` or `'disabled'`.

*image*
An image to display instead of, or together with, the text label.

*compound*
Where to show the image relative to the text: `'none'` (the
default), `'text'`, `'image'`, `'top'`, `'bottom'`, `'left'`
or `'right'`.

*bitmap*
A bitmap to display instead of the text label.

*font*
The font to use for the text.

*background*, *foreground*
The entry's background and foreground colors in its normal state
(ignored on macOS).

*activebackground*, *activeforeground*
The background and foreground colors used when the entry is active
(ignored on macOS).

*columnbreak*
If true, the entry starts a new column instead of being placed below
the previous entry.

*hidemargin*
If true, the standard margin around the entry is omitted, which is
useful when a menu is used as a palette.

*menu*
The submenu posted by a cascade entry; it must be a child of this
menu.

*variable*
The variable associated with a checkbutton or radiobutton entry.

*onvalue*, *offvalue*
The values stored in *variable* when a checkbutton entry is selected
or cleared.

*value*
The value stored in *variable* when a radiobutton entry is selected.

*indicatoron*
Whether to display the indicator of a checkbutton or radiobutton
entry.

*selectcolor*
The color of the indicator of a checkbutton or radiobutton entry when
it is selected.

*selectimage*
The image displayed when a checkbutton or radiobutton entry is
selected and *image* is also given.

### `add_cascade(cnf={}, **kw)`

Add a new cascade entry to the bottom of the menu.
A cascade entry has an associated submenu, given by its *menu* option,
which must be a child of this menu; posting the entry posts the submenu
next to it.

### `add_checkbutton(cnf={}, **kw)`

Add a new checkbutton entry to the bottom of the menu.
When invoked, a checkbutton entry toggles between its *onvalue* and
*offvalue*, storing the result in its associated *variable*, and displays
an indicator showing whether it is selected.

### `add_command(cnf={}, **kw)`

Add a new command entry to the bottom of the menu.
A command entry behaves much like a button: when it is invoked, the
callback given by its *command* option is called.

### `add_radiobutton(cnf={}, **kw)`

Add a new radiobutton entry to the bottom of the menu.
Radiobutton entries sharing the same *variable* form a group of which
only one may be selected at a time; selecting an entry stores its *value*
in the variable.

### `add_separator(cnf={}, **kw)`

Add a separator to the bottom of the menu.
A separator is displayed as a horizontal dividing line and cannot be
activated or invoked.

### `insert(index, itemType, cnf={}, **kw)`

Same as `add()`, except that the new entry is inserted just before
the entry given by *index* instead of being appended to the end of the
menu.
*itemType* is one of `'command'`, `'cascade'`, `'checkbutton'`,
`'radiobutton'` or `'separator'`.
The `insert_command()`, `insert_cascade()`,
`insert_checkbutton()`, `insert_radiobutton()` and
`insert_separator()` convenience methods call this method with the
corresponding *itemType*.

### `insert_cascade(index, cnf={}, **kw)`

Insert a new cascade entry before the entry given by *index* (see
`add_cascade()`).

### `insert_checkbutton(index, cnf={}, **kw)`

Insert a new checkbutton entry before the entry given by *index* (see
`add_checkbutton()`).

### `insert_command(index, cnf={}, **kw)`

Insert a new command entry before the entry given by *index* (see
`add_command()`).

### `insert_radiobutton(index, cnf={}, **kw)`

Insert a new radiobutton entry before the entry given by *index* (see
`add_radiobutton()`).

### `insert_separator(index, cnf={}, **kw)`

Insert a separator before the entry given by *index* (see
`add_separator()`).

### `delete(index1, index2=None)`

Delete all of the menu entries between *index1* and *index2* inclusive.
If *index2* is omitted, it defaults to *index1*, so that a single entry
is deleted.
Attempts to delete a tear-off entry are ignored; remove it by changing
the *tearoff* option instead.

### `entrycget(index, option)`

Return the current value of the configuration option *option* for the
entry given by *index*.

### `entryconfigure(index, cnf=None, **kw)`

Query or modify the configuration options of the entry given by *index*.
This mirrors `configure()`, except that it applies to an
individual entry rather than to the menu as a whole.
With no options, it returns a dictionary describing the current options
of the entry; otherwise it sets the given options.
The supported options are those accepted by `add()` for the entry's
type.
`entryconfig()` is an alias of `entryconfigure()`.

### `index(index)`

Return the numerical index corresponding to *index*, or `None` if
*index* selects no entry.

### `type(index)`

Return the type of the entry given by *index*: one of `'command'`,
`'cascade'`, `'checkbutton'`, `'radiobutton'`, `'separator'` or
`'tearoff'` (for the tear-off entry).

### `activate(index)`

Make the entry given by *index* the active entry, redisplaying it with
its active colors, and deactivate any previously active entry.
If *index* selects no entry, or the selected entry is disabled, the menu
ends up with no active entry.

### `invoke(index)`

Invoke the action of the entry given by *index*, as if it had been
clicked.
Nothing happens if the entry is disabled.
If the entry has a *command* associated with it, the result of that
command is returned; otherwise the result is an empty string.
