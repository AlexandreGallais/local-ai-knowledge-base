---
title: "tkinter --- Python interface to Tcl/Tk (part 3 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 3 of 17)

## Handy reference

### Setting options

Options control things like the color and border width of a widget. Options can
be set in three ways:

At object creation time, using keyword arguments

```
fred = Button(self, fg="red", bg="blue")
```

After object creation, treating the option name like a dictionary index

```
fred["fg"] = "red"
fred["bg"] = "blue"
```

Use the config() method to update multiple attrs subsequent to object creation

```
fred.config(fg="red", bg="blue")
```

> **Note:** The `fg` and `bg` options used here,
> and other options that control a widget's appearance,
> belong to the classic `tkinter` widgets.
> The themed `tkinter.ttk` widgets recommended in the introduction
> do not accept them;
> style a themed widget through the `ttk.Style`
> class instead.
> The three ways of setting an option shown above apply to both widget sets.

For a complete explanation of a given option and its behavior, see the Tk man
pages for the widget in question.

Note that the man pages list "STANDARD OPTIONS" and "WIDGET SPECIFIC OPTIONS"
for each widget.  The former is a list of options that are common to many
widgets, the latter are the options that are idiosyncratic to that particular
widget.  The Standard Options are documented on the options(3) man
page.

No distinction between standard and widget-specific options is made in this
document.  Some options don't apply to some kinds of widgets. Whether a given
widget responds to a particular option depends on the class of the widget;
buttons have a `command` option, labels do not.

The options supported by a given widget are listed in that widget's man page,
or can be queried at runtime by calling the `config()` method without
arguments, or by calling the `keys()` method on that widget.
The return value of these calls is a dictionary whose key is the name of the
option as a string (for example, `'relief'`) and whose values are 5-tuples.

Some options, like `bg`, are synonyms for common options with long names
(`bg` is shorthand for "background").

```text
+-------+---------------------------------+--------------+
| Index | Meaning                         | Example      |
+=======+=================================+==============+
| 0     | option name                     | ``'relief'`` |
+-------+---------------------------------+--------------+
| 1     | option name for database lookup | ``'relief'`` |
+-------+---------------------------------+--------------+
| 2     | option class for database       | ``'Relief'`` |
|       | lookup                          |              |
+-------+---------------------------------+--------------+
| 3     | default value                   | ``'raised'`` |
+-------+---------------------------------+--------------+
| 4     | current value                   | ``'groove'`` |
+-------+---------------------------------+--------------+
```

Example:

```
>>> print(fred.config())
{'relief': ('relief', 'relief', 'Relief', 'raised', 'groove')}
```

Of course, the dictionary printed will include all the options available and
their values.  This is meant only as an example.

### Geometry management

Creating a widget does not display it.
A widget appears only after it has been handed to a *geometry manager*,
which works out its size and position inside its container
and keeps the layout up to date as the container is resized or its content changes.
Forgetting to call a geometry manager is a common early mistake:
the widget is created, but nothing shows up.

Tk provides three geometry managers.
Each is inherited by every widget, so any widget can be managed by any of them
(but see the warning below about the incompatibility of grid and pack).
The choice depends on the kind of layout you want.

`grid()`
Arranges widgets in a two-dimensional table of rows and columns.
It is the most flexible manager and the one to reach for by default:
layouts that would otherwise need several nested frames can often be
expressed as a single grid,
and rows and columns can be told how to absorb extra space.

```
ttk.Label(frm, text="Name:").grid(column=0, row=0, sticky="w")
ttk.Entry(frm).grid(column=1, row=0)
ttk.Button(frm, text="OK").grid(column=1, row=1, sticky="e")
```

`pack()`
Stacks widgets against one side of their container
-- `"top"` (the default), `"bottom"`, `"left"` or `"right"` --
and can make them fill or expand into the space that is left.
It is convenient for simple arrangements,
such as a single row or column of widgets
or a content area framed by a toolbar and a status bar.

```
toolbar.pack(side="top", fill="x")
status.pack(side="bottom", fill="x")
body.pack(side="left", expand=True, fill="both")
```

`place()`
Positions each widget at an explicit spot,
given either as absolute screen distances or as a fraction of the container's size.
It offers the most control but the least automatic behavior, and is used the least;
it suits special cases such as overlapping widgets or precise custom layouts.

```
background.place(x=0, y=0, relwidth=1.0, relheight=1.0)
badge.place(relx=1.0, rely=0.0, anchor="ne")
```

Layouts are built up by nesting:
grid or pack widgets, including frames, inside a frame or toplevel.
Toplevels are managed by the OS window manager.
Classic and themed `tkinter.ttk` widgets can be managed interchangeably.

