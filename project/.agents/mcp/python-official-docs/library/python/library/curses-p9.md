---
title: "curses --- Terminal handling for character-cell displays (part 9 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/curses.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# curses --- Terminal handling for character-cell displays (part 9 of 10)

```text
+------------------+-----------+
| Keycap           | Constant  |
+==================+===========+
| :kbd:`Insert`    | KEY_IC    |
+------------------+-----------+
| :kbd:`Delete`    | KEY_DC    |
+------------------+-----------+
| :kbd:`Home`      | KEY_HOME  |
+------------------+-----------+
| :kbd:`End`       | KEY_END   |
+------------------+-----------+
| :kbd:`Page Up`   | KEY_PPAGE |
+------------------+-----------+
| :kbd:`Page Down` | KEY_NPAGE |
+------------------+-----------+
```

The following table lists characters from the alternate character set. These are
inherited from the VT100 terminal, and will generally be  available on software
emulations such as X terminals.  When there is no graphic available, curses
falls back on a crude printable ASCII approximation.

> **Note:** These are available only after `initscr()` has  been called.

```text
+------------------------+------------------------------------------+
| ACS code               | Meaning                                  |
+========================+==========================================+
| .. data:: ACS_BBSS     | alternate name for upper-right corner    |
+------------------------+------------------------------------------+
| .. data:: ACS_BLOCK    | solid square block                       |
+------------------------+------------------------------------------+
| .. data:: ACS_BOARD    | board of squares                         |
+------------------------+------------------------------------------+
| .. data:: ACS_BSBS     | alternate name for horizontal line       |
+------------------------+------------------------------------------+
| .. data:: ACS_BSSB     | alternate name for upper-left corner     |
+------------------------+------------------------------------------+
| .. data:: ACS_BSSS     | alternate name for top tee               |
+------------------------+------------------------------------------+
| .. data:: ACS_BTEE     | bottom tee                               |
+------------------------+------------------------------------------+
| .. data:: ACS_BULLET   | bullet                                   |
+------------------------+------------------------------------------+
| .. data:: ACS_CKBOARD  | checker board (stipple)                  |
+------------------------+------------------------------------------+
| .. data:: ACS_DARROW   | arrow pointing down                      |
+------------------------+------------------------------------------+
| .. data:: ACS_DEGREE   | degree symbol                            |
+------------------------+------------------------------------------+
| .. data:: ACS_DIAMOND  | diamond                                  |
+------------------------+------------------------------------------+
| .. data:: ACS_GEQUAL   | greater-than-or-equal-to                 |
+------------------------+------------------------------------------+
| .. data:: ACS_HLINE    | horizontal line                          |
+------------------------+------------------------------------------+
| .. data:: ACS_LANTERN  | lantern symbol                           |
+------------------------+------------------------------------------+
| .. data:: ACS_LARROW   | left arrow                               |
+------------------------+------------------------------------------+
| .. data:: ACS_LEQUAL   | less-than-or-equal-to                    |
+------------------------+------------------------------------------+
| .. data:: ACS_LLCORNER | lower-left corner                        |
+------------------------+------------------------------------------+
| .. data:: ACS_LRCORNER | lower-right corner                       |
+------------------------+------------------------------------------+
| .. data:: ACS_LTEE     | left tee                                 |
+------------------------+------------------------------------------+
| .. data:: ACS_NEQUAL   | not-equal sign                           |
+------------------------+------------------------------------------+
| .. data:: ACS_PI       | letter pi                                |
+------------------------+------------------------------------------+
| .. data:: ACS_PLMINUS  | plus-or-minus sign                       |
+------------------------+------------------------------------------+
| .. data:: ACS_PLUS     | big plus sign                            |
+------------------------+------------------------------------------+
| .. data:: ACS_RARROW   | right arrow                              |
+------------------------+------------------------------------------+
| .. data:: ACS_RTEE     | right tee                                |
+------------------------+------------------------------------------+
| .. data:: ACS_S1       | scan line 1                              |
+------------------------+------------------------------------------+
| .. data:: ACS_S3       | scan line 3                              |
+------------------------+------------------------------------------+
| .. data:: ACS_S7       | scan line 7                              |
+------------------------+------------------------------------------+
| .. data:: ACS_S9       | scan line 9                              |
+------------------------+------------------------------------------+
| .. data:: ACS_SBBS     | alternate name for lower-right corner    |
+------------------------+------------------------------------------+
| .. data:: ACS_SBSB     | alternate name for vertical line         |
+------------------------+------------------------------------------+
| .. data:: ACS_SBSS     | alternate name for right tee             |
+------------------------+------------------------------------------+
| .. data:: ACS_SSBB     | alternate name for lower-left corner     |
+------------------------+------------------------------------------+
| .. data:: ACS_SSBS     | alternate name for bottom tee            |
+------------------------+------------------------------------------+
| .. data:: ACS_SSSB     | alternate name for left tee              |
+------------------------+------------------------------------------+
| .. data:: ACS_SSSS     | alternate name for crossover or big plus |
+------------------------+------------------------------------------+
| .. data:: ACS_STERLING | pound sterling                           |
+------------------------+------------------------------------------+
| .. data:: ACS_TTEE     | top tee                                  |
+------------------------+------------------------------------------+
| .. data:: ACS_UARROW   | up arrow                                 |
+------------------------+------------------------------------------+
| .. data:: ACS_ULCORNER | upper-left corner                        |
+------------------------+------------------------------------------+
| .. data:: ACS_URCORNER | upper-right corner                       |
+------------------------+------------------------------------------+
| .. data:: ACS_VLINE    | vertical line                            |
+------------------------+------------------------------------------+
```

