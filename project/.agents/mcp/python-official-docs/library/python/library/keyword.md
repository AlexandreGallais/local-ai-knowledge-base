---
title: "keyword --- Testing for Python keywords"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/keyword.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `keyword` --- Testing for Python keywords

Module `keyword`.

**Source code:** Lib/keyword.py

This module allows a Python program to determine if a string is a
keyword or soft keyword.

### `iskeyword(s)`

Return `True` if *s* is a Python keyword.

### `kwlist`

Sequence containing all the keywords defined for the
interpreter.  If any keywords are defined to only be active when particular
`__future__` statements are in effect, these will be included as well.

### `issoftkeyword(s)`

Return `True` if *s* is a Python soft keyword.

> *Added in version 3.9.*

### `softkwlist`

Sequence containing all the soft keywords defined for the
interpreter.  If any soft keywords are defined to only be active when particular
`__future__` statements are in effect, these will be included as well.

> *Added in version 3.9.*
