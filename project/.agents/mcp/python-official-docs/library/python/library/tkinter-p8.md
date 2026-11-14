---
title: "tkinter --- Python interface to Tcl/Tk (part 8 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 8 of 17)

### `attributes(*args, return_python_dict=False, **kwargs)`

Query or set platform-specific attributes of the window.
With no arguments, return the platform-specific flags and their values;
pass *return_python_dict* as true to get them as a dictionary.
A single option name such as `'alpha'` returns the value of that
option, and options are set using keyword arguments (`alpha=0.5`).

The available attributes differ by platform.
All platforms support:

*alpha*
The window's opacity, from `0.0` (fully transparent) to `1.0`
(opaque).
Where transparency is unsupported the value stays at `1.0`.

*appearance*
Whether the window is rendered in dark mode on Windows and macOS:
`'auto'`, `'light'` or `'dark'` (this has no effect on X11).

*fullscreen*
Whether the window takes up the entire screen and has no borders.

*topmost*
Whether the window is displayed above all other windows.

Windows additionally supports:

*disabled*
Whether the window is in a disabled state.

*toolwindow*
Whether the window uses the tool window style.

*transparentcolor*
The color that is made fully transparent, or an empty string for none.

macOS additionally supports:

*class*
Whether the underlying Aqua window is an `nswindow` or an
`nspanel`; this can only be set before the window is created.

*modified*
The modification state shown by the window's close button and proxy
icon.

*notify*
Whether the application's dock icon bounces to request attention.

*stylemask*
The style mask of the underlying Aqua window, given as a list of bit
names such as `titled` or `resizable`.

*tabbingid*
The identifier of the tab group that the window belongs to.

*tabbingmode*
Whether the window may be opened as a tab: `'auto'`, `'preferred'`
or `'disallowed'`.

*titlepath*
The path of the file represented by the window's proxy icon.

*transparent*
Whether the content area is transparent and the window shadow is
turned off.

X11 additionally supports:

*type*
The window type, or a list of types in order of preference, that the
window manager should use to interpret the window, such as
`'dialog'` or `'splash'`.

*zoomed*
Whether the window is maximized.

> **Note:** Tk 8.6 added the *type* attribute, and Tk 9.0 added the *appearance*,
> *class*, *stylemask*, *tabbingid* and *tabbingmode* attributes.

On X11 changes are applied asynchronously, so a queried value may not yet
reflect the most recent request.
`wm_attributes()` is an alias of `attributes()`.

> *Changed in version 3.13.*
> A single attribute may now be queried by name without the leading
> `-`, and attributes may be set using keyword arguments.
> The *return_python_dict* parameter was added.

> *Deprecated since version 3.13.*
> Setting an attribute by passing the option name (with a leading
> `-`) and its value as two positional arguments, as in
> `w.attributes('-alpha', 0.5)`, is deprecated; use keyword arguments
> instead.

### `client(name=None)`

Store *name*, which should be the name of the host on which the
application is running, in the window's `WM_CLIENT_MACHINE` property
for use by the window or session manager.
An empty string deletes the property.
With no argument, return the last name set, or an empty string.
`wm_client()` is an alias of `client()`.

### `colormapwindows(*wlist)`

Manipulate the `WM_COLORMAP_WINDOWS` property, which tells the window
manager about windows that have private colormaps.
If *wlist* is given, overwrite the property with those windows (their
order is a priority order for installing colormaps).
With no arguments, return the list of windows currently named in the
property.
`wm_colormapwindows()` is an alias of `colormapwindows()`.

### `command(value=None)`

Store *value* in the window's `WM_COMMAND` property for use by the
window or session manager; it should be a list giving the words of the
command used to invoke the application.
An empty string deletes the property.
With no argument, return the last value set, or an empty string.
`wm_command()` is an alias of `command()`.

### `deiconify()`

Display the window in normal (non-iconified) form by mapping it.
If the window has never been mapped, this ensures it appears de-iconified
when it is first mapped.
On Windows the window is also raised and given the focus.
`wm_deiconify()` is an alias of `deiconify()`.

### `focusmodel(model=None)`

Set or query the focus model for the window.
*model* is either `'active'` (the window claims the input focus for
itself or its descendants, even when the focus is in another application)
or `'passive'` (the window relies on the window manager to give it the
focus).
With no argument, return the current model.
The default is `'passive'`, which is what the `focus()` command
assumes.
`wm_focusmodel()` is an alias of `focusmodel()`.

