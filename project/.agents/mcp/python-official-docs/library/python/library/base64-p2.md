---
title: "base64 --- Base16, Base32, Base64, Base85 Data Encodings (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/base64.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# base64 --- Base16, Base32, Base64, Base85 Data Encodings (part 2 of 2)

## Base85 Encodings

Base85 encoding is a family of algorithms which represent four bytes
using five ASCII characters.  Originally implemented in the Unix
`btoa(1)` utility, a version of it was later adopted by Adobe in the
PostScript language and is standardized in PDF 2.0 (ISO 32000-2).
This version, in both its `btoa` and PDF variants, is implemented by
`a85encode()`.

A separate version, using a different output character set, was
defined as an April Fool's joke in RFC 1924 but is now used by Git
and other software.  This version is implemented by `b85encode()`.

Finally, a third version, using yet another output character set
designed for safe inclusion in programming language strings, is
defined by ZeroMQ and implemented here by `z85encode()`.

The functions present in this module differ in how they handle the following:

- Whether to include and expect enclosing `<~` and `~>` markers.
- Whether to fold the input into multiple lines.
- The set of ASCII characters used for encoding.
- Compact encodings of sequences of spaces and null bytes.
- The encoding of zero-padding bytes applied to the input.

Refer to the documentation of the individual functions for more information.

### `a85encode(b, *, foldspaces=False, wrapcol=0, pad=False, adobe=False)`

Encode the bytes-like object *b* using Ascii85 and return the
encoded `bytes`.

*foldspaces* is an optional flag that uses the special short sequence 'y'
instead of 4 consecutive spaces (ASCII 0x20) as supported by 'btoa'. This
feature is not supported by the standard encoding used in PDF.

If *wrapcol* is non-zero, insert a newline (`b'\n'`) character
after at most every *wrapcol* characters.
If *wrapcol* is zero (default), do not insert any newlines.

*pad* controls whether zero-padding applied to the end of the input
is fully retained in the output encoding, as done by `btoa`,
producing an exact multiple of 5 bytes of output. This is not part
of the standard encoding used in PDF, as it does not preserve the
length of the data.

*adobe* controls whether the encoded byte sequence is framed with
`<~` and `~>`, as in a PostScript base-85 string literal.  Note
that while ASCII85Decode streams in PDF documents *must* be
terminated with `~>`, they *must not* use a leading `<~`.

> *Added in version 3.4.*

### `a85decode(b, *, foldspaces=False, adobe=False, ignorechars=b' \t\n\r\v', canonical=False)`

Decode the Ascii85 encoded bytes-like object or ASCII string *b* and
return the decoded `bytes`.

*foldspaces* is a flag that specifies whether the 'y' short sequence
should be accepted as shorthand for 4 consecutive spaces (ASCII 0x20).
This feature is not supported by the standard Ascii85 encoding used in
PDF and PostScript.

*adobe* controls whether the `<~` and `~>` markers are
present. While the leading `<~` is not required, the input must
end with `~>`, or a `ValueError` is raised.

*ignorechars* should be a bytes-like object containing characters
to ignore from the input.
This should only contain whitespace characters, and by
default contains all whitespace characters in ASCII.

If *canonical* is true, non-canonical encodings are rejected.
See `binascii.a2b_ascii85()` for details.

> *Added in version 3.4.*

> *Changed in version 3.15.*
> Added the *canonical* parameter.
> Single-character final groups are now always rejected as encoding
> violations.

### `b85encode(b, pad=False, *, wrapcol=0)`

Encode the bytes-like object *b* using base85 (as used in e.g.
git-style binary diffs) and return the encoded `bytes`.

The input is padded with `b'\0'` so its length is a multiple of 4
bytes before encoding.  If *pad* is true, all the resulting
characters are retained in the output, which will always be a
multiple of 5 bytes, and thus the length of the data may not be
preserved on decoding.

If *wrapcol* is non-zero, insert a newline (`b'\n'`) character
after at most every *wrapcol* characters.
If *wrapcol* is zero (default), do not add any newlines.

> *Added in version 3.4.*

> *Changed in version 3.15.*
> Added the *wrapcol* parameter.

