# inkex.tester.svg

SVG specific utilities for tests.

## svg

```python
def svg(svg_attrs="")
```

Returns xml etree based on a simple SVG element.

svg_attrs: A string containing attributes to add to the
    root <svg> element of a minimal SVG document.

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