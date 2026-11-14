---
title: "tkinter.ttk --- Tk themed widgets (part 1 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.ttk.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `tkinter.ttk` --- Tk themed widgets

Module `tkinter.ttk`.

**Source code:** Lib/tkinter/ttk.py

The `tkinter.ttk` module provides access to the Tk themed widget set,
introduced in Tk 8.5.
Its widgets adapt their appearance to the platform's native theme,
giving an application a better and more consistent look and feel
than the classic `tkinter` widgets, whose appearance is fixed.

The basic idea for `tkinter.ttk` is to separate, to the extent possible,
the code implementing a widget's behavior from the code implementing its
appearance.

Ttk widgets are used just like the classic `tkinter` widgets
and share the same machinery:
the widget hierarchy, the geometry managers, variable coupling and event binding.
Those foundational concepts are covered in the `tkinter` documentation
and are not repeated here.

> *Added in version 3.1.*

> **See also:** Tk Widget Styling Support (TIP #48)
> The Tcl Improvement Proposal that introduced the themed widget styling engine.

## Using Ttk

To start using Ttk, import its module:

```
from tkinter import ttk
```

To override the basic Tk widgets, the import should follow the Tk import:

```
from tkinter import *
from tkinter.ttk import *
```

That code causes several `tkinter.ttk` widgets (`Button`,
`Checkbutton`, `Entry`, `Frame`, `Label`,
`LabelFrame`, `Menubutton`, `OptionMenu`,
`PanedWindow`, `Radiobutton`, `Scale`,
`Scrollbar` and `Spinbox`) to
automatically replace the Tk widgets.

> **Note:** Overriding the classic widgets with `from tkinter.ttk import *`
> is convenient for adapting existing code,
> but new code is usually clearer if it imports the module
> as `from tkinter import ttk` and refers to the themed widgets explicitly,
> such as `ttk.Button`.

This has the direct benefit of using the new widgets which gives a better look
and feel across platforms; however, the replacement widgets are not completely
compatible.
The main difference is that widget options such as `fg`, `bg` and others
related to widget styling are no longer present in Ttk widgets.
Instead, use the `ttk.Style` class for improved styling effects.

## Ttk widgets

Ttk comes with 18 widgets, twelve of which already existed in tkinter:
`Button`, `Checkbutton`, `Entry`, `Frame`,
`Label`, `LabelFrame`, `Menubutton`, `PanedWindow`,
`Radiobutton`, `Scale`, `Scrollbar`, and `Spinbox`.
The other six are new: `Combobox`, `Notebook`,
`Progressbar`, `Separator`, `Sizegrip` and
`Treeview`. All of them are subclasses of `Widget`.

Using the Ttk widgets gives the application an improved look and feel.
As discussed above, there are differences in how the styling is coded.

Tk code:

```
l1 = tkinter.Label(text="Test", fg="black", bg="white")
l2 = tkinter.Label(text="Test", fg="black", bg="white")
```

Ttk code:

```
style = ttk.Style()
style.configure("BW.TLabel", foreground="black", background="white")

l1 = ttk.Label(text="Test", style="BW.TLabel")
l2 = ttk.Label(text="Test", style="BW.TLabel")
```

For more information about TtkStyling_, see the `Style` class
documentation.

## Widget

`ttk.Widget` defines standard options and methods supported by
Tk themed widgets and is not supposed to be directly instantiated.

### Standard options

All the `ttk` Widgets accept the following options:

```text
+-----------+--------------------------------------------------------------+
| Option    | Description                                                  |
+===========+==============================================================+
| class     | Specifies the window class. The class is used when querying  |
|           | the option database for the window's other options, to       |
|           | determine the default bindtags for the window, and to select |
|           | the widget's default layout and style. This option is        |
|           | read-only, and may only be specified when the window is      |
|           | created.                                                     |
+-----------+--------------------------------------------------------------+
| cursor    | Specifies the mouse cursor to be used for the widget.  See   |
|           | the *cursor* option type under :ref:`Tk-option-data-types`.  |
|           | If set to the empty string (the default), the cursor is      |
|           | inherited from the parent widget.                            |
+-----------+--------------------------------------------------------------+
| takefocus | Determines whether the window accepts the focus during       |
|           | keyboard traversal. 0, 1 or an empty string is returned.     |
|           | If 0 is returned, it means that the window should be skipped |
|           | entirely during keyboard traversal. If 1, it means that the  |
|           | window should receive the input focus as long as it is       |
|           | viewable. And an empty string means that the traversal       |
|           | scripts make the decision about whether or not to focus      |
|           | on the window.                                               |
+-----------+--------------------------------------------------------------+
| style     | May be used to specify a custom widget style.                |
+-----------+--------------------------------------------------------------+
```

### Scrollable widget options

The following options are supported by widgets that are controlled by a
scrollbar.

```text
+----------------+---------------------------------------------------------+
| Option         | Description                                             |
+================+=========================================================+
| xscrollcommand | Used to communicate with horizontal scrollbars.         |
|                |                                                         |
|                | When the view in the widget's window changes, the widget|
|                | calls the *xscrollcommand* callback.                    |
|                |                                                         |
|                | Usually this option consists of the method              |
|                | :meth:`Scrollbar.set <tkinter.Scrollbar.set>` of some   |
|                | scrollbar. This will cause the scrollbar to be updated  |
|                | whenever the view in the window changes.                |
+----------------+---------------------------------------------------------+
| yscrollcommand | Used to communicate with vertical scrollbars.           |
|                | For some more information, see above.                   |
+----------------+---------------------------------------------------------+
```

### Label options

The following options are supported by labels, buttons and other button-like
widgets.

```text
+--------------+-----------------------------------------------------------+
| Option       | Description                                               |
+==============+===========================================================+
| text         | Specifies a text string to be displayed inside the widget.|
+--------------+-----------------------------------------------------------+
| textvariable | Specifies a name whose value will be used in place of the |
|              | text option resource.                                     |
+--------------+-----------------------------------------------------------+
| underline    | If set, specifies the index (0-based) of a character to   |
|              | underline in the text string. The underline character is  |
|              | used for mnemonic activation.                             |
+--------------+-----------------------------------------------------------+
| image        | Specifies an image to display. This is a list of 1 or more|
|              | elements. The first element is the default image name. The|
|              | rest of the list if a sequence of statespec/value pairs as|
|              | defined by :meth:`Style.map`, specifying different images |
|              | to use when the widget is in a particular state or a      |
|              | combination of states. All images in the list should have |
|              | the same size.                                            |
+--------------+-----------------------------------------------------------+
| compound     | Specifies how to display the image relative to the text,  |
|              | in the case both text and images options are present.     |
|              | Valid values are:                                         |
|              |                                                           |
|              | * text: display text only                                 |
|              | * image: display image only                               |
|              | * top, bottom, left, right: display image above, below,   |
|              |   left of, or right of the text, respectively.            |
|              | * none: the default. display the image if present,        |
|              |   otherwise the text.                                     |
+--------------+-----------------------------------------------------------+
| width        | If greater than zero, specifies how much space, in        |
|              | character widths, to allocate for the text label, if less |
|              | than zero, specifies a minimum width. If zero or          |
|              | unspecified, the natural width of the text label is used. |
+--------------+-----------------------------------------------------------+
```

### Compatibility options

```text
+--------+----------------------------------------------------------------+
| Option | Description                                                    |
+========+================================================================+
| state  | May be set to "normal" or "disabled" to control the "disabled" |
|        | state bit. This is a write-only option: setting it changes the |
|        | widget state, but the :meth:`Widget.state` method does not     |
|        | affect this option.                                            |
+--------+----------------------------------------------------------------+
```

### Widget states

The widget state is a bitmap of independent state flags.

```text
+------------+-------------------------------------------------------------+
| Flag       | Description                                                 |
+============+=============================================================+
| active     | The mouse cursor is over the widget and pressing a mouse    |
|            | button will cause some action to occur                      |
+------------+-------------------------------------------------------------+
| disabled   | Widget is disabled under program control                    |
+------------+-------------------------------------------------------------+
| focus      | Widget has keyboard focus                                   |
+------------+-------------------------------------------------------------+
| pressed    | Widget is being pressed                                     |
+------------+-------------------------------------------------------------+
| selected   | "On", "true", or "current" for things like Checkbuttons and |
|            | radiobuttons                                                |
+------------+-------------------------------------------------------------+
| background | Windows and Mac have a notion of an "active" or foreground  |
|            | window. The *background* state is set for widgets in a      |
|            | background window, and cleared for those in the foreground  |
|            | window                                                      |
+------------+-------------------------------------------------------------+
| readonly   | Widget should not allow user modification                   |
+------------+-------------------------------------------------------------+
| alternate  | A widget-specific alternate display format                  |
+------------+-------------------------------------------------------------+
| invalid    | The widget's value is invalid                               |
+------------+-------------------------------------------------------------+
```

A state specification is a sequence of state names, optionally prefixed with
an exclamation point indicating that the bit is off.

### ttk.Widget

Besides the methods described below, the `ttk.Widget` supports
the methods `tkinter.Widget.cget()` and
`tkinter.Widget.configure()`.

### `identify(x, y)`

Returns the name of the element at position *x* *y*, or the empty string
if the point does not lie within any element.

*x* and *y* are pixel coordinates relative to the widget.

### `instate(statespec, callback=None, *args, **kw)`

Test the widget's state. If a callback is not specified, returns `True`
if the widget state matches *statespec* and `False` otherwise. If callback
is specified then it is called with args if widget state matches
*statespec*.

### `state(statespec=None)`

Modify or inquire widget state. If *statespec* is specified, sets the
widget state according to it and return a new *statespec* indicating
which flags were changed. If *statespec* is not specified, returns
the currently enabled state flags.

Not to be confused with `Wm.state()`.

*statespec* will usually be a list or a tuple.
