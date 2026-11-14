---
title: "curses --- Terminal handling for character-cell displays (part 10 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/curses.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# curses --- Terminal handling for character-cell displays (part 10 of 10)

## Textbox objects

You can instantiate a `Textbox` object as follows:

### class `Textbox(win, insert_mode=False)`

Return a textbox widget object.  The *win* argument should be a curses
window object in which the textbox is to
be contained.  If *insert_mode* is true, the textbox inserts typed
characters, shifting existing text to the right, rather than overwriting it.
The edit cursor of the textbox is initially located at the
upper-left corner of the containing window, with coordinates `(0, 0)`.
The instance's `stripspaces` flag is initially on.

`Textbox` objects have the following methods:

### `edit(validate=None)`

This is the entry point you will normally use.  It accepts editing
keystrokes until one of the termination keystrokes is entered.  If
*validate* is supplied, it must be a function.  It will be called for
each keystroke entered with the keystroke as a parameter; command dispatch
is done on the result.  If it returns a false value, the keystroke is
ignored.  This method returns the window contents as a
string; whether blanks in the window are included is affected by the
`stripspaces` attribute.

### `do_command(ch)`

Process a single command keystroke.  Returns `1` to continue editing,
or `0` if a termination keystroke was processed.  Here are the supported
special keystrokes:

```text
+------------------+-------------------------------------------+
| Keystroke        | Action                                    |
+==================+===========================================+
| :kbd:`Control-A` | Go to left edge of window.                |
+------------------+-------------------------------------------+
| :kbd:`Control-B` | Cursor left, wrapping to previous line if |
|                  | appropriate.                              |
+------------------+-------------------------------------------+
| :kbd:`Control-D` | Delete character under cursor.            |
+------------------+-------------------------------------------+
| :kbd:`Control-E` | Go to right edge (stripspaces off) or end |
|                  | of line (stripspaces on).                 |
+------------------+-------------------------------------------+
| :kbd:`Control-F` | Cursor right, wrapping to next line when  |
|                  | appropriate.                              |
+------------------+-------------------------------------------+
| :kbd:`Control-G` | Terminate, returning the window contents. |
+------------------+-------------------------------------------+
| :kbd:`Control-H` | Delete character backward.                |
+------------------+-------------------------------------------+
| :kbd:`Control-J` | Terminate if the window is 1 line,        |
|                  | otherwise move to the start of the next   |
|                  | line.                                     |
+------------------+-------------------------------------------+
| :kbd:`Control-K` | If line is blank, delete it, otherwise    |
|                  | clear to end of line.                     |
+------------------+-------------------------------------------+
| :kbd:`Control-L` | Refresh screen.                           |
+------------------+-------------------------------------------+
| :kbd:`Control-N` | Cursor down; move down one line.          |
+------------------+-------------------------------------------+
| :kbd:`Control-O` | Insert a blank line at cursor location.   |
+------------------+-------------------------------------------+
| :kbd:`Control-P` | Cursor up; move up one line.              |
+------------------+-------------------------------------------+
```

Move operations do nothing if the cursor is at an edge where the movement
is not possible.  The following synonyms are supported where possible:

```text
+--------------------------------+------------------+
| Constant                       | Keystroke        |
+================================+==================+
| :const:`~curses.KEY_LEFT`      | :kbd:`Control-B` |
+--------------------------------+------------------+
| :const:`~curses.KEY_RIGHT`     | :kbd:`Control-F` |
+--------------------------------+------------------+
| :const:`~curses.KEY_UP`        | :kbd:`Control-P` |
+--------------------------------+------------------+
| :const:`~curses.KEY_DOWN`      | :kbd:`Control-N` |
+--------------------------------+------------------+
| :const:`~curses.KEY_BACKSPACE` | :kbd:`Control-h` |
+--------------------------------+------------------+
```

All other keystrokes are treated as a command to insert the given
character and move right (with line wrapping).

### `gather()`

Return the window contents as a string; whether blanks in the
window are included is affected by the `stripspaces` member.

### `stripspaces`

This attribute is a flag which controls the interpretation of blanks in
the window.  When it is on, trailing blanks on each line are ignored; any
cursor motion that would land the cursor on a trailing blank goes to the
end of that line instead, and trailing blanks are stripped when the window
contents are gathered.
