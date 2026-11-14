---
title: "inkex.css.parser"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/css/parser.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.css.parser

Parse CSS declarations.

## parse

```python
def parse(input, namespaces=None, forgiving=False, relative=False)
```

Yield tinycss2 selectors found in given `input`.

- **param `input`:**
A string, or an iterable of tinycss2 component values.

## parse_qualified_name

```python
def parse_qualified_name(tokens, namespaces, is_attribute=False)
```

Return `(namespace, local)` for given tokens.

Can also return `None` for a wildcard.

The empty string for `namespace` means "no namespace".

## class SelectorError

```python
class SelectorError(ValueError)
```

A specialized `ValueError` for invalid selectors.
