---
title: "curses --- Terminal handling for character-cell displays (part 6 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/curses.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# curses --- Terminal handling for character-cell displays (part 6 of 10)

## Constants

The `curses` module defines the following data members:

### `ERR`

Some curses routines  that  return  an integer, such as `getch()`, return
`ERR` upon failure.

### `OK`

Some curses routines  that  return  an integer, such as  `napms()`, return
`OK` upon success.

### `version`

A bytes object representing the current version of the module.

### `ncurses_version`

A named tuple containing the three components of the ncurses library
version: *major*, *minor*, and *patch*.  All values are integers.  The
components can also be accessed by name,  so `curses.ncurses_version[0]`
is equivalent to `curses.ncurses_version.major` and so on.

Availability: if the ncurses library is used.

> *Added in version 3.8.*

### `COLORS`

The maximum number of colors the terminal can support.
It is defined only after the call to `start_color()`.

### `COLOR_PAIRS`

The maximum number of color pairs the terminal can support.
It is defined only after the call to `start_color()`.

### `COLS`

The width of the screen, that is, the number of columns.
It is defined only after the call to `initscr()`.
Updated by `update_lines_cols()`, `resizeterm()` and
`resize_term()`.
