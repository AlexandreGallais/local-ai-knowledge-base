---
title: "codecs --- Codec registry and base classes (part 8 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/codecs.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# codecs --- Codec registry and base classes (part 8 of 8)

## `encodings.idna` --- Internationalized Domain Names in Applications

Module `encodings.idna`.

This module implements RFC 3490 (Internationalized Domain Names in
Applications) and RFC 3492 (Nameprep: A Stringprep Profile for
Internationalized Domain Names (IDN)). It builds upon the `punycode` encoding
and `stringprep`.

> **Warning:** This module builds on `punycode`, whose algorithms scale poorly, so limit
> the length of untrusted input.

If you need the IDNA 2008 standard from RFC 5891 and RFC 5895, use the
third-party idna module.

These RFCs together define a protocol to support non-ASCII characters in domain
names. A domain name containing non-ASCII characters (such as
`www.Alliancefrançaise.nu`) is converted into an ASCII-compatible encoding
(ACE, such as `www.xn--alliancefranaise-npb.nu`). The ACE form of the domain
name is then used in all places where arbitrary characters are not allowed by
the protocol, such as DNS queries, HTTP Host fields, and so
on. This conversion is carried out in the application; if possible invisible to
the user: The application should transparently convert Unicode domain labels to
IDNA on the wire, and convert back ACE labels to Unicode before presenting them
to the user.

Python supports this conversion in several ways:  the `idna` codec performs
conversion between Unicode and ACE, separating an input string into labels
based on the separator characters defined in RFC section 3.1 of RFC 3490
and converting each label to ACE as required, and conversely separating an input
byte string into labels based on the `.` separator and converting any ACE
labels found into unicode. Furthermore, the `socket` module
transparently converts Unicode host names to ACE, so that applications need not
be concerned about converting host names themselves when they pass them to the
socket module. On top of that, modules that have host names as function
parameters, such as `http.client` and `ftplib`, accept Unicode host
names (`http.client` then also transparently sends an IDNA hostname in the
Host field if it sends that field at all).

When receiving host names from the wire (such as in reverse name lookup), no
automatic conversion to Unicode is performed: applications wishing to present
such host names to the user should decode them to Unicode.

The module `encodings.idna` also implements the nameprep procedure, which
performs certain normalizations on host names, to achieve case-insensitivity of
international domain names, and to unify similar characters. The nameprep
functions can be used directly if desired.

### `nameprep(label)`

Return the nameprepped version of *label*. The implementation currently assumes
query strings, so `AllowUnassigned` is true.

### `ToASCII(label)`

Convert a label to ASCII, as specified in RFC 3490. `UseSTD3ASCIIRules` is
assumed to be false.

### `ToUnicode(label)`

Convert a label to Unicode, as specified in RFC 3490.

## `encodings.mbcs` --- Windows ANSI codepage

Module `encodings.mbcs`.

This module implements the ANSI codepage (CP_ACP).

> **Availability:** Windows.

> *Changed in version 3.2.*
> Before 3.2, the *errors* argument was ignored; `'replace'` was always used
> to encode, and `'ignore'` to decode.

> *Changed in version 3.3.*
> Support any error handler.

## `encodings.utf_8_sig` --- UTF-8 codec with BOM signature

Module `encodings.utf_8_sig`.

This module implements a variant of the UTF-8 codec. On encoding, a UTF-8 encoded
BOM will be prepended to the UTF-8 encoded bytes. For the stateful encoder this
is only done once (on the first write to the byte stream). On decoding, an
optional UTF-8 encoded BOM at the start of the data will be skipped.
