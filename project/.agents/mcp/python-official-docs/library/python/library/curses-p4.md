---
title: "curses --- Terminal handling for character-cell displays (part 4 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/curses.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# curses --- Terminal handling for character-cell displays (part 4 of 10)

## Window objects

### class `window`

Window objects, as returned by `initscr()` and `newwin()` above, have
the following methods and attributes:

### `window.addch(ch[, attr])`

```python
window.addch(y, x, ch[, attr])
```

Paint character *ch* at `(y, x)` with attributes *attr*, overwriting any
character previously painted at that location.  By default, the character
position and attributes are the current settings for the window object.

> **Note:** Writing outside the window, subwindow, or pad raises a `curses.error`.
> Attempting to write to the lower-right corner of a window, subwindow,
> or pad will cause an exception to be raised after the character is printed.

### `window.addnstr(str, n[, attr])`

```python
window.addnstr(y, x, str, n[, attr])
```

Paint at most *n* characters of the character string *str* at
`(y, x)` with attributes
*attr*, overwriting anything previously on the display.

### `window.addstr(str[, attr])`

```python
window.addstr(y, x, str[, attr])
```

Paint the character string *str* at `(y, x)` with attributes
*attr*, overwriting anything previously on the display.

> **Note:** - Writing outside the window, subwindow, or pad raises `curses.error`.
> Attempting to write to the lower-right corner of a window, subwindow,
> or pad will cause an exception to be raised after the string is printed.
>
> - A bug in ncurses, the backend for this Python module, could cause
> segfaults when resizing windows.  This was fixed in ncurses-6.1-20190511.
> If you are stuck with an earlier ncurses, you can avoid triggering it by
> not calling `addstr()` with a *str* that has embedded newlines;
> instead, call `addstr()` separately for each line.

### `window.attroff(attr)`

Remove attribute *attr* from the "background" set applied to all writes to the
current window.

### `window.attron(attr)`

Add attribute *attr* to the "background" set applied to all writes to the
current window.

### `window.attrset(attr)`

Set the "background" set of attributes to *attr*.  This set is initially
`0` (no attributes).

### `window.bkgd(ch[, attr])`

Set the background property of the window to the character *ch*, with
attributes *attr*.  The change is then applied to every character position in
that window:

- The attribute of every character in the window  is changed to the new
background attribute.

- Wherever  the  former background character appears, it is changed to the new
background character.

### `window.bkgdset(ch[, attr])`

