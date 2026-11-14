---
title: "tkinter --- Python interface to Tcl/Tk (part 14 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 14 of 17)

### `scan(*args)`

A thin wrapper around the Tk `scan` widget subcommand, used to
implement fast dragging of the view: `scan('mark', x)` records *x* and
the current view, and `scan('dragto', x)` adjusts the view relative to
that mark.
The `scan_mark()` and `scan_dragto()` methods wrap the two forms.

### `scan_mark(x)`

Record *x* and the current view in the spinbox window, for use with a
later `scan_dragto()` call.
This is typically associated with a mouse button press in the widget.

### `scan_dragto(x)`

Adjust the view by 10 times the difference between *x* and the *x* passed
to the last `scan_mark()` call.
This is typically associated with mouse motion events, producing the
effect of dragging the spinbox at high speed through the window.

### `selection(*args)`

A thin wrapper around the Tk `selection` widget subcommand, used to
adjust the selection within the spinbox.
It has several forms depending on the first argument, such as
`selection('adjust', index)`, `selection('clear')`,
`selection('element', ?elem?)`, `selection('from', index)`,
`selection('present')`, `selection('range', start, end)` and
`selection('to', index)`.
The `selection_adjust()`, `selection_clear()`,
`selection_element()`, `selection_from()`,
`selection_present()`, `selection_range()` and
`selection_to()` methods wrap these forms.

### `selection_adjust(index)`

Locate the end of the selection nearest to the character given by *index*
and adjust that end of the selection to be at *index* (including but not
going beyond *index*).
The other end becomes the anchor point for future `selection_to()`
calls.
If the selection is not currently in the spinbox, a new selection is
created to include the characters between *index* and the most recent
anchor point, inclusive.

### `selection_clear()`

Clear the selection if it is currently in this widget.
If the selection is not in this widget, the method has no effect.

> **Note:** This shadows the inherited `Misc.selection_clear()`,
> which clears the X selection;
> that method is not available on a `Spinbox`.

### `selection_element(element=None)`

Set or get the currently selected element.
If *element* (one of `'buttonup'`, `'buttondown'` or `'none'`) is
given, that spin button is selected and displayed depressed; otherwise
the name of the currently selected element is returned.

### `selection_from(index)`

Set the selection anchor point to just before the character given by
*index*, without changing the selection itself.

> *Added in version 3.8.*

### `selection_present()`

Return `True` if there are characters selected in the spinbox,
`False` otherwise.

> *Added in version 3.8.*

### `selection_range(start, end)`

Set the selection to include the characters starting with the one indexed
by *start* and ending with the one just before *end*.
If *end* refers to the same character as *start* or an earlier one, the
selection is cleared.

> *Added in version 3.8.*

### `selection_to(index)`

Set the selection between *index* and the anchor point.
If *index* is before the anchor point, the selection runs from *index* up
to but not including the anchor point; if it is after, the selection runs
from the anchor point up to but not including *index*; if it is the same,
nothing happens.
The anchor point is the one set by the most recent `selection_from()`
or `selection_adjust()` call.
If the selection is not in this widget, a new selection is created using
the most recent anchor point.

> *Added in version 3.8.*

### class `Text(master=None, cnf={}, **kw)`

A `Text` widget displays and edits multi-line text.
Portions of the text may be styled with **tags**, particular positions may
be annotated with floating **marks**, and arbitrary images and other widgets
may be embedded in the text.
The widget also provides an unlimited undo/redo mechanism and supports peer
widgets that share the same underlying data.
Inherits from `Widget`, `XView` and `YView`, so the
view can be scrolled horizontally and vertically with `xview()`
and `yview()`.
Refer to the Tk `text` manual page for the full list of options.

Most of the methods take one or more *index* arguments that identify a
position within the text.
As described in the Tk `text` manual page, an index is a string consisting
of a base, optionally followed by one or more modifiers.
The base may be `'line.char'` (line *line*, character *char*, where lines
are counted from 1 and characters within a line from 0; `'line.end'`
refers to the newline ending the line), `'end'` (the position just after
the last newline), the name of a mark, `'tag.first'` or `'tag.last'`
(the first character tagged with *tag*, or the position just after the last
such character), the name of an embedded image or window, or `@x,y` (the
character covering pixel coordinates *x*, *y* in the widget).
A modifier such as `'+5 chars'`, `'-3 lines'`, `'linestart'`,
`'lineend'`, `'wordstart'` or `'wordend'` adjusts the index relative
to its base; several modifiers may be combined and are applied from left to
right, for example `'insert wordstart - 1 c'`.

