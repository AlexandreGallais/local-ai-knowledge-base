---
title: "xml.etree.ElementTree --- The ElementTree XML API (part 4 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/xml.etree.elementtree.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# xml.etree.ElementTree --- The ElementTree XML API (part 4 of 5)

## Reference

### Functions

Module `xml.etree.ElementInclude`.

### `default_loader(href, parse, encoding=None)`

Default loader. This default loader reads an included resource from disk.
*href* is a URL.  *parse* is for parse mode either "xml" or "text".
*encoding* is an optional text encoding.  If not given, encoding is `utf-8`.
Returns the expanded resource.
If the parse mode is `"xml"`, this is an `Element` instance.
If the parse mode is `"text"`, this is a string.
If the loader fails, it can return `None` or raise an exception.

### `include(elem, loader=None, base_url=None, max_depth=6)`

This function expands XInclude directives in-place in tree pointed by *elem*.
*elem* is either the root `Element` or an
`ElementTree` instance to find such element.
*loader* is an optional resource loader.  If omitted, it defaults to `default_loader()`.
If given, it should be a callable that implements the same interface as
`default_loader()`.  *base_url* is base URL of the original file, to resolve
relative include file references.  *max_depth* is the maximum number of recursive
inclusions.  Limited to reduce the risk of malicious content explosion.
Pass `None` to disable the limitation.

> *Changed in version 3.9.*
> Added the *base_url* and *max_depth* parameters.

### Element Objects

Module `xml.etree.ElementTree`.

### class `Element(tag, /, attrib={}, **extra)`

Element class.  This class defines the Element interface, and provides a
reference implementation of this interface.

*tag* is the element name.  *attrib* is
an optional dictionary, containing element attributes.  *extra* contains
additional attributes, given as keyword arguments.

The element name and the attribute names and values are strings or
`QName` instances, and the text and the tail are strings or
`None`.
The element name can also be `Comment()` or
`ProcessingInstruction()`, which are used for special elements.
If it is `None`, the element itself is not serialized: only its text
and its children are written, and its attributes are ignored.
This can be used for a fragment which contains several elements.
With `method="html"` the attribute value can also be `None`,
which produces an empty attribute (such as `checked`).
Other objects can be stored in the tree, but they cannot be serialized.

> *Changed in version 3.15.*
> *attrib* can now be a `frozendict`.

> *Changed in version 3.15.*
> *tag* is now a positional-only parameter.

### `tag`

A string identifying what kind of data this element represents (the
element type, in other words).

### `text`

```python
tail
```

These attributes can be used to hold additional data associated with
the element.  Their values are usually strings but may be any
application-specific object.  If the element is created from
an XML file, the *text* attribute holds either the text between
the element's start tag and its first child or end tag, or `None`, and
the *tail* attribute holds either the text between the element's
end tag and the next tag, or `None`.  For the XML data

```xml
<a><b>1<c>2<d/>3</c></b>4</a>
```

the *a* element has `None` for both *text* and *tail* attributes,
the *b* element has *text* `"1"` and *tail* `"4"`,
the *c* element has *text* `"2"` and *tail* `None`,
and the *d* element has *text* `None` and *tail* `"3"`.

To collect the inner text of an element, see `itertext()`, for
example `"".join(element.itertext())`.

Applications may store arbitrary objects in these attributes.

### `attrib`

A dictionary containing the element's attributes.  Note that while the
*attrib* value is always a real mutable Python dictionary, an ElementTree
implementation may choose to use another internal representation, and
create the dictionary only if someone asks for it.  To take advantage of
such implementations, use the dictionary methods below whenever possible.

The following dictionary-like methods work on the element attributes.

### `clear()`

Resets an element.  This function removes all subelements, clears all
attributes, and sets the text and tail attributes to `None`.

### `get(key, default=None)`

Gets the element attribute named *key*.

Returns the attribute value, or *default* if the attribute was not found.

### `items()`

Returns the element attributes as (name, value) pairs.

### `keys()`

Returns the element attribute names.

### `set(key, value)`

Set the attribute *key* on the element to *value*.

The following methods work on the element's children (subelements).

### `append(subelement)`

Adds the element *subelement* to the end of this element's internal list
of subelements.  Raises `TypeError` if *subelement* is not an
`Element`.

### `extend(subelements)`

Appends *subelements* from an iterable of elements.
Raises `TypeError` if a subelement is not an `Element`.

> *Added in version 3.2.*

### `find(match, namespaces=None)`

