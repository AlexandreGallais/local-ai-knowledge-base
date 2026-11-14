---
title: "Curses Programming with Python (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/curses.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Curses Programming with Python (part 2 of 2)

## Displaying Text

From a C programmer's point of view, curses may sometimes look like a
twisty maze of functions, all subtly different.  For example,
`addstr` displays a string at the current cursor location in
the `stdscr` window, while `mvaddstr` moves to a given y,x
coordinate first before displaying the string. `waddstr` is just
like `addstr`, but allows specifying a window to use instead of
using `stdscr` by default. `mvwaddstr` allows specifying both
a window and a coordinate.

Fortunately the Python interface hides all these details.  `stdscr`
is a window object like any other, and methods such as
`addstr()` accept multiple argument forms.  Usually there
are four different forms.

```text
+---------------------------------+-----------------------------------------------+
| Form                            | Description                                   |
+=================================+===============================================+
| *str* or *ch*                   | Display the string *str* or character *ch* at |
|                                 | the current position                          |
+---------------------------------+-----------------------------------------------+
| *str* or *ch*, *attr*           | Display the string *str* or character *ch*,   |
|                                 | using attribute *attr* at the current         |
|                                 | position                                      |
+---------------------------------+-----------------------------------------------+
| *y*, *x*, *str* or *ch*         | Move to position *y,x* within the window, and |
|                                 | display *str* or *ch*                         |
+---------------------------------+-----------------------------------------------+
| *y*, *x*, *str* or *ch*, *attr* | Move to position *y,x* within the window, and |
|                                 | display *str* or *ch*, using attribute *attr* |
+---------------------------------+-----------------------------------------------+
```

Attributes allow displaying text in highlighted forms such as boldface,
underline, reverse code, or in color.  They'll be explained in more detail in
the next subsection.

The `addstr()` method takes a Python string or
bytestring as the value to be displayed.  The contents of bytestrings
are sent to the terminal as-is.
On a build without wide-character support strings are encoded
using the value of the window's `encoding` attribute;
this defaults to the default system encoding
as returned by `locale.getencoding()`.

The `addch()` methods take a character, which can be
either a string of length 1, a bytestring of length 1, or an integer.

Constants are provided for the characters of the terminal's alternate
character set.
For example, `ACS_PLMINUS` is a +/-
symbol, and `ACS_ULCORNER` is the upper left corner of a box
(handy for drawing borders).  You can also use the appropriate Unicode
character.

Windows remember where the cursor was left after the last operation, so if you
leave out the *y,x* coordinates, the string or character will be displayed
wherever the last operation left off.  You can also move the cursor with the
`move(y,x)` method.  Because some terminals always display a flashing cursor,
you may want to ensure that the cursor is positioned in some location where it
won't be distracting; it can be confusing to have the cursor blinking at some
apparently random location.

If your application doesn't need a blinking cursor at all, you can
call `curs_set(False)` to make it invisible.
The window method `leaveok()` does something different:
when its argument is true,
curses leaves the cursor wherever the last update put it,
instead of moving it back to the window's cursor position.

### Attributes and Color

Characters can be displayed in different ways.  Status lines in a text-based
application are commonly shown in reverse video, or a text viewer may need to
highlight certain words.  curses supports this by allowing you to specify an
attribute for each cell on the screen.

An attribute is an integer, each bit representing a different
attribute.  You can try to display text with multiple attribute bits
set, but curses doesn't guarantee that all the possible combinations
are available, or that they're all visually distinct.  That depends on
the ability of the terminal being used, so it's safest to stick to the
most commonly available attributes, listed here.

```text
+----------------------+--------------------------------------+
| Attribute            | Description                          |
+======================+======================================+
| :const:`A_BLINK`     | Blinking text                        |
+----------------------+--------------------------------------+
| :const:`A_BOLD`      | Extra bright or bold text            |
+----------------------+--------------------------------------+
| :const:`A_DIM`       | Half bright text                     |
+----------------------+--------------------------------------+
| :const:`A_REVERSE`   | Reverse-video text                   |
+----------------------+--------------------------------------+
| :const:`A_STANDOUT`  | The best highlighting mode available |
+----------------------+--------------------------------------+
| :const:`A_UNDERLINE` | Underlined text                      |
+----------------------+--------------------------------------+
```

So, to display a reverse-video status line on the top line of the screen, you
could code:

```
stdscr.addstr(0, 0, "Current mode: Typing mode",
              curses.A_REVERSE)
stdscr.refresh()
```

The curses library also supports color on those terminals that provide it. The
most common such terminal is probably the Linux console, followed by color
xterms.

To use color, you must call the `start_color()` function soon
after calling `initscr()`, to initialize the default color set
(the `curses.wrapper()` function does this automatically).  Once that's
done, the `has_colors()` function returns TRUE if the terminal
in use can
actually display color.  (Note: curses uses the American spelling 'color',
instead of the Canadian/British spelling 'colour'.  If you're used to the
British spelling, you'll have to resign yourself to misspelling it for the sake
of these functions.)

The curses library maintains a finite number of color pairs, containing a
foreground (or text) color and a background color.  You can get the attribute
value corresponding to a color pair with the `color_pair()`
function; this can be bitwise-OR'ed with other attributes such as
`A_REVERSE`, but again, such combinations are not guaranteed to work
on all terminals.

An example, which displays a line of text using color pair 1:

```
stdscr.addstr("Pretty text", curses.color_pair(1))
stdscr.refresh()
```

As I said before, a color pair consists of a foreground and background color.
The `init_pair(n, f, b)` function changes the definition of color pair *n*, to
foreground color f and background color b.  Color pair 0 is hard-wired to white
on black, and cannot be changed.

