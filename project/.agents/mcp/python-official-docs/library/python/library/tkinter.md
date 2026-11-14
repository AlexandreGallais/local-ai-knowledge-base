---
title: "tkinter --- Python interface to Tcl/Tk (part 1 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `tkinter` --- Python interface to Tcl/Tk

Module `tkinter`.

**Source code:** Lib/tkinter/__init__.py

The `tkinter` package ("Tk interface") is the standard Python interface to
the Tcl/Tk GUI toolkit.  Both Tk and `tkinter` are available on most Unix
platforms, including macOS, as well as on Windows systems.

Running `python -m tkinter` from the command line should open a window
demonstrating a simple Tk interface, letting you know that `tkinter` is
properly installed on your system, and also showing what version of Tcl/Tk is
installed, so you can read the Tcl/Tk documentation specific to that version.

Tkinter supports a range of Tcl/Tk versions, built either with or without
thread support.
Tcl/Tk 8.5.12 is the minimum supported version; the official Python binary
release bundles Tcl/Tk 9.0.
See the source code for the `_tkinter` module for more information about
supported versions.

> *Changed in version 3.11.*
> Support for Tcl/Tk versions older than 8.5.12 was removed.

Tkinter is not a thin wrapper, but adds a fair amount of its own logic to
make the experience more pythonic. This documentation will concentrate on these
additions and changes, and refer to the official Tcl/Tk documentation for
details that are unchanged.

> **Note:** Tcl/Tk 8.5 (2007) introduced a modern set of themed user interface components
> along with a new API to use them (see `tkinter.ttk`).
> Both old and new APIs are still available.
> Most documentation you will find online still uses the old API and
> can be woefully outdated.

> **See also:** - TkDocs
> Extensive tutorial on creating user interfaces with Tkinter.  Explains key <example-value>,
> and illustrates recommended approaches using the modern API.
>
> - Tkinter 8.5 reference: a GUI for Python
> Reference documentation for Tkinter 8.5 detailing available classes, methods, and options.
>
> Tcl/Tk Resources:
>
> - Tk commands
> Comprehensive reference to each of the underlying Tcl/Tk commands used by Tkinter.
>
> - Tcl/Tk Home Page
> Additional documentation, and links to Tcl/Tk core development.
>
> Books:
>
> - Modern Tkinter for Busy Python Developers
> By Mark Roseman. (ISBN 978-1999149567)
>
> - Python GUI programming with Tkinter
> By Alan D. Moore. (ISBN 978-1788835886)
>
> - Programming Python
> By Mark Lutz; has excellent coverage of Tkinter. (ISBN 978-0596158101)
>
> - Tcl and the Tk Toolkit (2nd edition)
> By John Ousterhout, inventor of Tcl/Tk, and Ken Jones; does not cover Tkinter. (ISBN 978-0321336330)

## Architecture

Tcl/Tk is not a single library but rather consists of a few distinct
modules, each with separate functionality and its own official
documentation. Python's binary releases also ship an add-on module
together with it.

Tcl
Tcl is a dynamic interpreted programming language, just like Python. Though
it can be used on its own as a general-purpose programming language, it is
most commonly embedded into C applications as a scripting engine or an
interface to the Tk toolkit. The Tcl library has a C interface to
create and manage one or more instances of a Tcl interpreter, run Tcl
commands and scripts in those instances, and add custom commands
implemented in either Tcl or C. Each interpreter has an event queue,
and there are facilities to send events to it and process them.
Unlike Python, Tcl's execution model is designed around cooperative
multitasking, and Tkinter bridges this difference
(see Threading model for details).

Tk
Tk is a Tcl package implemented in C
that adds custom commands to create and manipulate GUI widgets. Each
`Tk` object embeds its own Tcl interpreter instance with Tk loaded into
it. Tk's widgets are very customizable, though at the cost of a dated appearance.
Tk uses Tcl's event queue to generate and process GUI events.

Ttk
Themed Tk (Ttk) is a newer family of Tk widgets that provide a much better
appearance on different platforms than many of the classic Tk widgets.
Ttk is distributed as part of Tk, starting with Tk version 8.5. Python
bindings are provided in a separate module, `tkinter.ttk`.

Internally, Tk and Ttk use facilities of the underlying operating system,
that is, Xlib on Unix/X11, Cocoa on macOS, GDI on Windows.

When your Python application uses a class in Tkinter, for example, to create a widget,
the `tkinter` module first assembles a Tcl/Tk command string. It passes that
Tcl command string to an internal `_tkinter` binary module, which then
calls the Tcl interpreter to evaluate it. The Tcl interpreter will then call into the
Tk and/or Ttk packages, which will in turn make calls to Xlib, Cocoa, or GDI.

## Tkinter modules

Support for Tkinter is spread across several modules. Most applications will need the
main `tkinter` module, as well as the `tkinter.ttk` module, which provides
the modern themed widget set and API:

```
from tkinter import *
from tkinter import ttk
```

The modules that provide Tk support include:

`tkinter`
Main Tkinter module.

`tkinter.colorchooser`
Dialog to let the user choose a color.

`tkinter.commondialog`
Base class for the dialogs defined in the other modules listed here.

`tkinter.filedialog`
Common dialogs to allow the user to specify a file to open or save.

`tkinter.font`
Utilities to help work with fonts.

`tkinter.messagebox`
Access to standard Tk dialog boxes.

`tkinter.scrolledtext`
Text widget with a vertical scroll bar built in.

`tkinter.simpledialog`
Basic <example-value> and convenience functions.

`tkinter.ttk`
Themed widget set introduced in Tk 8.5, providing modern alternatives
for many of the classic widgets in the main `tkinter` module.

Additional modules:

Module `_tkinter`.

`_tkinter`
A binary module that contains the low-level interface to Tcl/Tk.
It is automatically imported by the main `tkinter` module,
and should never be used directly by application programmers.
It is usually a shared library (or DLL), but might in some cases be
statically linked with the Python interpreter.

`idlelib`
Python's Integrated Development and Learning Environment (IDLE). Based
on `tkinter`.

`tkinter.constants`
Symbolic constants that can be used in place of strings when passing
various parameters to Tkinter calls. Automatically imported by the
main `tkinter` module.

`tkinter.dnd`
(experimental) Drag-and-drop support for `tkinter`. This will
become deprecated when it is replaced with the Tk DND.

`turtle`
Turtle graphics in a Tk window.