Finds the first subelement matching *match*.  *match* may be a tag name
or a path.  Returns an element instance
or `None`.  *namespaces* is an optional mapping from namespace prefix
to full name.  Pass `''` as prefix to move all unprefixed tag names
in the expression into the given namespace.

### `findall(match, namespaces=None)`

Finds all matching subelements, by tag name or
path.  Returns a list containing all matching
elements in document order.  *namespaces* is an optional mapping from
namespace prefix to full name.  Pass `''` as prefix to move all
unprefixed tag names in the expression into the given namespace.

### `findtext(match, default=None, namespaces=None)`

Finds text for the first subelement matching *match*.  *match* may be
a tag name or a path.  Returns the text content
of the first matching element, or *default* if no element was found.
Note that if the matching element has no text content an empty string
is returned. *namespaces* is an optional mapping from namespace prefix
to full name.  Pass `''` as prefix to move all unprefixed tag names
in the expression into the given namespace.

### `insert(index, subelement)`

Inserts *subelement* at the given position in this element.  Raises
`TypeError` if *subelement* is not an `Element`.

### `iter(tag=None)`

Creates a tree iterator with the current element as the root.
The iterator iterates over this element and all elements below it, in
document (depth first) order.  If *tag* is not `None` or `'*'`, only
elements whose tag equals *tag* are returned from the iterator.  If the
tree structure is modified during iteration, the result is undefined.

> *Added in version 3.2.*

### `iterfind(match, namespaces=None)`

Finds all matching subelements, by tag name or
path.  Returns an iterable yielding all
matching elements in document order. *namespaces* is an optional mapping
from namespace prefix to full name.

> *Added in version 3.2.*

### `itertext()`

Creates a text iterator.  The iterator loops over this element and all
subelements, in document order, and returns all inner text.

> *Added in version 3.2.*

### `makeelement(tag, attrib)`

Creates a new element object of the same type as this element.  Do not
call this method, use the `SubElement()` factory function instead.

### `remove(subelement)`

Removes *subelement* from the element.  Unlike the find* methods this
method compares elements based on the instance identity, not on tag value
or contents.

`Element` objects also support the following sequence type methods
for working with subelements: `__delitem__()`,
`__getitem__(), setitem__()`,
`__len__()`.

Caution: Elements with no subelements will test as `False`.  In a future
release of Python, all elements will test as `True` regardless of whether
subelements exist.  Instead, prefer explicit `len(elem)` or
`elem is not None` tests.:

```
element = root.find('foo')

if not element:  # careful!
    print("element not found, or element has no subelements")

if element is None:
    print("element not found")
```

> *Changed in version 3.12.*
> Testing the truth value of an Element emits `DeprecationWarning`.

Prior to Python 3.8, the serialisation order of the XML attributes of
elements was artificially made predictable by sorting the attributes by
their name. Based on the now guaranteed ordering of dicts, this arbitrary
reordering was removed in Python 3.8 to preserve the order in which
attributes were originally parsed or created by user code.

In general, user code should try not to depend on a specific ordering of
attributes, given that the `XML Information Set
<https://www.w3.org/TR/xml-infoset/>`_ explicitly excludes the attribute
order from conveying information. Code should be prepared to deal with
any ordering on input. In cases where deterministic XML output is required,
e.g. for cryptographic signing or test data sets, canonical serialisation
is available with the `canonicalize()` function.

In cases where canonical output is not applicable but a specific attribute
order is still desirable on output, code should aim for creating the
attributes directly in the desired order, to avoid perceptual mismatches
for readers of the code. In cases where this is difficult to achieve, a
recipe like the following can be applied prior to serialisation to enforce
an order independently from the Element creation:

```
def reorder_attributes(root):
    for el in root.iter():
        attrib = el.attrib
        if len(attrib) > 1:
            # adjust attribute order, e.g. by sorting
            attribs = sorted(attrib.items())
            attrib.clear()
            attrib.update(attribs)
```

### class `ElementTree(element=None, file=None)`

ElementTree wrapper class.  This class represents an entire element
hierarchy, and adds some extra support for serialization to and from
standard XML.

*element* is the root element.  The tree is initialized with the contents
of the XML *file* if given.

### `_setroot(element)`

Replaces the root element for this tree.  This discards the current
contents of the tree, and replaces it with the given element.  Use with
care.  *element* is an element instance.

### `find(match, namespaces=None)`

Same as `Element.find()`, starting at the root of the tree.

### `findall(match, namespaces=None)`

