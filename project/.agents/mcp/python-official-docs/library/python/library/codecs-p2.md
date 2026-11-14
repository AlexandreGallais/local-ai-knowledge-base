---
title: "codecs --- Codec registry and base classes (part 2 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/codecs.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# codecs --- Codec registry and base classes (part 2 of 8)

## Codec Base Classes

The `codecs` module defines a set of base classes which define the
interfaces for working with codec objects, and can also be used as the basis
for custom codec implementations.

Each codec has to define four interfaces to make it usable as codec in Python:
stateless encoder, stateless decoder, stream reader and stream writer. The
stream reader and writers typically reuse the stateless encoder/decoder to
implement the file protocols. Codec authors also need to define how the
codec will handle encoding and decoding errors.

### Error Handlers

To simplify and standardize error handling, codecs may implement different
error handling schemes by accepting the *errors* string argument:

```python
>>> 'German ß, ♬'.encode(encoding='ascii', errors='backslashreplace')
b'German \\xdf, \\u266c'
>>> 'German ß, ♬'.encode(encoding='ascii', errors='xmlcharrefreplace')
b'German &#223;, &#9836;'
```

The following error handlers can be used with all Python
standard-encodings codecs:

```text
+-------------------------+-----------------------------------------------+
| Value                   | Meaning                                       |
+=========================+===============================================+
| ``'strict'``            | Raise :exc:`UnicodeError` (or a subclass),    |
|                         | this is the default. Implemented in           |
|                         | :func:`strict_errors`.                        |
+-------------------------+-----------------------------------------------+
| ``'ignore'``            | Ignore the malformed data and continue without|
|                         | further notice. Implemented in                |
|                         | :func:`ignore_errors`.                        |
+-------------------------+-----------------------------------------------+
| ``'replace'``           | Replace with a replacement marker. On         |
|                         | encoding, use ``?`` (ASCII character). On     |
|                         | decoding, use ``�`` (U+FFFD, the official     |
|                         | REPLACEMENT CHARACTER). Implemented in        |
|                         | :func:`replace_errors`.                       |
+-------------------------+-----------------------------------------------+
| ``'backslashreplace'``  | Replace with backslashed escape sequences.    |
|                         | On encoding, use hexadecimal form of Unicode  |
|                         | code point with formats :samp:`\\x{hh}`       |
|                         | :samp:`\\u{xxxx}` :samp:`\\U{xxxxxxxx}`.      |
|                         | On decoding, use hexadecimal form of byte     |
|                         | value with format :samp:`\\x{hh}`.            |
|                         | Implemented in                                |
|                         | :func:`backslashreplace_errors`.              |
+-------------------------+-----------------------------------------------+
| ``'surrogateescape'``   | On decoding, replace byte with individual     |
|                         | surrogate code ranging from ``U+DC80`` to     |
|                         | ``U+DCFF``. This code will then be turned     |
|                         | back into the same byte when the              |
|                         | ``'surrogateescape'`` error handler is used   |
|                         | when encoding the data. (See :pep:`383` for   |
|                         | more.)                                        |
+-------------------------+-----------------------------------------------+
```

The following error handlers are only applicable to encoding (within
text encodings):

