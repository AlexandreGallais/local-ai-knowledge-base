---
title: "tkinter --- Python interface to Tcl/Tk (part 6 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 6 of 17)

### `after(ms, func=None, *args, **kw)`

Schedule the callable *func* to be called after *ms* milliseconds, with
*args* and *kw* passed to it as positional and keyword arguments.
Return an identifier that can be passed to `after_cancel()` to cancel
the call.

If *func* is omitted, sleep for *ms* milliseconds instead, processing no
events during that time, and return `None`.

> *Changed in version 3.10.*
> *func* can now be any callable object, not only a function.

> *Changed in version 3.14.*
> Keyword arguments are now passed to *func*.

### `after_cancel(id)`

Cancel a callback previously scheduled with `after()` or
`after_idle()`.
*id* must be an identifier returned by one of those methods; passing a
value that is not such an identifier raises `ValueError`.
If the callback has already run or been cancelled, this has no effect.

> *Changed in version 3.7.*
> Passing `None` (or any false value) as *id* now raises
> `ValueError`.

### `after_idle(func, *args, **kw)`

Schedule the callable *func* to be called, with *args* and *kw* passed to
it, when the Tk main loop next becomes idle, that is, when it has no
other events to process.
Return an identifier that can be passed to `after_cancel()` to cancel
the call.

> *Changed in version 3.14.*
> Keyword arguments are now passed to *func*.

### `after_info(id=None)`

If *id* is omitted, return a tuple of the identifiers of all callbacks
currently scheduled with `after()` and `after_idle()` for this
interpreter.

If *id* is given, it must identify a callback that has not yet run or
been cancelled, and the return value is a tuple `(script, type)`, where
*script* refers to the function to be called and *type* is either
`'idle'` or `'timer'`.
A `TclError` is raised if *id* does not exist.

> *Added in version 3.13.*

### `mainloop(n=0)`

Enter the Tk event loop, which processes events until all windows are
destroyed.
This is normally called once, on the root window, to run the application.

### `quit()`

Quit the Tcl interpreter, causing `mainloop()` to return.

### `update()`

Enter the event loop until all pending events, including idle callbacks,
have been processed.
This brings the display up to date and handles any events that are
already queued, then returns.

### `update_idletasks()`

Enter the event loop until all pending idle callbacks have been called.
This updates the display of windows, for example after geometry changes,
but does not process events caused by the user.

### `wait_variable(name)`

Wait until the Tcl variable *name* is modified, continuing to process
events in the meantime so that the application stays responsive.
*name* is usually a `Variable` instance, such as an
`IntVar` or `StringVar`.

`waitvar()` is an alias of `wait_variable()`.

### `wait_window(window=None)`

Wait until *window* is destroyed, continuing to process events in the
meantime.
If *window* is omitted, this widget is used.
This is typically used to wait for the user to finish interacting with a
dialog box.

### `wait_visibility(window=None)`

Wait until the visibility state of *window* changes, for example when it
first appears on the screen, continuing to process events in the
meantime.
If *window* is omitted, this widget is used.
This is typically used to wait for a newly created window to become
visible before acting on it.

The methods with the `focus_` prefix manage the keyboard focus.

### `focus()`

Direct the keyboard input focus for this widget's display to this widget.
If the application does not currently have the input focus on this
widget's display, the widget is remembered as the focus window for its
top level, and the focus will be redirected to it the next time the
window manager gives the focus to the top level.
`focus()` is an alias of `focus_set()`,
except on the `Canvas` and
`ttk.Treeview` widgets,
which provide their own `focus()` method.

### `focus_force()`

Direct the keyboard input focus to this widget even if the application
does not currently have the input focus for the widget's display.
This method should be used sparingly, if at all; normally an application
should wait for the window manager to give it the focus rather than
claiming it.

### `focus_get()`

Return the widget that currently has the keyboard focus in the
application, or `None` if no widget in the application has the focus.
Use `focus_displayof()` to work correctly with several displays.

### `focus_displayof()`

Return the widget that currently has the keyboard focus on the display
where this widget is located, or `None` if no widget in the application
has the focus on that display.

### `focus_lastfor()`

