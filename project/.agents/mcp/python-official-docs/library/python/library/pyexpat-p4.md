---
title: "xml.parsers.expat --- Fast XML parsing using Expat (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pyexpat.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# xml.parsers.expat --- Fast XML parsing using Expat (part 4 of 4)

## Expat error constants

Module `xml.parsers.expat.errors`.

The following constants are provided in the `xml.parsers.expat.errors`
module.  These constants are useful in interpreting some of the attributes of
the `ExpatError` exception objects raised when an error has occurred.
Since for backwards compatibility reasons, the constants' value is the error
*message* and not the numeric error *code*, you do this by comparing its
`code` attribute with
`errors.codes[errors.XML_ERROR_{CONSTANT_NAME}]`.

The `errors` module has the following attributes:

### `codes`

A dictionary mapping string descriptions to their error codes.

> *Added in version 3.2.*

### `messages`

A dictionary mapping numeric error codes to their string descriptions.

> *Added in version 3.2.*

### `XML_ERROR_ATTRIBUTE_EXTERNAL_ENTITY_REF`

An entity reference in an attribute value referred to an external entity instead
of an internal entity.

### `XML_ERROR_BAD_CHAR_REF`

A character reference referred to a character which is illegal in XML (for
example, character `0`, or '`&#0;`').

### `XML_ERROR_BINARY_ENTITY_REF`

An entity reference referred to an entity which was declared with a notation, so
cannot be parsed.

### `XML_ERROR_DUPLICATE_ATTRIBUTE`

An attribute was used more than once in a start tag.

### `XML_ERROR_INVALID_TOKEN`

Raised when an input byte could not properly be assigned to a character; for
example, a NUL byte (value `0`) in a UTF-8 input stream.

### `XML_ERROR_JUNK_AFTER_DOC_ELEMENT`

Something other than whitespace occurred after the document element.

### `XML_ERROR_MISPLACED_XML_PI`

An XML declaration was found somewhere other than the start of the input data.

### `XML_ERROR_NO_ELEMENTS`

The document contains no elements (XML requires all documents to contain exactly
one top-level element).

### `XML_ERROR_NO_MEMORY`

Expat was not able to allocate memory internally.

### `XML_ERROR_PARAM_ENTITY_REF`

A parameter entity reference was found where it was not allowed.

### `XML_ERROR_PARTIAL_CHAR`

An incomplete character was found in the input.

### `XML_ERROR_RECURSIVE_ENTITY_REF`

An entity reference contained another reference to the same entity; possibly via
a different name, and possibly indirectly.

### `XML_ERROR_SYNTAX`

Some unspecified syntax error was encountered.

### `XML_ERROR_TAG_MISMATCH`

An end tag did not match the innermost open start tag.

### `XML_ERROR_UNCLOSED_TOKEN`

Some token (such as a start tag) was not closed before the end of the stream or
the next token was encountered.

### `XML_ERROR_UNDEFINED_ENTITY`

A reference was made to an entity which was not defined.

### `XML_ERROR_UNKNOWN_ENCODING`

The document encoding is not supported by Expat.

### `XML_ERROR_UNCLOSED_CDATA_SECTION`

A CDATA marked section was not closed.

### `XML_ERROR_NOT_STANDALONE`

The parser determined that the document was not "standalone" though it declared
itself to be in the XML declaration, and the `NotStandaloneHandler` was
set and returned `0`.

### `XML_ERROR_FEATURE_REQUIRES_XML_DTD`

An operation was requested that requires DTD support to be compiled in, but
Expat was configured without DTD support.  This should never be reported by a
standard build of the `xml.parsers.expat` module.

### `XML_ERROR_CANT_CHANGE_FEATURE_ONCE_PARSING`

A behavioral change was requested after parsing started that can only be changed
before parsing has started.  This is (currently) only raised by
`UseForeignDTD()`.

### `XML_ERROR_UNBOUND_PREFIX`

An undeclared prefix was found when namespace processing was enabled.

### `XML_ERROR_UNDECLARING_PREFIX`

The document attempted to remove the namespace declaration associated with a
prefix.

### `XML_ERROR_INCOMPLETE_PE`

A parameter entity contained incomplete markup.

### `XML_ERROR_XML_DECL`

There was an error parsing the XML declaration.

### `XML_ERROR_TEXT_DECL`

There was an error parsing a text declaration in an external entity.

### `XML_ERROR_PUBLICID`

Characters were found in the public id that are not allowed.

### `XML_ERROR_SUSPENDED`

The requested operation was made on a suspended parser, but isn't allowed.  This
includes attempts to provide additional input or to stop the parser.

### `XML_ERROR_NOT_SUSPENDED`

An attempt to resume the parser was made when the parser had not been suspended.

### `XML_ERROR_ABORTED`

This should not be reported to Python applications.

### `XML_ERROR_FINISHED`

The requested operation was made on a parser which was finished parsing input,
but isn't allowed.  This includes attempts to provide additional input or to
stop the parser.

### `XML_ERROR_RESERVED_PREFIX_XML`

An attempt was made to
undeclare reserved namespace prefix `xml`
or to bind it to another namespace URI.

### `XML_ERROR_RESERVED_PREFIX_XMLNS`

An attempt was made to declare or undeclare reserved namespace prefix `xmlns`.

### `XML_ERROR_RESERVED_NAMESPACE_URI`

An attempt was made to bind the URI of one the reserved namespace
prefixes `xml` and `xmlns` to another namespace prefix.

### `XML_ERROR_INVALID_ARGUMENT`

This should not be reported to Python applications.

### `XML_ERROR_NO_BUFFER`

This should not be reported to Python applications.

### `XML_ERROR_AMPLIFICATION_LIMIT_BREACH`

The limit on input amplification factor (from DTD and entities)
has been breached.

### `XML_ERROR_NOT_STARTED`

The parser was tried to be stopped or suspended before it started.

> *Added in version 3.14.*

**Footnotes**
