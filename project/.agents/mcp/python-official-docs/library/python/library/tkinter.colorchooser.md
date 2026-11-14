---
title: "tkinter.colorchooser --- Color choosing dialog"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.colorchooser.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `tkinter.colorchooser` --- Color choosing dialog

Module `tkinter.colorchooser`.

**Source code:** Lib/tkinter/colorchooser.py

The `tkinter.colorchooser` module provides the `Chooser` class
as an interface to the native color picker dialog. `Chooser` implements
a modal color choosing dialog window. The `Chooser` class inherits from
the `Dialog` class.

### class `Chooser(master=None, **options)`

The class implementing the modal color-choosing dialog.
Most applications use the `askcolor()` convenience function rather than
instantiating this class directly.

### `askcolor(color=None, **options)`

Show a modal color-choosing dialog and return the chosen color.
*color* is the color selected when the dialog opens.
The return value is a tuple `((r, g, b), hexstr)`, where `r`, `g` and
`b` are the red, green and blue components as integers in the range 0–255
and *hexstr* is the equivalent Tk color string, such as `'#ff8000'`.
If the user cancels the dialog, `(None, None)` is returned.

> *Changed in version 3.10.*
> The RGB values in the returned color are now integers in the range 0–255
> instead of floats.

> **See also:** Module `tkinter.commondialog`
> Tkinter standard dialog module
