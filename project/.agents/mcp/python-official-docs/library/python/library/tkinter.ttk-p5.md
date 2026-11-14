---
title: "tkinter.ttk --- Tk themed widgets (part 5 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.ttk.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter.ttk --- Tk themed widgets (part 5 of 6)

### `move(item, parent, index)`

Moves *item* to position *index* in *parent*'s list of children.

It is illegal to move an item under one of its descendants. If *index* is
less than or equal to zero, *item* is moved to the beginning; if greater
than or equal to the number of children, it is moved to the end. If *item*
was detached it is reattached.

`reattach()` is an alias of `move()`.

### `next(item)`

Returns the identifier of *item*'s next sibling, or '' if *item* is the
last child of its parent.

### `parent(item)`

Returns the ID of the parent of *item*, or '' if *item* is at the top
level of the hierarchy.

### `prev(item)`

Returns the identifier of *item*'s previous sibling, or '' if *item* is
the first child of its parent.

### `see(item)`

Ensure that *item* is visible.

Sets all of *item*'s ancestors open option to `True`, and scrolls the
widget if necessary so that *item* is within the visible portion of
the tree.

### `selection()`

Returns a tuple of selected items.

> *Changed in version 3.8.*
> `selection()` no longer takes arguments.  For changing the selection
> state use the following selection methods.

### `selection_set(*items)`

*items* becomes the new selection.

> *Changed in version 3.6.*
> *items* can be passed as separate arguments, not just as a single tuple.

### `selection_add(*items)`

Add *items* to the selection.

> *Changed in version 3.6.*
> *items* can be passed as separate arguments, not just as a single tuple.

### `selection_remove(*items)`

Remove *items* from the selection.

> *Changed in version 3.6.*
> *items* can be passed as separate arguments, not just as a single tuple.

### `selection_toggle(*items)`

Toggle the selection state of each item in *items*.

> *Changed in version 3.6.*
> *items* can be passed as separate arguments, not just as a single tuple.

### `set(item, column=None, value=None)`

With one argument, returns a dictionary of column/value pairs for the
specified *item*. With two arguments, returns the current value of the
specified *column*. With three arguments, sets the value of given
*column* in given *item* to the specified *value*.

### `tag_bind(tagname, sequence=None, callback=None)`

Bind a callback for the given event *sequence* to the tag *tagname*.
When an event is delivered to an item, the callbacks for each of the
item's tags option are called.

### `tag_configure(tagname, option=None, **kw)`

Query or modify the options for the specified *tagname*.

If *kw* is not given, returns a dict of the option settings for
*tagname*. If *option* is specified, returns the value for that *option*
for the specified *tagname*. Otherwise, sets the options to the
corresponding values for the given *tagname*.

### `tag_has(tagname, item=None)`

If *item* is specified, returns `True` if the specified *item* has the
given *tagname* and `False` otherwise.
Otherwise, returns a tuple of all items that have the specified tag.

Availability: Tk 8.6

### `xview(*args)`

Query or modify horizontal position of the treeview.

### `yview(*args)`

Query or modify vertical position of the treeview.

## Ttk styling

Each widget in `ttk` is assigned a style, which specifies the set of
elements making up the widget and how they are arranged, along with dynamic and
default settings for element options.
By default the style name is the same as the widget's class name, but it may be
overridden by the widget's style option.
If you don't know the class name of a widget, use the method
`Misc.winfo_class()` (somewidget.winfo_class()).

> **See also:** Introduction to the Tk theme engine
> The `ttk::intro` man page explains how the theme engine works.
>
> The Tile Widget Set
> Joe English's 2004 paper introducing the theme engine
> (then the separate *Tile* extension),
> with diagrams of how elements and layouts make up a widget's appearance.

### class `Style`

This class is used to manipulate the style database.

### `configure(style, query_opt=None, **kw)`

Query or set the default value of the specified option(s) in *style*.

Each key in *kw* is an option and each value is a string identifying
the value for that option.

For example, to change every default button to be a flat button with
some padding and a different background color:

```
from tkinter import ttk
import tkinter

root = tkinter.Tk()

ttk.Style().configure("TButton", padding=6, relief="flat",
   background="#ccc")

btn = ttk.Button(text="Sample")
btn.pack()

root.mainloop()
```