The following table lists mouse button constants used by `getmouse()`:

```text
+----------------------------------+---------------------------------------------+
| Mouse button constant            | Meaning                                     |
+==================================+=============================================+
| .. data:: BUTTONn_PRESSED        | Mouse button *n* pressed                    |
+----------------------------------+---------------------------------------------+
| .. data:: BUTTONn_RELEASED       | Mouse button *n* released                   |
+----------------------------------+---------------------------------------------+
| .. data:: BUTTONn_CLICKED        | Mouse button *n* clicked                    |
+----------------------------------+---------------------------------------------+
| .. data:: BUTTONn_DOUBLE_CLICKED | Mouse button *n* double clicked             |
+----------------------------------+---------------------------------------------+
| .. data:: BUTTONn_TRIPLE_CLICKED | Mouse button *n* triple clicked             |
+----------------------------------+---------------------------------------------+
| .. data:: BUTTON_SHIFT           | Shift was down during button state change   |
+----------------------------------+---------------------------------------------+
| .. data:: BUTTON_CTRL            | Control was down during button state change |
+----------------------------------+---------------------------------------------+
| .. data:: BUTTON_ALT             | Alt was down during button state change     |
+----------------------------------+---------------------------------------------+
```

> *Changed in version 3.10.*
> The `BUTTON5_*` constants are now exposed if they are provided by the
> underlying curses library.

The following table lists the predefined colors:

```text
+-------------------------+----------------------------+
| Constant                | Color                      |
+=========================+============================+
| .. data:: COLOR_BLACK   | Black                      |
+-------------------------+----------------------------+
| .. data:: COLOR_BLUE    | Blue                       |
+-------------------------+----------------------------+
| .. data:: COLOR_CYAN    | Cyan (light greenish blue) |
+-------------------------+----------------------------+
| .. data:: COLOR_GREEN   | Green                      |
+-------------------------+----------------------------+
| .. data:: COLOR_MAGENTA | Magenta (purplish red)     |
+-------------------------+----------------------------+
| .. data:: COLOR_RED     | Red                        |
+-------------------------+----------------------------+
| .. data:: COLOR_WHITE   | White                      |
+-------------------------+----------------------------+
| .. data:: COLOR_YELLOW  | Yellow                     |
+-------------------------+----------------------------+
```

# `curses.textpad` --- Text input widget for curses programs

Module `curses.textpad`.

The `curses.textpad` module provides a `Textbox` class that handles
elementary text editing in a curses window, supporting a set of keybindings
resembling those of Emacs (thus, also of Netscape Navigator, BBedit 6.x,
FrameMaker, and many other programs).  The module also provides a
rectangle-drawing function useful for framing text boxes or for other purposes.

The module `curses.textpad` defines the following function:

### `rectangle(win, uly, ulx, lry, lrx)`

Draw a rectangle.  The first argument must be a window object; the remaining
arguments are coordinates relative to that window.  The second and third
arguments are the y and x coordinates of the upper-left corner of the
rectangle to be drawn; the fourth and fifth arguments are the y and x
coordinates of the lower-right corner. The rectangle will be drawn using
VT100/IBM PC forms characters on terminals that make this possible (including
xterm and most other software terminal emulators).  Otherwise it will be drawn
with ASCII  dashes, vertical bars, and plus signs.