### `forget(window)`

Unmap *window* from the screen so that it is no longer managed by the
window manager.
A `Toplevel` is then treated like a `Frame`, although its
`-menu` configuration is remembered and the menu reappears if the
widget is managed again.
`wm_forget()` is an alias of `forget()`.

Not to be confused with `Pack.forget()`.

> *Added in version 3.3.*

### `frame()`

Return the platform-specific window identifier for the outermost
decorative frame containing the window, if the window manager has
reparented it into such a frame; otherwise return the identifier of the
window itself.
`wm_frame()` is an alias of `frame()`.

### `geometry(newGeometry=None)`

Set or query the geometry of the window.
*newGeometry* has the form `=widthxheight+x+y`, where any of `=`,
`widthxheight` and the `+x+y` position may be omitted.
*width* and *height* are in pixels (or grid units for a gridded window);
a position preceded by `+` is measured from the left or top edge of the
screen and one preceded by `-` from the right or bottom edge.
An offset can be negative, as in `'200x100+-9+-8'`, when the window
edge is positioned beyond the corresponding screen edge.
An empty string cancels any user-specified geometry, letting the window
revert to its natural size.
With no argument, return the current geometry as a string of the form
`'200x200+10+10'`.
`wm_geometry()` is an alias of `geometry()`.

### `grid(baseWidth=None, baseHeight=None, widthInc=None, heightInc=None)`

Manage the window as a gridded window and define the relationship between
grid units and pixels.
*baseWidth* and *baseHeight* are the numbers of grid units for the
window's internally requested size, and *widthInc* and *heightInc* are
the pixel sizes of a horizontal and vertical grid unit.
Empty strings turn off gridded management.
With no arguments, return a tuple of the four current values, or `None`
if the window is not gridded.
`wm_grid()` is an alias of `grid()`.

Not to be confused with the grid geometry manager `Grid.grid()`.

### `group(pathName=None)`

Set or query the leader of a group of related windows.
*pathName* gives the path name of the group leader; the window manager
may, for example, unmap all windows in the group when the leader is
iconified.
An empty string removes the window from any group.
With no argument, return the path name of the current group leader, or an
empty string.
`wm_group()` is an alias of `group()`.

### `iconbitmap(bitmap=None, default=None)`

Set or query the bitmap used by the window manager for the window's icon.
*bitmap* names a bitmap in one of the standard forms accepted by Tk; an
empty string cancels the current icon bitmap.
With no argument, return the name of the current icon bitmap, or an empty
string.
On Windows the *default* argument names an icon (for example an `.ico`
file) applied to all top-level windows that have no icon of their own.
`wm_iconbitmap()` is an alias of `iconbitmap()`.

### `iconify()`

Iconify the window.
If the window has not yet been mapped for the first time, arrange for it
to appear in the iconified state when it is eventually mapped.
`wm_iconify()` is an alias of `iconify()`.

### `iconmask(bitmap=None)`

Set or query the bitmap used as a mask for the icon (see
`iconbitmap()`).
Where the mask is zero no icon is displayed; where it is one, the
corresponding bits of the icon bitmap are shown.
An empty string cancels the current mask.
With no argument, return the name of the current icon mask, or an empty
string.
`wm_iconmask()` is an alias of `iconmask()`.

### `iconname(newName=None)`

