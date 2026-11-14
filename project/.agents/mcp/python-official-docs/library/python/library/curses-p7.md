---
title: "curses --- Terminal handling for character-cell displays (part 7 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/curses.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# curses --- Terminal handling for character-cell displays (part 7 of 10)

### `LINES`

The height of the screen, that is, the number of lines.
It is defined only after the call to `initscr()`.
Updated by `update_lines_cols()`, `resizeterm()` and
`resize_term()`.

Some constants are available to specify character cell attributes.
The exact constants available are system dependent.

```text
+------------------------+-------------------------------+
| Attribute              | Meaning                       |
+========================+===============================+
| .. data:: A_ALTCHARSET | Alternate character set mode  |
+------------------------+-------------------------------+
| .. data:: A_BLINK      | Blink mode                    |
+------------------------+-------------------------------+
| .. data:: A_BOLD       | Bold mode                     |
+------------------------+-------------------------------+
| .. data:: A_DIM        | Dim mode                      |
+------------------------+-------------------------------+
| .. data:: A_INVIS      | Invisible or blank mode       |
+------------------------+-------------------------------+
| .. data:: A_ITALIC     | Italic mode                   |
+------------------------+-------------------------------+
| .. data:: A_NORMAL     | Normal attribute              |
+------------------------+-------------------------------+
| .. data:: A_PROTECT    | Protected mode                |
+------------------------+-------------------------------+
| .. data:: A_REVERSE    | Reverse background and        |
|                        | foreground colors             |
+------------------------+-------------------------------+
| .. data:: A_STANDOUT   | Standout mode                 |
+------------------------+-------------------------------+
| .. data:: A_UNDERLINE  | Underline mode                |
+------------------------+-------------------------------+
| .. data:: A_HORIZONTAL | Horizontal highlight          |
+------------------------+-------------------------------+
| .. data:: A_LEFT       | Left highlight                |
+------------------------+-------------------------------+
| .. data:: A_LOW        | Low highlight                 |
+------------------------+-------------------------------+
| .. data:: A_RIGHT      | Right highlight               |
+------------------------+-------------------------------+
| .. data:: A_TOP        | Top highlight                 |
+------------------------+-------------------------------+
| .. data:: A_VERTICAL   | Vertical highlight            |
+------------------------+-------------------------------+
```

> *Added in version 3.7.*
> `A_ITALIC` was added.

Several constants are available to extract corresponding attributes returned
by some methods.

```text
+-------------------------+-------------------------------+
| Bit-mask                | Meaning                       |
+=========================+===============================+
|  .. data:: A_ATTRIBUTES | Bit-mask to extract           |
|                         | attributes                    |
+-------------------------+-------------------------------+
|  .. data:: A_CHARTEXT   | Bit-mask to extract a         |
|                         | character                     |
+-------------------------+-------------------------------+
|  .. data:: A_COLOR      | Bit-mask to extract           |
|                         | color-pair field information  |
+-------------------------+-------------------------------+
```

Keys are referred to by integer constants with names starting with  `KEY_`.
The exact keycaps available are system dependent.