```text
+-------------------------+-----------------------------------------------+
| Value                   | Meaning                                       |
+=========================+===============================================+
| ``'xmlcharrefreplace'`` | Replace with XML/HTML numeric character       |
|                         | reference, which is a decimal form of Unicode |
|                         | code point with format :samp:`&#{num};`.      |
|                         | Implemented in                                |
|                         | :func:`xmlcharrefreplace_errors`.             |
+-------------------------+-----------------------------------------------+
| ``'namereplace'``       | Replace with ``\N{...}`` escape sequences,    |
|                         | what appears in the braces is the Name        |
|                         | property from Unicode Character Database.     |
|                         | Implemented in :func:`namereplace_errors`.    |
+-------------------------+-----------------------------------------------+
```

In addition, the following error handler is specific to the given codecs:

```text
+-------------------+------------------------+-------------------------------------------+
| Value             | Codecs                 | Meaning                                   |
+===================+========================+===========================================+
|``'surrogatepass'``| utf-8, utf-16, utf-32, | Allow encoding and decoding surrogate code|
|                   | utf-16-be, utf-16-le,  | point (``U+D800`` - ``U+DFFF``) as normal |
|                   | utf-32-be, utf-32-le   | code point. Otherwise these codecs treat  |
|                   |                        | the presence of surrogate code point in   |
|                   |                        | :class:`str` as an error.                 |
+-------------------+------------------------+-------------------------------------------+
```

> *Added in version 3.1.*
> The `'surrogateescape'` and `'surrogatepass'` error handlers.

> *Changed in version 3.4.*
> The `'surrogatepass'` error handler now works with utf-16* and utf-32*
> codecs.

> *Added in version 3.5.*
> The `'namereplace'` error handler.

> *Changed in version 3.5.*
> The `'backslashreplace'` error handler now works with decoding and
> translating.

The set of allowed values can be extended by registering a new named error
handler:

### `register_error(name, error_handler, /)`

Register the error handling function *error_handler* under the name *name*.
The *error_handler* argument will be called during encoding and decoding
in case of an error, when *name* is specified as the errors parameter.

For encoding, *error_handler* will be called with a `UnicodeEncodeError`
instance, which contains information about the location of the error. The
error handler must either raise this or a different exception, or return a
tuple with a replacement for the unencodable part of the input and a position
where encoding should continue. The replacement may be either `str` or
`bytes`. If the replacement is bytes, the encoder will simply copy
them into the output buffer. If the replacement is a string, the encoder will
encode the replacement. Encoding continues on original input at the
specified position. Negative position values will be treated as being
relative to the end of the input string. If the resulting position is out of
bound an `IndexError` will be raised.

Decoding and translating works similarly, except `UnicodeDecodeError` or
`UnicodeTranslateError` will be passed to the handler and that the
replacement from the error handler will be put into the output directly.

Previously registered error handlers (including the standard error handlers)
can be looked up by name:

### `lookup_error(name, /)`

Return the error handler previously registered under the name *name*.

Raises a `LookupError` in case the handler cannot be found.

The following standard error handlers are also made available as module level
functions:

### `strict_errors(exception)`

Implements the `'strict'` error handling.

Each encoding or decoding error raises a `UnicodeError`.

### `ignore_errors(exception)`

Implements the `'ignore'` error handling.

Malformed data is ignored; encoding or decoding is continued without
further notice.

### `replace_errors(exception)`

Implements the `'replace'` error handling.

Substitutes `?` (ASCII character) for encoding errors or `�` (U+FFFD,
the official REPLACEMENT CHARACTER) for decoding errors.

### `backslashreplace_errors(exception)`

Implements the `'backslashreplace'` error handling.

Malformed data is replaced by a backslashed escape sequence.
On encoding, use the hexadecimal form of Unicode code point with formats
`\x{hh}` `\u{xxxx}` `\U{xxxxxxxx}`.
On decoding, use the hexadecimal form of
byte value with format `\x{hh}`.

> *Changed in version 3.5.*
> Works with decoding and translating.

### `xmlcharrefreplace_errors(exception)`

Implements the `'xmlcharrefreplace'` error handling (for encoding within
text encoding only).

The unencodable character is replaced by an appropriate XML/HTML numeric
character reference, which is a decimal form of Unicode code point with
format `&#{num};` .

### `namereplace_errors(exception)`

Implements the `'namereplace'` error handling (for encoding within
text encoding only).

The unencodable character is replaced by a `\N{...}` escape sequence. The
set of characters that appear in the braces is the Name property from
Unicode Character Database. For example, the German lowercase letter `'ß'`
will be converted to byte sequence `\N{LATIN SMALL LETTER SHARP S}` .

> *Added in version 3.5.*

### Stateless Encoding and Decoding

The base `Codec` class defines these methods which also define the
function interfaces of the stateless encoder and decoder:

### `encode(input, errors='strict')`

Encodes the object *input* and returns a tuple (output object, length consumed).
For instance, text encoding converts
a string object to a bytes object using a particular
character set encoding (e.g., `cp1252` or `iso-8859-1`).