Colors are numbered, and `start_color()` initializes 8 basic
colors when it activates color mode.  They are: 0:black, 1:red,
2:green, 3:yellow, 4:blue, 5:magenta, 6:cyan, and 7:white.  The `curses`
module defines named constants for each of these colors:
`curses.COLOR_BLACK`, `curses.COLOR_RED`, and so forth.

Let's put all this together. To change color 1 to red text on a white
background, you would call:

```
curses.init_pair(1, curses.COLOR_RED, curses.COLOR_WHITE)
```

When you change a color pair, any text already displayed using that color pair
will change to the new colors.  You can also display new text in this color
with:

```
stdscr.addstr(0,0, "RED ALERT!", curses.color_pair(1))
```

Very fancy terminals can change the definitions of the actual colors to a given
RGB value.  This lets you change color 1, which is usually red, to purple or
blue or any other color you like.  Unfortunately, the Linux console doesn't
support this, so I'm unable to try it out, and can't provide any examples.  You
can check if your terminal can do this by calling
`can_change_color()`, which returns `True` if the capability is
there.  If you're lucky enough to have such a talented terminal, consult your
system's man pages for more information.

## User Input

The C curses library offers only very simple input mechanisms. Python's
`curses` module adds a basic <example-value> widget.  (Other libraries
such as Urwid have more extensive collections of widgets.)

There are three methods for getting input from a window:

- `get_wch()` refreshes the screen and then waits for
the user to hit a key, displaying the key if `echo()` has been
called earlier.  You can optionally specify a coordinate to which
the cursor should be moved before pausing.

- `getch()` does the same thing but returns the code of
the key <example-value> of a character.
With ncurses this is a single byte of the key's encoding in the current
locale, so a character encoded with several bytes takes several calls,
one byte per call.

- `getkey()` does the same as `getch()` but returns
a string:
an ordinary key as a 1-character string,
and a special key as its name, such as `KEY_UP`.

It's possible to not wait for the user using the
`nodelay()` window method. After `nodelay(True)`,
the reads for the window become non-blocking.
To signal that no input is ready,
`get_wch()` and `getkey()` raise an exception,
and `getch()` returns `-1`.
There's also a `halfdelay()` function, which can be used to (in
effect) set a timer on each read; if no input becomes
available within a specified delay (measured in tenths of a second),
the read fails the same way.

Special keys such as Page Up, Home, or the cursor keys are returned by all
three as one of the KEY_* constants,
all larger than 255.
You can compare the value returned to constants such as
`curses.KEY_PPAGE`,
`curses.KEY_HOME`, or `curses.KEY_LEFT`.  The main loop of
your program may look something like this:

```
while True:
    c = stdscr.get_wch()
    if c == 'p':
        PrintDocument()
    elif c == 'q':
        break  # Exit the while loop
    elif c == curses.KEY_HOME:
        x = y = 0
```

The `curses.ascii` module supplies ASCII class membership functions that
take either integer or 1-character string arguments; these may be useful in
writing more readable tests for such loops.  It also supplies
conversion functions  that take either integer or 1-character-string arguments
and return the same type.  For example, `curses.ascii.ctrl()` returns the
control character corresponding to its argument.

There's also a method to retrieve an entire line,
`getstr()`.  It isn't used very often, because its
functionality is quite limited; the only editing keys available are
the erase and kill characters, and the Enter key, which terminates the line.
It returns a bytes object,
and can optionally be limited to a fixed number of bytes.:

```
curses.echo()            # Enable echoing of characters

# Get a line of at most 15 bytes, with the cursor on the top line
s = stdscr.getstr(0,0, 15)
```

The `curses.textpad` module supplies a text box that supports an
Emacs-like set of keybindings.  Various methods of the
`Textbox` class support editing with input
validation and gathering the edit results either with or without
trailing spaces.  Here's an example:

```
import curses
from curses.textpad import Textbox, rectangle

def main(stdscr):
    stdscr.addstr(0, 0, "Enter IM message: (hit Ctrl-G to send)")

    editwin = curses.newwin(5,30, 2,1)
    rectangle(stdscr, 1,0, 1+5+1, 1+30+1)
    stdscr.refresh()

    box = Textbox(editwin)

    # Let the user edit until Ctrl-G is struck.
    box.edit()

    # Get resulting contents
    message = box.gather()
```

See the library documentation on `curses.textpad` for more details.

## For More Information

This HOWTO doesn't cover some advanced topics, such as reading the
contents of the screen or capturing mouse events from an xterm
instance, but the Python library page for the `curses` module is now
reasonably complete.  You should browse it next.

If you're in doubt about the detailed behavior of the curses
functions, consult the manual pages for your curses implementation,
whether it's ncurses or a proprietary Unix vendor's.  The manual pages
will document any quirks, and provide complete lists of all the
functions, attributes, and ACS_* characters available to
you.

Because the curses API is so large, some functions aren't supported in
the Python interface.  Often this isn't because they're difficult to
implement, but because no one has needed them yet.  Also, Python
doesn't yet support the menu library associated with ncurses.
Patches adding support for these would be welcome; see
the Python Developer's Guide to
learn more about submitting patches to Python.

- Writing Programs with NCURSES:
a lengthy tutorial for C programmers.
- The ncurses man page
- The ncurses FAQ
- "Use curses... don't swear":
video of a PyCon 2013 talk on controlling terminals using curses or Urwid.
- "Console Applications with Urwid":
video of a PyCon CA 2012 talk demonstrating some applications written using
Urwid.
