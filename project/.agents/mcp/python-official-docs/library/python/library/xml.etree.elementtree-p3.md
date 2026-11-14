---
title: "xml.etree.ElementTree --- The ElementTree XML API (part 3 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/xml.etree.elementtree.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# xml.etree.ElementTree --- The ElementTree XML API (part 3 of 5)

## Reference

### `canonicalize(xml_data=None, *, out=None, from_file=None, **options)`

C14N 2.0 transformation function.

Canonicalization is a way to normalise XML output in a way that allows
byte-by-byte comparisons and digital signatures.  It reduces the freedom
that XML serializers have and instead generates a more constrained XML
representation.  The main restrictions regard the placement of namespace
declarations, the ordering of attributes, and ignorable whitespace.

This function takes an XML data string (*xml_data*) or a file path or
file-like object (*from_file*) as input, converts it to the canonical
form, and writes it out using the *out* file(-like) object, if provided,
or returns it as a text string if not.  The output file receives text,
not bytes.  It should therefore be opened in text mode with `utf-8`
encoding.

Typical uses:

```
xml_data = "<root>...</root>"
print(canonicalize(xml_data))

with open("c14n_output.xml", mode='w', encoding='utf-8') as out_file:
    canonicalize(xml_data, out=out_file)

with open("c14n_output.xml", mode='w', encoding='utf-8') as out_file:
    canonicalize(from_file="inputfile.xml", out=out_file)
```

The configuration *options* are as follows:

- *with_comments*: set to true to include comments (default: false)
- *strip_text*: set to true to strip whitespace before and after text content
(default: false)
- *rewrite_prefixes*: set to true to replace namespace prefixes by "n{number}"
(default: false)
- *qname_aware_tags*: a set of qname aware tag names in which prefixes
should be replaced in text content (default: empty)
- *qname_aware_attrs*: a set of qname aware attribute names in which prefixes
should be replaced in text content (default: empty)
- *exclude_attrs*: a set of attribute names that should not be serialised
- *exclude_tags*: a set of tag names that should not be serialised

In the option list above, "a set" refers to any collection or iterable of
strings, no ordering is expected.

> *Added in version 3.8.*

### `Comment(text=None)`

Comment element factory.  This factory function creates a special element
that will be serialized as an XML comment by the standard serializer.
*text* is a string containing the comment string.
Returns an element instance representing a comment.

Note that `XMLParser` skips over comments in the input
instead of creating comment objects for them. An `ElementTree` will
only contain comment nodes if they have been inserted into to
the tree using one of the `Element` methods.

### `dump(elem)`

Writes an element tree or element structure to sys.stdout.  This function
should be used for debugging only.

The exact output format is implementation dependent.  In this version, it's
written as an ordinary XML file.

*elem* is an element tree or an individual element.

> *Changed in version 3.8.*
> The `dump()` function now preserves the attribute order specified
> by the user.

### `fromstring(text, parser=None)`

Parses an XML section from a string constant.  Same as `XML()`.  *text*
is a string containing XML data.  *parser* is an optional parser instance.
If not given, the standard `XMLParser` parser is used.
Returns an `Element` instance.

### `fromstringlist(sequence, parser=None)`

Parses an XML document from a sequence of string fragments.  *sequence* is a
list or other sequence containing XML data fragments.  *parser* is an
optional parser instance.  If not given, the standard `XMLParser`
parser is used.  Returns an `Element` instance.

> *Added in version 3.2.*

### `indent(tree, space="  ", level=0)`

Appends whitespace to the subtree to indent the tree visually.
This can be used to generate pretty-printed XML output.
*tree* can be an Element or ElementTree.  *space* is the whitespace
string that will be inserted for each indentation level, two space
characters by default.  For indenting partial subtrees inside of an
already indented tree, pass the initial indentation level as *level*.

> *Added in version 3.9.*

### `iselement(element)`

Check if an object appears to be a valid element object.  *element* is an
element instance.  Return `True` if this is an element object.

