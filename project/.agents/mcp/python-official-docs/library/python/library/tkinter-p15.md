---
title: "tkinter --- Python interface to Tcl/Tk (part 15 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 15 of 17)

### `tag_unbind(tagName, sequence, funcid=None)`

Remove the bindings of the event *sequence* on characters tagged with
*tagName*.
If *funcid* is given, only that binding (as returned by `tag_bind()`)
is removed and its callback is unregistered.

> *Changed in version 3.13.*
> If *funcid* is given, only that callback is unbound.

### `image_create(index, cnf={}, **kw)`

Embed an image at *index* and return the name assigned to this image
instance, which may then be used as an index or passed to the other
`image_*` methods.
The options, given in *cnf* and *kw*, include *image* (the Tk image to
display), *name* (a base name for the instance), *align*, *padx* and
*pady*.

### `image_cget(index, option)`

Return the current value of the configuration option *option* for the
embedded image at *index*.

### `image_configure(index, cnf=None, **kw)`

Query or modify the configuration options of the embedded image at
*index*, like `configure()` but applied to that image.

### `image_names()`

Return a tuple of the names of all images embedded in the widget.

> **Note:** This shadows the inherited `Misc.image_names()`,
> which returns the names of all images in the Tcl interpreter;
> that method is not available on a `Text`.

### `window_create(index, cnf={}, **kw)`

Embed a window (any widget) at *index*.
The options, given in *cnf* and *kw*, include *window* (the widget to
embed), *create* (a callback that creates the widget on demand), *align*,
the boolean *stretch* (whether the widget is stretched vertically to the
height of the line), *padx* and *pady*.
The embedded widget must be a descendant of the text widget's parent.

### `window_cget(index, option)`

Return the current value of the configuration option *option* for the
embedded window at *index*.

### `window_configure(index, cnf=None, **kw)`

Query or modify the configuration options of the embedded window at
*index*, like `configure()` but applied to that window.

`window_config()` is an alias of `window_configure()`.

### `window_names()`

Return a tuple of the names of all windows embedded in the widget.

### `edit(*args)`

Low-level wrapper around the Tk `edit` widget command that controls the
undo/redo mechanism and the modified flag; *args* is the `edit`
subcommand and its arguments.
The `edit_*()` methods below are thin wrappers around it and are
usually more convenient.

### `edit_modified(arg=None)`

If *arg* is omitted, return the current state of the modified flag as
true or false; the flag is set automatically whenever the text is
inserted or deleted.
Otherwise set the flag to the boolean *arg*.

### `edit_undo()`

Undo the most recent edit action, that is, all the inserts and deletes
recorded on the undo stack since the previous separator, and move it to
the redo stack.
Raises `TclError` if the undo stack is empty.
Has no effect unless the *undo* option is true.
Since Tk 9.0, returns a tuple of indices delimiting the ranges of text
that were changed.

### `edit_redo()`

Reapply the most recently undone edit action, provided no further edits
have been made since, and move it back to the undo stack.
Raises `TclError` if the redo stack is empty.
Has no effect unless the *undo* option is true.
Since Tk 9.0, returns a tuple of indices delimiting the ranges of text
that were changed.

### `edit_reset()`

Clear the undo and redo stacks.

### `edit_separator()`

Push a separator onto the undo stack, marking a boundary between edit
actions for undo and redo.
Has no effect unless the *undo* option is true.
Separators are inserted automatically when the *autoseparators* option is
true.

### `search(pattern, index, stopindex=None, forwards=None, backwards=None, exact=None, regexp=None, nocase=None, count=None, elide=None, *, nolinestop=None, strictlimits=None)`

Search for *pattern* starting at *index* and return the index of the
first character of the first match, or an empty string if there is no
match.
Searching stops at *stopindex* if given; otherwise it wraps around the
ends of the text until the starting position is reached again.
The following boolean keyword flags control the search: *forwards* or
*backwards* select the direction (forward is the default); *exact* (the
default) or *regexp* select literal or regular-expression matching;
*nocase* makes the match case-insensitive; *elide* causes hidden text to
be searched as well; *nolinestop* (regexp only) lets `.` and `[^`
match newlines; and *strictlimits* requires the whole match to lie within
*index* and *stopindex*.
If *count* is a `Variable`, the number of index positions in the
match is stored in it.

> *Changed in version 3.15.*
> Added the *nolinestop* and *strictlimits* parameters.

### `search_all(pattern, index, stopindex=None, *, forwards=None, backwards=None, exact=None, regexp=None, nocase=None, count=None, elide=None, nolinestop=None, overlap=None, strictlimits=None)`