Return the most recent widget to have had the keyboard focus among all
the widgets in the same top level as this widget; this is the widget that
will receive the focus the next time the window manager gives the focus
to the top level.
If no widget in that top level has ever had the focus, or if the most
recent focus widget has been deleted, the top level itself is returned.

### `tk_focusFollowsMouse()`

Reconfigure Tk to use an implicit focus model in which the focus is set
to a widget whenever the mouse pointer enters it.
This cannot easily be disabled once enabled.

### `tk_focusNext()`

Return the next widget after this one in the keyboard traversal order, or
`None` if there is none.
The traversal order goes first to the next child, then recursively to the
children of that child, and then to the next sibling higher in the
stacking order.
A widget is skipped if its `takefocus` option is set to `0`.
This method is used in the default bindings for the `Tab` key.

### `tk_focusPrev()`

Return the previous widget before this one in the keyboard traversal
order, or `None` if there is none.
See `tk_focusNext()` for how the order is defined.
This method is used in the default bindings for the `Shift-Tab` key.

The methods with the `grab_` prefix set and query the input grab, which
directs all input events to a single widget.

### `grab_set()`

Set a local grab on this widget.
A grab confines pointer events to this widget and its descendants: while
the pointer is outside the widget's subtree, button presses and releases
and pointer motion are reported to the grab widget, and windows outside
the subtree become insensitive until the grab is released.
A local grab affects only the grabbing application.
Any grab previously set by this application on the widget's display is
automatically released.
Setting a grab is the usual way to make a dialog modal: while the grab is
in effect the user cannot interact with the other windows of the
application.

### `grab_set_global()`

Set a global grab on this widget.
A global grab is like the local grab set by `grab_set()`, but it
locks out all other applications on the screen, so that only this
widget's subtree is sensitive to pointer events, and it also grabs the
keyboard.
Use with caution: it is easy to render a display unusable with a global
grab, since other applications stop receiving events until it is
released.

### `grab_release()`

Release the grab on this widget if there is one; otherwise do nothing.

### `grab_current()`

Return the widget that currently holds the grab in this application for
this widget's display, or `None` if there is no such widget.

### `grab_status()`

Return `None` if no grab is currently set on this widget, `"local"`
if a local grab is set, or `"global"` if a global grab is set.

The methods with the `selection_` prefix retrieve and manage the X
selection.

### `selection_clear(**kw)`

Clear the X selection, so that no window owns it anymore.
The selection to clear is given by the keyword argument *selection*, an
atom name such as `'PRIMARY'` or `'CLIPBOARD'`; it defaults to
`PRIMARY`.
The *displayof* keyword argument names a widget that determines the
display on which to operate, and defaults to this widget.

This is overridden by the `Entry`, `Listbox` and
`Spinbox` widgets,
where `selection_clear()` clears the widget's own selection instead.

### `selection_get(**kw)`

Return the contents of the current X selection.
The keyword argument *selection* names the selection and defaults to
`PRIMARY`.
The keyword argument *type* specifies the form in which the data is to be
returned (the desired conversion target), an atom name such as
`'STRING'` or `'FILE_NAME'`; it defaults to `STRING`, except on
X11, where `UTF8_STRING` is tried first and `STRING` is used as a
fallback.
The *displayof* keyword argument names a widget that determines the
display from which to retrieve the selection, and defaults to this
widget.

### `selection_handle(command, **kw)`

Register *command* as a handler to supply the X selection owned by this
widget when another application requests it.
When the selection is retrieved, *command* is called with two arguments,
the starting character offset and the maximum number of characters to
return, and must return at most that many characters of the selection
starting at that offset; for very long selections it is called repeatedly
with increasing offsets.
The keyword argument *selection* names the selection (default
`PRIMARY`) and the keyword argument *type* gives the form of the
selection that the handler supplies (such as `'STRING'` or
`'FILE_NAME'`, default `STRING`).

### `selection_own(**kw)`

Make this widget the owner of the X selection on its display.
The previous owner, if any, is notified that it has lost the selection.
The keyword argument *selection* names the selection and defaults to
`PRIMARY`.

### `selection_own_get(**kw)`

