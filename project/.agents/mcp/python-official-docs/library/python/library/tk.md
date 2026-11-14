---
title: "Graphical user interfaces with Tk"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tk.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Graphical user interfaces with Tk

Tk/Tcl has long been an integral part of Python.  It provides a robust and
platform independent windowing toolkit, that is available to Python programmers
using the `tkinter` package, and its extension, the `tkinter.ttk` module.

The `tkinter` package is a thin object-oriented layer on top of Tcl/Tk. To
use `tkinter`, you don't need to write Tcl code, but you will need to
consult the Tk documentation, and occasionally the Tcl documentation.
`tkinter` is a set of wrappers that implement the Tk widgets as Python
classes.

`tkinter`'s chief virtues are that it is fast, and that it usually comes
bundled with Python. Although its standard documentation is weak, good
material is available, which includes: references, tutorials, a book and
others. `tkinter` is also famous for having an outdated look and feel,
which has been vastly improved in Tk 8.5. Nevertheless, there are many other
GUI libraries that you could be interested in. The Python wiki lists several
alternative GUI frameworks and tools.
