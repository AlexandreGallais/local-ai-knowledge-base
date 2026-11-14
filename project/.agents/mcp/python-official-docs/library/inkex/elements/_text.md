# inkex.elements._text

Provide text based element classes interface.

Because text is not rendered at all, no information about a text's path
size or actual location can be generated yet.

## class TextBBMixin

```python
class TextBBMixin: # pylint: disable=too-few-public-methods """Mixin to query the bounding box from Inkscape .. versionadded:: 1.2 """ def get_inkscape_bbox(self: BaseElementProtocol) -> BoundingBox
```

Query the bbbox of a single object.

This calls the Inkscape command, so it is rather slow to use in a loop.

## TextBBMixin.get_inkscape_bbox

```python
def get_inkscape_bbox(self: BaseElementProtocol) -> BoundingBox
```

Query the bbbox of a single object.

This calls the Inkscape command, so it is rather slow to use in a loop.

## class FlowRegion

```python
class FlowRegion(ShapeElement)
```

SVG Flow Region (SVG 2.0)

## class FlowRoot

```python
class FlowRoot(ShapeElement, TextBBMixin)
```

SVG Flow Root (SVG 2.0)

## FlowRoot.region

```python
def region(self)
```

Return the first flowRegion in this flowRoot

## class FlowPara

```python
class FlowPara(ShapeElement)
```

SVG Flow Paragraph (SVG 2.0)

## class FlowDiv

```python
class FlowDiv(ShapeElement)
```

SVG Flow Div (SVG 2.0)

## class FlowSpan

```python
class FlowSpan(ShapeElement)
```

SVG Flow Span (SVG 2.0)

## class TextElement

```python
class TextElement(ShapeElement, TextBBMixin)
```

A Text element

## TextElement.tspans

```python
def tspans(self)
```

Returns all children that are tspan elements

## TextElement.get_text

```python
def get_text(self, sep="\n")
```

Return the text content including tspans and their tail

## TextElement.shape_box

```python
def shape_box(self, transform=None)
```

Returns a horrible bounding box that just contains the coord points
of the text without width or height (which is impossible to calculate)

## class TextPath

```python
class TextPath(ShapeElement, TextBBMixin)
```

A textPath element

## class Tspan

```python
class Tspan(ShapeElement, TextBBMixin)
```

A tspan text element

## Tspan.superscript

```python
def superscript(cls, text)
```

Adds a superscript tspan element

## Tspan.shape_box

```python
def shape_box(self, transform=None)
```

Returns a horrible bounding box that just contains the coord points
of the text without width or height (which is impossible to calculate)

## class SVGfont

```python
class SVGfont(BaseElement)
```

An svg font element

## class FontFace

```python
class FontFace(BaseElement)
```

An svg font font-face element

## class Glyph

```python
class Glyph(PathElementBase)
```

An svg font glyph element

## class MissingGlyph

```python
class MissingGlyph(BaseElement)
```

An svg font missing-glyph element