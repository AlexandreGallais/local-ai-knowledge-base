---
title: "curses --- Terminal handling for character-cell displays (part 3 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/curses.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# curses --- Terminal handling for character-cell displays (part 3 of 10)

### `putp(str)`

Equivalent to `tputs(str, 1, putchar)`; emit the value of a specified
terminfo capability, a bytes object, for the current terminal.
Note that the output of `putp()` always goes to standard output.

`setupterm()` (or `initscr()`) must be called first.

### `qiflush([flag])`

If *flag* is `False`, the effect is the same as calling `noqiflush()`. If
*flag* is `True`, or no argument is provided, the queues will be flushed when
these control characters are read.

### `raw()`

Enter raw mode.  In raw mode, normal line buffering and  processing of
interrupt, quit, suspend, and flow control keys are turned off; characters are
presented to curses input functions one by one.

### `reset_prog_mode()`

Restore the  terminal  to "program" mode, as previously saved  by
`def_prog_mode()`.

### `reset_shell_mode()`

Restore the  terminal  to "shell" mode, as previously saved  by
`def_shell_mode()`.

### `resetty()`

Restore the state of the terminal modes to what it was at the last call to
`savetty()`.

### `resize_term(nlines, ncols)`

Backend function used by `resizeterm()`, performing most of the work;
when resizing the windows, `resize_term()` blank-fills the areas that are
extended.  The calling application should fill in these areas with
appropriate data.  The `resize_term()` function attempts to resize all
windows.  However, due to the calling convention of pads, it is not possible
to resize these without additional interaction with the application.

### `resizeterm(nlines, ncols)`

Resize the standard and current windows to the specified dimensions, and
adjusts other bookkeeping data used by the curses library that record the
window dimensions (in particular the SIGWINCH handler).

### `savetty()`

Save the current state of the terminal modes in a buffer, usable by
`resetty()`.

### `get_escdelay()`

Retrieves the value set by `set_escdelay()`.

> *Added in version 3.9.*

### `set_escdelay(ms)`

Sets the number of milliseconds to wait after reading an escape character,
to distinguish between an individual escape character entered on the
keyboard from escape sequences sent by cursor and function keys.

> *Added in version 3.9.*

### `get_tabsize()`

Retrieves the value set by `set_tabsize()`.

> *Added in version 3.9.*

### `set_tabsize(size)`

Sets the number of columns used by the curses library when converting a tab
character to spaces as it adds the tab to a window.

> *Added in version 3.9.*

### `setsyx(y, x)`

Set the virtual screen cursor to *y*, *x*. If *y* and *x* are both `-1`, then
`leaveok()` is set `True`.

### `setupterm(term=None, fd=-1)`

Initialize the terminal.  *term* is a string giving
the terminal name, or `None`; if omitted or `None`, the value of the
`TERM` environment variable will be used.  *fd* is the
file descriptor to which any initialization sequences will be sent; if not
supplied or `-1`, the file descriptor for `sys.stdout` will be used.

Raise a `curses.error` if the terminal could not be found or its
terminfo database entry could not be read.  If the terminal has already
been initialized, this function has no effect.

> **Note:** Calling `initscr()` after `setupterm()`
> leaks the terminal that `setupterm()` allocated:
> the curses library keeps only a single current terminal
> and does not free the previously allocated one.

### `start_color()`

Must be called if the programmer wants to use colors, and before any other color
manipulation routine is called.  It is good practice to call this routine right
after `initscr()`.

`start_color()` initializes eight basic <example-value> (black, red,  green, yellow,
blue, magenta, cyan, and white), and two global variables in the `curses`
module, `COLORS` and `COLOR_PAIRS`, containing the maximum number
of colors and color-pairs the terminal can support.  It also restores the colors
on the terminal to the values they had when the terminal was just turned on.

### `termattrs()`

Return a logical OR of all video attributes supported by the terminal.  This
information is useful when a curses program needs complete control over the
appearance of the screen.

### `termname()`

