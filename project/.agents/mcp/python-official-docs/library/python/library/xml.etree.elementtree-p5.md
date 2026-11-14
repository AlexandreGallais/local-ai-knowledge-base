---
title: "xml.etree.ElementTree --- The ElementTree XML API (part 5 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/xml.etree.elementtree.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# xml.etree.ElementTree --- The ElementTree XML API (part 5 of 5)

### `end(tag)`

Closes the current element.  *tag* is the element name.  Returns the
closed element.

### `start(tag, attrs)`

Opens a new element.  *tag* is the element name.  *attrs* is a dictionary
containing element attributes.  Returns the opened element.

### `comment(text)`

Creates a comment with the given *text*.  If `insert_comments` is true,
this will also add it to the tree.

> *Added in version 3.8.*

### `pi(target, text)`

Creates a process instruction with the given *target* name and *text*.
If `insert_pis` is true, this will also add it to the tree.

> *Added in version 3.8.*

In addition, a custom `TreeBuilder` object can provide the
following methods:

### `doctype(name, pubid, system)`

Handles a doctype declaration.  *name* is the doctype name.  *pubid* is
the public identifier.  *system* is the system identifier.  This method
does not exist on the default `TreeBuilder` class.

> *Added in version 3.2.*

### `start_ns(prefix, uri)`

Is called whenever the parser encounters a new namespace declaration,
before the `start()` callback for the opening element that defines it.
*prefix* is `''` for the default namespace and the declared
namespace prefix name otherwise.  *uri* is the namespace URI.

> *Added in version 3.8.*

### `end_ns(prefix)`

Is called after the `end()` callback of an element that declared
a namespace prefix mapping, with the name of the *prefix* that went
out of scope.

> *Added in version 3.8.*

### class `C14NWriterTarget(write, *, \`

```python
with_comments=False, strip_text=False, rewrite_prefixes=False, \
qname_aware_tags=None, qname_aware_attrs=None, \
exclude_attrs=None, exclude_tags=None)
```

A C14N 2.0 writer.  Arguments are the
same as for the `canonicalize()` function.  This class does not build a
tree but translates the callback events directly into a serialised form
using the *write* function.

> *Added in version 3.8.*

### class `XMLParser(*, target=None, encoding=None)`

This class is the low-level building block of the module.  It uses
`xml.parsers.expat` for efficient, event-based parsing of XML.  It can
be fed XML data incrementally with the `feed()` method, and parsing
events are translated to a push API - by invoking callbacks on the *target*
object.  If *target* is omitted, the standard `TreeBuilder` is used.
If *encoding* is given, the value overrides the
encoding specified in the XML file.

> *Changed in version 3.8.*
> Parameters are now keyword-only.
> The *html* argument is no longer supported.

### `close()`

Finishes feeding data to the parser.  Returns the result of calling the
`close()` method of the *target* passed during construction; by default,
this is the toplevel document element.

### `feed(data)`

Feeds data to the parser.  *data* is a string
or encoded data (`bytes` or a bytes-like object).

### `flush()`

Triggers parsing of any previously fed unparsed data, which can be
used to ensure more immediate feedback, in particular with Expat >=2.6.0.
The implementation of `flush()` temporarily disables reparse deferral
with Expat (if currently enabled) and triggers a reparse.
Disabling reparse deferral has security consequences; please see
`xml.parsers.expat.xmlparser.SetReparseDeferralEnabled()` for details.

`flush()`
has been backported to some prior releases of CPython as a security fix.
Check for availability using `hasattr()` if used in code running
across a variety of Python versions.

> *Added in version 3.13.*

`XMLParser.feed()` calls *target*\'s `start(tag, attrs_dict)` method
for each opening tag, its `end(tag)` method for each closing tag, and data
is processed by method `data(data)`.  For further supported callback
methods, see the `TreeBuilder` class.  `XMLParser.close()` calls
*target*\'s method `close()`. `XMLParser` can be used not only for
building a tree structure. This is an example of counting the maximum depth
of an XML file:

```
>>> from xml.etree.ElementTree import XMLParser
>>> class MaxDepth:                     # The target object of the parser
...     maxDepth = 0
...     depth = 0
...     def start(self, tag, attrib):   # Called for each opening tag.
...         self.depth += 1
...         if self.depth > self.maxDepth:
...             self.maxDepth = self.depth
...     def end(self, tag):             # Called for each closing tag.
...         self.depth -= 1
...     def data(self, data):
...         pass            # We do not need to do anything with data.
...     def close(self):    # Called when all data has been parsed.
...         return self.maxDepth
...
>>> target = MaxDepth()
>>> parser = XMLParser(target=target)
>>> exampleXml = """
... <a>
...   <b>
...   </b>
...   <b>
...     <c>
...       <d>
...       </d>
...     </c>
...   </b>
... </a>"""
>>> parser.feed(exampleXml)
>>> parser.close()
4
```

### class `XMLPullParser(events=None)`

A pull parser suitable for non-blocking applications.  Its input-side API is
similar to that of `XMLParser`, but instead of pushing calls to a
callback target, `XMLPullParser` collects an internal list of parsing
events and lets the user read from it. *events* is a sequence of events to
report back.  The supported events are the strings `"start"`, `"end"`,
`"comment"`, `"pi"`, `"start-ns"` and `"end-ns"` (the "ns" events
are used to get detailed namespace information).  If *events* is omitted,
only `"end"` events are reported.

### `feed(data)`

Feed the given data to the parser.  *data* is a string
or encoded data (`bytes` or a bytes-like object).

### `flush()`

Triggers parsing of any previously fed unparsed data, which can be
used to ensure more immediate feedback, in particular with Expat >=2.6.0.
The implementation of `flush()` temporarily disables reparse deferral
with Expat (if currently enabled) and triggers a reparse.
Disabling reparse deferral has security consequences; please see
`xml.parsers.expat.xmlparser.SetReparseDeferralEnabled()` for details.

`flush()`
has been backported to some prior releases of CPython as a security fix.
Check for availability using `hasattr()` if used in code running
across a variety of Python versions.

> *Added in version 3.13.*

### `close()`

Signal the parser that the data stream is terminated. Unlike
`XMLParser.close()`, this method always returns `None`.
Any events not yet retrieved when the parser is closed can still be
read with `read_events()`.

### `read_events()`

Return an iterator over the events which have been encountered in the
data fed to the
parser.  The iterator yields `(event, elem)` pairs, where *event* is a
string representing the type of event (e.g. `"end"`) and *elem* is the
encountered `Element` object, or other context value as follows.

- `start`, `end`: the current Element.
- `comment`, `pi`: the current comment / processing instruction
- `start-ns`: a tuple `(prefix, uri)` naming the declared namespace
mapping.
- `end-ns`: `None` (this may change in a future version)

Events provided in a previous call to `read_events()` will not be
yielded again.  Events are consumed from the internal queue only when
they are retrieved from the iterator, so multiple readers iterating in
parallel over iterators obtained from `read_events()` will have
unpredictable results.

> **Note:** `XMLPullParser` only guarantees that it has seen the ">"
> character of a starting tag when it emits a "start" event, so the
> attributes are defined, but the contents of the text and tail attributes
> are undefined at that point.  The same applies to the element children;
> they may or may not be present.
>
> If you need a fully populated element, look for "end" events instead.

> *Added in version 3.4.*

> *Changed in version 3.8.*
> The `comment` and `pi` events were added.

### class `ParseError`

XML parse error, raised by the various parsing methods in this module when
parsing fails.  The string representation of an instance of this exception
will contain a user-friendly error message.  In addition, it will have
the following attributes available:

### `code`

A numeric error code from the expat parser. See the documentation of
`xml.parsers.expat` for the list of error codes and their meanings.

### `position`

A tuple of *line*, *column* numbers, specifying where the error occurred.

**Footnotes**