Set the window's background.  A window's background consists of a character and
any combination of attributes.  The attribute part of the background is combined
(OR'ed) with all non-blank characters that are written into the window.  Both
the character and attribute parts of the background are combined with the blank
characters.  The background becomes a property of the character and moves with
the character through any scrolling and insert/delete line/character operations.

### `window.border([ls[, rs[, ts[, bs[, tl[, tr[, bl[, br]]]]]]]])`

Draw a border around the edges of the window. Each parameter specifies  the
character to use for a specific part of the border; see the table below for more
details.

> **Note:** A `0` value for any parameter will cause the default character to be used for
> that parameter.  Keyword parameters can *not* be used.  The defaults are listed
> in this table:

```text
+-----------+---------------------+-----------------------+
| Parameter | Description         | Default value         |
+===========+=====================+=======================+
| *ls*      | Left side           | :const:`ACS_VLINE`    |
+-----------+---------------------+-----------------------+
| *rs*      | Right side          | :const:`ACS_VLINE`    |
+-----------+---------------------+-----------------------+
| *ts*      | Top                 | :const:`ACS_HLINE`    |
+-----------+---------------------+-----------------------+
| *bs*      | Bottom              | :const:`ACS_HLINE`    |
+-----------+---------------------+-----------------------+
| *tl*      | Upper-left corner   | :const:`ACS_ULCORNER` |
+-----------+---------------------+-----------------------+
| *tr*      | Upper-right corner  | :const:`ACS_URCORNER` |
+-----------+---------------------+-----------------------+
| *bl*      | Bottom-left corner  | :const:`ACS_LLCORNER` |
+-----------+---------------------+-----------------------+
| *br*      | Bottom-right corner | :const:`ACS_LRCORNER` |
+-----------+---------------------+-----------------------+
```

### `window.box([vertch, horch])`

Similar to `border()`, but both *ls* and *rs* are *vertch* and both *ts* and
*bs* are *horch*.  The default corner characters are always used by this function.

### `window.chgat(attr)`

```python
window.chgat(num, attr)
window.chgat(y, x, attr)
window.chgat(y, x, num, attr)
```

Set the attributes of *num* characters at the current cursor position, or at
position `(y, x)` if supplied. If *num* is not given or is `-1`,
the attribute will be set on all the characters to the end of the line.  This
function moves cursor to position `(y, x)` if supplied. The changed line
will be touched using the `touchline()` method so that the contents will
be redisplayed by the next window refresh.

### `window.clear()`

Like `erase()`, but also cause the whole window to be repainted upon next
call to `refresh()`.

### `window.clearok(flag)`

If *flag* is `True`, the next call to `refresh()` will clear the window
completely.

### `window.clrtobot()`

Erase from cursor to the end of the window: all lines below the cursor are
deleted, and then the equivalent of `clrtoeol()` is performed.

### `window.clrtoeol()`

Erase from cursor to the end of the line.

### `window.cursyncup()`

Update the current cursor position of all the ancestors of the window to
reflect the current cursor position of the window.

### `window.delch([y, x])`

Delete the character under the cursor, or at `(y, x)` if specified.  All
characters to the right on the same line are shifted one position left.

### `window.deleteln()`

Delete the line under the cursor. All following lines are moved up by one line.

### `window.derwin(begin_y, begin_x)`

```python
window.derwin(nlines, ncols, begin_y, begin_x)
```

An abbreviation for "derive window", `derwin()` is the same as calling
`subwin()`, except that *begin_y* and *begin_x* are relative to the origin
of the window, rather than relative to the entire screen.  Return a window
object for the derived window.

### `window.echochar(ch[, attr])`

Add character *ch* with attribute *attr*, and immediately  call `refresh()`
on the window.

### `window.enclose(y, x)`

Test whether the given pair of screen-relative character-cell coordinates are
enclosed by the given window, returning `True` or `False`.  It is useful for
determining what subset of the screen windows enclose the location of a mouse
event.

> *Changed in version 3.10.*
> Previously it returned `1` or `0` instead of `True` or `False`.

### `window.encoding`

Encoding used to encode the string arguments of the methods and to decode
their results on a build without wide-character support.
The encoding attribute is inherited from the parent window when a subwindow
is created, for example with `window.subwin()`.
By default, current locale encoding is used (see `locale.getencoding()`).

> *Added in version 3.3.*

### `window.erase()`

Clear the window.

### `window.getbegyx()`

Return a tuple `(y, x)` of coordinates of upper-left corner.

### `window.getbkgd()`

Return the given window's current background character/attribute pair.
Its components can be extracted like those of `inch()`.

### `window.getch([y, x])`

Read a key press, after moving the cursor to *y*, *x* if specified,
and return it as an integer.
The window is refreshed first if it is not a pad and was modified since
the last refresh.
Wait until a key is pressed, or return `-1` if the read is non-blocking
or times out (see `nodelay()` and `timeout()`).

An ordinary key is returned as the code of a single byte of its encoding
in the current locale,
so a character encoded with several bytes takes several calls.
For example, in a UTF-8 locale `'é'` is read as `195`, then `169`.
Use `get_wch()` to read it as a single character.

In keypad mode (see `keypad()`) function keys and other special keys
are returned as one of the KEY_* constants,
which cannot be mistaken for an ordinary key.
Otherwise, or if their escape sequence does not arrive in time
(see `notimeout()` and `set_escdelay()`),
their bytes are returned one at a time.

In echo mode (see `echo()`) the key is added to the window as by
`addch()`; special keys are not echoed.

### `window.get_wch([y, x])`

Read a key press, after moving the cursor to *y*, *x* if specified,
and return it as a one-character `str`.
The window is refreshed first if it is not a pad and was modified since
the last refresh.
Wait until a key is pressed, or raise `error` if the read is
non-blocking or times out (see `nodelay()` and `timeout()`).

In keypad mode (see `keypad()`) function keys and other special keys
are returned as one of the KEY_* constants,
an integer.
Otherwise, or if their escape sequence does not arrive in time
(see `notimeout()` and `set_escdelay()`),
their characters are returned one at a time.

In echo mode (see `echo()`) the key is added to the window as by
`addch()`; special keys are not echoed.

> *Added in version 3.3.*

### `window.getkey([y, x])`

Read a key press as `getch()` does, but return it as a `str`:
an ordinary key as a one-character string, the byte decoded as Latin-1,
and a special key as its name, such as `'KEY_UP'` (see `keyname()`).
Raise `error` instead of returning `-1` if there is no input.

### `window.getmaxyx()`

Return a tuple `(y, x)` of the height and width of the window.

### `window.getparyx()`

Return the beginning coordinates of this window relative to its parent window
as a tuple `(y, x)`.  Return `(-1, -1)` if this window has no
parent.

### `window.getstr()`

```python
window.getstr(n)
window.getstr(y, x)
window.getstr(y, x, n)
```

Read a line of input from the user, with primitive line editing capacity,
after moving the cursor to *y*, *x* if specified.
Return it as a bytes object, in the encoding of the current locale
and without the terminating newline.
At most *n* bytes are read;
*n* defaults to and cannot exceed 2047.

> *Changed in version 3.14.*
> The maximum value for *n* was increased from 1023 to 2047.

### `window.getyx()`

Return a tuple `(y, x)` of current cursor position  relative to the window's
upper-left corner.

### `window.hline(ch, n[, attr])`

```python
window.hline(y, x, ch, n[, attr])
```

Display a horizontal line starting at `(y, x)` with length *n* consisting of
the character *ch* with attributes *attr*.  The line stops at the right edge
of the window if fewer than *n* cells are available.

### `window.idcok(flag)`

If *flag* is `False`, curses no longer considers using the hardware insert/delete
character feature of the terminal; if *flag* is `True`, use of character insertion
and deletion is enabled.  When curses is first initialized, use of character
insert/delete is enabled by default.

### `window.idlok(flag)`

If *flag* is `True`, `curses` will try to use hardware line
editing facilities.  Otherwise, curses will not use them.

### `window.immedok(flag)`

If *flag* is `True`, any change in the window image automatically causes the
window to be refreshed; you no longer have to call `refresh()` yourself.
However, it may degrade performance considerably, due to repeated calls to
wrefresh.  This option is disabled by default.

### `window.inch([y, x])`

Return the character at the given position in the window.
The bottom 8 bits are the character proper and the upper bits are the attributes;
extract them with the `A_CHARTEXT` and `A_ATTRIBUTES` bit-masks,
and the color pair with `pair_number()`.
The character byte is the locale-encoded byte of the cell's character,
consistent with `instr()`.
On a wide-character build, a character that does not fit in a single byte
in the current locale has a character byte of `0`;
use `instr()` to read such characters.

### `window.insch(ch[, attr])`

```python
window.insch(y, x, ch[, attr])
```

Insert character *ch* with attributes *attr* before the character under the
cursor, or at `(y, x)` if specified.  All characters to the right of the
cursor are shifted one position right, with the rightmost character on the
line being lost.
The cursor position does not change (after moving to *y*, *x*, if specified).

### `window.insdelln(nlines)`

Insert *nlines* lines into the specified window above the current line.  The
*nlines* bottom lines are lost.  For negative *nlines*, delete *nlines* lines
starting with the one under the cursor, and move the remaining lines up.  The
bottom *nlines* lines are cleared.  The current cursor position remains the
same.

### `window.insertln()`

Insert a blank line under the cursor. All following lines are moved down by one
line.

### `window.insnstr(str, n[, attr])`

```python
window.insnstr(y, x, str, n[, attr])
```

Insert a character string (as many characters as will fit on the line) before
the character under the cursor, up to *n* characters.   If *n* is negative,
the entire string is inserted. All characters to the right of the
cursor are shifted right, with the rightmost characters on the line being lost.
The cursor position does not change (after moving to *y*, *x*, if specified).

### `window.insstr(str[, attr])`

```python
window.insstr(y, x, str[, attr])
```

Insert a character string (as many characters as will fit on the line) before
the character under the cursor.  All characters to the right of the cursor are
shifted right, with the rightmost characters on the line being lost.  The cursor
position does not change (after moving to *y*, *x*, if specified).

### `window.instr([n])`

```python
window.instr(y, x[, n])
```

Read the text of the window from the current cursor position,
or from *y*, *x* if specified, to the end of the line,
and return it as a bytes object, in the encoding of the current locale.
Attributes and color pairs are stripped.
At most *n* bytes are read; *n* defaults to and cannot exceed 2047.

> *Changed in version 3.14.*
> The maximum value for *n* was increased from 1023 to 2047.

### `window.is_linetouched(line)`

Return `True` if the specified line was modified since the last call to
`refresh()`; otherwise return `False`.  Raise a `curses.error`
exception if *line* is not valid for the given window.

### `window.is_wintouched()`

Return `True` if the specified window was modified since the last call to
`refresh()`; otherwise return `False`.