Return the name of the terminal in use, as a bytes object.
This is the name passed to `setupterm()`,
or the value of the `TERM` environment variable if none was given.
Some curses libraries truncate it to 14 characters.

### `tigetflag(capname)`

Return the value of the Boolean capability corresponding to the terminfo
capability name *capname* as an integer.  Return the value `-1` if *capname* is not a
Boolean capability, or `0` if it is canceled or absent from the terminal
description.

`setupterm()` (or `initscr()`) must be called first.

### `tigetnum(capname)`

Return the value of the numeric capability corresponding to the terminfo
capability name *capname* as an integer.  Return the value `-2` if *capname* is not a
numeric capability, or `-1` if it is canceled or absent from the terminal
description.

`setupterm()` (or `initscr()`) must be called first.

### `tigetstr(capname)`

Return the value of the string capability corresponding to the terminfo
capability name *capname* as a bytes object.  Return `None` if *capname*
is not a terminfo "string capability", or is canceled or absent from the
terminal description.

`setupterm()` (or `initscr()`) must be called first.

### `tparm(str[, ...])`

Instantiate the bytes object *str* with the supplied parameters, where *str* should
be a parameterized byte string obtained from the terminfo database.  For example,
`tparm(tigetstr("cup"), 5, 3)` could result in `b'\033[6;4H'`, the exact
result depending on terminal type.  Up to nine integer parameters may be supplied.

`setupterm()` (or `initscr()`) must be called first.

### `typeahead(fd)`

Specify that the file descriptor *fd* be used for typeahead checking.  If *fd*
is `-1`, then no typeahead checking is done.

The curses library does "line-breakout optimization" by looking for typeahead
periodically while updating the screen.  If input is found, and it is coming
from a tty, the current update is postponed until refresh or doupdate is called
again, allowing faster response to commands typed in advance. This function
allows specifying a different file descriptor for typeahead checking.

### `unctrl(ch)`

Return a bytes object which is a printable representation of the character *ch*;
any attributes and color pair are ignored.
Control characters are represented as a caret followed by the character, for
example as `b'^C'`. Printing characters are left as they are.

### `ungetch(ch)`

Push *ch* so the next `getch()` will return it.

*ch* may be an integer (a key code or the code of an encoded byte), a byte,
or a string of length 1 which encodes to a single byte.

> **Note:** Only one *ch* can be pushed before `getch()` is called.

### `update_lines_cols()`

Update the `LINES` and `COLS` module variables.
Useful for detecting manual screen resize.

> *Added in version 3.5.*

### `unget_wch(ch)`

Push *ch* so the next `get_wch()` will return it.

*ch* may be an integer (a character code, not a key code) or a string of
length 1.

> **Note:** Only one *ch* can be pushed before `get_wch()` is called.

> *Added in version 3.3.*

### `ungetmouse(id, x, y, z, bstate)`

Push a `KEY_MOUSE` event onto the input queue, associating the given
state data with it.

### `use_env(flag)`

If used, this function should be called before `initscr()` or newterm are
called.  When *flag* is `False`, the values of lines and columns specified in the
terminfo database will be used, even if environment variables `LINES`
and `COLUMNS` (used by default) are set, or if curses is running in a
window (in which case default behavior would be to use the window size if
`LINES` and `COLUMNS` are not set).

### `use_default_colors()`

Equivalent to `assume_default_colors(-1, -1)`.

### `wrapper(func, /, *args, **kwargs)`

Initialize curses and call another callable object, *func*, which should be the
rest of your curses-using application.  If the application raises an exception,
this function will restore the terminal to a sane state before re-raising the
exception and generating a traceback.  The callable object *func* is then passed
the main window 'stdscr' as its first argument, followed by any other arguments
passed to `wrapper()`.  Before calling *func*, `wrapper()` turns on
cbreak mode, turns off echo, enables the terminal keypad, and initializes colors
if the terminal has color support.  On exit (whether normally or by exception)
it restores cooked mode, turns on echo, and disables the terminal keypad.