### `map(style, query_opt=None, **kw)`

Query or sets dynamic values of the specified option(s) in *style*.

Each key in *kw* is an option and each value should be a list or a
tuple (usually) containing statespecs grouped in tuples, lists, or
some other preference. A statespec is a compound of one
or more states and then a value.

An example may make it more understandable:

```
import tkinter
from tkinter import ttk

root = tkinter.Tk()

style = ttk.Style()
style.map("C.TButton",
    foreground=[('pressed', 'red'), ('active', 'blue')],
    background=[('pressed', '!disabled', 'black'), ('active', 'white')]
    )

colored_btn = ttk.Button(text="Test", style="C.TButton").pack()

root.mainloop()
```

Note that the order of the (states, value) sequences for an option does
matter, if the order is changed to ``[('active', 'blue'), ('pressed',
'red')]`` in the foreground option, for example, the result would be a
blue foreground when the widget were in active or pressed states.

When called to query the map (without specifying values to set), it
returns a dictionary mapping each option to its list of statespecs.

> *Changed in version 3.10.*
> The value returned when querying the map was corrected.

### `lookup(style, option, state=None, default=None)`

Returns the value specified for *option* in *style*.

If *state* is specified, it is expected to be a sequence of one or more
states. If the *default* argument is set, it is used as a fallback value
in case no specification for option is found.

To check what font a Button uses by default:

```
from tkinter import ttk

print(ttk.Style().lookup("TButton", "font"))
```

### `layout(style, layoutspec=None)`

Define the widget layout for given *style*. If *layoutspec* is omitted,
return the layout specification for given style.

*layoutspec*, if specified, is expected to be a list or some other
sequence type (excluding strings), where each item should be a tuple and
the first item is the layout name and the second item should have the
format described in Layouts.

To understand the format, see the following example (it is not
intended to do anything useful):

```
from tkinter import ttk
import tkinter

root = tkinter.Tk()

style = ttk.Style()
style.layout("TMenubutton", [
   ("Menubutton.background", None),
   ("Menubutton.button", {"children":
       [("Menubutton.focus", {"children":
           [("Menubutton.padding", {"children":
               [("Menubutton.label", {"side": "left", "expand": 1})]
           })]
       })]
   }),
])

mbtn = ttk.Menubutton(text='Text')
mbtn.pack()
root.mainloop()
```

### `element_create(elementname, etype, *args, **kw)`

Create a new element in the current theme, of the given *etype* which is
expected to be either "image", "from" or "vsapi".
The latter is only available in Tk 8.6 on Windows.

If "image" is used, *args* should contain the default image name followed
by statespec/value pairs (this is the imagespec), and *kw* may have the
following options:

border=padding
padding is a list of up to four integers, specifying the left, top,
right, and bottom borders, respectively.

height=height
Specifies a minimum height for the element. If less than zero, the
base image's height is used as a default.

padding=padding
Specifies the element's interior padding. Defaults to border's value
if not specified.

sticky=spec
Specifies how the image is placed within the final parcel. spec
contains zero or more characters "n", "s", "w", or "e".

width=width
Specifies a minimum width for the element. If less than zero, the
base image's width is used as a default.

Example:

```
img1 = tkinter.PhotoImage(master=root, file='button.png')
img1 = tkinter.PhotoImage(master=root, file='button-pressed.png')
img1 = tkinter.PhotoImage(master=root, file='button-active.png')
style = ttk.Style(root)
style.element_create('Button.button', 'image',
                     img1, ('pressed', img2), ('active', img3),
                     border=(2, 4), sticky='we')
```

If "from" is used as the value of *etype*,
`element_create()` will clone an existing
element. *args* is expected to contain a themename, from which
the element will be cloned, and optionally an element to clone from.
If this element to clone from is not specified, an empty element will
be used. *kw* is discarded.

Example:

```
style = ttk.Style(root)
style.element_create('plain.background', 'from', 'default')
```

If "vsapi" is used as the value of *etype*, `element_create()`
will create a new element in the current theme whose visual appearance
is drawn using the Microsoft Visual Styles API which is responsible
for the themed styles on Windows XP and Vista.
*args* is expected to contain the Visual Styles class and part as
given in the Microsoft documentation followed by an optional sequence
of tuples of ttk states and the corresponding Visual Styles API state
value.
*kw* may have the following options:

