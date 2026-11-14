---
title: "xml.dom --- The Document Object Model API (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/xml.dom.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# xml.dom --- The Document Object Model API (part 4 of 4)

### class `ProcessingInstruction`

Represents a processing instruction in the XML document; this inherits from the
`Node` interface and cannot have child nodes.

### `ProcessingInstruction.target`

The content of the processing instruction up to the first whitespace character.
This is a read-only attribute.

### `ProcessingInstruction.data`

The content of the processing instruction following the first whitespace
character.

### class `Entity`

`Entity` represents a parsed or unparsed entity declared in the DTD.
It is a subclass of `Node`.
Entity nodes are contained in `DocumentType.entities`
and cannot be inserted into the document tree.
The name of the entity is its `nodeName`.

### `Entity.publicId`

The public identifier of the entity,
or `None` if it is not specified.
This is a read-only attribute.

### `Entity.systemId`

The system identifier of the entity,
or `None` if it is not specified.
This is a read-only attribute.

### `Entity.notationName`

The name of the notation for an unparsed entity,
or `None` for a parsed entity.
This is a read-only attribute.

### class `Notation`

`Notation` represents a notation declared in the DTD.
It is a subclass of `Node` and cannot have child nodes.
Notation nodes are contained in `DocumentType.notations`
and cannot be inserted into the document tree.
The name of the notation is its `nodeName`.

### `Notation.publicId`

The public identifier of the notation,
or `None` if it is not specified.
This is a read-only attribute.

### `Notation.systemId`

The system identifier of the notation,
or `None` if it is not specified.
This is a read-only attribute.

### Exceptions

The DOM Level 2 recommendation defines a single exception, `DOMException`,
and a number of constants that allow applications to determine what sort of
error occurred. `DOMException` instances carry a `code` attribute
that provides the appropriate value for the specific exception.

The Python DOM interface provides the constants, but also expands the set of
exceptions so that a specific exception exists for each of the exception codes
defined by the DOM.  The implementations must raise the appropriate specific
exception, each of which carries the appropriate value for the `code`
attribute.

### exception `DOMException`

Base exception class used for all specific DOM exceptions.  This exception class
cannot be directly instantiated.

### exception `DomstringSizeErr`

Raised when a specified range of text does not fit into a string. This is not
known to be used in the Python DOM implementations, but may be received from DOM
implementations not written in Python.

### exception `HierarchyRequestErr`

Raised when an attempt is made to insert a node where the node type is not
allowed.

### exception `IndexSizeErr`

Raised when an index or size parameter to a method is negative or exceeds the
allowed values.

### exception `InuseAttributeErr`

Raised when an attempt is made to insert an `Attr` node that is already
present elsewhere in the document.

### exception `InvalidAccessErr`

Raised if a parameter or an operation is not supported on the underlying object.

### exception `InvalidCharacterErr`

This exception is raised when a string parameter contains a character that is
not permitted in the context it's being used in by the XML 1.0 recommendation.
For example, attempting to create an `Element` node with a space in the
element type name will cause this error to be raised.

### exception `InvalidModificationErr`

Raised when an attempt is made to modify the type of a node.

### exception `InvalidStateErr`

Raised when an attempt is made to use an object that is not defined or is no
longer usable.

### exception `NamespaceErr`

If an attempt is made to change any object in a way that is not permitted with
regard to the Namespaces in XML
recommendation, this exception is raised.

### exception `NotFoundErr`

Exception when a node does not exist in the referenced context.  For example,
`NamedNodeMap.removeNamedItem()` will raise this if the node passed in does
not exist in the map.

### exception `NotSupportedErr`

Raised when the implementation does not support the requested type of object or
operation.

### exception `NoDataAllowedErr`

This is raised if data is specified for a node which does not support data.

### exception `NoModificationAllowedErr`

Raised on attempts to modify an object where modifications are not allowed (such
as for read-only nodes).

### exception `SyntaxErr`

Raised when an invalid or illegal string is specified.

### exception `ValidationErr`

Raised when an operation would make the document invalid
with respect to partial validity.
This is not known to be used in the Python DOM implementations,
but may be received from DOM implementations not written in Python.

### exception `WrongDocumentErr`

Raised when a node is inserted in a different document than it currently belongs
to, and the implementation does not support migrating the node from one document
to the other.

The exception codes defined in the DOM recommendation map to the exceptions
described above according to this table:

