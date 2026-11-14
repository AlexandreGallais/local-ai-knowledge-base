---
title: "xml.parsers.expat --- Fast XML parsing using Expat (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pyexpat.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `xml.parsers.expat` --- Fast XML parsing using Expat

Module `xml.parsers.expat`.

> **Note:** If you need to parse untrusted or unauthenticated data, see
> xml-security.

The `xml.parsers.expat` module is a Python interface to the Expat
non-validating XML parser. The module provides a single extension type,
`xmlparser`, that represents the current state of an XML parser.  After
an `xmlparser` object has been created, various attributes of the object
can be set to handler functions.  When an XML document is then fed to the
parser, the handler functions are called for the character data and markup in
the XML document.

This module uses the `pyexpat` module to provide access to the Expat
parser.  Direct use of the `pyexpat` module is deprecated.

This module provides the following exception, type object and data items:

### exception `ExpatError`

The exception raised when Expat reports an error.  See section
expaterror-objects for more information on interpreting Expat errors.

### exception `error`

Alias for `ExpatError`.

### `XMLParserType`

The type of the return values from the `ParserCreate()` function.

### `EXPAT_VERSION`

The version string of the Expat library loaded by the interpreter,
like `'expat_2.8.4'`.

### `version_info`

The version of the Expat library loaded by the interpreter,
as a tuple of three integers: major, minor and micro version.

### `features`

The list of the features with which the loaded Expat library
was compiled, as `(name, value)` pairs.
The value is only meaningful for features which have one,
like `'XML_CONTEXT_BYTES'` or the default protection limits
`'XML_BLAP_ACT_THRES'` and `'XML_AT_MAX_AMP'`;
for other features, like `'XML_DTD'` and `'XML_NS'`,
the value is `0` and only the presence of the name is significant.

The `xml.parsers.expat` module contains two functions:

### `ErrorString(errno)`

Returns an explanatory string for a given error number *errno*.

### `ParserCreate(encoding=None, namespace_separator=None, intern=None)`

Creates and returns a new `xmlparser` object.   *encoding*, if specified,
must be a string naming the encoding  used by the XML data.  Expat doesn't
support as many encodings as Python does, and its repertoire of encodings can't
be extended; it supports UTF-8, UTF-16, ISO-8859-1 (Latin1), and ASCII.  If
*encoding* is given it will override the implicit or explicit encoding of the
document.

Parsers created through `ParserCreate()` are called "root" parsers,
in the sense that they do not have any parent parser attached. Non-root
parsers are created by :meth:`parser.ExternalEntityParserCreate
<xmlparser.ExternalEntityParserCreate>`.

Expat can optionally do XML namespace processing for you, enabled by providing a
value for *namespace_separator*.  The value must be a one-character string; a
`ValueError` will be raised if the string has an illegal length (`None`
is considered the same as omission).  When namespace processing is enabled,
element type names and attribute names that belong to a namespace will be
expanded.  The element name passed to the element handlers
`StartElementHandler` and `EndElementHandler` will be the
concatenation of the namespace URI, the namespace separator character, and the
local part of the name.  If the namespace separator is a zero byte (`chr(0)`)
then the namespace URI and the local part will be concatenated without any
separator.

For example, if *namespace_separator* is set to a space character (`' '`) and
the following document is parsed:

```xml
<?xml version="1.0"?>
<root xmlns    = "http://default-namespace.org/"
      xmlns:py = "http://www.python.org/ns/">
  <py:elem1 />
  <elem2 xmlns="" />
</root>
```

`StartElementHandler` will receive the following strings for each
element:

```
http://default-namespace.org/ root
http://www.python.org/ns/ elem1
elem2
```

*intern*, if given, must be a dictionary.
It is used to intern the names of elements and attributes,
and is available as the `intern` attribute.
By default a new empty dictionary is created for every parser.

Due to limitations in the `Expat` library used by `pyexpat`,
the `xmlparser` instance returned can only be used to parse a single
XML document.  Call `ParserCreate` for each document to provide unique
parser instances.

> **See also:** The Expat XML Parser
> Home page of the Expat project.
