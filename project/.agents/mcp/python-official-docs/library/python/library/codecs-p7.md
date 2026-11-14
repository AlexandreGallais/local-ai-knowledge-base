---
title: "codecs --- Codec registry and base classes (part 7 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/codecs.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# codecs --- Codec registry and base classes (part 7 of 8)

## Python Specific Encodings

A number of predefined codecs are specific to Python, so their codec names have
no meaning outside Python. These are listed in the tables below based on the
expected input and output types (note that while text encodings are the most
common use case for codecs, the underlying codec infrastructure supports
arbitrary data transforms rather than just text encodings). For asymmetric
codecs, the stated meaning describes the encoding direction.

### Text Encodings

The following codecs provide `str` to `bytes` encoding and
bytes-like object to `str` decoding, similar to the Unicode text
encodings.

```text
+--------------------+---------+---------------------------+
| Codec              | Aliases | Meaning                   |
+====================+=========+===========================+
| idna               |         | Implement :rfc:`3490`,    |
|                    |         | see also                  |
|                    |         | :mod:`encodings.idna`.    |
|                    |         | Only ``errors='strict'``  |
|                    |         | is supported.             |
|                    |         |                           |
|                    |         | .. warning::              |
|                    |         |                           |
|                    |         |    This codec builds on   |
|                    |         |    ``punycode``, whose    |
|                    |         |    algorithms scale       |
|                    |         |    poorly, so limit the   |
|                    |         |    length of untrusted    |
|                    |         |    input.                 |
+--------------------+---------+---------------------------+
| mbcs               | ansi,   | Windows only: Encode the  |
|                    | dbcs    | operand according to the  |
|                    |         | ANSI codepage (CP_ACP).   |
+--------------------+---------+---------------------------+
| oem                |         | Windows only: Encode the  |
|                    |         | operand according to the  |
|                    |         | OEM codepage (CP_OEMCP).  |
|                    |         |                           |
|                    |         | .. versionadded:: 3.6     |
+--------------------+---------+---------------------------+
| palmos             |         | Encoding of PalmOS 3.5.   |
+--------------------+---------+---------------------------+
| punycode           |         | Implement :rfc:`3492`.    |
|                    |         | Stateful codecs are not   |
|                    |         | supported.                |
|                    |         |                           |
|                    |         | .. warning::              |
|                    |         |                           |
|                    |         |    The decoding and       |
|                    |         |    encoding algorithms    |
|                    |         |    scale poorly, so       |
|                    |         |    limit the length of    |
|                    |         |    untrusted input.       |
+--------------------+---------+---------------------------+
| raw_unicode_escape |         | Latin-1 encoding with     |
|                    |         | :samp:`\\u{XXXX}` and     |
|                    |         | :samp:`\\U{XXXXXXXX}`     |
|                    |         | for other code points.    |
|                    |         | Existing                  |
|                    |         | backslashes are not       |
|                    |         | escaped in any way.       |
|                    |         | It is used in the Python  |
|                    |         | pickle protocol.          |
+--------------------+---------+---------------------------+
| undefined          |         | This Codec should only    |
|                    |         | be used for testing       |
|                    |         | purposes.                 |
|                    |         |                           |
|                    |         | Raise an exception for    |
|                    |         | all conversions, even     |
|                    |         | empty strings. The error  |
|                    |         | handler is ignored.       |
+--------------------+---------+---------------------------+
| unicode_escape     |         | Encoding suitable as the  |
|                    |         | contents of a Unicode     |
|                    |         | literal in ASCII-encoded  |
|                    |         | Python source code,       |
|                    |         | except that quotes are    |
|                    |         | not escaped. Decode       |
|                    |         | from Latin-1 source code. |
|                    |         | Beware that Python source |
|                    |         | code actually uses UTF-8  |
|                    |         | by default.               |
+--------------------+---------+---------------------------+
```

> *Changed in version 3.8.*
> "unicode_internal" codec is removed.

### Binary Transforms

The following codecs provide binary transforms: bytes-like object
to `bytes` mappings. They are not supported by `bytes.decode()`
(which only produces `str` output).

