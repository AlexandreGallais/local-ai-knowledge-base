---
title: "tkinter --- Python interface to Tcl/Tk (part 17 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 17 of 17)

### `X`

```python
Y
BOTH
NONE
```

Values for the *fill* option of the packer: `'x'`, `'y'`, `'both'` or
`'none'`.

### `RAISED`

```python
SUNKEN
FLAT
RIDGE
GROOVE
SOLID
```

Values for the *relief* option, which controls a widget's 3-D border.

### `HORIZONTAL`

```python
VERTICAL
```

Values for the *orient* option of widgets such as `Scale`,
`Scrollbar` and `PanedWindow`.

### `CHAR`

```python
WORD
```

Values for the *wrap* option of the `Text` widget, selecting line
wrapping on character or word boundaries.

### `BASELINE`

The text-alignment value `'baseline'`.

### `INSIDE`

```python
OUTSIDE
```

Values for the *bordermode* option of the placer (see
`Place.place_configure()`).

### `INSERT`

```python
CURRENT
END
ANCHOR
SEL
SEL_FIRST
SEL_LAST
```

Symbolic indices used by the `Text`, `Entry`, `Listbox`
and `Canvas` widgets, such as `'insert'` (the insertion cursor),
`'current'`, `'end'`, `'anchor'` and the bounds of the selection
(`'sel.first'` and `'sel.last'`).

### `ALL`

The special tag `'all'`, which matches every item of a `Canvas` or
every character of a `Text` (for example `canvas.delete(ALL)`).

### `NORMAL`

```python
DISABLED
ACTIVE
HIDDEN
```

Values for the *state* option of various widgets and items.

### `CASCADE`

```python
CHECKBUTTON
COMMAND
RADIOBUTTON
SEPARATOR
```

Menu entry types, used as the *itemType* argument of `Menu.add()` and
`Menu.insert()`.

### `SINGLE`

```python
BROWSE
MULTIPLE
EXTENDED
```

Values for the *selectmode* option of the `Listbox` widget.

### `PIESLICE`

```python
CHORD
ARC
```

Values for the *style* option of `Canvas` arc items.

### `BUTT`

```python
PROJECTING
ROUND
BEVEL
MITER
```

Values for the *capstyle* (`'butt'`, `'projecting'`, `'round'`) and
*joinstyle* (`'round'`, `'bevel'`, `'miter'`) options of
`Canvas` line items.

### `FIRST`

```python
LAST
```

Values for the *arrow* option of `Canvas` line items, indicating
which ends have arrowheads.

### `MOVETO`

```python
SCROLL
```

The first argument passed by a `Scrollbar` to the `XView.xview()`
or `YView.yview()` method of the scrolled widget.

### `UNITS`

```python
PAGES
```

Values for the *what* argument of `XView.xview_scroll()` and
`YView.yview_scroll()`.

### `UNDERLINE`

```python
NUMERIC
DOTBOX
```

Other option values: `'underline'`, `'numeric'` and `'dotbox'`.
