---
title: "curses --- Terminal handling for character-cell displays (part 2 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/curses.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# curses --- Terminal handling for character-cell displays (part 2 of 10)

## Functions

The module `curses` defines the following exception:

### exception `error`

Exception raised when a curses library function returns an error.

> **Note:** Whenever *x* or *y* arguments to a function or a method are optional, they
> default to the current cursor location. Whenever *attr* is optional, it defaults
> to `A_NORMAL`.

The module `curses` defines the following functions:

### `assume_default_colors(fg, bg, /)`

Allow use of default values for colors on terminals supporting this feature.
Use this to support transparency in your application.

- Assign terminal default foreground/background colors to color number `-1`.
So `init_pair(x, COLOR_RED, -1)` will initialize pair *x* as red
on default background and `init_pair(x, -1, COLOR_BLUE)` will
initialize pair *x* as default foreground on blue.

- Change the definition of the color-pair `0` to `(fg, bg)`.

This is an ncurses extension.

> *Added in version 3.14.*

### `baudrate()`

Return the output speed of the terminal in bits per second.  On software
terminal emulators it will have a fixed high value. Included for historical
reasons; in former times, it was used to  write output loops for time delays and
occasionally to change interfaces depending on the line speed.

### `beep()`

Emit a short attention sound.

### `can_change_color()`

Return `True` or `False`, depending on whether the programmer can change the colors
displayed by the terminal.

### `cbreak()`

Enter cbreak mode.  In cbreak mode (sometimes called "rare" mode) normal tty
line buffering is turned off and characters are available to be read one by one.
However, unlike raw mode, special characters (interrupt, quit, suspend, and flow
control) retain their effects on the tty driver and calling program.  Calling
first `raw()` then `cbreak()` leaves the terminal in cbreak mode.

### `color_content(color_number)`

Return the intensity of the red, green, and blue (RGB) components in the color
*color_number*, which must be between `0` and `COLORS - 1`.  Return a 3-tuple,
containing the R,G,B values for the given color, which will be between
`0` (no component) and `1000` (maximum amount of component).  Raise an
exception if the color is not supported.

### `color_pair(pair_number)`

Return the attribute value for displaying text in the specified color pair.
Only the first 256 color pairs are supported. This
attribute value can be combined with `A_STANDOUT`, `A_REVERSE`,
and the other `A_*` attributes.  `pair_number()` is the counterpart
to this function.

### `curs_set(visibility)`

Set the cursor state.  *visibility* can be set to `0`, `1`, or `2`, for invisible,
normal, or very visible.  If the terminal supports the visibility requested, return the
previous cursor state; otherwise raise an exception.  On many
terminals, the "visible" mode is an underline cursor and the "very visible" mode
is a block cursor.

### `def_prog_mode()`

Save the current terminal mode as the "program" mode, the mode when the running
program is using curses.  (Its counterpart is the "shell" mode, for when the
program is not in curses.)  Subsequent calls to `reset_prog_mode()` will
restore this mode.

### `def_shell_mode()`

Save the current terminal mode as the "shell" mode, the mode when the running
program is not using curses.  (Its counterpart is the "program" mode, when the
program is using curses capabilities.) Subsequent calls to
`reset_shell_mode()` will restore this mode.

### `delay_output(ms)`

Insert an *ms* millisecond pause in output.

### `doupdate()`

Update the physical screen.  The curses library keeps two data structures, one
representing the current physical screen contents and a virtual screen
representing the desired next state.  The `doupdate()` function updates the
physical screen to match the virtual screen.

The virtual screen may be updated by a `noutrefresh()` call after write
operations such as `addstr()` have been performed on a window.  The normal
`refresh()` call is simply `noutrefresh()` followed by `doupdate()`;
if you have to update multiple windows, you can speed performance and perhaps
reduce screen flicker by issuing `noutrefresh()` calls on all windows,
followed by a single `doupdate()`.

### `echo()`

Enter echo mode.  In echo mode, each character input is echoed to the screen as
it is entered.

### `endwin()`

De-initialize the library, and return terminal to normal status.

### `erasechar()`

Return the user's current erase character as a one-byte bytes object.  Under Unix operating systems this
is a property of the controlling tty of the curses program, and is not set by
the curses library itself.

### `filter()`

The `.filter()` routine, if used, must be called before `initscr()` is
called.  The effect is that, during the initialization, `LINES` is set to `1`; the
capabilities `clear`, `cup`, `cud`, `cud1`, `cuu1`, `cuu`, `vpa` are disabled; and the `home`
string is set to the value of `cr`. The effect is that the cursor is confined to
the current line, and so are screen updates.  This may be used for enabling
character-at-a-time  line editing without touching the rest of the screen.