padding=padding
Specify the element's interior padding.
*padding* is a list of up to four integers specifying the left,
top, right and bottom padding quantities respectively.
If fewer than four elements are specified, bottom defaults to top,
right defaults to left, and top defaults to left.
In other words, a list of three numbers specify the left, vertical,
and right padding; a list of two numbers specify the horizontal
and the vertical padding; a single number specifies the same
padding all the way around the widget.
This option may not be mixed with any other options.

margins=padding
Specifies the elements exterior padding.
*padding* is a list of up to four integers specifying the left, top,
right and bottom padding quantities respectively.
This option may not be mixed with any other options.

width=width
Specifies the width for the element.
If this option is set then the Visual Styles API will not be queried
for the recommended size or the part.
If this option is set then *height* should also be set.
The *width* and *height* options cannot be mixed with the *padding*
or *margins* options.

height=height
Specifies the height of the element.
See the comments for *width*.

Example:

```
style = ttk.Style(root)
style.element_create('pin', 'vsapi', 'EXPLORERBAR', 3, [
                     ('pressed', '!selected', 3),
                     ('active', '!selected', 2),
                     ('pressed', 'selected', 6),
                     ('active', 'selected', 5),
                     ('selected', 4),
                     ('', 1)])
style.layout('Explorer.Pin',
             [('Explorer.Pin.pin', {'sticky': 'news'})])
pin = ttk.Checkbutton(style='Explorer.Pin')
pin.pack(expand=True, fill='both')
```

> *Changed in version 3.13.*
> Added support of the "vsapi" element factory.

### `element_names()`

Returns a tuple of elements defined in the current theme.

### `element_options(elementname)`

Returns a tuple of *elementname*'s options.

### `theme_create(themename, parent=None, settings=None)`

Create a new theme.

It is an error if *themename* already exists. If *parent* is specified,
the new theme will inherit styles, elements and layouts from the parent
theme. If *settings* are present they are expected to have the same
syntax used for `theme_settings()`.

### `theme_settings(themename, settings)`

Temporarily sets the current theme to *themename*, apply specified
*settings* and then restore the previous theme.

Each key in *settings* is a style and each value may contain the keys
'configure', 'map', 'layout' and 'element create' and they are expected
to have the same format as specified by the methods
`Style.configure()`, `Style.map()`, `Style.layout()` and
`Style.element_create()` respectively.

As an example, let's change the Combobox for the default theme a bit:

```
from tkinter import ttk
import tkinter

root = tkinter.Tk()

style = ttk.Style()
style.theme_settings("default", {
   "TCombobox": {
       "configure": {"padding": 5},
       "map": {
           "background": [("active", "green2"),
                          ("!disabled", "green4")],
           "fieldbackground": [("!disabled", "green3")],
           "foreground": [("focus", "OliveDrab1"),
                          ("!disabled", "OliveDrab2")]
       }
   }
})

combo = ttk.Combobox().pack()

root.mainloop()
```

### `theme_names()`

Returns a tuple of all known themes.

### `theme_use(themename=None)`

If *themename* is not given, returns the theme in use.  Otherwise, sets
the current theme to *themename*, refreshes all widgets and emits a
<<ThemeChanged>> event.

### Layouts

A layout can be just `None`, if it takes no options, or a dict of
options specifying how to arrange the element. The layout mechanism
uses a simplified version of the pack geometry manager: given an
initial cavity, each element is allocated a parcel.

The valid options/values are:

*side*: whichside
Specifies which side of the cavity to place the element; one of
top, right, bottom or left. If omitted, the element occupies the
entire cavity.

*sticky*: nswe
Specifies where the element is placed inside its allocated parcel.

*unit*: 0 or 1
If set to 1, causes the element and all of its descendants to be treated as
a single element for the purposes of `Widget.identify()` et al. It's
used for things like scrollbar thumbs with grips.

*children*: [sublayout... ]
Specifies a list of elements to place inside the element. Each
element is a tuple (or other sequence type) where the first item is
the layout name, and the other is a Layout.
