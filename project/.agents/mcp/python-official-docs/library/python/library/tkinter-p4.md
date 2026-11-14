---
title: "tkinter --- Python interface to Tcl/Tk (part 4 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 4 of 17)

### Bindings and events

The bind method from the widget command allows you to watch for certain events
and to have a callback function trigger when that event type occurs.  The form
of the bind method is:

```
def bind(self, sequence, func, add=''):
```

where:

sequence
is a string that denotes the target kind of event.  Physical events use the
`<modifier-modifier-type-detail>` form (for example `"<Enter>"` or
`"<Control-Button-1>"`); application-defined virtual events use double angle
brackets, as in `"<<Paste>>"`.  (See the
bind(3tk) man page for details.)

func
is a Python function, taking one argument, to be invoked when the event occurs.
An Event instance will be passed as the argument. (Functions deployed this way
are commonly known as *callbacks*.)

add
is optional, either `''` or `'+'`.  Passing an empty string denotes that
this binding is to replace any other bindings that this event is associated
with.  Passing a `'+'` means that this function is to be added to the list
of functions bound to this event type.

For example:

```
def turn_red(self, event):
    event.widget["activeforeground"] = "red"

self.button.bind("<Enter>", self.turn_red)
```

Notice how the widget field of the event is being accessed in the
`turn_red()` callback.  This field contains the widget that caught the X
event.  The following table lists the other event fields you can access, and how
they are denoted in Tk, which can be useful when referring to the Tk man pages.

```text
+----+---------------------+----+---------------------+
| Tk | Tkinter Event Field | Tk | Tkinter Event Field |
+====+=====================+====+=====================+
| %f | focus               | %A | char                |
+----+---------------------+----+---------------------+
| %h | height              | %E | send_event          |
+----+---------------------+----+---------------------+
| %k | keycode             | %K | keysym              |
+----+---------------------+----+---------------------+
| %s | state               | %N | keysym_num          |
+----+---------------------+----+---------------------+
| %t | time                | %T | type                |
+----+---------------------+----+---------------------+
| %w | width               | %W | widget              |
+----+---------------------+----+---------------------+
| %x | x                   | %X | x_root              |
+----+---------------------+----+---------------------+
| %y | y                   | %Y | y_root              |
+----+---------------------+----+---------------------+
| %# | serial              | %b | num                 |
+----+---------------------+----+---------------------+
| %d | detail              | %D | delta               |
+----+---------------------+----+---------------------+
```

The `add` parameter above only affects the bindings you make yourself.
Every widget also inherits *class bindings*
that implement its standard behavior --
for example a `Text` widget binds `Control-t`
to transpose two characters.
These are described in the bindings section of the widget's Tk man page
(such as text(3tk) or entry(3tk)).

Class bindings are processed separately from your own,
so binding an event yourself does not replace the default; both run.
To suppress an unwanted default binding,
bind the event on the widget
and return the string `"break"` from your callback.

### The index parameter

A number of widgets require "index" parameters to be passed.  These are used to
point at a specific place in a Text widget, or to particular characters in an
Entry widget, or to particular menu items in a Menu widget.

Entry widget indexes (index, view index, etc.)
Entry widgets have methods and options that refer to character positions
in the text being displayed.
Anytime an index is needed, you may pass in:

- an integer which refers to the numeric position of a character,
counted from the beginning of the text, starting with 0;

- the string `"anchor"`,
which refers to the anchor point of the selection,
set with the widget's selection methods;

- the string `"end"`,
which refers to the position just after the last character;

- the string `"insert"`,
which refers to the character just after the insertion cursor;

- the strings `"sel.first"` and `"sel.last"`,
which refer to the first character in the selection
and the position just after the last
(it is an error to use these if there is no selection);

- a string consisting of `@` followed by an integer, as in `"@6"`,
where the integer is interpreted as an x pixel coordinate
in the entry's coordinate system,
selecting the character spanning that point.

Text widget indexes
The index notation for Text widgets is very rich and is best described in the Tk
man pages.

Menu indexes (menu.invoke(), menu.entryconfig(), etc.)
Some options and methods for menus manipulate specific menu entries. Anytime a
menu index is needed for an option or a parameter, you may pass in:

- an integer which refers to the numeric position of the entry in the widget,
counted from the top, starting with 0;

- the string `"active"`, which refers to the menu position that is currently
under the cursor;

- the string `"last"` which refers to the last menu item;

- a string consisting of `@` followed by an integer, as in `"@6"`, where
the integer is interpreted as a y pixel coordinate in the menu's coordinate
system;

- the string `"none"`, which indicates no menu entry at all, most often used
with menu.activate() to deactivate all entries, and finally,

- a text string that is pattern matched against the label of the menu entry, as
scanned from the top of the menu to the bottom.  Note that this index type is
considered after all the others, which means that matches for menu items
labelled `last`, `active`, or `none` may be interpreted as the above
literals, instead.

### Images

Images of different formats can be created through the corresponding subclass
of `tkinter.Image`:

- `BitmapImage` for images in XBM format.

- `PhotoImage` for images in PGM, PPM, GIF and PNG formats. The latter
is supported starting with Tk 8.6.

Either type of image is created through either the `file` or the `data`
option (other options are available as well).

> *Changed in version 3.13.*
> Added the `PhotoImage` method `copy_replace()` to copy a region
> from one image to other image, possibly with pixel zooming and/or
> subsampling.
> Add *from_coords* parameter to `PhotoImage` methods `copy()`,
> `zoom()` and `subsample()`.
> Add *zoom* and *subsample* parameters to `PhotoImage` method
> `copy()`.

The image object can then be used wherever an `image` option is supported by
some widget (for example, labels, buttons, menus). In these cases, Tk will not keep a
reference to the image. When the last Python reference to the image object is
deleted, the image data is deleted as well, and Tk will display an empty box
wherever the image was used.

> **See also:** The Pillow package adds support for
> formats such as BMP, JPEG, TIFF, and WebP, among others.
