---
title: "inkex.elements._filters"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/elements/_filters.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.elements._filters

Element interface for patterns, filters, gradients and path effects.

## class Filter

```python
class Filter(BaseElement)
```

A filter (usually in defs)

## Filter.add_primitive

```python
def add_primitive(self, fe_type, **args)
```

Create a filter primitive with the given arguments

## class Filter.Primitive

```python
class Primitive(BaseElement)
```

Any filter primitive

## class Filter.Blend

```python
class Blend(Primitive)
```

Blend Filter element

## class Filter.ColorMatrix

```python
class ColorMatrix(Primitive)
```

ColorMatrix Filter element

## class Filter.ComponentTransfer

```python
class ComponentTransfer(Primitive)
```

ComponentTransfer Filter element

## class Filter.Composite

```python
class Composite(Primitive)
```

Composite Filter element

## class Filter.ConvolveMatrix

```python
class ConvolveMatrix(Primitive)
```

ConvolveMatrix Filter element

## class Filter.DiffuseLighting

```python
class DiffuseLighting(Primitive)
```

DiffuseLightning Filter element

## class Filter.DisplacementMap

```python
class DisplacementMap(Primitive)
```

Flood Filter element

## class Filter.DistantLight

```python
class DistantLight(Primitive)
```

DistanceLight Filter element
defines a light source for a DiffuseLighting or SpecularLighting Filter element

> *Added in version 1.4.*

## class Filter.Flood

```python
class Flood(Primitive)
```

DiffuseLightning Filter element

## class Filter.FuncA

```python
class FuncA(Primitive)
```

FuncR Filter element
defines the alpha channel transfer for a ComponentTransfer Filter element

> *Added in version 1.4.*

## class Filter.FuncB

```python
class FuncB(Primitive)
```

FuncR Filter element
defines the blue channel transfer for a ComponentTransfer Filter element

> *Added in version 1.4.*

## class Filter.FuncG

```python
class FuncG(Primitive)
```

FuncR Filter element
defines the green channel transfer for a ComponentTransfer Filter element

> *Added in version 1.4.*

## class Filter.FuncR

```python
class FuncR(Primitive)
```

FuncR Filter element
defines the red channel transfer for a ComponentTransfer Filter element

> *Added in version 1.4.*

## class Filter.GaussianBlur

```python
class GaussianBlur(Primitive)
```

GaussianBlur Filter element

## class Filter.Image

```python
class Image(Primitive)
```

Image Filter element

## class Filter.Merge

```python
class Merge(Primitive)
```

Merge Filter element

## class Filter.MergeNode

```python
class MergeNode(Primitive)
```

MergeNode Filter element
defines an input for a Merge Filter element

> *Added in version 1.4.*

## class Filter.Morphology

```python
class Morphology(Primitive)
```

Morphology Filter element

## class Filter.Offset

```python
class Offset(Primitive)
```

Offset Filter element

## class Filter.PointLight

```python
class PointLight(Primitive)
```

PointLight Filter elements
defines a light source for a DiffuseLighting or SpecularLighting Filter element

> *Added in version 1.4.*

## class Filter.SpecularLighting

```python
class SpecularLighting(Primitive)
```

SpecularLighting Filter element

## class Filter.SpotLight

```python
class SpotLight(Primitive)
```

SpotLight Filter element
defines a light source for a DiffuseLighting or SpecularLighting Filter element

> *Added in version 1.4.*

## class Filter.Tile

```python
class Tile(Primitive)
```

Tile Filter element

## class Filter.Turbulence

```python
class Turbulence(Primitive)
```

Turbulence Filter element

## class Stop

```python
class Stop(BaseElement)
```

Gradient stop

> *Added in version 1.1.*

## Stop.offset

```python
def offset(self) -> float
```

The offset of the gradient stop

## Stop.interpolate

```python
def interpolate(self, other, fraction)
```

Interpolate gradient stops

## class Pattern

```python
class Pattern(BaseElement, ViewboxMixin)
```

Pattern element which is used in the def to control repeating fills

## Pattern.get_viewbox

```python
def get_viewbox(self) -> Optional[List[float]]
```

Get the viewbox of the pattern, falling back to the href's viewbox

> *Added in version 1.3.*

## Pattern.get_effective_parent

```python
def get_effective_parent(self, depth=0, maxDepth=10)
```

If a pattern has no children, but a href, it uses the children from the href.
Avoids infinite recursion.

> *Added in version 1.3.*

## class Mask

```python
class Mask(GroupBase)
```

A structural object that serves as opacity mask

> *Added in version 1.3.*

## class Gradient

```python
class Gradient(BaseElement)
```

A gradient instruction usually in the defs.

## Gradient.stops

```python
def stops(self)
```

Return an ordered list of own or linked stop nodes

> *Added in version 1.1.*

## Gradient.stop_styles

```python
def stop_styles(self): # type: () -> List[Style] """Return a list of own or linked offset styles .. versionadded:: 1.1 """ return [child.style for child in self.stops] def remove_orientation(self)
```

