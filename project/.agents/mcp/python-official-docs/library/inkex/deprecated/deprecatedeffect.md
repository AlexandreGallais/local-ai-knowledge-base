---
title: "inkex.deprecated.deprecatedeffect"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/deprecated/deprecatedeffect.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.deprecated.deprecatedeffect

Deprecation functionality for the pre-1.0 Inkex main effect class.

## class DeprecatedEffect

```python
class DeprecatedEffect
```

An Inkscape effect, takes SVG in and outputs SVG, providing a deprecated layer

## class Effect

```python
class Effect(SvgThroughMixin, DeprecatedEffect, InkscapeExtension)
```

An Inkscape effect, takes SVG in and outputs SVG