> **Warning:** Do not apply `pack()` and `grid()` to two widgets that share the same container.
> The two managers negotiate sizes in incompatible ways,
> and the application can hang as they repeatedly resize the container against each other.
> To combine them, keep each manager's widgets in a separate frame.

The full set of options accepted by each manager, with their values and defaults,
is documented under `Grid.grid_configure()`, `Pack.pack_configure()`
and `Place.place_configure()`;
see also the grid(3tk), pack(3tk) and place(3tk)
man pages.

### Coupling widget variables

Some widgets can tie their current value directly to a program variable,
so that the two stay in sync.
Options such as `variable`, `textvariable`, `value`, `onvalue` and
`offvalue` set up this connection:
when the user changes the widget the variable is updated,
and when the variable is set the widget redraws to match.

A widget can be linked only to a `Variable` object,
not to an ordinary Python variable.
This is not a limitation of `tkinter`
but a consequence of how the two languages differ:
the link relies on Tcl being notified every time the value changes,
and Python offers no way to react when a plain variable is reassigned.
A `Variable` sidesteps this by keeping its value inside the Tcl interpreter
and exposing it through explicit `get()` and `set()` methods.

Ready-made subclasses cover the common types:
`StringVar`, `IntVar`, `DoubleVar` and `BooleanVar`.
Pass one as a widget's `textvariable` (or `variable`) option,
then read and update it with `get()` and `set()`;
the widget tracks it with no further work on your part.

Keep a reference to the variable for as long as the widget uses it
-- for example by storing it as an attribute.
A `Variable` that is garbage collected removes its underlying Tcl variable,
breaking the connection to the widget (see `Variable`).

For example:

```
import tkinter as tk
from tkinter import ttk

root = tk.Tk()

# Create the application variable and give it an initial value.
contents = tk.StringVar(value="this is a variable")

# Tell the entry widget to track the variable.
entry = ttk.Entry(root, textvariable=contents)
entry.pack()

# Print the current value whenever the user presses Return.
def print_contents(event):
    print("The current entry content is:", contents.get())

entry.bind("<Return>", print_contents)

# Setting the variable from the program updates the entry through the
# same link.
def clear():
    contents.set("")

ttk.Button(root, text="Clear", command=clear).pack()

root.mainloop()
```

### The window manager

The *window manager* is the part of the desktop responsible for the title bar,
border and controls drawn around each top-level window,
and for such things as its title, position, size and icon.
Tk gives access to these through the `Wm` mixin,
which is inherited by the `Tk` root window and by every `Toplevel`.
You therefore call the window-manager methods directly on a top-level window.
Each has a short name and an equivalent `wm_`-prefixed name,
for example `title()` and `wm_title()`.

These methods act on the top-level window
whether its content is built from the classic widgets or the themed `tkinter.ttk` widgets.
To reach the top-level window containing an arbitrary widget,
call its `winfo_toplevel()` method.

For example:

```
import tkinter as tk
from tkinter import ttk

root = tk.Tk()
root.title("My Application")
root.geometry("640x480")
root.minsize(320, 240)

ttk.Label(root, text="Hello").pack(padx=20, pady=20)

root.mainloop()
```

See `Wm` for the full set of window-manager methods.

### Tk option data types

Many widget options documented in the reference
accept values of a small number of common types, described here.
The standard options and their types are described in the
options(3tk) manual page.

anchor
Legal values are points of the compass: `"n"`, `"ne"`, `"e"`, `"se"`,
`"s"`, `"sw"`, `"w"`, `"nw"`, and also `"center"`.
The *labelanchor* option of `LabelFrame` and
`ttk.LabelFrame`
accepts also `"en"`, `"es"`, `"wn"` and `"ws"`.
The *sticky* option of the grid geometry manager accepts a combination
of the compass <example-value>, such as `"nsew"`, or an empty string.

bitmap
There are ten built-in, named bitmaps: `'error'`, `'gray12'`,
`'gray25'`, `'gray50'`, `'gray75'`, `'hourglass'`, `'info'`,
`'questhead'`, `'question'`, `'warning'`.
On macOS the following bitmaps are available as well:
`'application'`, `'accessory'`, `'folder'`, `'pfolder'`,
`'trash'`, `'floppy'`, `'ramdisk'`, `'cdrom'`, `'preferences'`,
`'querydoc'`, `'stop'`, `'note'` and `'caution'`.
To specify an X bitmap file, give the full path to the file,
preceded with an `@`, as in `"@/usr/contrib/bitmap/gumby.bit"`.

