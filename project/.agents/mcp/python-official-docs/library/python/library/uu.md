---
title: "uu --- Encode and decode uuencode files"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/uu.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `uu` --- Encode and decode uuencode files

Module `uu`.

> *Deprecated since version 3.11, removed in version 3.13.*

This module is no longer part of the Python standard library.
It was removed in Python 3.13 after
being deprecated in Python 3.11.  The removal was decided in PEP 594.

Encoding and decoding in the uu format can instead be achieved using
`codecs.encode()` and `codecs.decode()`, specifying `"uu"`
as the encoding.

The last version of Python that provided the `uu` module was
Python 3.12.