Set or query the name displayed by the window manager inside the window's
icon.
With no argument, return the current icon name, or an empty string if
none has been set (in which case the window manager normally displays the
window's title).
`wm_iconname()` is an alias of `iconname()`.

### `iconphoto(default=False, *images)`

Set the titlebar icon for the window from one or more `PhotoImage`
objects given in *images*.
Several images of different sizes (for example 16x16 and 32x32) may be
supplied so that the window manager can choose an appropriate one.
The image data is taken as a snapshot at the time of the call; later
changes to the images are not reflected.
If *default* is true, the icon is also applied to all top-level windows
created in the future.
On macOS only the first image is used.
`wm_iconphoto()` is an alias of `iconphoto()`.

> *Added in version 3.3.*

### `iconposition(x=None, y=None)`

Set or query a hint to the window manager about where the window's icon
should be positioned.
Empty strings cancel an existing hint.
With no arguments, return a tuple of the two current values, or `None`
if no hint is in effect.
`wm_iconposition()` is an alias of `iconposition()`.

### `iconwindow(pathName=None)`

Set or query the window used as the icon for the window.
When the window is iconified, *pathName* is mapped to serve as its icon
and unmapped again when it is de-iconified.
An empty string cancels the association.
With no argument, return the path name of the current icon window, or an
empty string.
Not all window managers support icon windows, and the concept is
meaningless on non-X11 platforms.
`wm_iconwindow()` is an alias of `iconwindow()`.

### `manage(widget)`

Make *widget* a stand-alone top-level window, decorated by the window
manager with a title bar and so on.
Only `Frame`, `LabelFrame` and `Toplevel` widgets
may be used (the `tkinter.ttk` versions are **not** accepted);
passing any other widget type raises an error.
`wm_manage()` is an alias of `manage()`.

> *Added in version 3.3.*

### `maxsize(width=None, height=None)`

Set or query the maximum permissible dimensions of the window, in pixels
(or grid units for a gridded window).
The window manager restricts the window to be no larger than *width* and
*height*.
With no arguments, return a tuple of the current maximum width and
height.
The maximum size defaults to the size of the screen.
`wm_maxsize()` is an alias of `maxsize()`.

### `minsize(width=None, height=None)`

Set or query the minimum permissible dimensions of the window, in pixels
(or grid units for a gridded window).
The window manager restricts the window to be no smaller than *width* and
*height*.
With no arguments, return a tuple of the current minimum width and
height.
The minimum size defaults to one pixel in each dimension.
`wm_minsize()` is an alias of `minsize()`.

### `overrideredirect(boolean=None)`

Set or query the override-redirect flag for the window.
When this flag is set, the window is ignored by the window manager: it is
not reparented into a decorative frame and the user cannot manipulate it
through the usual window manager controls.
With no argument, return a boolean indicating whether the flag is set,
or `None` if it has not been set.
The flag is reliably honored only when the window is first mapped or
remapped from the withdrawn state.
`wm_overrideredirect()` is an alias of `overrideredirect()`.

### `positionfrom(who=None)`

Set or query the source of the window's current position.
*who* is either `'program'` or `'user'` and indicates whether the
position was requested by the program or by the user; an empty string
cancels the current source.
With no argument, return the current source, or an empty string if none
has been set.
Tk automatically sets the source to `'user'` when `geometry()` is
called, unless it has been set explicitly to `'program'`.
`wm_positionfrom()` is an alias of `positionfrom()`.

### `protocol(name=None, func=None)`

Register *func* as the handler for the window manager protocol *name*, an
atom such as `'WM_DELETE_WINDOW'`, `'WM_SAVE_YOURSELF'` or
`'WM_TAKE_FOCUS'`; *func* is then called whenever the window manager
sends a message of that protocol.
Tk installs a default `WM_DELETE_WINDOW` handler that destroys the
window, which this method can replace.
If *func* is an empty string, the handler is removed.
With only *name*, return the name of its registered handler command, or
an empty string if none is set (the default `WM_DELETE_WINDOW` handler
is not reported); with no arguments, return a tuple of the protocols that
currently have handlers.
`wm_protocol()` is an alias of `protocol()`.

### `resizable(width=None, height=None)`

Control whether the user may interactively resize the window.
*width* and *height* are boolean values that determine whether the
window's width and height may be changed.
With no arguments, return a tuple of two `0`/`1` values indicating
whether each dimension is currently resizable.
By default a window is resizable in both dimensions.
`wm_resizable()` is an alias of `resizable()`.

### `sizefrom(who=None)`

Set or query the source of the window's current size.
*who* is either `'program'` or `'user'` and indicates whether the
size was requested by the program or by the user; an empty string cancels
the current source.
With no argument, return the current source, or an empty string if none
has been set.
`wm_sizefrom()` is an alias of `sizefrom()`.

### `state(newstate=None)`

Set or query the state of the window.
With no argument, return the current state: one of `'normal'`,
`'iconic'`, `'withdrawn'`, `'icon'` or, on Windows and macOS only,
`'zoomed'`.
`'iconic'` refers to a window that has been iconified, while `'icon'`
refers to a window serving as the icon for another window (see
`iconwindow()`); the `'icon'` state cannot be set.
`wm_state()` is an alias of `state()`.

Not to be confused with :meth:`ttk.Widget.state
<tkinter.ttk.Widget.state>`.

### `title(string=None)`

Set or query the title for the window, which the window manager should
display in the window's title bar.
With no argument, return the current title.
The title defaults to the window's name.
`wm_title()` is an alias of `title()`.
