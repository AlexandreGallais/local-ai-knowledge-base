---
title: "binascii --- Convert between binary and ASCII (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/binascii.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# binascii --- Convert between binary and ASCII (part 2 of 2)

### `BINHEX_ALPHABET`

The Base 64 alphabet used in BinHex 4 (HQX) within the classic Mac OS.

> *Added in version 3.15.*

### `BASE85_ALPHABET`

The Base85 alphabet.

> *Added in version 3.15.*

### `ASCII85_ALPHABET`

The Ascii85 alphabet.

> *Added in version 3.15.*

### `Z85_ALPHABET`

The Z85 alphabet.

> *Added in version 3.15.*

### `BASE32_ALPHABET`

The Base 32 alphabet according to RFC 4648.

> *Added in version 3.15.*

### `BASE32HEX_ALPHABET`

The "Extended Hex" Base 32 alphabet according to RFC 4648.
Data encoded with this alphabet maintains its sort order during bitwise
comparisons.

> *Added in version 3.15.*

> **See also:** Module `base64`
> Support for RFC compliant base64-style encoding in base 16, 32, 64,
> and 85.
>
> Module `quopri`
> Support for quoted-printable encoding used in MIME email messages.