The *errors* argument defines the error handling to apply.
It defaults to `'strict'` handling.

The method may not store state in the `Codec` instance. Use
`StreamWriter` for codecs which have to keep state in order to make
encoding efficient.

The encoder must be able to handle zero length input and return an empty object
of the output object type in this situation.

### `decode(input, errors='strict')`

Decodes the object *input* and returns a tuple (output object, length
consumed). For instance, for a text encoding, decoding converts
a bytes object encoded using a particular
character set encoding to a string object.

For text encodings and bytes-to-bytes codecs,
*input* must be a bytes object or one which provides the read-only
buffer interface -- for example, buffer objects and memory mapped files.

The *errors* argument defines the error handling to apply.
It defaults to `'strict'` handling.

The method may not store state in the `Codec` instance. Use
`StreamReader` for codecs which have to keep state in order to make
decoding efficient.

The decoder must be able to handle zero length input and return an empty object
of the output object type in this situation.

### Incremental Encoding and Decoding

The `IncrementalEncoder` and `IncrementalDecoder` classes provide
the basic <example-value> for incremental encoding and decoding. Encoding/decoding the
input isn't done with one call to the stateless encoder/decoder function, but
with multiple calls to the
`encode()`/`decode()` method of
the incremental encoder/decoder. The incremental encoder/decoder keeps track of
the encoding/decoding process during method calls.

The joined output of calls to the
`encode()`/`decode()` method is
the same as if all the single inputs were joined into one, and this input was
encoded/decoded with the stateless encoder/decoder.

#### IncrementalEncoder Objects

The `IncrementalEncoder` class is used for encoding an input in multiple
steps. It defines the following methods which every incremental encoder must
define in order to be compatible with the Python codec registry.

### class `IncrementalEncoder(errors='strict')`

Constructor for an `IncrementalEncoder` instance.

All incremental encoders must provide this constructor interface. They are free
to add additional keyword arguments, but only the ones defined here are used by
the Python codec registry.

The `IncrementalEncoder` may implement different error handling schemes
by providing the *errors* keyword argument. See error-handlers for
possible values.

The *errors* argument will be assigned to an attribute of the same name.
Assigning to this attribute makes it possible to switch between different error
handling strategies during the lifetime of the `IncrementalEncoder`
object.

### `encode(object, final=False)`

Encodes *object* (taking the current state of the encoder into account)
and returns the resulting encoded object. If this is the last call to
`encode()` *final* must be true (the default is false).

### `reset()`

Reset the encoder to the initial state. The output is discarded: call
`.encode(object, final=True)`, passing an empty byte or text string
if necessary, to reset the encoder and to get the output.

### `getstate()`

Return the current state of the encoder which must be an integer. The
implementation should make sure that `0` is the most common
state. (States that are more complicated than integers can be converted
into an integer by marshaling/pickling the state and encoding the bytes
of the resulting string into an integer.)

### `setstate(state)`

Set the state of the encoder to *state*. *state* must be an encoder state
returned by `getstate()`.

#### IncrementalDecoder Objects

The `IncrementalDecoder` class is used for decoding an input in multiple
steps. It defines the following methods which every incremental decoder must
define in order to be compatible with the Python codec registry.

### class `IncrementalDecoder(errors='strict')`

Constructor for an `IncrementalDecoder` instance.

All incremental decoders must provide this constructor interface. They are free
to add additional keyword arguments, but only the ones defined here are used by
the Python codec registry.

The `IncrementalDecoder` may implement different error handling schemes
by providing the *errors* keyword argument. See error-handlers for
possible values.

The *errors* argument will be assigned to an attribute of the same name.
Assigning to this attribute makes it possible to switch between different error
handling strategies during the lifetime of the `IncrementalDecoder`
object.

### `decode(object, final=False)`

Decodes *object* (taking the current state of the decoder into account)
and returns the resulting decoded object. If this is the last call to
`decode()` *final* must be true (the default is false). If *final* is
true the decoder must decode the input completely and must flush all
buffers. If this isn't possible (e.g. because of incomplete byte sequences
at the end of the input) it must initiate error handling just like in the
stateless case (which might raise an exception).