Remove all orientation attributes from this element

> *Added in version 1.1.*

## Gradient.remove_orientation

```python
def remove_orientation(self)
```

Remove all orientation attributes from this element

> *Added in version 1.1.*

## Gradient.interpolate

```python
def interpolate(self, other: LinearGradient, fraction: float, svg: Optional[SvgDocumentElement] = None,)
```

Interpolate with another gradient.

> *Added in version 1.1.*

## Gradient.stops_and_orientation

```python
def stops_and_orientation(self)
```

Return a copy of all the stops in this gradient

> *Added in version 1.1.*

## Gradient.get_percentage_parsed_unit

```python
def get_percentage_parsed_unit(self, attribute, value, svg=None)
```

Parses an attribute of a gradient, respecting percentage values of
"userSpaceOnUse" as percentages of document size. See
https://www.w3.org/TR/SVG2/pservers.html#LinearGradientAttributes for details

> *Added in version 1.3.*

## class LinearGradient

```python
class LinearGradient(Gradient)
```

LinearGradient element

## LinearGradient.apply_transform

```python
def apply_transform(self): # type: () -> None """Apply transform to orientation points and set it to identity. .. versionadded:: 1.1 """ trans = self.pop("gradientTransform") pt1 = (self.to_dimensionless(self.get("x1")), self.to_dimensionless(self.get("y1")),) pt2 = (self.to_dimensionless(self.get("x2")), self.to_dimensionless(self.get("y2")),) p1t = trans.apply_to_point(pt1) p2t = trans.apply_to_point(pt2) self.update(x1=self.to_dimensionless(p1t[0]), y1=self.to_dimensionless(p1t[1]), x2=self.to_dimensionless(p2t[0]), y2=self.to_dimensionless(p2t[1]),) def x1(self, svg=None)
```

Get the x1 attribute

> *Added in version 1.3.*

## LinearGradient.x1

```python
def x1(self, svg=None)
```

Get the x1 attribute

> *Added in version 1.3.*

## LinearGradient.x2

```python
def x2(self, svg=None)
```

Get the x2 attribute

> *Added in version 1.3.*

## LinearGradient.y1

```python
def y1(self, svg=None)
```

Get the y1 attribute

> *Added in version 1.3.*

## LinearGradient.y2

```python
def y2(self, svg=None)
```

Get the y2 attribute

> *Added in version 1.3.*

## class RadialGradient

```python
class RadialGradient(Gradient)
```

RadialGradient element

## RadialGradient.apply_transform

```python
def apply_transform(self): # type: () -> None """Apply transform to orientation points and set it to identity. .. versionadded:: 1.1 """ trans = self.pop("gradientTransform") pt1 = (self.to_dimensionless(self.get("cx")), self.to_dimensionless(self.get("cy")),) pt2 = (self.to_dimensionless(self.get("fx")), self.to_dimensionless(self.get("fy")),) p1t = trans.apply_to_point(pt1) p2t = trans.apply_to_point(pt2) self.update(cx=self.to_dimensionless(p1t[0]), cy=self.to_dimensionless(p1t[1]), fx=self.to_dimensionless(p2t[0]), fy=self.to_dimensionless(p2t[1]),) def cx(self, svg=None)
```

Get the effective cx (horizontal center) attribute in user units

> *Added in version 1.3.*

## RadialGradient.cx

```python
def cx(self, svg=None)
```

Get the effective cx (horizontal center) attribute in user units

> *Added in version 1.3.*

## RadialGradient.cy

```python
def cy(self, svg=None)
```

Get the effective cy (vertical center) attribute in user units

> *Added in version 1.3.*

## RadialGradient.fx

```python
def fx(self, svg=None)
```

Get the effective fx (horizontal focal point) attribute in user units

> *Added in version 1.3.*

## RadialGradient.fy

```python
def fy(self, svg=None)
```

Get the effective fx (vertical focal point) attribute in user units

> *Added in version 1.3.*

## RadialGradient.r

```python
def r(self, svg=None)
```

Get the effective r (gradient radius) attribute in user units

> *Added in version 1.3.*

## class PathEffect

```python
class PathEffect(BaseElement)
```

Inkscape LPE element

## class MeshGradient

```python
class MeshGradient(Gradient)
```

Usable MeshGradient XML base class

> *Added in version 1.1.*

## MeshGradient.new_mesh

```python
def new_mesh(cls, pos=None, rows=1, cols=1, autocollect=True)
```

Return skeleton of 1x1 meshgradient definition.

## class MeshRow

```python
class MeshRow(BaseElement)
```

Each row of a mesh gradient

> *Added in version 1.1.*

## class MeshPatch

```python
class MeshPatch(BaseElement)
```

Each column or 'patch' in a mesh gradient

> *Added in version 1.1.*

## MeshPatch.stops

```python
def stops(self, edges, colors)
```

Add or edit meshpatch stops with path and stop-color.