### `flash()`

Flash the screen.  That is, change it to reverse-video and then change it back
in a short interval.  Some people prefer such as 'visible bell' to the audible
attention signal produced by `beep()`.

### `flushinp()`

Flush all input buffers.  This throws away any  typeahead  that  has been typed
by the user and has not yet been processed by the program.

### `getmouse()`

After `getch()` returns `KEY_MOUSE` to signal a mouse event, this
method should be called to retrieve the queued mouse event, represented as a
5-tuple `(id, x, y, z, bstate)`. *id* is an ID value used to distinguish
multiple devices, and *x*, *y*, *z* are the event's coordinates.  (*z* is
currently unused.)  *bstate* is an integer value whose bits will be set to
indicate the type of event, and will be the bitwise OR of one or more of the
following constants, where *n* is the button number from 1 to 5:
`BUTTONn_PRESSED`, `BUTTONn_RELEASED`, `BUTTONn_CLICKED`,
`BUTTONn_DOUBLE_CLICKED`, `BUTTONn_TRIPLE_CLICKED`,
`BUTTON_SHIFT`, `BUTTON_CTRL`, `BUTTON_ALT`.

> *Changed in version 3.10.*
> The `BUTTON5_*` constants are now exposed if they are provided by the
> underlying curses library.

### `getsyx()`

Return the current coordinates of the virtual screen cursor as a tuple
`(y, x)`.  If `leaveok()` is currently `True`, then return `(-1, -1)`.

### `getwin(file)`

Read window-related data stored in the file by an earlier `window.putwin()` call.
The routine then creates and initializes a new window using that data, returning
the new window object.  The *file* argument must be a file object opened for
reading in binary mode.

### `has_colors()`

Return `True` if the terminal can display colors; otherwise, return `False`.

### `has_extended_color_support()`

Return `True` if the module supports extended colors; otherwise, return
`False`. Extended color support allows more than 256 color pairs for
terminals that support more than 16 colors (for example, xterm-256color).

Extended color support requires ncurses version 6.1 or later.

> *Added in version 3.10.*

### `has_ic()`

Return `True` if the terminal has insert- and delete-character capabilities.
This function is included for historical reasons only, as all modern software
terminal emulators have such capabilities.

### `has_il()`

Return `True` if the terminal has insert- and delete-line capabilities, or can
simulate  them  using scrolling regions. This function is included for
historical reasons only, as all modern software terminal emulators have such
capabilities.

### `has_key(ch)`

Take a key value *ch*, and return `True` if the current terminal type recognizes
a key with that value.

### `halfdelay(tenths)`

Used for half-delay mode, which is similar to cbreak mode in that characters
typed by the user are immediately available to the program. However, after
blocking for *tenths* tenths of seconds, if nothing has been typed,
`getch()` returns `-1`, while `getkey()` and
`get_wch()` raise `curses.error`.
The value of *tenths* must be a number between `1` and `255`.
Use `nocbreak()` to leave half-delay mode.

### `init_color(color_number, r, g, b)`

Change the definition of a color, taking the number of the color to be changed
followed by three RGB values (for the amounts of red, green, and blue
components).  The value of *color_number* must be between `0` and
`COLORS - 1`.  Each of *r*, *g*, *b*, must be a value between `0` and
`1000`.  When `init_color()` is used, all occurrences of that color on the
screen immediately change to the new definition.  This function is a no-op on
most terminals; it is active only if `can_change_color()` returns `True`.

### `init_pair(pair_number, fg, bg)`

Change the definition of a color-pair.  It takes three arguments: the number of
the color-pair to be changed, the foreground color number, and the background
color number.  The value of *pair_number* must be between `1` and
`COLOR_PAIRS - 1` (the `0` color pair can only be changed by
`use_default_colors()` and `assume_default_colors()`).
The value of *fg* and *bg* arguments must be between `0` and
`COLORS - 1`, or, after calling `use_default_colors()` or
`assume_default_colors()`, `-1`.
If the color-pair was previously initialized, the screen is
refreshed and all occurrences of that color-pair are changed to the new
definition.

### `initscr()`

Initialize the library. Return a window object
which represents the whole screen.

See `setupterm()` for a caveat about calling it before this function.

> **Note:** If there is an error opening the terminal, the underlying curses library may
> cause the interpreter to exit.

### `intrflush(flag)`

If *flag* is `True`, pressing an interrupt key (interrupt, break, or quit)
will flush all output in the terminal driver queue.  If *flag* is `False`,
no flushing is done.