```text
+----------------------+------------------+------------------------------+------------------------------+
| Codec                | Aliases          | Meaning                      | Encoder / decoder            |
+======================+==================+==============================+==============================+
| base64_codec [#b64]_ | base64, base_64  | Convert the operand to       | :meth:`base64.encodebytes` / |
|                      |                  | multiline MIME base64 (the   | :meth:`base64.decodebytes`   |
|                      |                  | result always includes a     |                              |
|                      |                  | trailing ``'\n'``).          |                              |
|                      |                  |                              |                              |
|                      |                  | .. versionchanged:: 3.4      |                              |
|                      |                  |    accepts any               |                              |
|                      |                  |    :term:`bytes-like object` |                              |
|                      |                  |    as input for encoding and |                              |
|                      |                  |    decoding                  |                              |
+----------------------+------------------+------------------------------+------------------------------+
| bz2_codec            | bz2              | Compress the operand using   | :meth:`bz2.compress` /       |
|                      |                  | bz2.                         | :meth:`bz2.decompress`       |
+----------------------+------------------+------------------------------+------------------------------+
| hex_codec            | hex              | Convert the operand to       | :meth:`binascii.b2a_hex` /   |
|                      |                  | hexadecimal                  | :meth:`binascii.a2b_hex`     |
|                      |                  | representation, with two     |                              |
|                      |                  | digits per byte.             |                              |
+----------------------+------------------+------------------------------+------------------------------+
| quopri_codec         | quopri,          | Convert the operand to MIME  | :meth:`quopri.encode` with   |
|                      | quotedprintable, | quoted printable.            | ``quotetabs=True`` /         |
|                      | quoted_printable |                              | :meth:`quopri.decode`        |
+----------------------+------------------+------------------------------+------------------------------+
| uu_codec             | uu               | Convert the operand using    |                              |
|                      |                  | uuencode.                    |                              |
+----------------------+------------------+------------------------------+------------------------------+
| zlib_codec           | zip, zlib        | Compress the operand using   | :meth:`zlib.compress` /      |
|                      |                  | gzip.                        | :meth:`zlib.decompress`      |
+----------------------+------------------+------------------------------+------------------------------+
```

> *Added in version 3.2.*
> Restoration of the binary transforms.

> *Changed in version 3.4.*
> Restoration of the aliases for the binary transforms.

### Standalone Codec Functions

The following functions provide encoding and decoding functionality similar to codecs,
but are not available as named codecs through `codecs.encode()` or `codecs.decode()`.
They are used internally (for example, by `pickle`) and behave similarly to the
`string_escape` codec that was removed in Python 3.

### `codecs.escape_encode(input, errors=None)`

Encode *input* using escape sequences. Similar to how `repr()` on bytes
produces escaped byte values.

*input* must be a `bytes` object.

Returns a tuple `(output, length)` where *output* is a `bytes`
object and *length* is the number of bytes consumed.

### `codecs.escape_decode(input, errors=None)`

Decode *input* from escape sequences back to the original bytes.

*input* must be a bytes-like object.

Returns a tuple `(output, length)` where *output* is a `bytes`
object and *length* is the number of bytes consumed.

### Text Transforms

The following codec provides a text transform: a `str` to `str`
mapping. It is not supported by `str.encode()` (which only produces
`bytes` output).

```text
+--------------------+---------+---------------------------+
| Codec              | Aliases | Meaning                   |
+====================+=========+===========================+
| rot_13             | rot13   | Return the Caesar-cypher  |
|                    |         | encryption of the         |
|                    |         | operand.                  |
+--------------------+---------+---------------------------+
```

> *Added in version 3.2.*
> Restoration of the `rot_13` text transform.

> *Changed in version 3.4.*
> Restoration of the `rot13` alias.

## `encodings` --- Encodings package

Module `encodings`.

This module implements the following functions:

### `normalize_encoding(encoding)`

Normalize encoding name *encoding*.

Normalization works as follows: all non-alphanumeric characters except the
dot used for Python package names are collapsed and replaced with a single
underscore, leading and trailing underscores are removed.
For example, `'  -;#'` becomes `'_'`.

Note that *encoding* should be ASCII only.

> **Note:** The following functions should not be used directly, except for testing
> purposes; `codecs.lookup()` should be used instead.

### `search_function(encoding)`

Search for the codec module corresponding to the given encoding name
*encoding*.

This function first normalizes the *encoding* using
`normalize_encoding()`, then looks for a corresponding alias.
It attempts to import a codec module from the encodings package using either
the alias or the normalized name. If the module is found and defines a valid
`getregentry()` function that returns a `codecs.CodecInfo` object,
the codec is cached and returned.

If the codec module defines a `getaliases()` function any returned aliases
are registered for future use.

### `win32_code_page_search_function(encoding)`

Search for a Windows code page encoding *encoding* of the form `cpXXXX`.

If the code page is valid and supported, return a `codecs.CodecInfo`
object for it.

> **Availability:** Windows.

> *Added in version 3.14.*

This module implements the following exception:

### exception `CodecRegistryError`

Raised when a codec is invalid or incompatible.
