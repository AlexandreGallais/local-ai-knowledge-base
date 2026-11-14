---
title: "base64 --- Base16, Base32, Base64, Base85 Data Encodings (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/base64.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `base64` --- Base16, Base32, Base64, Base85 Data Encodings

Module `base64`.

**Source code:** Lib/base64.py

This module provides functions for encoding binary data to printable
ASCII characters and decoding such encodings back to binary data.
This includes the encodings specified in
RFC 4648 (Base64, Base32 and Base16), the :ref:`Base85 encoding
<base64-base-85>` specified in `PDF 2.0
<https://pdfa.org/resource/iso-32000-2/>`_, and non-standard variants
of Base85 used elsewhere.

There are two interfaces provided by this module.  The modern interface
supports encoding bytes-like objects to ASCII
`bytes`, and decoding bytes-like objects or
strings containing ASCII to `bytes`.  Both base-64 alphabets
defined in RFC 4648 (normal, and URL- and filesystem-safe) are supported.

The legacy interface does not support decoding from strings, but it does
provide functions for encoding and decoding to and from :term:`file objects
<file object>`.  It only supports the Base64 standard alphabet, and it adds
newlines every 76 characters as per RFC 2045.  Note that if you are looking
for RFC 2045 support you probably want to be looking at the `email`
package instead.

> *Changed in version 3.3.*
> ASCII-only Unicode strings are now accepted by the decoding functions of
> the modern interface.

> *Changed in version 3.4.*
> Any bytes-like objects are now accepted by all
> encoding and decoding functions in this module.  Ascii85/Base85 support added.

## RFC 4648 Encodings

The RFC 4648 encodings are suitable for encoding binary data so that it can be
safely sent by email, used as parts of URLs, or included as part of an HTTP
POST request.

### `b64encode(s, altchars=None, *, padded=True, wrapcol=0)`

Encode the bytes-like object *s* using Base64 and return the encoded
`bytes`.

Optional *altchars* must be a bytes-like object of length 2 which
specifies an alternative alphabet for the `+` and `/` characters.
This allows an application to e.g. generate URL or filesystem safe Base64
strings.  The default is `None`, for which the standard Base64 alphabet is used.

If *padded* is true (default), pad the encoded data with the '='
character to a size multiple of 4.
If *padded* is false, do not add the pad characters.

If *wrapcol* is non-zero, insert a newline (`b'\n'`) character
after at most every *wrapcol* characters.
If *wrapcol* is zero (default), do not insert any newlines.

> *Changed in version 3.15.*
> Added the *padded* and *wrapcol* parameters.

### `b64decode(s, altchars=None, validate=False, *, padded=True, canonical=False)`

```python
b64decode(s, altchars=None, validate=True, *, ignorechars, padded=True, canonical=False)
```

Decode the Base64 encoded bytes-like object or ASCII string
*s* and return the decoded `bytes`.

Optional *altchars* must be a bytes-like object or ASCII string
of length 2 which specifies the alternative alphabet used instead of the
`+` and `/` characters.

If *padded* is true, the last group of 4 base 64 alphabet characters must
be padded with the '=' character.
If *padded* is false, padding is neither required nor recognized:
the '=' character is not treated as padding but as a non-alphabet
character, which means it is silently discarded when *validate* is false,
or causes an `Error` when *validate* is true unless
b'=' is included in *ignorechars*.

A `binascii.Error` exception is raised
if *s* is incorrectly padded.

If *ignorechars* is specified, it should be a bytes-like object
containing characters to ignore from the input when *validate* is true.
If *ignorechars* contains the pad character `'='`,  the pad characters
presented before the end of the encoded data and the excess pad characters
will be ignored.
The default value of *validate* is `True` if *ignorechars* is specified,
`False` otherwise.

If *validate* is false, characters that are neither
in the normal base-64 alphabet nor (if *ignorechars* is not specified)
the alternative alphabet are
discarded prior to the padding check, but the `+` and `/` characters
keep their meaning if they are not in *altchars* (they will be discarded
in future Python versions).

If *validate* is true, these non-alphabet characters in the input
result in a `binascii.Error`.

If *canonical* is true, non-zero padding bits are rejected.
See `binascii.a2b_base64()` for details.

For more information about the strict base64 check, see `binascii.a2b_base64()`

> *Changed in version 3.15.*
> Added the *canonical*, *ignorechars*, and *padded* parameters.

> *Deprecated since version 3.15.*
> Accepting the `+` and `/` characters with an alternative alphabet
> is now deprecated.

### `standard_b64encode(s)`

Encode bytes-like object *s* using the standard Base64 alphabet
and return the encoded `bytes`.

### `standard_b64decode(s)`

