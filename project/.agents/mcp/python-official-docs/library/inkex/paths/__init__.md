# inkex.paths

Paths module.

Most of the functions derivative, unit_tangent, curvature, point, split, length, ilength
for the individual path commands are ported from
https://github.com/mathandy/svgpathtools/ (MIT licensed)

## to_curve

```python
def to_curve(self, prev: ComplexLike, prev_prev: ComplexLike = 0) -> Curve
```

Convert command to :py:class:`Curve`

Curve().to_curve() returns a copy

## to_line

```python
def to_line(self, prev: ComplexLike) -> Line
```

Converts this segment to a line (copies if already a line)