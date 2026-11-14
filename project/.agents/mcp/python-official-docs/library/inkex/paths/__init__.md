---
title: "inkex.paths"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/paths/__init__.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.paths

Paths module.

Most of the functions derivative, unit_tangent, curvature, point, split, length, ilength
for the individual path commands are ported from
https://github.com/mathandy/svgpathtools/ (MIT licensed)

## to_curve

```python
def to_curve(self, prev: ComplexLike, prev_prev: ComplexLike = 0) -> Curve
```

Convert command to `Curve`

Curve().to_curve() returns a copy

## to_line

```python
def to_line(self, prev: ComplexLike) -> Line
```

Converts this segment to a line (copies if already a line)
