---
title: "Curses Programming with Python (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/curses.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Curses Programming with Python

Abstract

This document describes how to use the `curses` extension
module to control text-mode displays.

## What is curses?

The curses library supplies a terminal-independent screen-painting and
keyboard-handling facility for text-based terminals; such terminals
include VT100s, the Linux console, and the simulated terminal provided
by various programs.  Display terminals support various control codes
to perform common operations such as moving the cursor, scrolling the
screen, and erasing areas.  Different terminals use widely differing
codes, and often have their own minor quirks.

In a world of graphical displays, one might ask "why bother"?  It's
true that character-cell display terminals are an obsolete technology,
but there are niches in which being able to do fancy things with them
are still valuable.  One niche is on small-footprint or embedded
Unixes that don't run an X server.  Another is tools such as OS
installers and kernel configurators that may have to run before any
graphical support is available.

The curses library provides fairly basic <example-value>, providing the
programmer with an abstraction of a display containing multiple
non-overlapping windows of text.  The contents of a window can be
changed in various ways---adding text, erasing it, changing its
appearance---and the curses library will figure out what control codes
need to be sent to the terminal to produce the right output.  curses
doesn't provide many user-interface concepts such as buttons, checkboxes,
or dialogs; if you need such features, consider a user interface library such as
Urwid.

The curses library was originally written for BSD Unix; the later System V
versions of Unix from AT&T added many enhancements and new functions. BSD curses
is no longer maintained, having been replaced by ncurses, which is an
open-source implementation of the AT&T interface.  If you're using an
open-source Unix such as Linux or FreeBSD, your system almost certainly uses
ncurses.  Since most current commercial Unix versions are based on System V
code, all the functions described here will probably be available.  The older
versions of curses carried by some proprietary Unixes may not support
everything, though.

The Windows version of Python doesn't include the `curses` module.
The third-party windows-curses package provides the same interface on Windows.

### The Python curses module

The Python module is a fairly simple wrapper over the C functions provided by
curses; if you're already familiar with curses programming in C, it's really
easy to transfer that knowledge to Python.  The biggest difference is that the
Python interface makes things simpler by merging different C functions such as
`addstr`, `mvaddstr`, and `mvwaddstr` into a single
`addstr()` method.  You'll see this covered in more
detail later.

This HOWTO is an introduction to writing text-mode programs with curses
and Python. It doesn't attempt to be a complete guide to the curses API; for
that, see the Python library guide's section on ncurses, and the C manual pages
for ncurses.  It will, however, give you the basic ideas.

## Starting and ending a curses application

Before doing anything, curses must be initialized.  This is done by
calling the `initscr()` function, which will determine the
terminal type, send any required setup codes to the terminal, and
create various internal data structures.  If successful,
`initscr()` returns a window object representing the entire
screen; this is usually called `stdscr` after the name of the
corresponding C variable.:

```
import curses
stdscr = curses.initscr()
```

Usually curses applications turn off automatic echoing of keys to the
screen, in order to be able to read keys and only display them under
certain circumstances.  This requires calling the
`noecho()` function.:

```
curses.noecho()
```

Applications will also commonly need to react to keys instantly,
without requiring the Enter key to be pressed; this is called cbreak
mode, as opposed to the usual buffered input mode.:

```
curses.cbreak()
```

Terminals usually return special keys, such as the cursor keys or navigation
keys such as Page Up and Home, as a multibyte escape sequence.  While you could
write your application to expect such sequences and process them accordingly,
curses can do it for you, returning a special value such as
`curses.KEY_LEFT`.  To get curses to do the job, you'll have to enable
keypad mode.:

```
stdscr.keypad(True)
```

Terminating a curses application is much easier than starting one. You'll need
to call:

```
curses.nocbreak()
stdscr.keypad(False)
curses.echo()
```

to reverse the curses-friendly terminal settings. Then call the
`endwin()` function to restore the terminal to its original
operating mode.:

```
curses.endwin()
```

A common problem when debugging a curses application is to get your terminal
messed up when the application dies without restoring the terminal to its
previous state.  In Python this commonly happens when your code is buggy and
raises an uncaught exception.  Keys are no longer echoed to the screen when
you type them, for example, which makes using the shell difficult.

In Python you can avoid these complications and make debugging much easier by
importing the `curses.wrapper()` function and using it like this:

