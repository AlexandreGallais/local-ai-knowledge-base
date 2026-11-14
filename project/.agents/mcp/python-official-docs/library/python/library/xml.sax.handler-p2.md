---
title: "xml.sax.handler --- Base classes for SAX handlers (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/xml.sax.handler.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# xml.sax.handler --- Base classes for SAX handlers (part 2 of 2)

## ErrorHandler Objects

Objects with this interface are used to receive error and warning information
from the `XMLReader`.  If you create an object that
implements this interface, then register the object with your
`XMLReader`, the parser
will call the methods in your object to report all warnings and errors. There
are three levels of errors available: warnings, (possibly) recoverable errors,
and unrecoverable errors.  All methods take a `SAXParseException` as the
only parameter.  Errors and warnings may be converted to an exception by raising
the passed-in exception object.

### `ErrorHandler.error(exception)`

Called when the parser encounters a recoverable error.  If this method does not
raise an exception, parsing may continue, but further document information
should not be expected by the application.  Allowing the parser to continue may
allow additional errors to be discovered in the input document.

### `ErrorHandler.fatalError(exception)`

Called when the parser encounters an error it cannot recover from; parsing is
expected to terminate when this method returns.

### `ErrorHandler.warning(exception)`

Called when the parser presents minor warning information to the application.
Parsing is expected to continue when this method returns, and document
information will continue to be passed to the application. Raising an exception
in this method will cause parsing to end.

## LexicalHandler Objects

Optional SAX2 handler for lexical events.

This handler is used to obtain lexical information about an XML
document. Lexical information includes information describing the
document encoding used and XML comments embedded in the document, as
well as section boundaries for the DTD and for any CDATA sections.
The lexical handlers are used in the same manner as content handlers.

Set the LexicalHandler of an XMLReader by using the setProperty method
with the property identifier
`'http://xml.org/sax/properties/lexical-handler'`.

### `LexicalHandler.comment(content)`

Reports a comment anywhere in the document (including the DTD and
outside the document element).

### `LexicalHandler.startDTD(name, public_id, system_id)`

Reports the start of the DTD declarations if the document has an
associated DTD.

### `LexicalHandler.endDTD()`

Reports the end of DTD declaration.

### `LexicalHandler.startCDATA()`

Reports the start of a CDATA marked section.

The contents of the CDATA marked section will be reported through
the characters handler.

### `LexicalHandler.endCDATA()`

Reports the end of a CDATA marked section.