Like `search()`, but find every match in the searched range and
return a tuple of the starting indices of all matches (empty if there are
none).
By default overlapping matches are not reported; passing a true *overlap*
returns every match that is not wholly contained in another.
If *count* is a `Variable`, it receives a list with one element
per match.

> *Added in version 3.15.*

### `scan_mark(x, y)`

Record *x*, *y* and the current view, for use with later
`scan_dragto()` calls.
This is typically bound to a mouse button press in the widget.

### `scan_dragto(x, y)`

Scroll the widget by 10 times the difference between *x*, *y* and the
coordinates passed to the last `scan_mark()` call.
This is typically bound to mouse motion events, producing the effect of
dragging the text at high speed through the window.

### `debug(boolean=None)`

If *boolean* is omitted, return whether internal consistency checks of
the B-tree data structure are enabled.
Otherwise enable or disable them.
The setting is shared by all text widgets and may noticeably slow down
widgets holding large amounts of text.

### `dump(index1, index2=None, command=None, **kw)`

Return the contents of the widget from *index1* up to but not including
*index2* (or just the segment at *index1* if *index2* is omitted),
including text and information about marks, tags, images and windows.
The result is a list of `(key, value, index)` triples, where *key* is
one of `'text'`, `'mark'`, `'tagon'`, `'tagoff'`, `'image'` or
`'window'`.
By default all kinds are reported; passing any of the keyword arguments
*all*, *text*, *mark*, *tag*, *image* or *window* as true restricts the
dump to the selected kinds.
If *command* is given, it is called once per triple with the three values
as arguments and nothing is returned.

### `peer_create(newPathName, cnf={}, **kw)`

Create a peer text widget with the path name *newPathName* that shares
this widget's underlying data (text, marks, tags, images and the undo
stack).
Changes made through any peer are reflected in all of them.
By default the peer covers the same lines as this widget; standard text
options, including *startline* and *endline*, may be given to override
this.

> *Added in version 3.3.*

### `peer_names()`

Return a tuple of the path names of this widget's peers, not including
the widget itself.

> *Added in version 3.3.*

### `yview_pickplace(*what)`

Adjust the view so that the location given by *what* is visible.
This is an obsolete equivalent of `see()`, which should be used
instead.

### class `Variable(master=None, value=None, name=None)`

The base class for the Tk variable wrappers.
A Tk variable is a value stored in the Tcl interpreter that can be linked to
widgets through their *variable* or *textvariable* options (see
coupling-widget-variables), so that changes propagate both ways:
updating the variable updates every widget bound to it, and a user editing
such a widget updates the variable.

*master* is the widget whose Tcl interpreter owns the variable; if omitted,
the default root window is used.
*value* is the initial value; if omitted, a type-specific default is used.
*name* is the name of the variable in the Tcl interpreter; if omitted, a
unique name of the form `'PY_VARnum'` is generated.
If *name* matches an existing variable and *value* is omitted, the existing
value is retained.

In most cases you should use one of the typed subclasses below --
`StringVar`, `IntVar`, `DoubleVar` or
`BooleanVar` -- rather than `Variable` directly.

> **Note:** When a `Variable` is garbage collected, its Tcl variable is unset.
> Keep a reference to it for as long as a widget is linked to it, for example
> by storing it as an attribute rather than in a local variable.
> Otherwise Tk recreates the Tcl variable to keep the widget working, but it
> is never unset again, leaking one Tcl variable per dropped wrapper.

> *Changed in version 3.10.*
> Two variables now compare equal (`==`) only when they have the same
> name, are of the same class, and belong to the same Tcl interpreter.

### `get()`

Return the current value of the variable.
For the base class the value is returned as a string; the typed
subclasses convert it to the appropriate Python type.

### `set(value)`

Set the variable to *value*.
`initialize()` is an alias of `set()`.

> *Added in version 3.3.*
> The *initialize* spelling.

### `trace_add(mode, callback)`

Register *callback* to be called when the variable is accessed according
to *mode*.
*mode* is one of the strings `'array'`, `'read'`, `'write'` or
`'unset'`, or a list or tuple of such strings.

When triggered, *callback* is called with three arguments: the name of
the Tcl variable, an index (or an empty string if the variable is not an
element of an array), and the *mode* that triggered the call.

Return the internal name of the registered callback, which can be passed
to `trace_remove()`.

> *Added in version 3.6.*

### `trace_remove(mode, cbname)`