### `insert(index, chars, *args)`

Insert the string *chars* just before the character at *index* (if
*index* is `'end'`, just before the final newline).
By default the new text inherits any tags present on both sides of the
insertion point.
If *args* is given, it consists of alternating *tagList*, *chars* values:
the preceding *chars* receives exactly the tags listed (a tag list may be
a single tag name or a sequence of names), overriding the surrounding
tags.

### `delete(index1, index2=None)`

Delete the range of characters from *index1* up to but not including
*index2*.
If *index2* is omitted, the single character at *index1* is deleted.
The widget always keeps a newline as its last character, so a deletion
that would remove it is adjusted accordingly.

### `replace(index1, index2, chars, *args)`

Replace the range of characters from *index1* up to but not including
*index2* with *chars*.
This is equivalent to a `delete()` followed by an `insert()` at
*index1*; *args* is interpreted as for `insert()`.

> *Added in version 3.3.*

### `get(index1, index2=None)`

Return the text from *index1* up to but not including *index2* as a
string.
If *index2* is omitted, return the single character at *index1*.
Embedded images and windows are omitted from the result.

### `index(index)`

Return the position corresponding to *index* in the canonical
`'line.char'` form.

### `compare(index1, op, index2)`

Compare the positions of *index1* and *index2* using the relational
operator *op*, which must be one of `'<'`, `'<='`, `'=='`,
`'>='`, `'>'` or `'!='`, and return the boolean result.

### `count(index1, index2, *options, return_ints=False)`

Count the number of items of the requested kinds between *index1* and
*index2*; the count is negative if *index1* is after *index2*.
Each of *options* names a kind of item to count: `'chars'`,
`'displaychars'`, `'displayindices'`, `'displaylines'`,
`'indices'`, `'lines'`, `'xpixels'` or `'ypixels'` (the default,
used when no option is given, is `'indices'`).
The pseudo-option `'update'` forces any out-of-date layout information
to be recalculated before the following options are evaluated.
When *return_ints* is true and a single counting option is given, return
a plain integer; otherwise return a tuple with one integer per counting
option (or `None` if the result is empty).

> *Added in version 3.3.*

> *Changed in version 3.13.*
> Added the *return_ints* parameter.

### `see(index)`

Adjust the view so that the character given by *index* is visible.
If it is already visible the method has no effect; if it is a short
distance out of view the widget scrolls just enough to bring it to the
nearest edge, otherwise it scrolls to center *index* in the window.

### `bbox(index)`

Return a tuple `(x, y, width, height)` giving the bounding box, in
pixels, of the visible part of the character at *index*, or `None` if
that character is not visible on the screen.

This shadows the inherited `Misc.bbox()`;
use `grid_bbox()` for the grid bounding box.

### `dlineinfo(index)`

Return a tuple `(x, y, width, height, baseline)` describing the display
line that contains *index*: the first four values give the bounding box
of the line in pixels and *baseline* gives the offset of the baseline
measured down from the top of the area.
Return `None` if that display line is not visible on the screen.

### `mark_set(markName, index)`

Set the mark named *markName* to the position just before the character
at *index*, creating the mark if it does not already exist.
A mark created this way has right gravity by default.

### `mark_unset(*markNames)`

Remove each of the marks named in *markNames*.
The special `insert` and `current` marks may not be removed.

### `mark_names()`

Return a tuple of the names of all marks currently set in the widget.

### `mark_gravity(markName, direction=None)`

If *direction* is omitted, return the gravity of mark *markName*, either
`'left'` or `'right'`.
Otherwise set its gravity to *direction*.
The gravity determines on which side of the mark text inserted at the
mark's position appears: a mark with right gravity (the default) stays to
the right of such text.

### `mark_next(index)`

Return the name of the first mark at or after *index*, or `None` if
there is none.
When *index* is the name of a mark, the search starts just after that
mark.

### `mark_previous(index)`

Return the name of the last mark at or before *index*, or `None` if
there is none.
When *index* is the name of a mark, the search starts just before that
mark.

### `tag_add(tagName, index1, *args)`

Add the tag *tagName* to the range of characters from *index1* up to but
not including the next index in *args*.
Further pairs of indices may follow in *args* to tag additional ranges; a
trailing single index tags just the character at that index.

### `tag_remove(tagName, index1, index2=None)`