### `is_term_resized(nlines, ncols)`

Return `True` if `resize_term()` would modify the window structure,
`False` otherwise.

### `isendwin()`

Return `True` if `endwin()` has been called (that is, the  curses library has
been deinitialized).

### `keyname(k)`

Return the name of the key <example-value> *k* as a bytes object.  The name of a key <example-value> printable
ASCII character is the key's character.  The name of a control-key <example-value>
is a two-byte bytes object consisting of a caret (`b'^'`) followed by the corresponding
printable ASCII character.  The name of an alt-key <example-value> (128--255) is a
bytes object consisting of the prefix `b'M-'` followed by the name of the corresponding
ASCII character.

Raise a `ValueError` if *k* is negative.

### `killchar()`

Return the user's current line kill character as a one-byte bytes object. Under Unix operating systems
this is a property of the controlling tty of the curses program, and is not set
by the curses library itself.

### `longname()`

Return a bytes object containing the terminfo long name field describing the current
terminal.  The maximum length of a verbose description is 128 characters.  It is
defined only after the call to `initscr()`.

### `meta(flag)`

If *flag* is `True`, allow 8-bit characters to be input.  If
*flag* is `False`,  allow only 7-bit chars.

### `mouseinterval(interval)`

Set the maximum time in milliseconds that can elapse between press and release
events in order for them to be recognized as a click, and return the previous
interval value.  The default value is 166 milliseconds, or one sixth of a second.
Use a negative *interval* to obtain the interval value without changing it.

### `mousemask(mousemask)`

Set the mouse events to be reported, and return a tuple ``(availmask,
oldmask)``.   *availmask* indicates which of the specified mouse events can be
reported; on complete failure it returns `0`.  *oldmask* is the previous value of
the mouse event mask.  If this function is never called, no mouse
events are ever reported.

### `napms(ms)`

Sleep for *ms* milliseconds.

### `newpad(nlines, ncols)`

Create and return a pointer to a new pad data structure with the given number
of lines and columns.  Return a pad as a window object.

A pad is like a window, except that it is not restricted by the screen size, and
is not necessarily associated with a particular part of the screen.  Pads can be
used when a large window is needed, and only a part of the window will be on the
screen at one time.  Automatic refreshes of pads (such as from scrolling or
echoing of input) do not occur.  The `refresh()` and `noutrefresh()`
methods of a pad require 6 arguments to specify the part of the pad to be
displayed and the location on the screen to be used for the display. The
arguments are *pminrow*, *pmincol*, *sminrow*, *smincol*, *smaxrow*, *smaxcol*; the *p*
arguments refer to the upper-left corner of the pad region to be displayed and
the *s* arguments define a clipping box on the screen within which the pad region
is to be displayed.

### `newwin(nlines, ncols)`

```python
newwin(nlines, ncols, begin_y, begin_x)
```

Return a new window, whose left-upper corner
is at  `(begin_y, begin_x)`, and whose height/width is  *nlines*/*ncols*.

By default, the window will extend from the  specified position to the lower
right corner of the screen.

### `nl(flag=True)`

Enter newline mode.  This mode translates the return key into newline on input,
and translates newline into return and line-feed on output. Newline mode is
initially on.

If *flag* is `False`, the effect is the same as calling `nonl()`.

### `nocbreak()`

Leave cbreak mode.  Return to normal "cooked" mode with line buffering.

### `noecho()`

Leave echo mode.  Echoing of input characters is turned off.

### `nonl()`

Leave newline mode.  Disable translation of return into newline on input, and
disable low-level translation of newline into newline/return on output (but this
does not change the behavior of `addch('\n')`, which always does the
equivalent of return and line feed on the virtual screen).  With translation
off, curses can sometimes speed up vertical motion a little; also, it will be
able to detect the return key on input.

### `noqiflush()`

When the `noqiflush()` routine is used, normal flush of input and output queues
associated with the `INTR`, `QUIT` and `SUSP` characters will not be done.  You may
want to call `noqiflush()` in a signal handler if you want output to
continue as though the interrupt had not occurred, after the handler exits.

### `noraw()`

Leave raw mode. Return to normal "cooked" mode with line buffering.

### `pair_content(pair_number)`

Return a tuple `(fg, bg)` containing the colors for the requested color pair.
The value of *pair_number* must be between `0` and `COLOR_PAIRS - 1`.

### `pair_number(attr)`

Return the number of the color-pair set by the attribute value *attr*.
`color_pair()` is the counterpart to this function.