Remove a trace callback from the variable.
*mode* must match the *mode* that was passed to `trace_add()`, and
*cbname* is the callback name returned by `trace_add()`.

> *Added in version 3.6.*

### `trace_info()`

Return a list of `(modes, cbname)` pairs describing all traces
currently set on the variable, where *modes* is a tuple of mode strings
and *cbname* is the internal callback name.

> *Added in version 3.6.*

### `trace_variable(mode, callback)`

Register *callback* to be called when the variable is accessed according
to *mode*.
*mode* is one of the strings `'r'`, `'w'` or `'u'`, for read, write
or unset.
Return the internal name of the registered callback.
`trace()` is an alias of `trace_variable()`.

> *Deprecated since version 3.6.*
> Use `trace_add()` instead.  This method wraps a Tcl feature that
> was removed in Tcl 9.0.

### `trace_vdelete(mode, cbname)`

Remove the trace callback named *cbname* registered for *mode* with
`trace_variable()`.

> *Deprecated since version 3.6.*
> Use `trace_remove()` instead.  This method wraps a Tcl feature
> that was removed in Tcl 9.0.

### `trace_vinfo()`

Return a list of `(mode, cbname)` pairs for all traces set on the
variable with `trace_variable()`.

> *Deprecated since version 3.6.*
> Use `trace_info()` instead.  This method wraps a Tcl feature that
> was removed in Tcl 9.0.

### class `StringVar(master=None, value=None, name=None)`

A `Variable` subclass that holds a string.
The default value is `''`.

### `get()`

Return the value of the variable as a `str`.

### class `IntVar(master=None, value=None, name=None)`

A `Variable` subclass that holds an integer.
The default value is `0`.

### `get()`

Return the value of the variable as an `int`.

### class `DoubleVar(master=None, value=None, name=None)`

A `Variable` subclass that holds a float.
The default value is `0.0`.

### `get()`

Return the value of the variable as a `float`.

> **Note:** A floating-point value is always parsed with a period (`.`) as the
> decimal separator, but `Spinbox`, `Scale` and
> `ttk.Spinbox` format it according to the
> `LC_NUMERIC` locale.  Under a locale that uses a comma they produce a
> value that `get()` cannot read, raising `TclError`.  Set
> `LC_NUMERIC` to a locale that uses a period (such as `'C'`) to avoid
> this.

### class `BooleanVar(master=None, value=None, name=None)`

A `Variable` subclass that holds a boolean.
The default value is `False`.

### `get()`

Return the value of the variable as a `bool`.
Raise a `ValueError` if the value cannot be interpreted as a
boolean.

### `set(value)`

Set the variable to *value*, converting it to a boolean.
`initialize()` is an alias of `set()`.

> *Added in version 3.3.*
> The *initialize* spelling.

### class `Image(imgtype, name=None, cnf={}, master=None, **kw)`

Base class for Tk images.
*imgtype* is the Tk image type, one of `'photo'` or `'bitmap'`.
An image is a named object that can be displayed by widgets through their
*image* option; deleting all references to the `Image` object
deletes the underlying Tk image.
Usually you create a `PhotoImage` or `BitmapImage` rather than
an `Image` directly.

The image's configuration options are given by *cnf* and *kw* and may be
queried and changed later with the mapping protocol (using `image[key]`)
or with the `configure()` method.

### `configure(**kw)`

Modify one or more configuration options of the image.
The valid options depend on the image type; see `PhotoImage` and
`BitmapImage`.
`config()` is an alias of `configure()`.

### `height()`

Return the height of the image, in pixels.

### `width()`

Return the width of the image, in pixels.

### `type()`

Return the type of the image, that is the value of *imgtype* with which
it was created (for example `'photo'` or `'bitmap'`).

### class `PhotoImage(name=None, cnf={}, master=None, **kw)`

A full-color image (the Tk `photo` image type), stored internally with a
varying degree of transparency per pixel.
It can read and write GIF, PPM/PGM and (in Tk 8.6 and later) PNG files, read
SVG files (in Tk 9.0 and later), and be drawn in widgets.
Inherits from `Image`.

The configuration options include *data* (the image contents as a string),
*file* (the name of a file to read the contents from), *format* (the name of
the file format handler), *width* and *height* (the size of the image, used
when building it up piece by piece), *gamma* and *palette*.

### `blank()`

Blank the image; that is, set the entire image to have no data, so that
it is displayed as transparent and the background of whatever window it
is displayed in shows through.

### `cget(option)`

Return the current value of the configuration option *option*.
