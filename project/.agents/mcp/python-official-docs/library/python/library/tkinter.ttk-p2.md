---
title: "tkinter.ttk --- Tk themed widgets (part 2 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.ttk.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter.ttk --- Tk themed widgets (part 2 of 6)

## Combobox

The `ttk.Combobox` widget combines a text field with a
pop-down list of values.
This widget is a subclass of `Entry`.

Besides the methods inherited from `Widget`: `cget()`,
`configure()`, `identify()`,
`instate()` and `state()`, and the following inherited
from `Entry`: `bbox()`, `delete()`,
`icursor()`, `index()`,
`insert()`,
`selection*()`,
`xview*()`, it has some other methods, described at
`ttk.Combobox`.

### Options

This widget accepts the following specific options:

```text
+-----------------+--------------------------------------------------------+
| Option          | Description                                            |
+=================+========================================================+
| exportselection | Boolean value. If set, the widget selection is linked  |
|                 | to the X selection (which can be returned              |
|                 | by invoking Misc.selection_get, for example).          |
+-----------------+--------------------------------------------------------+
| justify         | Specifies how the text is aligned within the widget.   |
|                 | One of "left", "center", or "right".                   |
+-----------------+--------------------------------------------------------+
| height          | Specifies the height of the pop-down listbox, in rows. |
+-----------------+--------------------------------------------------------+
| postcommand     | A script (possibly registered with Misc.register) that |
|                 | is called immediately before displaying the values. It |
|                 | may specify which values to display.                   |
+-----------------+--------------------------------------------------------+
| state           | One of "normal", "readonly", or "disabled". In the     |
|                 | "readonly" state, the value may not be edited directly,|
|                 | and the user can only select one of the values from the|
|                 | dropdown list. In the "normal" state, the text field is|
|                 | directly editable. In the "disabled" state, no         |
|                 | interaction is possible.                               |
+-----------------+--------------------------------------------------------+
| textvariable    | Specifies a name whose value is linked to the widget   |
|                 | value. Whenever the value associated with that name    |
|                 | changes, the widget value is updated, and vice versa.  |
|                 | See :class:`tkinter.StringVar`.                        |
+-----------------+--------------------------------------------------------+
| values          | Specifies the list of values to display in the         |
|                 | drop-down listbox.                                     |
+-----------------+--------------------------------------------------------+
| width           | Specifies an integer value indicating the desired width|
|                 | of the entry window, in average-size characters of the |
|                 | widget's font.                                         |
+-----------------+--------------------------------------------------------+
```

> **Note:** Tk 9.1 added the *locale* option, which selects the locale used to determine
> word and character boundaries within the text (`"C"` by default).

### Virtual events

The combobox widgets generates a **<<ComboboxSelected>>** virtual event
when the user selects an element from the list of values.

### `current(newindex=None)`

If *newindex* is specified, sets the combobox value to the element
position *newindex*. Otherwise, returns the index of the current value or
-1 if the current value is not in the values list.

### `get()`

Returns the current value of the combobox.

### `set(value)`

Sets the value of the combobox to *value*.

## Spinbox

The `ttk.Spinbox` widget is a `ttk.Entry`
enhanced with increment and decrement arrows.
It can be used for numbers or lists of string values.
This widget is a subclass of `Entry`.
Besides the methods inherited from `Widget`: `cget()`,
`configure()`, `identify()`,
`instate()` and `state()`, and the following inherited
from `Entry`: `bbox()`, `delete()`,
`icursor()`, `index()`,
`insert()`, `xview*()`, it has
some other methods, described at `ttk.Spinbox`.

### Options

This widget accepts the following specific options:

```text
+----------------------+------------------------------------------------------+
| Option               | Description                                          |
+======================+======================================================+
| from                 | Float value.  If set, this is the minimum value to   |
|                      | which the decrement button will decrement.  Must be  |
|                      | spelled as ``from_`` when used as an argument, since |
|                      | ``from`` is a Python keyword.                        |
+----------------------+------------------------------------------------------+
| to                   | Float value.  If set, this is the maximum value to   |
|                      | which the increment button will increment.           |
+----------------------+------------------------------------------------------+
| increment            | Float value.  Specifies the amount which the         |
|                      | increment/decrement buttons change the               |
|                      | value. Defaults to 1.0.                              |
+----------------------+------------------------------------------------------+
| values               | Sequence of string or float values.  If specified,   |
|                      | the increment/decrement buttons will cycle through   |
|                      | the items in this sequence rather than incrementing  |
|                      | or decrementing numbers.                             |
|                      |                                                      |
+----------------------+------------------------------------------------------+
| wrap                 | Boolean value.  If ``True``, increment and decrement |
|                      | buttons will cycle from the ``to`` value to the      |
|                      | ``from`` value or the ``from`` value to the ``to``   |
|                      | value, respectively.                                 |
+----------------------+------------------------------------------------------+
| format               | String value.  This specifies the format of numbers  |
|                      | set by the increment/decrement buttons.  It must be  |
|                      | in the form "%W.Pf", where W is the padded width of  |
|                      | the value, P is the precision, and '%' and 'f' are   |
|                      | literal.                                             |
+----------------------+------------------------------------------------------+
| command              | Python callable.  Will be called with no arguments   |
|                      | whenever either of the increment or decrement buttons|
|                      | are pressed.                                         |
|                      |                                                      |
+----------------------+------------------------------------------------------+
```

### Virtual events

The spinbox widget generates an **<<Increment>>** virtual event when the
user presses <Up>, and a **<<Decrement>>** virtual event when the user
presses <Down>.

### class `Spinbox`

