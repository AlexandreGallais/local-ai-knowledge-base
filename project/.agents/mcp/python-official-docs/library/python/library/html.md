---
title: "html --- HyperText Markup Language support"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/html.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `html` --- HyperText Markup Language support

Module `html`.

**Source code:** Lib/html/__init__.py

This module defines utilities to manipulate HTML.

### `escape(s, quote=True)`

Convert the characters `&`, `<` and `>` in string *s* to HTML-safe
sequences.  Use this if you need to display text that might contain such
characters in HTML.  If the optional flag *quote* is true (the default), the
characters (`"`) and (`'`) are also translated; this helps for inclusion
in an HTML attribute value delimited by quotes, as in ``.
If *quote* is set to false, the characters (`"`) and (`'`) are not
translated.

> *Added in version 3.2.*

### `unescape(s)`

Convert all named and numeric character references (e.g. `>`,
`&#62;`, `&#x3e;`) in the string *s* to the corresponding Unicode
characters.  This function uses the rules defined by the HTML 5 standard
for both valid and invalid character references, and the :data:`list of
HTML 5 named character references <html.entities.html5>`.

> *Added in version 3.4.*

Submodules in the `html` package are:

- `html.parser` -- HTML/XHTML parser with lenient parsing mode
- `html.entities` -- HTML entity definitions