Remove the tag *tagName* from the characters from *index1* up to but not
including *index2* (or from the single character at *index1* if *index2*
is omitted).
The tag itself continues to exist even if no characters carry it.

### `tag_delete(*tagNames)`

Delete each of the tags named in *tagNames*, removing them from all
characters and discarding their options and bindings.

### `tag_configure(tagName, cnf=None, **kw)`

Query or modify the configuration options of the tag *tagName*.
This mirrors `configure()`, except that it applies to a tag
rather than to the widget as a whole: with no options it returns a
dictionary describing the current options, otherwise it sets the given
options.
Defining a tag this way also gives it a priority higher than any existing
tag.

The supported tag options, all controlling the appearance of the tagged
text, are:

*font*
The font to use for the text.

*foreground*
The color to use for the text.

*background*
The color to use for the area behind the text.

*fgstipple*, *bgstipple*
Bitmaps used to stipple the foreground (text) and the background;
only well supported on X11.

*borderwidth*
The width of the border drawn around the text according to *relief*
(default `0`).

*relief*
The 3-D appearance of the text's border: `'flat'` (the default),
`'raised'`, `'sunken'`, `'ridge'`, `'groove'` or `'solid'`.

*offset*
How far the text is raised above (or, if negative, lowered below) the
baseline, for superscripts and subscripts.

*underline*
Whether to underline the text (a boolean).

*underlinefg*
The color of the underline; it defaults to the text color.

*overstrike*
Whether to draw a line through the middle of the text.

*overstrikefg*
The color of the overstrike line; it defaults to the text color.

*elide*
Whether the text is elided (hidden).

*justify*
How to justify the first character of a display line: `'left'` (the
default), `'right'` or `'center'`.

*wrap*
How to wrap lines that are too long: `'char'`, `'word'` or
`'none'`.

*lmargin1*, *lmargin2*
The indentation, in pixels, of the first display line of a logical
line and of the remaining display lines.

*lmargincolor*
The color of the left margin area.

*rmargin*
The right-hand margin, in pixels.

*rmargincolor*
The color of the right margin area.

*spacing1*, *spacing2*, *spacing3*
Extra space, in pixels, above the first display line of a logical
line, between its display lines, and below its last display line.

*tabs*
The set of tab stops, in the same form as the widget's *tabs* option.

*tabstyle*
How tab stops are interpreted: `'tabular'` or `'wordprocessor'`.

*selectbackground*, *selectforeground*
The background and foreground colors used for the text while it is
selected.

> **Note:** Tk 8.6 added the *lmargincolor*, *overstrikefg*, *rmargincolor*,
> *selectbackground*, *selectforeground* and *underlinefg* options.

`tag_config()` is an alias of `tag_configure()`.

### `tag_cget(tagName, option)`

Return the current value of the configuration option *option* for the tag
*tagName*.

### `tag_names(index=None)`

If *index* is omitted, return a tuple of the names of all tags defined in
the widget; otherwise return only the names of the tags applied to the
character at *index*.
The names are ordered from lowest to highest priority.

### `tag_ranges(tagName)`

Return a tuple of indices describing all ranges of text tagged with
*tagName*.
The result alternates start and end indices, so that elements `2*i` and
`2*i+1` bound the *i*-th range.

### `tag_nextrange(tagName, index1, index2=None)`

Search forward from *index1* (up to *index2* if given) for the first
range of characters tagged with *tagName*, and return a two-element tuple
of its start and end indices, or an empty tuple if there is no such
range.

### `tag_prevrange(tagName, index1, index2=None)`

Search backward from *index1* (down to *index2* if given) for the nearest
preceding range of characters tagged with *tagName*, and return a
two-element tuple of its start and end indices, or an empty tuple if
there is no such range.

### `tag_raise(tagName, aboveThis=None)`

Raise the priority of tag *tagName* so that it is just above the priority
of *aboveThis*, or to the highest priority of all tags if *aboveThis* is
omitted.
When the display options of overlapping tags conflict, the
higher-priority tag wins.

### `tag_lower(tagName, belowThis=None)`

Lower the priority of tag *tagName* so that it is just below the priority
of *belowThis*, or to the lowest priority of all tags if *belowThis* is
omitted.

### `tag_bind(tagName, sequence, func, add=None)`

Bind the event *sequence* on characters tagged with *tagName* to the
callback *func*, so that *func* is invoked when that event occurs over
such a character.
If *add* is true the binding is added alongside any existing bindings for
*sequence*, otherwise it replaces them.
Works like `bind()` and returns the identifier of the new
binding.
