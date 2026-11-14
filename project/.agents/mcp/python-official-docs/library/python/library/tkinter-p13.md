---
title: "tkinter --- Python interface to Tcl/Tk (part 13 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 13 of 17)

### `post(x, y)`

Display the menu on the screen at the root-window coordinates *x* and
*y*, adjusting them if necessary so that the whole menu is visible.
If the *postcommand* option has been specified, it is evaluated before
the menu is posted.

### `tk_popup(x, y, entry='')`

Post the menu as a popup at the root-window coordinates *x* and *y*.
If *entry* is given, the menu is positioned so that this entry is
displayed under the pointer.

### `unpost()`

Unmap the menu so that it is no longer displayed, also unposting any
posted lower-level cascaded submenu.
This has no effect on Windows and macOS, which manage the unposting of
menus themselves.

### `xposition(index)`

Return the x-coordinate, within the menu window, of the leftmost pixel of
the entry given by *index*.

> *Added in version 3.3.*

### `yposition(index)`

Return the y-coordinate, within the menu window, of the topmost pixel of
the entry given by *index*.

### class `Menubutton(master=None, cnf={}, **kw)`

A `Menubutton` widget displays a textual string, bitmap or image and
posts an associated `Menu`, given by its *menu* option, when the user
presses it.
Like a `Label` it can show *text*, a *textvariable*, or an *image*,
and the *direction* option controls where the menu appears relative to the
button.
Inherits from `Widget`.
Refer to the Tk `menubutton` manual page for the full list of options.

### class `Message(master=None, cnf={}, **kw)`

A `Message` widget displays a non-interactive textual string, given
by the *text* option or linked to a variable through *textvariable*.
Unlike a `Label`, it breaks the string into multiple lines in order
to produce a given aspect ratio, choosing line breaks at word boundaries,
and it can justify the text left, centered or right.
Inherits from `Widget`.
Refer to the Tk `message` manual page for the full list of options.

### class `OptionMenu(master, variable, value, *values, **kwargs)`

A helper subclass of `Menubutton` that displays a pop-up menu of
mutually exclusive choices.
*variable* is a `Variable` kept in sync with the selection, *value*
is the initial choice, and *values* are the remaining menu entries.
The keyword argument *command* may be given a callback that is invoked with
the selected value, and the keyword argument *name* sets the Tk widget name.

### `destroy()`

Destroy the widget, also cleaning up the associated pop-up menu.

> *Changed in version 3.14.*
> Added support for the *name* keyword argument.

### class `PanedWindow(master=None, cnf={}, **kw)`

A `PanedWindow` is a geometry-manager widget that arranges any
number of child *panes* in a row (when *orient* is `'horizontal'`) or a
column (when *orient* is `'vertical'`).
Each pane holds one widget, and each pair of adjacent panes is separated by
a movable *sash* that the user can drag with the mouse to resize the widgets
on either side of it.
Inherits from `Widget`.

The *orient* option selects the layout direction, *sashwidth* sets the width
of each sash and *sashrelief* its relief.
When *showhandle* is true a small handle is drawn on each sash that the user
can grab to drag it.
Refer to the Tk `panedwindow` manual page for the full list of options.

### `add(child, **kw)`

Add *child* to the panedwindow as a new pane, placed after any existing
panes.
The keyword arguments specify per-pane management options for *child*;
they may be any of the options accepted by `paneconfigure()`.

### `remove(child)`

Remove the pane containing *child* from the panedwindow.
All geometry management options for *child* are forgotten.
`forget()` is an alias of `remove()`.
This shadows the inherited geometry-manager `forget()`;
use `pack_forget()`, `grid_forget()` or
`place_forget()` to remove the widget itself from its manager.

### `panes()`

Return a tuple of the widgets managed by the panedwindow, one per pane,
in order.

### `panecget(child, option)`

Return the current value of the management option *option* for the pane
containing *child*.
*option* may be any value allowed by `paneconfigure()`.

### `paneconfigure(tagOrId, cnf=None, **kw)`

Query or modify the management options of the pane containing the widget
*tagOrId*.
With no options, it returns a dictionary describing all of the available
options for the pane; given a single option name as a string, it returns
a description of that one option; otherwise it sets the given options.
The supported options include *after* and *before* (insert the pane after
or before another managed window), *height* and *width* (the outer
dimensions of the window, including any border), *minsize* (the minimum
size in the paned dimension), *padx* and *pady* (extra space to leave on
each side of the window), *sticky* (position or stretch the window within
an oversized pane, using a string of the characters `n`, `s`, `e`
and `w`), *hide* (hide the pane while keeping it in the list of panes)
and *stretch* (how extra space is allocated to the pane: one of
`'always'`, `'first'`, `'last'`, `'middle'` or `'never'`).
`paneconfig()` is an alias of `paneconfigure()`.

