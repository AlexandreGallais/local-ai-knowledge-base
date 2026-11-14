---
title: "xml.parsers.expat --- Fast XML parsing using Expat (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pyexpat.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# xml.parsers.expat --- Fast XML parsing using Expat (part 3 of 4)

### `xmlparser.ElementDeclHandler(name, model)`

Called once for each element type declaration.  *name* is the name of the
element type, and *model* is a representation of the content model.

### `xmlparser.AttlistDeclHandler(elname, attname, type, default, required)`

Called for each declared attribute for an element type.  If an attribute list
declaration declares three attributes, this handler is called three times, once
for each attribute.  *elname* is the name of the element to which the
declaration applies and *attname* is the name of the attribute declared.  The
The attribute type is a string passed as *type*:
`'CDATA'`, `'ID'`, `'IDREF'`, `'IDREFS'`, `'ENTITY'`,
`'ENTITIES'`, `'NMTOKEN'` or `'NMTOKENS'`,
an enumeration like `'(x|y)'`,
or a notation list like `'NOTATION(n1|n2)'`.
*default* gives the default value for
the attribute used when the attribute is not specified by the document instance,
or `None` if there is no default value (`#IMPLIED` values).  If the
attribute is required to be given in the document instance, *required* will be
true.

### `xmlparser.StartElementHandler(name, attributes)`

Called for the start of every element.  *name* is a string containing the
element name, and *attributes* is the element attributes. If
`ordered_attributes` is true, this is a list (see
`ordered_attributes` for a full description). Otherwise it's a
dictionary mapping names to values.

### `xmlparser.EndElementHandler(name)`

Called for the end of every element.

### `xmlparser.ProcessingInstructionHandler(target, data)`

Called for every processing instruction.

### `xmlparser.CharacterDataHandler(data)`

Called for character data.  This will be called for normal character data, CDATA
marked content, and ignorable whitespace.  Applications which must distinguish
these cases can use the `StartCdataSectionHandler`,
`EndCdataSectionHandler`, and `ElementDeclHandler` callbacks to
collect the required information. Note that the character data may be
chunked even if it is short and so you may receive more than one call to
`CharacterDataHandler()`. Set the `buffer_text` instance attribute
to `True` to avoid that.

### `xmlparser.UnparsedEntityDeclHandler(entityName, base, systemId, publicId, notationName)`

Called for unparsed (NDATA) entity declarations.
If this handler is not set, such declarations are reported by
`EntityDeclHandler`, which is preferred for new code.
(The underlying function in the Expat library has been declared obsolete.)

### `xmlparser.EntityDeclHandler(entityName, is_parameter_entity, value, base, systemId, publicId, notationName)`

Called for all entity declarations.  For parameter and internal entities,
*value* will be a string giving the declared contents of the entity; this will
be `None` for external entities.  The *notationName* parameter will be
`None` for parsed entities, and the name of the notation for unparsed
entities. *is_parameter_entity* will be true if the entity is a parameter entity
or false for general entities (most applications only need to be concerned with
general entities).

### `xmlparser.NotationDeclHandler(notationName, base, systemId, publicId)`

Called for notation declarations.  *notationName*, *base*, and *systemId*, and
*publicId* are strings if given.  If the public identifier is omitted,
*publicId* will be `None`.

### `xmlparser.StartNamespaceDeclHandler(prefix, uri)`

Called when an element contains a namespace declaration.  Namespace declarations
are processed before the `StartElementHandler` is called for the element
on which declarations are placed.

### `xmlparser.EndNamespaceDeclHandler(prefix)`

Called when the closing tag is reached for an element  that contained a
namespace declaration.  This is called once for each namespace declaration on
the element in the reverse of the order for which the
`StartNamespaceDeclHandler` was called to indicate the start of each
namespace declaration's scope.  Calls to this handler are made after the
corresponding `EndElementHandler` for the end of the element.

### `xmlparser.CommentHandler(data)`

Called for comments.  *data* is the text of the comment, excluding the leading
`'<!-``-'` and trailing `'-``->'`.

### `xmlparser.StartCdataSectionHandler()`

Called at the start of a CDATA section.  This and `EndCdataSectionHandler`
are needed to be able to identify the syntactical start and end for CDATA
sections.

### `xmlparser.EndCdataSectionHandler()`

Called at the end of a CDATA section.

### `xmlparser.DefaultHandler(data)`

Called for any characters in the XML document for which no applicable handler
has been specified.  This means characters that are part of a construct which
could be reported, but for which no handler has been supplied.

### `xmlparser.DefaultHandlerExpand(data)`

This is the same as the `DefaultHandler`, but doesn't inhibit expansion
of internal entities. The entity reference will not be passed to the default
handler.

### `xmlparser.NotStandaloneHandler()`