With a non-integer increment, see :ref:`numeric values and the locale
<tkinter-numeric-locale>`.

> *Added in version 3.8.*

### `get()`

Returns the current value of the spinbox.

### `set(value)`

Sets the value of the spinbox to *value*.

## Notebook

Ttk Notebook widget manages a collection of windows and displays a single
one at a time. Each child window is associated with a tab, which the user
may select to change the currently displayed window.

### Options

This widget accepts the following specific options:

```text
+---------+----------------------------------------------------------------+
| Option  | Description                                                    |
+=========+================================================================+
| height  | If present and greater than zero, specifies the desired height |
|         | of the pane area (not including internal padding or tabs).     |
|         | Otherwise, the maximum height of all panes is used.            |
+---------+----------------------------------------------------------------+
| padding | Specifies the amount of extra space to add around the outside  |
|         | of the notebook. The padding is a list up to four length       |
|         | specifications left top right bottom. If fewer than four       |
|         | elements are specified, bottom defaults to top, right defaults |
|         | to left, and top defaults to left.                             |
+---------+----------------------------------------------------------------+
| width   | If present and greater than zero, specified the desired width  |
|         | of the pane area (not including internal padding). Otherwise,  |
|         | the maximum width of all panes is used.                        |
+---------+----------------------------------------------------------------+
```

### Tab options

There are also specific options for tabs:

```text
+-----------+--------------------------------------------------------------+
| Option    | Description                                                  |
+===========+==============================================================+
| state     | Either "normal", "disabled" or "hidden". If "disabled", then |
|           | the tab is not selectable. If "hidden", then the tab is not  |
|           | shown.                                                       |
+-----------+--------------------------------------------------------------+
| sticky    | Specifies how the child window is positioned within the pane |
|           | area. Value is a string containing zero or more of the       |
|           | characters "n", "s", "e" or "w". Each letter refers to a     |
|           | side (north, south, east or west) that the child window will |
|           | stick to, as per the :meth:`grid <tkinter.Grid.grid>`        |
|           | geometry manager.                                            |
+-----------+--------------------------------------------------------------+
| padding   | Specifies the amount of extra space to add between the       |
|           | notebook and this pane. Syntax is the same as for the option |
|           | padding used by this widget.                                 |
+-----------+--------------------------------------------------------------+
| text      | Specifies a text to be displayed in the tab.                 |
+-----------+--------------------------------------------------------------+
| image     | Specifies an image to display in the tab. See the option     |
|           | image described in :class:`Widget`.                          |
+-----------+--------------------------------------------------------------+
| compound  | Specifies how to display the image relative to the text, in  |
|           | the case both options text and image are present. See        |
|           | `Label Options`_ for legal values.                           |
+-----------+--------------------------------------------------------------+
| underline | Specifies the index (0-based) of a character to underline in |
|           | the text string. The underlined character is used for        |
|           | mnemonic activation if :meth:`Notebook.enable_traversal` is  |
|           | called.                                                      |
+-----------+--------------------------------------------------------------+
```

### Tab identifiers

The tab_id present in several methods of `ttk.Notebook` may
take any of the following forms:

- An integer between zero and the number of tabs
- The name of a child window
- A positional specification of the form "@x,y", which identifies the tab
- The literal string "current", which identifies the currently selected tab
- The literal string "end", which returns the number of tabs (only valid for
`Notebook.index()`)

### Virtual events

This widget generates a **<<NotebookTabChanged>>** virtual event after a new
tab is selected.

### `add(child, **kw)`

Adds a new tab to the notebook.

If window is currently managed by the notebook but hidden, it is
restored to its previous position.

See Tab Options for the list of available options.

### `forget(tab_id)`

Removes the tab specified by *tab_id*, unmaps and unmanages the
associated window.

This shadows the inherited geometry-manager `forget()`;
use `pack_forget()`, `grid_forget()`
or `place_forget()` to remove the widget itself from
its manager.

### `hide(tab_id)`

Hides the tab specified by *tab_id*.

The tab will not be displayed, but the associated window remains
managed by the notebook and its configuration remembered. Hidden tabs
may be restored with the `add()` command.

### `identify(x, y)`

Returns the name of the tab element at position *x*, *y*, or the empty
string if none.

### `index(tab_id)`

Returns the numeric index of the tab specified by *tab_id*, or the total
number of tabs if *tab_id* is the string "end".

### `insert(pos, child, **kw)`

Inserts a pane at the specified position.

*pos* is either the string "end", an integer index, or the name of a
managed child. If *child* is already managed by the notebook, moves it to
the specified position.

See Tab Options for the list of available options.

### `select(tab_id=None)`

Selects the specified *tab_id*.

The associated child window will be displayed, and the
previously selected window (if different) is unmapped. If *tab_id* is
omitted, returns the widget name of the currently selected pane.

### `tab(tab_id, option=None, **kw)`

Query or modify the options of the specific *tab_id*.

If *kw* is not given, returns a dictionary of the tab option values. If
*option* is specified, returns the value of that *option*. Otherwise,
sets the options to the corresponding values.

### `tabs()`

Returns a tuple of windows managed by the notebook.

### `enable_traversal()`

Enable keyboard traversal for a toplevel window containing this notebook.

This will extend the bindings for the toplevel window containing the
notebook as follows:

- `Control-Tab`: selects the tab following the currently selected one.
- `Shift-Control-Tab`: selects the tab preceding the currently selected one.
- `Alt-K`: where *K* is the mnemonic (underlined) character of any tab, will
select that tab.

Multiple notebooks in a single toplevel may be enabled for traversal,
including nested notebooks.
However, notebook traversal only works properly if all panes are direct
children of the notebook.