### `b85decode(b, *, ignorechars=b'', canonical=False)`

Decode the base85-encoded bytes-like object or ASCII string *b* and
return the decoded `bytes`.

*ignorechars* should be a bytes-like object containing characters
to ignore from the input.

If *canonical* is true, non-canonical encodings are rejected.
See `binascii.a2b_base85()` for details.

> *Added in version 3.4.*

> *Changed in version 3.15.*
> Added the *canonical* and *ignorechars* parameters.
> Single-character final groups are now always rejected as encoding
> violations.

### `z85encode(s, pad=False, *, wrapcol=0)`

Encode the bytes-like object *s* using Z85 (as used in ZeroMQ)
and return the encoded `bytes`.

The input is padded with `b'\0'` so its length is a multiple of 4
bytes before encoding.  If *pad* is true, all the resulting
characters are retained in the output, which will always be a
multiple of 5 bytes, as required by the ZeroMQ standard.

If *wrapcol* is non-zero, insert a newline (`b'\n'`) character
after at most every *wrapcol* characters.
If *wrapcol* is zero (default), do not add any newlines.

> *Added in version 3.13.*

> *Changed in version 3.15.*
> The *pad* parameter was added.

> *Changed in version 3.15.*
> Added the *wrapcol* parameter.

### `z85decode(s, *, ignorechars=b'', canonical=False)`

Decode the Z85-encoded bytes-like object or ASCII string *s* and
return the decoded `bytes`.

*ignorechars* should be a bytes-like object containing characters
to ignore from the input.

If *canonical* is true, non-canonical encodings are rejected.
See `binascii.a2b_base85()` for details.

> *Added in version 3.13.*

> *Changed in version 3.15.*
> Added the *canonical* and *ignorechars* parameters.
> Single-character final groups are now always rejected as encoding
> violations.

## Legacy Interface

### `decode(input, output)`

Decode the contents of the binary *input* file and write the resulting binary
data to the *output* file. *input* and *output* must be :term:`file objects
<file object>`. *input* will be read until `input.readline()` returns an
empty bytes object.

### `decodebytes(s)`

Decode the bytes-like object *s*, which must contain one or more
lines of base64 encoded data, and return the decoded `bytes`.

> *Added in version 3.1.*

### `encode(input, output)`

Encode the contents of the binary *input* file and write the resulting base64
encoded data to the *output* file. *input* and *output* must be :term:`file
objects <file object>`. *input* will be read until `input.read()` returns
an empty bytes object. `encode()` inserts a newline character (`b'\n'`)
after every 76 bytes of the output, as well as ensuring that the output
always ends with a newline, as per RFC 2045 (MIME).

### `encodebytes(s)`

Encode the bytes-like object *s*, which can contain arbitrary binary
data, and return `bytes` containing the base64-encoded data, with newlines
(`b'\n'`) inserted after every 76 bytes of output, and ensuring that
there is a trailing newline, as per RFC 2045 (MIME).

> *Added in version 3.1.*

An example usage of the module:

```python
>>> import base64
>>> encoded = base64.b64encode(b'data to be encoded')
>>> encoded
b'ZGF0YSB0byBiZSBlbmNvZGVk'
>>> data = base64.b64decode(encoded)
>>> data
b'data to be encoded'
```

## Security Considerations

A new security considerations section was added to RFC 4648 (section 12); it's
recommended to review the security section for any code deployed to production.

> **See also:** Module `binascii`
> Support module containing ASCII-to-binary and binary-to-ASCII conversions.
>
> RFC 1521 - MIME (Multipurpose Internet Mail Extensions) Part One: Mechanisms for Specifying and Describing the Format of Internet Message Bodies
> Section 5.2, "Base64 Content-Transfer-Encoding," provides the definition of the
> base64 encoding.
>
> ISO 32000-2 Portable document format - Part 2: PDF 2.0
> Section 7.4.3, "ASCII85Decode Filter," provides the definition
> of the Ascii85 encoding used in PDF and PostScript, including
> the output character set and the details of data length preservation
> using zero-padding and partial output groups.
>
> ZeroMQ RFC 32/Z85
> The "Formal Specification" section provides the character set used in Z85.