### `identify(x, y)`

Identify the panedwindow component underneath the point given by *x* and
*y*, in window coordinates.
If the point is over a sash or a sash handle, the result is a two-element
tuple containing the index of the sash or handle and a word indicating
whether it is over a sash or a handle, such as `(0, 'sash')` or
`(2, 'handle')`.
If the point is over any other part of the panedwindow, the result is an
empty string.

### `sash(*args)`

Query or change the position of the sashes in the panedwindow.
This is a thin wrapper around the Tk `sash` subcommand; the convenience
methods `sash_coord()`, `sash_mark()` and `sash_place()`
should normally be used instead.

### `sash_coord(index)`

Return the current x and y coordinate pair for the sash given by *index*,
which must be an integer between 0 and one less than the number of panes
in the panedwindow.
The coordinates returned are those of the top left corner of the region
containing the sash.

### `sash_mark(index)`

Record the current mouse position for the sash given by *index*, for use
together with later sash-drag operations to move the sash.

### `sash_place(index, x, y)`

Place the sash given by *index* at the coordinates *x* and *y*.

### `proxy(*args)`

Query or change the position of the sash proxy, the "ghost" sash shown
while a sash is being dragged with non-opaque resizing.
This is a thin wrapper around the Tk `proxy` subcommand; the
convenience methods `proxy_coord()`, `proxy_forget()` and
`proxy_place()` should normally be used instead.

### `proxy_coord()`

Return a tuple containing the x and y coordinates of the most recent
proxy location.

### `proxy_forget()`

Remove the proxy from the display.

### `proxy_place(x, y)`

Place the proxy at the coordinates *x* and *y*.

### class `Radiobutton(master=None, cnf={}, **kw)`

A `Radiobutton` widget displays a textual string, bitmap or image
together with a diamond or circular indicator, and selects one choice out of
several.
It has all the behavior of a simple button and, in addition, can be
selected: typically several radiobuttons share a single *variable*, and
selecting one sets that variable to the radiobutton's *value*; each
radiobutton also monitors the variable and automatically selects or
deselects itself when the variable changes.
Inherits from `Widget`.
In addition to the standard widget options, a radiobutton accepts the
options documented in the Tk `radiobutton` manual page, such as
*variable*, *value* and *command*.

### `invoke()`

Do just what would happen if the user pressed the radiobutton with the
mouse: select the button and invoke the associated command, if there is
one.
Return the result of the command, or an empty string if no command is
associated with the radiobutton.
This is ignored if the radiobutton's state is `disabled`.

### `select()`

Select the radiobutton and set the associated variable to the value
corresponding to this widget.

### `deselect()`

Deselect the radiobutton and set the associated variable to an empty
string.
If this radiobutton was not currently selected, this has no effect.

### `flash()`

Flash the radiobutton by redisplaying it several times, alternating
between the active and normal colors.
At the end of the flash the radiobutton is left in the same normal or
active state as when the method was called.
This is ignored if the radiobutton's state is `disabled`.

### class `Scale(master=None, cnf={}, **kw)`

A `Scale` widget lets the user select a numerical value by moving a
slider along a trough.
It can be oriented vertically or horizontally and can optionally display a
label and the current value.
Inherits from `Widget`.

In addition to the standard widget options, a scale accepts the options
documented in the Tk `scale` manual page, such as *from_*, *to*,
*resolution*, *orient*, *tickinterval*, *variable* and *command*.
As elsewhere in `tkinter`, the leading `-` of the Tk option name is
dropped; *from* is spelled `from_` because `from` is a Python
keyword.

With a non-integer *resolution*, see :ref:`numeric values and the locale
<tkinter-numeric-locale>`.

### `get()`

Return the current value of the scale.
The result is an integer if the scale's *resolution* yields whole
numbers, and a float otherwise.

### `set(value)`

Set the scale to *value*, moving the slider accordingly.
This has no effect if the scale is disabled.

### `coords(value=None)`

Return a tuple `(x, y)` giving the pixel coordinates, relative to the
widget, of the point on the centerline of the trough that corresponds to
*value*.
If *value* is omitted, the scale's current value is used.

### `identify(x, y)`