```
from curses import wrapper

def main(stdscr):
    # Clear screen
    stdscr.clear()

    # This raises ZeroDivisionError when i == 10.
    for i in range(0, 11):
        v = i-10
        stdscr.addstr(i, 0, '10 divided by {} is {}'.format(v, 10/v))

        stdscr.refresh()
        stdscr.getkey()

wrapper(main)
```

The `wrapper()` function takes a callable object and does the
initializations described above, also initializing colors if color
support is present.  `wrapper()` then runs your provided callable.
Once the callable returns, `wrapper()` will restore the original
state of the terminal.  The callable is called inside a
`try`...`except` that catches exceptions, restores
the state of the terminal, and then re-raises the exception.  Therefore
your terminal won't be left in a funny state on exception and you'll be
able to read the exception's message and traceback.

## Windows and Pads

Windows are the basic <example-value> in curses.  A window object represents a
rectangular area of the screen, and supports methods to display text,
erase it, allow the user to input strings, and so forth.

The `stdscr` object returned by the `initscr()` function is a
window object that covers the entire screen.  Many programs may need
only this single window, but you might wish to divide the screen into
smaller windows, in order to redraw or clear them separately. The
`newwin()` function creates a new window of a given size,
returning the new window object.:

```
begin_x = 20; begin_y = 7
height = 5; width = 40
win = curses.newwin(height, width, begin_y, begin_x)
```

Note that the coordinate system used in curses is unusual.
Coordinates are always passed in the order *y,x*, and the top-left
corner of a window is coordinate (0,0).  This breaks the normal
convention for handling coordinates where the *x* coordinate comes
first.  This is an unfortunate difference from most other computer
applications, but it's been part of curses since it was first written,
and it's too late to change things now.

Your application can determine the size of the screen by using the
`curses.LINES` and `curses.COLS` variables to obtain the *y* and
*x* sizes.  Legal coordinates will then extend from `(0,0)` to
`(curses.LINES - 1, curses.COLS - 1)`.

When you call a method to display or erase text, the effect doesn't
immediately show up on the display.  Instead you must call the
`refresh()` method of window objects to update the
screen.

This is because curses was originally written with slow 300-baud
terminal connections in mind; with these terminals, minimizing the
time required to redraw the screen was very important.  Instead curses
accumulates changes to the screen and displays them in the most
efficient manner when you call `refresh()`.  For example, if your
program displays some text in a window and then clears the window,
there's no need to send the original text because they're never
visible.

In practice, explicitly telling curses to redraw a window doesn't
really complicate programming with curses much. Most programs go into a flurry
of activity, and then pause waiting for a keypress or some other action on the
part of the user.  All you have to do is to be sure that the screen has been
redrawn before pausing to wait for user input, by first calling
`stdscr.refresh()` or the `refresh()` method of some other relevant
window.

A pad is a special case of a window; it can be larger than the actual display
screen, and only a portion of the pad displayed at a time. Creating a pad
requires the pad's height and width, while refreshing a pad requires giving the
coordinates of the on-screen area where a subsection of the pad will be
displayed.:

```
pad = curses.newpad(100, 100)
# These loops fill the pad with letters; addch() is
# explained in the next section
for y in range(0, 99):
    for x in range(0, 99):
        pad.addch(y,x, ord('a') + (x*x+y*y) % 26)

# Displays a section of the pad in the middle of the screen.
# (0,0) : coordinate of upper-left corner of pad area to display.
# (5,5) : coordinate of upper-left corner of window area to be filled
#         with pad content.
# (20, 75) : coordinate of lower-right corner of window area to be
#          : filled with pad content.
pad.refresh( 0,0, 5,5, 20,75)
```

The `refresh()` call displays a section of the pad in the rectangle
extending from coordinate (5,5) to coordinate (20,75) on the screen; the upper
left corner of the displayed section is coordinate (0,0) on the pad.  Beyond
that difference, pads are exactly like ordinary windows and support the same
methods.

If you have multiple windows and pads on screen there is a more
efficient way to update the screen and prevent annoying screen flicker
as each part of the screen gets updated.  `refresh()` actually
does two things:

1) Calls the `noutrefresh()` method of each window
to update an underlying data structure representing the desired
state of the screen.
2) Calls the function `doupdate()` function to change the
physical screen to match the desired state recorded in the data structure.

Instead you can call `noutrefresh()` on a number of windows to
update the data structure, and then call `doupdate()` to update
the screen.
