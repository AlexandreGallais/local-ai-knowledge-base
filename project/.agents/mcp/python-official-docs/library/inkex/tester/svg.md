---
title: "inkex.tester.svg"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/tester/svg.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.tester.svg

SVG specific utilities for tests.

## svg

```python
def svg(svg_attrs="")
```

Returns xml etree based on a simple SVG element.

svg_attrs: A string containing attributes to add to the
root  element of a minimal SVG document.

## svg_unit_scaled

```python
def svg_unit_scaled(width_unit)
```

Same as svg, but takes a width unit (top-level transform) for the new document.

The transform is the ratio between the SVG width and the viewBox width.

## svg_file

```python
def svg_file(filename)
```

Parse an svg file and return it's document root