### `iterparse(source, events=None, parser=None)`

Parses an XML section into an element tree incrementally, and reports what's
going on to the user.  *source* is a filename or file object
containing XML data.  *events* is a sequence of events to report back.  The
supported events are the strings `"start"`, `"end"`, `"comment"`,
`"pi"`, `"start-ns"` and `"end-ns"`
(the "ns" events are used to get detailed namespace
information).  If *events* is omitted, only `"end"` events are reported.
*parser* is an optional parser instance.
If not given, the standard `XMLParser` parser is used.
*parser* must be an instance of `XMLParser` or its subclass
and can only use the default `TreeBuilder` as a target.
Returns an iterator providing `(event, elem)` pairs;
it has a `root` attribute that references the root element of the
resulting XML tree once *source* is fully read.
The iterator has the `close()` method that closes the internal
file object if *source* is a filename.

Note that while `iterparse()` builds the tree incrementally, it issues
blocking reads on *source* (or the file it names).  As such, it's unsuitable
for applications where blocking reads can't be made.  For fully non-blocking
parsing, see `XMLPullParser`.

The tree is only built incrementally, it is not freed incrementally:
every parsed element is kept until the whole document is read.
See elementtree-pull-parsing for how to keep the memory usage low.

> **Note:** `iterparse()` only guarantees that it has seen the ">" character of a
> starting tag when it emits a "start" event, so the attributes are defined,
> but the contents of the text and tail attributes are undefined at that
> point.  The same applies to the element children; they may or may not be
> present.
>
> If you need a fully populated element, look for "end" events instead.

> *Deprecated since version 3.4.*
> The *parser* argument.

> *Changed in version 3.8.*
> The `comment` and `pi` events were added.

> *Changed in version 3.13.*
> Added the `close()` method.

> *Changed in version 3.15.*
> A `ResourceWarning` is now emitted if the iterator opened a file
> and is not explicitly closed.

### `parse(source, parser=None)`

Parses an XML section into an element tree.  *source* is a filename or file
object containing XML data.  *parser* is an optional parser instance.  If
not given, the standard `XMLParser` parser is used.  Returns an
`ElementTree` instance.

### `ProcessingInstruction(target, text=None)`

PI element factory.  This factory function creates a special element that
will be serialized as an XML processing instruction.  *target* is a string
containing the PI target.  *text* is a string containing the PI contents, if
given.  Returns an element instance, representing a processing instruction.

Note that `XMLParser` skips over processing instructions
in the input instead of creating PI objects for them. An
`ElementTree` will only contain processing instruction nodes if
they have been inserted into to the tree using one of the
`Element` methods.

### `register_namespace(prefix, uri)`

Registers a namespace prefix.  The registry is global, and any existing
mapping for either the given prefix or the namespace URI will be removed.
*prefix* is a namespace prefix.  *uri* is a namespace uri.  Tags and
attributes in this namespace will be serialized with the given prefix, if at
all possible.

> *Added in version 3.2.*

### `SubElement(parent, tag, /, attrib={}, **extra)`

Subelement factory.  This function creates an element instance, and appends
it to an existing element.

*parent* is the parent element.  *tag* is
the subelement name.  *attrib* is an optional dictionary, containing element
attributes.  *extra* contains additional attributes, given as keyword
arguments.  Returns an element instance.

> *Changed in version 3.15.*
> *attrib* can now be a `frozendict`.

> *Changed in version 3.15.*
> *parent* and *tag* are now positional-only parameters.

### `tostring(element, encoding="us-ascii", method="xml", *, \`

```python
xml_declaration=None, default_namespace=None, \
short_empty_elements=True)
```

Generates a string representation of an XML element, including all
subelements.  *element* is an `Element` instance.  *encoding* is
the output encoding (default is US-ASCII).  Use `encoding="unicode"` to
generate a Unicode string (otherwise, a bytestring is generated).  *method*
is either `"xml"`, `"html"` or `"text"` (default is `"xml"`).
*xml_declaration*, *default_namespace* and *short_empty_elements* has the same
meaning as in `ElementTree.write()`. Returns an (optionally) encoded string
containing the XML data.