Called if the XML document hasn't been declared as being a standalone document.
This happens when there is an external subset or a reference to a parameter
entity, but the XML declaration does not set standalone to `yes` in an XML
declaration.  If this handler returns `0`, then the parser will raise an
`XML_ERROR_NOT_STANDALONE` error.  If this handler is not set, no
exception is raised by the parser for this condition.

### `xmlparser.ExternalEntityRefHandler(context, base, systemId, publicId)`

> **Warning:** Implementing a handler that accesses local files and/or the network
> may create a vulnerability to
> external entity attacks
> if `xmlparser` is used with user-provided XML content.
> Please reflect on your threat model
> before implementing this handler.

Called for references to external entities.  *base* is the current base, as set
by a previous call to `SetBase()`.  The public and system identifiers,
*systemId* and *publicId*, are strings if given; if the public identifier is not
given, *publicId* will be `None`.  The *context* value is opaque and should
only be used as described below.

For external entities to be parsed, this handler must be implemented. It is
responsible for creating the sub-parser using
`ExternalEntityParserCreate(context)`, initializing it with the appropriate
callbacks, and parsing the entity.  This handler should return an integer; if it
returns `0`, the parser will raise an
`XML_ERROR_EXTERNAL_ENTITY_HANDLING` error, otherwise parsing will
continue.

If this handler is not provided, external entities are reported by the
`DefaultHandler` callback, if provided.

### `xmlparser.SkippedEntityHandler(entityName, is_parameter_entity)`

Called for entity references which are not expanded,
because the parser did not read the declaration of the entity.
This happens when the external DTD subset or an external parameter entity
is not parsed.
*is_parameter_entity* is true for a parameter entity
and false for a general entity.

## ExpatError Exceptions

`ExpatError` exceptions have a number of interesting attributes:

### `ExpatError.code`

Expat's internal error number for the specific error.  The
`errors.messages` dictionary maps
these error numbers to Expat's error messages.  For example:

```
from xml.parsers.expat import ParserCreate, ExpatError, errors

p = ParserCreate()
try:
    p.Parse(some_xml_document)
except ExpatError as err:
    print("Error:", errors.messages[err.code])
```

The `errors` module also provides error message
constants and a dictionary `codes` mapping
these messages back to the error codes, see below.

### `ExpatError.lineno`

Line number on which the error was detected.  The first line is numbered `1`.

### `ExpatError.offset`

Character offset into the line where the error occurred.  The first column is
numbered `0`.

## Example

The following program defines three handlers that just print out their
arguments.:

```
import xml.parsers.expat

# 3 handler functions
def start_element(name, attrs):
    print('Start element:', name, attrs)
def end_element(name):
    print('End element:', name)
def char_data(data):
    print('Character data:', repr(data))

p = xml.parsers.expat.ParserCreate()

p.StartElementHandler = start_element
p.EndElementHandler = end_element
p.CharacterDataHandler = char_data

p.Parse("""<?xml version="1.0"?>
<parent id="top"><child1 name="paul">Text goes here</child1>
<child2 name="fred">More text</child2>
</parent>""", 1)
```

The output from this program is:

```
Start element: parent {'id': 'top'}
Start element: child1 {'name': 'paul'}
Character data: 'Text goes here'
End element: child1
Character data: '\n'
Start element: child2 {'name': 'fred'}
Character data: 'More text'
End element: child2
Character data: '\n'
End element: parent
```

## Content Model Descriptions

Module `xml.parsers.expat.model`.

Content models are described using nested tuples.  Each tuple contains four
values: the type, the quantifier, the name, and a tuple of children.  Children
are simply additional content model descriptions.

The values of the first two fields are constants defined in the
`xml.parsers.expat.model` module.  These constants can be collected in two
groups: the model type group and the quantifier group.

The constants in the model type group are:

### `XML_CTYPE_ANY`

The element named by the model name was declared to have a content model of
`ANY`.

### `XML_CTYPE_CHOICE`

The named element allows a choice from a number of options; this is used for
content models such as `(A | B | C)`.

### `XML_CTYPE_EMPTY`

Elements which are declared to be `EMPTY` have this model type.

### `XML_CTYPE_MIXED`

The named element allows character data, optionally interspersed with
the named children; this is used for content models such as
`(#PCDATA)` and `(#PCDATA | A | B)*`.

### `XML_CTYPE_NAME`

The model names a single element, as for `A`.

### `XML_CTYPE_SEQ`

Models which represent a series of models which follow one after the other are
indicated with this model type.  This is used for models such as `(A, B, C)`.

The constants in the quantifier group are:

### `XML_CQUANT_NONE`

No modifier is given, so it can appear exactly once, as for `A`.

### `XML_CQUANT_OPT`

The model is optional: it can appear once or not at all, as for `A?`.

### `XML_CQUANT_PLUS`

The model must occur one or more times (like `A+`).

### `XML_CQUANT_REP`

The model must occur zero or more times, as for `A*`.