Return the widget in this application that owns the X selection on the
display containing this widget, or `None` if no widget in this
application owns the selection.
The keyword argument *selection* names the selection and defaults to
`PRIMARY`.
The *displayof* keyword argument names a widget that determines the
display to query, and defaults to this widget.

The methods with the `clipboard_` prefix manage the clipboard.

### `clipboard_append(string, **kw)`

Append *string* to the Tk clipboard and claim ownership of the clipboard
on this widget's display.
Before appending, the clipboard should be emptied with
`clipboard_clear()`; all appends should be completed before returning
to the event loop so that the clipboard is updated atomically.
The keyword argument *type* specifies the form of the data, an atom name
such as `'STRING'` or `'FILE_NAME'` (default `STRING`), and the
keyword argument *format* specifies the representation used to transmit
it (default `STRING`).
The *displayof* keyword argument names a widget that determines the
target display, and defaults to this widget.
The contents can be retrieved with `clipboard_get()` or
`selection_get()`.

### `clipboard_clear(**kw)`

Claim ownership of the clipboard on this widget's display and remove any
previous contents.
The *displayof* keyword argument names a widget that determines the
target display, and defaults to this widget.

### `clipboard_get(**kw)`

Retrieve data from the clipboard on this widget's display.
The keyword argument *type* specifies the form in which the data is to be
returned, an atom name such as `'STRING'` or `'FILE_NAME'`; it
defaults to `STRING`, except on X11, where `UTF8_STRING` is tried
first and `STRING` is used as a fallback.
The *displayof* keyword argument names a widget that determines the
display, and defaults to the root window of the application.
This is equivalent to `selection_get(selection='CLIPBOARD')`.

The methods with the `option_` prefix query and modify the Tk option
database.

### `option_add(pattern, value, priority=None)`

Add an option to the Tk option database that associates *value* with
*pattern*.
*pattern* consists of names and/or classes separated by asterisks or
dots, in the usual X format.
*priority* is an integer between 0 and 100, or one of the symbolic names
`'widgetDefault'` (20), `'startupFile'` (40), `'userDefault'` (60),
or `'interactive'` (80); it defaults to `interactive`.

### `option_clear()`

Clear the Tk option database.
Default options from the `RESOURCE_MANAGER` property or the
`.Xdefaults` file are reloaded automatically the next time an
option is added to or removed from the database.

### `option_get(name, className)`

Return the value of the option matching this widget under *name* and
*className* from the Tk option database, or an empty string if there is
no matching entry.
When several entries match, the one with the highest priority is
returned, and among entries of equal priority the most recently added
one.

### `option_readfile(fileName, priority=None)`

Read the file named *fileName*, which should have the standard format for
an X resource database such as `.Xdefaults`, and add all the
options it specifies to the Tk option database.
*priority* is interpreted as for `option_add()` and defaults to
`interactive`.

### `bell(displayof=0)`

Ring the bell on the display for this widget, using the display's current
bell-related settings, and reset the screen saver for the screen.
If *displayof* is given as a widget, the bell is rung on that widget's
display instead.

### `tk_setPalette(background, /)`

```python
tk_setPalette(*args, **kw)
```

Set a new color scheme for all Tk widget elements.
Existing widgets are updated and the option database is changed so that
future widgets use the new colors.
A single color argument is taken as the normal background color, from
which a complete palette is computed.
Alternatively, the arguments may be given as keyword *name*/*value* pairs
naming individual options in the option database.
The recognized option names are `activeBackground`,
`activeForeground`, `background`, `disabledForeground`,
`foreground`, `highlightBackground`, `highlightColor`,
`insertBackground`, `selectColor`, `selectBackground`,
`selectForeground`, and `troughColor`; reasonable defaults are
computed for any that are not specified.

### `tk_bisque()`

Restore the application's colors to the light brown (bisque) color scheme
used in Tk 3.6 and earlier versions.
Provided for backward compatibility.

### `tk_strictMotif(boolean=None)`

Query or set whether Tk's look and feel should strictly adhere to Motif.
A true *boolean* value enables strict Motif compliance (for example, no
color change when the mouse passes over a slider).
Return the resulting setting.

The methods with the `busy_` prefix manage the busy state of a window,
which shows a busy cursor and ignores user input.