> *Changed in version 3.4.*
> Added the *short_empty_elements* parameter.

> *Changed in version 3.8.*
> Added the *xml_declaration* and *default_namespace* parameters.

> *Changed in version 3.8.*
> The `tostring()` function now preserves the attribute order
> specified by the user.

### `tostringlist(element, encoding="us-ascii", method="xml", *, \`

```python
xml_declaration=None, default_namespace=None, \
short_empty_elements=True)
```

Generates a string representation of an XML element, including all
subelements.  *element* is an `Element` instance.  *encoding* is
the output encoding (default is US-ASCII).  Use `encoding="unicode"` to
generate a Unicode string (otherwise, a bytestring is generated).  *method*
is either `"xml"`, `"html"` or `"text"` (default is `"xml"`).
*xml_declaration*, *default_namespace* and *short_empty_elements* has the same
meaning as in `ElementTree.write()`. Returns a list of (optionally) encoded
strings containing the XML data. It does not guarantee any specific sequence,
except that `b"".join(tostringlist(element)) == tostring(element)`.

> *Added in version 3.2.*

> *Changed in version 3.4.*
> Added the *short_empty_elements* parameter.

> *Changed in version 3.8.*
> Added the *xml_declaration* and *default_namespace* parameters.

> *Changed in version 3.8.*
> The `tostringlist()` function now preserves the attribute order
> specified by the user.

### `XML(text, parser=None)`

Parses an XML section from a string constant.  This function can be used to
embed "XML literals" in Python code.  *text* is a string containing XML
data.  *parser* is an optional parser instance.  If not given, the standard
`XMLParser` parser is used.  Returns an `Element` instance.

### `XMLID(text, parser=None)`

Parses an XML section from a string constant, and also returns a dictionary
which maps from element id:s to elements.  *text* is a string containing XML
data.  *parser* is an optional parser instance.  If not given, the standard
`XMLParser` parser is used.  Returns a tuple containing an
`Element` instance and a dictionary.

## XInclude support

This module provides limited support for
XInclude directives, via the `xml.etree.ElementInclude` helper module.  This module can be used to insert subtrees and text strings into element trees, based on information in the tree.

### Example

Here's an example that demonstrates use of the XInclude module. To include an XML document in the current document, use the `{http://www.w3.org/2001/XInclude}include` element and set the **parse** attribute to `"xml"`, and use the **href** attribute to specify the document to include.

```xml
<?xml version="1.0"?>
<document xmlns:xi="http://www.w3.org/2001/XInclude">
  <xi:include href="source.xml" parse="xml" />
</document>
```

By default, the **href** attribute is treated as a file name. You can use custom loaders to override this behaviour. Also note that the standard helper does not support XPointer syntax.

To process this file, load it as usual, and pass the root element to the `xml.etree.ElementTree` module:

```python
from xml.etree import ElementTree, ElementInclude

tree = ElementTree.parse("document.xml")
root = tree.getroot()

ElementInclude.include(root)
```

The ElementInclude module replaces the `{http://www.w3.org/2001/XInclude}include` element with the root element from the **source.xml** document. The result might look something like this:

```xml
<document xmlns:xi="http://www.w3.org/2001/XInclude">
  <para>This is a paragraph.</para>
</document>
```

If the **parse** attribute is omitted, it defaults to "xml". The href attribute is required.

To include a text document, use the `{http://www.w3.org/2001/XInclude}include` element, and set the **parse** attribute to "text":

```xml
<?xml version="1.0"?>
<document xmlns:xi="http://www.w3.org/2001/XInclude">
  Copyright (c) <xi:include href="year.txt" parse="text" />.
</document>
```

The result might look something like:

```xml
<document xmlns:xi="http://www.w3.org/2001/XInclude">
  Copyright (c) 2003.
</document>
```