Decode bytes-like object or ASCII string *s* using the standard
Base64 alphabet and return the decoded `bytes`.

### `urlsafe_b64encode(s, *, padded=True)`

Encode bytes-like object *s* using the
URL- and filesystem-safe alphabet, which
substitutes `-` instead of `+` and `_` instead of `/` in the
standard Base64 alphabet, and return the encoded `bytes`.  The result
can still contain `=` if *padded* is true (default).

> *Changed in version 3.15.*
> Added the *padded* parameter.

### `urlsafe_b64decode(s, *, padded=False)`

Decode bytes-like object or ASCII string *s*
using the URL- and filesystem-safe
alphabet, which substitutes `-` instead of `+` and `_` instead of
`/` in the standard Base64 alphabet, and return the decoded
`bytes`.

> *Changed in version 3.15.*
> Added the *padded* parameter.
> Padding of input is no longer required by default.

> *Deprecated since version 3.15.*
> Accepting the `+` and `/` characters is now deprecated.

### `b32encode(s, *, padded=True, wrapcol=0)`

Encode the bytes-like object *s* using Base32 and return the
encoded `bytes`.

If *padded* is true (default), pad the encoded data with the '='
character to a size multiple of 8.
If *padded* is false, do not add the pad characters.

If *wrapcol* is non-zero, insert a newline (`b'\n'`) character
after at most every *wrapcol* characters.
If *wrapcol* is zero (default), do not add any newlines.

> *Changed in version 3.15.*
> Added the *padded* and *wrapcol* parameters.

### `b32decode(s, casefold=False, map01=None, *, padded=True, ignorechars=b'', canonical=False)`

Decode the Base32 encoded bytes-like object or ASCII string *s* and
return the decoded `bytes`.

Optional *casefold* is a flag specifying
whether a lowercase alphabet is acceptable as input.  For security purposes,
the default is `False`.

RFC 4648 allows for optional mapping of the digit 0 (zero) to the letter O
(oh), and for optional mapping of the digit 1 (one) to either the letter I (eye)
or letter L (el).  The optional argument *map01* when not `None`, specifies
which letter the digit 1 should be mapped to (when *map01* is not `None`, the
digit 0 is always mapped to the letter O).  For security purposes the default is
`None`, so that 0 and 1 are not allowed in the input.

If *padded* is true, the last group of 8 base 32 alphabet characters must
be padded with the '=' character.
If *padded* is false, padding is neither required nor recognized:
the '=' character is not treated as padding but as a non-alphabet
character, which means it raises an `Error` unless
b'=' is included in *ignorechars*.

*ignorechars* should be a bytes-like object containing characters
to ignore from the input.

If *canonical* is true, non-zero padding bits are rejected.
See `binascii.a2b_base32()` for details.

A `binascii.Error` is raised if *s* is
incorrectly padded or if there are non-alphabet characters present in the
input.

> *Changed in version 3.15.*
> Added the *canonical*, *ignorechars*, and *padded* parameters.

### `b32hexencode(s, *, padded=True, wrapcol=0)`

Similar to `b32encode()` but uses the Extended Hex Alphabet, as defined in
RFC 4648.

> *Added in version 3.10.*

> *Changed in version 3.15.*
> Added the *padded* and *wrapcol* parameters.

### `b32hexdecode(s, casefold=False, *, padded=True, ignorechars=b'', canonical=False)`

Similar to `b32decode()` but uses the Extended Hex Alphabet, as defined in
RFC 4648.

This version does not allow the digit 0 (zero) to the letter O (oh) and digit
1 (one) to either the letter I (eye) or letter L (el) mappings, all these
characters are included in the Extended Hex Alphabet and are not
interchangeable.

> *Added in version 3.10.*

> *Changed in version 3.15.*
> Added the *canonical*, *ignorechars*, and *padded* parameters.

### `b16encode(s, *, wrapcol=0)`

Encode the bytes-like object *s* using Base16 and return the
encoded `bytes`.

If *wrapcol* is non-zero, insert a newline (`b'\n'`) character
after at most every *wrapcol* characters.
If *wrapcol* is zero (default), do not add any newlines.

> *Changed in version 3.15.*
> Added the *wrapcol* parameter.

### `b16decode(s, casefold=False, *, ignorechars=b'')`

Decode the Base16 encoded bytes-like object or ASCII string *s* and
return the decoded `bytes`.

Optional *casefold* is a flag specifying whether a
lowercase alphabet is acceptable as input.  For security purposes, the default
is `False`.

*ignorechars* should be a bytes-like object containing characters
to ignore from the input.

A `binascii.Error` is raised if *s* is
incorrectly padded or if there are non-alphabet characters present in the
input.

> *Changed in version 3.15.*
> Added the *ignorechars* parameter.