```text
+---------------------------------------+---------------------------------+
| Constant                              | Exception                       |
+=======================================+=================================+
| .. data:: DOMSTRING_SIZE_ERR          | :exc:`DomstringSizeErr`         |
+---------------------------------------+---------------------------------+
| .. data:: HIERARCHY_REQUEST_ERR       | :exc:`HierarchyRequestErr`      |
+---------------------------------------+---------------------------------+
| .. data:: INDEX_SIZE_ERR              | :exc:`IndexSizeErr`             |
+---------------------------------------+---------------------------------+
| .. data:: INUSE_ATTRIBUTE_ERR         | :exc:`InuseAttributeErr`        |
+---------------------------------------+---------------------------------+
| .. data:: INVALID_ACCESS_ERR          | :exc:`InvalidAccessErr`         |
+---------------------------------------+---------------------------------+
| .. data:: INVALID_CHARACTER_ERR       | :exc:`InvalidCharacterErr`      |
+---------------------------------------+---------------------------------+
| .. data:: INVALID_MODIFICATION_ERR    | :exc:`InvalidModificationErr`   |
+---------------------------------------+---------------------------------+
| .. data:: INVALID_STATE_ERR           | :exc:`InvalidStateErr`          |
+---------------------------------------+---------------------------------+
| .. data:: NAMESPACE_ERR               | :exc:`NamespaceErr`             |
+---------------------------------------+---------------------------------+
| .. data:: NOT_FOUND_ERR               | :exc:`NotFoundErr`              |
+---------------------------------------+---------------------------------+
| .. data:: NOT_SUPPORTED_ERR           | :exc:`NotSupportedErr`          |
+---------------------------------------+---------------------------------+
| .. data:: NO_DATA_ALLOWED_ERR         | :exc:`NoDataAllowedErr`         |
+---------------------------------------+---------------------------------+
| .. data:: NO_MODIFICATION_ALLOWED_ERR | :exc:`NoModificationAllowedErr` |
+---------------------------------------+---------------------------------+
| .. data:: SYNTAX_ERR                  | :exc:`SyntaxErr`                |
+---------------------------------------+---------------------------------+
| .. data:: VALIDATION_ERR              | :exc:`ValidationErr`            |
+---------------------------------------+---------------------------------+
| .. data:: WRONG_DOCUMENT_ERR          | :exc:`WrongDocumentErr`         |
+---------------------------------------+---------------------------------+
```

## Conformance

This section describes the conformance requirements and relationships between
the Python DOM API, the W3C DOM recommendations, and the OMG IDL mapping for
Python.

### Type Mapping

The IDL types used in the DOM specification are mapped to Python types
according to the following table.

```text
+------------------+-------------------------------------------+
| IDL Type         | Python Type                               |
+==================+===========================================+
| ``boolean``      | ``bool`` or ``int``                       |
+------------------+-------------------------------------------+
| ``int``          | ``int``                                   |
+------------------+-------------------------------------------+
| ``long int``     | ``int``                                   |
+------------------+-------------------------------------------+
| ``unsigned int`` | ``int``                                   |
+------------------+-------------------------------------------+
| ``DOMString``    | ``str`` or ``bytes``                      |
+------------------+-------------------------------------------+
| ``null``         | ``None``                                  |
+------------------+-------------------------------------------+
```

### Accessor Methods

The mapping from OMG IDL to Python defines accessor functions for IDL
`attribute` declarations in much the way the Java mapping does.
Mapping the IDL declarations:

```
readonly attribute string someValue;
         attribute string anotherValue;
```

yields three accessor functions:  a "get" method for `someValue`
(`_get_someValue()`), and "get" and "set" methods for `anotherValue`
(`_get_anotherValue() and set_anotherValue()`).  The mapping, in
particular, does not require that the IDL attributes are accessible as normal
Python attributes:  `object.someValue` is *not* required to work, and may
raise an `AttributeError`.

The Python DOM API, however, *does* require that normal attribute access work.
This means that the typical surrogates generated by Python IDL compilers are not
likely to work, and wrapper objects may be needed on the client if the DOM
objects are accessed via CORBA. While this does require some additional
consideration for CORBA DOM clients, the implementers with experience using DOM
over CORBA from Python do not consider this a problem.  Attributes that are
declared `readonly` may not restrict write access in all DOM
implementations.

In the Python DOM API, accessor functions are not required.  If provided, they
should take the form defined by the Python IDL mapping, but these methods are
considered unnecessary since the attributes are accessible directly from Python.
"Set" accessors should never be provided for `readonly` attributes.

The IDL definitions do not fully embody the requirements of the W3C DOM API,
such as the notion of certain objects, such as the return value of
`getElementsByTagName()`, being "live".  The Python DOM API does
not require implementations to enforce such requirements.
