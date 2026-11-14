---
title: "xml.dom --- The Document Object Model API (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/xml.dom.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `xml.dom` --- The Document Object Model API

Module `xml.dom`.

**Source code:** Lib/xml/dom/__init__.py

The Document Object Model, or "DOM," is a cross-language API from the World Wide
Web Consortium (W3C) for accessing and modifying XML documents.  A DOM
implementation presents an XML document as a tree structure, or allows client
code to build such a structure from scratch.  It then gives access to the
structure through a set of objects which provided well-known interfaces.

The DOM is extremely useful for random-access applications.  SAX only allows you
a view of one bit of the document at a time.  If you are looking at one SAX
element, you have no access to another.  If you are looking at a text node, you
have no access to a containing element. When you write a SAX application, you
need to keep track of your program's position in the document somewhere in your
own code.  SAX does not do it for you.  Also, if you need to look ahead in the
XML document, you are just out of luck.

Some applications are simply impossible in an event driven model with no access
to a tree.  Of course you could build some sort of tree yourself in SAX events,
but the DOM allows you to avoid writing that code.  The DOM is a standard tree
representation for XML data.

The Document Object Model is being defined by the W3C in stages, or "levels" in
their terminology.  The Python mapping of the API is substantially based on the
DOM Level 2 recommendation.

DOM applications typically start by parsing some XML into a DOM.  How this is
accomplished is not covered at all by DOM Level 1, and Level 2 provides only
limited improvements: There is a `DOMImplementation` object class which
provides access to `Document` creation methods, but no way to access an
XML reader/parser/Document builder in an implementation-independent way. There
is also no well-defined way to access these methods without an existing
`Document` object.  In Python, each DOM implementation will provide a
function `getDOMImplementation()`. DOM Level 3 adds a Load/Store
specification, which defines an interface to the reader, but this is not yet
available in the Python standard library.

Once you have a DOM document object, you can access the parts of your XML
document through its properties and methods.  These properties are defined in
the DOM specification; this portion of the reference manual describes the
interpretation of the specification in Python.

The specification provided by the W3C defines the DOM API for Java, ECMAScript,
and OMG IDL.  The Python mapping defined here is based in large part on the IDL
version of the specification, but strict compliance is not required (though
implementations are free to support the strict mapping from IDL).  See section
dom-conformance for a detailed discussion of mapping requirements.

> **See also:** Document Object Model (DOM) Level 2 Specification
> The W3C recommendation upon which the Python DOM API is based.
>
> Document Object Model (DOM) Level 1 Specification
> The W3C recommendation for the DOM supported by `xml.dom.minidom`.
>
> Python Language Mapping Specification
> This specifies the mapping from OMG IDL to Python.

## Module Contents

The `xml.dom` contains the following functions:

### `registerDOMImplementation(name, factory)`

Register the *factory* function with the name *name*.  The factory function
should return an object which implements the `DOMImplementation`
interface.  The factory function can return the same object every time, or a new
one for each call, as appropriate for the specific implementation (e.g. if that
implementation supports some customization).

### `getDOMImplementation(name=None, features=())`

Return a suitable DOM implementation. The *name* is either well-known, the
module name of a DOM implementation, or `None`. If it is not `None`, imports
the corresponding module and returns a `DOMImplementation` object if the
import succeeds.  If no name is given, and if the environment variable
`PYTHON_DOM` is set, this variable is used to find the implementation.
The only well-known name in the standard library is `'minidom'`,
for `xml.dom.minidom`.

If name is not given, this examines the available implementations to find one
with the required feature set.  If no implementation can be found, raise an
`ImportError`.  The features list must be a sequence of ``(feature,
version)`` pairs which are passed to the `hasFeature()`
method on available `DOMImplementation` objects.

Some convenience constants are also provided:

### `EMPTY_NAMESPACE`

The value used to indicate that no namespace is associated with a node in the
DOM.  This is typically found as the `namespaceURI` of a node, or
used as the *namespaceURI* parameter to a namespaces-specific method.

### `XML_NAMESPACE`

The namespace URI associated with the reserved prefix `xml`, as defined by
Namespaces in XML (section 4).

### `XMLNS_NAMESPACE`

The namespace URI for namespace declarations, as defined by `Document Object
Model (DOM) Level 2 Core Specification
<https://www.w3.org/TR/DOM-Level-2-Core/core.html>`_ (section 1.1.8).

### `XHTML_NAMESPACE`

The URI of the XHTML namespace as defined by `XHTML 1.0: The Extensible
HyperText Markup Language <https://www.w3.org/TR/xhtml1/>`_ (section 3.1.1).

In addition, `xml.dom` contains a base `Node` class and the DOM
exception classes.  The `Node` class provided by this module does not
implement any of the methods or attributes defined by the DOM specification;
concrete DOM implementations must provide those.  The `Node` class
provided as part of this module does provide the constants used for the
`nodeType` attribute on concrete `Node` objects; they are located
within the class rather than at the module level to conform with the DOM
specifications.
