---
title: "tkinter.scrolledtext --- Scrolled text widget"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.scrolledtext.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `tkinter.scrolledtext` --- Scrolled text widget

Module `tkinter.scrolledtext`.

**Source code:** Lib/tkinter/scrolledtext.py

The `tkinter.scrolledtext` module provides a class of the same name which
implements a basic text widget which has a vertical scroll bar configured to do
the "right thing."  Using the `ScrolledText` class is a lot easier than
setting up a text widget and scroll bar directly.

The text widget and scrollbar are packed together in a `Frame`,
and the methods of the `Pack`, `Grid` and
`Place` geometry managers are acquired from the
`Frame` object.
This allows the `ScrolledText` widget to be used directly to achieve
most normal geometry management behavior.

Should more specific control be necessary, the following attributes are
available:

### `frame`

The frame which surrounds the text and scroll bar widgets.

### `vbar`

The scroll bar widget.
