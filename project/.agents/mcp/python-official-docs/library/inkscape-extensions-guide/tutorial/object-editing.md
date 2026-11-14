---
title: "Accessing and editing attributes"
tool: "inkscape-extensions-guide"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/docs/tutorial/object-editing.rst"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# Accessing and editing attributes

In inkex, every SVG element is an `etree.Element` object. As such, the usual methods
are avaliable for accessing and writing data, in particular
`get()` and
`set()` to read and write an arbitrary attribute:

```
rectangle.set("width", 10)
rectangle.get("width") # returns 10

# sets the label attribute in the Inkscape namespace
rectangle.set("inkscape:label", "my-rectangle") 
rectangle.get("inkscape:label") # returns "my-rectangle"
```

Inkscape hands these values more or less unchanged to the XML (simplifying the way the
namespace is specified). The only exception is the `id` attribute: when it is set,
inkex needs to check whether it is unique in the document.

For an increasing number of attributes, inkex provides additional functionality for
reading and editing; they are often Python properties and further described in the API.

In general, **if those attributes return mutable types** (such as `List` or `Dict`,
or other elements of the document such as an href), any
changes made to them are directly written back into the document tree, you don't need
to set them again.** The notable exception to this rule is
`ShapeElement.path` due to performance
reasons.

## `style`, `class` and `transform`

Accessing these attributes returns `Style`,
`Classes` and `Transform`, respectively,
giving high-level access to them.

All of them are defined in
`BaseElement.WRAPPED_ATTRS`.

### `style`

For styles, you will want to either query the inline style attribute of an element
(`element.style`) or the effective style
(`element.specified_style()`
), taking into
account presentation attributes, parent style, CSS declarations, shorthand attributes
and `!important` styles (and finally, if nothing is found, the default for this
particular attribute) - i.e. the "final style" the element has in the user agent.
Both return `Style` objects. However, only the changes made
to the first are written back to the document, as we wouldn't know where to write them
(especially if there are `!important` styles present in the document, they will
override changes made even to the element's inline style!)

Styles have a `__call__()` override that returns a parsed value.
If this value is a mutable datatype, changing it will immediately permeate back to the
document. Examples:

```
_ = el.style("fill") # returns inkex.Color value (i.e. solid fill)

# Attaches the linear gradient to the document's defs, and sets the id as href 
# on the fill
el.style["fill"] = inkex.LinearGradient.new(inkex.Stop.new(...))

# Query the elements style: either using __getitem__ or __call__
el.style["fill"] # returns "url(#linearGradient572)"
grad = el.style("fill")  # returns LinearGradient instance

# Modify the underlying gradient 
grad.add(inkex.Stop.new(...))

# The changes go back into the document
len(el.style("fill"))  # returns 2

# For filters, we accept single filters or a list for writing:
el.style["filter"] = "url(#filter123)"
# but reading the parsed value always returns a list
el.style("filter")  # returns [Filter instance], or [] if #filter123 doesn't exist

# Modifying this list modifies the document
second = inkex.Filter.new(inkex.Filter.GaussianBlur.new(stdDeviation=1))
el.style("filter").append(second)

el.style("filter")  # returns a list of 2 filters 
el.style("filter").clear()
el.style("filter")  # returns []
```

The parsed value is a best-faith interpretation of the value. If the value references
other elements in the document, they are returned. Percentage values are returned as
float, opacity values clipped between 0 and 1, values with unit are converted to user
units, `currentColor` is replaced with the actual color, enum values are validated and
so on. If a string is returned for a particular attribute, a parsed version may be added
in a future major version.

### `transform`

`element.transform` is also mutable
through its public methods, like `add_matrix()`,
`add_translate()`, and its operators, e.g.:

```
element.transform @= inkex.Transform(scale=2)
```

which directly updates the `transform` attribute of `element`.

## `path`

`PathElement.path` returns
and object of type `inkex.Path`. For performance reasons,
modifying this object does not immediately write back into the `PathElement`. To make
the changes permanent, the following options are avaliable:

```
from inkex.paths import Move, Line

pel = inkex.PathElement.new(path=[Move(10, 10), Line(20, 20)])
with pel.path as path:
    path.append(Line(20, 10))
    path.close()

str(pel.path)  # returns "M 10 10 L 20 20 L 20 10 Z"

# You can also modify the Path and write it back into the attribute manually.
p = pel.path
del p[-1]
pel.path = p

str(pel.path)  # returns "M 10 10 L 20 20 L 20 10"
```

Similar to `element.style` vs.
`element.specified_style()`
(one provides modifyable object access, one is a derived / computed value),
`ShapeElement` also has a
`path` property that returns the
`inkex.Path` representation of e.g. a rectangle or circle,
and the context manager is not available for it.