Same as `Element.findall()`, starting at the root of the tree.

### `findtext(match, default=None, namespaces=None)`

Same as `Element.findtext()`, starting at the root of the tree.

### `getroot()`

Returns the root element for this tree.

### `iter(tag=None)`

Creates and returns a tree iterator for the root element.  The iterator
loops over all elements in this tree, in section order.  *tag* is the tag
to look for (default is to return all elements).

### `iterfind(match, namespaces=None)`

Same as `Element.iterfind()`, starting at the root of the tree.

> *Added in version 3.2.*

### `parse(source, parser=None)`

Loads an external XML section into this element tree.  *source* is a file
name or file object.  *parser* is an optional parser instance.
If not given, the standard `XMLParser` parser is used.  Returns the
section root element.

### `write(file, encoding="us-ascii", xml_declaration=None, \`

```python
default_namespace=None, method="xml", *, \
short_empty_elements=True)
```

Writes the element tree to a file, as XML.  *file* is a file name, or a
file object opened for writing.  *encoding* is the output
encoding (default is US-ASCII).
*xml_declaration* controls if an XML declaration should be added to the
file.  Use `False` for never, `True` for always, `None`
for only if not US-ASCII or UTF-8 or Unicode (default is `None`).
*default_namespace* sets the default XML namespace (for "xmlns").
*method* is either `"xml"`, `"html"` or `"text"` (default is
`"xml"`).
The keyword-only *short_empty_elements* parameter controls the formatting
of elements that contain no content.  If `True` (the default), they are
emitted as a single self-closed tag, otherwise they are emitted as a pair
of start/end tags.

The output is either a string (`str`) or binary (`bytes`).
This is controlled by the *encoding* argument.  If *encoding* is
`"unicode"`, the output is a string; otherwise, it's binary.  Note that
this may conflict with the type of *file* if it's an open
file object; make sure you do not try to write a string to a
binary stream and vice versa.

> *Changed in version 3.4.*
> Added the *short_empty_elements* parameter.

> *Changed in version 3.8.*
> The `write()` method now preserves the attribute order specified
> by the user.

This is the XML file that is going to be manipulated:

```
<html>
    <head>
        <title>Example page</title>
    </head>
    <body>
        <p>Moved to <a href="http://example.org/">example.org</a>
        or <a href="http://example.com/">example.com</a>.</p>
    </body>
</html>
```

Example of changing the attribute "target" of every link in first paragraph:

```
>>> from xml.etree.ElementTree import ElementTree
>>> tree = ElementTree()
>>> tree.parse("index.xhtml")
<Element 'html' at 0xb77e6fac>
>>> p = tree.find("body/p")     # Finds first occurrence of tag p in body
>>> p
<Element 'p' at 0xb77ec26c>
>>> links = list(p.iter("a"))   # Returns list of all links
>>> links
[<Element 'a' at 0xb77ec2ac>, <Element 'a' at 0xb77ec1cc>]
>>> for i in links:             # Iterates through all found links
...     i.attrib["target"] = "blank"
...
>>> tree.write("output.xhtml")
```

### class `QName(text_or_uri, tag=None)`

QName wrapper.  This can be used to wrap a QName attribute value, in order
to get proper namespace handling on output.  *text_or_uri* is a string
containing the QName value, in the form {uri}local, or, if the tag argument
is given, the URI part of a QName.  If *tag* is given, the first argument is
interpreted as a URI, and this argument is interpreted as a local name.
`QName` instances are opaque.

### class `TreeBuilder(element_factory=None, *, comment_factory=None, \`

```python
pi_factory=None, insert_comments=False, insert_pis=False)
```

Generic element structure builder.  This builder converts a sequence of
start, data, end, comment and pi method calls to a well-formed element
structure.  You can use this class to build an element structure using
a custom XML parser, or a parser for some other XML-like format.

*element_factory*, when given, must be a callable accepting two positional
arguments: a tag and a dict of attributes.  It is expected to return a new
element instance.

The *comment_factory* and *pi_factory* functions, when given, should behave
like the `Comment()` and `ProcessingInstruction()` functions to
create comments and processing instructions.  When not given, the default
factories will be used.  When *insert_comments* and/or *insert_pis* is true,
comments/pis will be inserted into the tree if they appear within the root
element (but not outside of it).

### `close()`

Flushes the builder buffers, and returns the toplevel document
element.  Returns an `Element` instance.

### `data(data)`

Adds text to the current element.  *data* is a string.