boolean
You can pass the integers 0 or 1, `True` or `False`, or the strings
`"0"`, `"1"`, `"yes"`, `"no"`, `"true"`, `"false"`, `"on"`
or `"off"`.
The strings are matched ignoring case,
and an unambiguous prefix, such as `"t"`, is enough.
Any non-zero integer means true.

callback
This is any callable object.
Most callbacks take no arguments.  For example:

```
def print_it():
    print("hi there")
fred["command"] = print_it
```

Some options call it with arguments,
such as the *command* option of `Scale`,
which is called with the new value.

color
Colors can be given as symbolic names, such as `"red"` or `"light blue"`,
or as strings representing RGB values in 4 bit: `"#RGB"`, 8 bit:
`"#RRGGBB"`, 12 bit: `"#RRRGGGBBB"`, or 16 bit: `"#RRRRGGGGBBBB"`
ranges, where R,G,B here represent any legal hex digit.
Tk provides a portable set of symbolic names available on all platforms;
they are matched ignoring case and spaces,
so `"light blue"`, `"Light Blue"` and `"lightblue"`
are the same color.
The full list of names, including the platform-specific names
of the current system colors
(for example `"systemButtonFace"` on Windows
or `"systemWindowBody"` on macOS),
is given in the colors(3tk) manual page.
`winfo_rgb()` returns
the red, green and blue components of a color.

compound
Determines how to combine an image and a text displayed in a widget.
Legal values are `"none"` (display the image if there is one,
otherwise the text), `"text"`, `"image"`,
`"center"` (display the text in the center of the image) and
`"top"`, `"bottom"`, `"left"`, `"right"`
(display the image above, below, to the left of or to the right
of the text).
The themed widgets accept all these values,
the classic widgets accept all except `"text"` and `"image"`.

cursor
The name of the mouse cursor to display while the pointer is over the widget.
Tk provides a portable set of cursor names available on all platforms
(for example `"arrow"`, `"watch"`, `"cross"`, or `"hand2"`);
the standard X cursor names from `cursorfont.h` may also be used,
without the `XC_` prefix (so `XC_hand2` becomes `"hand2"`).
The full list of names, including the platform-specific ones,
is given in the cursors(3tk) manual page.
You can also specify a bitmap and mask file of your own.
On Windows a cursor file (`.cur` or `.ani`) may be used directly,
giving its path preceded with an `@`, as in `"@C:/cursors/bart.ani"`.

distance
Screen distances can be specified in either pixels or absolute distances.
Pixels are given as numbers and absolute distances as strings, with the trailing
character denoting units: `c` for centimetres, `i` for inches, `m` for
millimetres, `p` for printer's points.  For example, 3.5 inches is expressed
as `"3.5i"`.

font
Tk uses a font description such as `{courier 10 bold}`; in
`tkinter` this is most naturally passed as a tuple of
`(family, size, *styles)` (or as the equivalent string
`"Courier 10 bold"`).  Font sizes with positive numbers are measured in
points; sizes with negative numbers are measured in pixels.
The name of a named font, such as `"TkDefaultFont"`,
a `tkinter.font.Font` instance,
or, on X11, an XLFD font name can be used as well.

justify
Legal values are the strings: `"left"`, `"center"`, and `"right"`.

orient
Legal values are `"horizontal"` and `"vertical"`.

padding
This is a legal distance (see above), applied on all sides,
or a sequence of up to four distances
specifying the left, top, right and bottom padding.
If fewer than four are specified,
the bottom padding defaults to the top one,
the right one to the left one, and the top one to the left one.
It is only supported by the themed widgets.

region
Used for the *scrollregion* option of `Canvas`.
This is a string with four space-delimited elements,
each of which is a legal distance (see above),
or a sequence of four such elements.
For example: `"2 3 4 5"`, `(2, 3, 4, 5)`, `"3i 2i 4.5i 2i"` and
`"3c 2c 4c 10.43c"` are all legal regions.

relief
Determines what the border style of a widget will be.  Legal values are:
`"raised"`, `"sunken"`, `"flat"`, `"groove"`, `"ridge"`, and
`"solid"`.

scrollcommand
This is almost always the `set()` method of some scrollbar widget, but can
be any widget method that takes a single argument.

state
Legal values are `"normal"`, `"disabled"` and, depending on the widget,
also `"active"`, `"hidden"` (for `Canvas` items)
or `"readonly"` (for `Entry`, `Spinbox`
and the themed widgets).
The themed widgets have in addition a more general set of states,
which is manipulated with
`ttk.Widget.state()`.

wrap
Must be one of `"none"`, `"char"` or `"word"`
for the `Text` widget and its tags;
for a tag an empty string means to use the widget's value.
