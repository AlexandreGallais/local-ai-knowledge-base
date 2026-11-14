---
title: "html.entities --- Definitions of HTML general entities"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/html.entities.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `html.entities` --- Definitions of HTML general entities

Module `html.entities`.

**Source code:** Lib/html/entities.py

This module defines four dictionaries, `html5`,
`name2codepoint`, `codepoint2name`, and `entitydefs`.

### `html5`

A dictionary that maps HTML5 named character references to the
equivalent Unicode character(s), e.g. `html5['gt;'] == '>'`.
Note that the trailing semicolon is included in the name (e.g. `'gt;'`),
however some of the names are accepted by the standard even without the
semicolon: in this case the name is present with and without the `';'`.
See also `html.unescape()`.

> *Added in version 3.3.*

### `entitydefs`

A dictionary mapping XHTML 1.0 entity definitions to their replacement text in
ISO Latin-1.

### `name2codepoint`

A dictionary that maps HTML4 entity names to the Unicode code points.

### `codepoint2name`

A dictionary that maps Unicode code points to HTML4 entity names.

**Footnotes**