Return a string describing the part of the scale at the pixel coordinates
*x*, *y*: `'slider'`, `'trough1'` (the part of the trough above or to
the left of the slider), `'trough2'` (below or to the right of the
slider), or an empty string if the point is not over any of these
elements.

### class `Scrollbar(master=None, cnf={}, **kw)`

A `Scrollbar` widget displays a slider and two arrows that let the
user scroll an associated widget, such as a `Listbox`, `Text`,
`Canvas` or `Entry`.
It is connected to the scrolled widget by setting that widget's
*xscrollcommand* or *yscrollcommand* option to the scrollbar's `set()`
method, and the scrollbar's *command* option to the scrolled widget's
`xview()` or `yview()` method.
Inherits from `Widget`.

### `get()`

Return the current scrollbar settings as a tuple `(first, last)` of two
fractions between 0 and 1, describing the portion of the document that is
currently visible, as last passed to `set()`.

### `set(first, last)`

Set the scrollbar.
*first* and *last* are fractions between 0 and 1 giving the positions of
the start and end of the visible portion of the associated document.
This method is normally registered as the scrolled widget's
*xscrollcommand* or *yscrollcommand* and called by that widget.

### `activate(index=None)`

Mark the element *index* (one of `'arrow1'`, `'slider'` or
`'arrow2'`) as active, displaying it according to the
*activebackground* and *activerelief* options.
If *index* is omitted, return the name of the currently active element,
or `None` if no element is active.

> *Changed in version 3.5.*
> The *index* argument is now optional.

### `delta(deltax, deltay)`

Return a float indicating the fractional change in the scrollbar setting
that corresponds to moving the slider by *deltax* pixels horizontally
(for horizontal scrollbars) or *deltay* pixels vertically (for vertical
scrollbars).

### `fraction(x, y)`

Return a float between 0 and 1 indicating where the point at pixel
coordinates *x*, *y* lies in the trough: 0 corresponds to the top or left
of the trough and 1 to the bottom or right.

### `identify(x, y)`

Return the name of the element under the pixel coordinates *x*, *y* (such
as `'arrow1'`), or an empty string if the point does not lie in any
element of the scrollbar.

### class `Spinbox(master=None, cnf={}, **kw)`

A `Spinbox` widget is an `Entry`-like widget with a pair of
up/down arrow buttons that let the user step through a range of values in
addition to editing the value directly.
The set of values may be a numeric range given by the *from_*, *to* and
*increment* options, or an explicit list of strings given by the *values*
option (which takes precedence over the range).
Each time an arrow is invoked the *command* callback, if any, is called; the
boolean *wrap* option controls whether stepping past either end of the range
wraps around to the other end;
the *format* option specifies how numeric values are formatted;
and the *validate* option enables validation of the entered text.
Inherits from `Widget` and `XView`.

With a non-integer *increment*, see :ref:`numeric values and the locale
<tkinter-numeric-locale>`.

Many of the methods take an *index* argument identifying a character in the
spinbox's string.
As described in the Tk `spinbox` manual page, *index* may be a numeric
index (counting from 0), `'anchor'` (the selection anchor point),
`'end'` (just after the last character), `'insert'` (the character just
after the insertion cursor), `'sel.first'` or `'sel.last'` (the ends of
the selection), or `@x` (the character covering pixel x-coordinate *x* in
the window).

### `get()`

Return the spinbox's string.

### `insert(index, s)`

Insert the characters of the string *s* just before the character given
by *index*.

### `delete(first, last=None)`

Delete one or more characters of the spinbox.
*first* is the index of the first character to delete, and *last* is the
index of the character just after the last one to delete.
If *last* is omitted, a single character at *first* is deleted.

### `icursor(index)`

Arrange for the insertion cursor to be displayed just before the
character given by *index*.

### `index(index)`

Return the numerical index corresponding to *index*, as a string.

### `bbox(index)`

Return a tuple of four integers `(x, y, width, height)` describing the
bounding box of the character given by *index*.
*x* and *y* are the pixel coordinates of the upper-left corner of the
character relative to the widget, and *width* and *height* are its size
in pixels.
The bounding box may refer to a region outside the visible area of the
window.

This shadows the inherited `Misc.bbox()`;
use `grid_bbox()` for the grid bounding box.

### `identify(x, y)`

Return the name of the window element at the pixel coordinates *x*, *y*:
one of `'buttondown'`, `'buttonup'`, `'entry'` or `'none'`.

### `invoke(element)`

Invoke the spin button given by *element*, either `'buttonup'` or
`'buttondown'`, triggering the action associated with it.
