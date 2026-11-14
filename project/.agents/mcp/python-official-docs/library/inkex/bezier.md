---
title: "inkex.bezier"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/bezier.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.bezier

Bezier calculations

## pointdistance

```python
def pointdistance(point_a, point_b)
```

The straight line distance between two points

## between_point

```python
def between_point(point_a, point_b, time=0.5)
```

Returns the point between point a and point b

## percent_point

```python
def percent_point(point_a, point_b, percent=50.0)
```

Returns between_point but takes percent instead of 0.0-1.0

## root_wrapper

```python
def root_wrapper(root_a, root_b, root_c, root_d)
```

Get the Cubic function, moic formular of roots, simple root

## bezlenapprx

```python
def bezlenapprx(sp1, sp2)
```

Return the aproximate length between two beziers

## cspbezsplit

```python
def cspbezsplit(sp1, sp2, time=0.5)
```

Split a cubic bezier at the time period

## cspbezsplitatlength

```python
def cspbezsplitatlength(sp1, sp2, length=0.5, tolerance=0.001)
```

Split a cubic bezier at length

## cspseglength

```python
def cspseglength(sp1, sp2, tolerance=0.001)
```

Get cubic bezier segment length

## csplength

```python
def csplength(csp)
```

Get cubic bezier length

## bezierparameterize

```python
def bezierparameterize(bez)
```

Return the bezier parameter size
Converts the bezier parametrisation from the default form
P(t) = (1-t)³ P_1 + 3(1-t)²t P_2 + 3(1-t)t² P_3 + t³ x_4
to the a form which can be differentiated more easily
P(t) = a t³ + b t² + c t + P0

Args:
bez (List[Tuple[float, float]]): the Bezier curve. The elements of the list the
coordinates of the points (in this order): Start point, Start control point,
End control point, End point.

Returns:
Tuple[float, float, float, float, float, float, float, float]:
the values ax, ay, bx, by, cx, cy, x0, y0

## linebezierintersect

```python
def linebezierintersect(arg_a, bez)
```

Where a line and bezier intersect

## bezierpointatt

```python
def bezierpointatt(bez, t)
```

Get coords at the given time point along a bezier curve

## bezierslopeatt

```python
def bezierslopeatt(bez, t)
```

Get slope at the given time point along a bezier curve
The slope is computed as (dx, dy) where dx = df_x(t)/dt and dy = df_y(t)/dt.
Note that for lines P1=P2 and P3=P4, so the slope at the end points is dx=dy=0
(slope not defined).

Args:
bez (List[Tuple[float, float]]): the Bezier curve. The elements of the list the
coordinates of the points (in this order): Start point, Start control point,
End control point, End point.
t (float): time in the interval [0, 1]

Returns:
Tuple[float, float]: x and y increment

## beziertatslope

```python
def beziertatslope(bez, d)
```

Reverse; get time from slope along a bezier curve

## tpoint

```python
def tpoint(p1, p2, t)
```

Linearly interpolate between p1 and p2.

t = 0.0 returns p1, t = 1.0 returns p2.

- **return:** Interpolated point
- **rtype:** tuple

- **param `p1`:** First point as sequence of two floats
- **param `p2`:** Second point as sequence of two floats
- **param `t`:** Number between 0.0 and 1.0
- **type `t`:** float

## beziersplitatt

```python
def beziersplitatt(bez, t)
```

Split bezier at given time

## addifclose

```python
def addifclose(bez, l, error=0.001)
```

Gravesen, Add if the line is closed, in-place addition to array l

## balf

```python
def balf(t, args)
```

Bezier Arc Length Function

## simpson

```python
def simpson(start, end, maxiter, tolerance, bezier_args)
```

Calculate the length of a bezier curve using Simpson's algorithm:
http://steve.hollasch.net/cgindex/curves/cbezarclen.html

Args:
start (int): Start time (between 0 and 1)
end (int): End time (between start time and 1)
maxiter (int): Maximum number of iterations. If not a power of 2, the algorithm
will behave like the value is set to the next power of 2.
tolerance (float):  maximum error ratio
bezier_args (list): arguments as computed by bezierparametrize()

Returns:
float: the appoximate length of the bezier curve

## bezierlength

```python
def bezierlength(bez, tolerance=0.001, time=1.0)
```

Get length of bezier curve

## beziertatlength

```python
def beziertatlength(bez, l=0.5, tolerance=0.001)
```

Get bezier curve time at the length specified

## maxdist

```python
def maxdist(bez)
```

Get maximum distance within bezier curve

## cspsubdiv

```python
def cspsubdiv(csp, flat)
```

Sub-divide cubic sub-paths

## subdiv

```python
def subdiv(sp, flat, i=1)
```

sub divide bezier curve

## csparea

```python
def csparea(csp)
```

Get total area of cubic superpath.

> **Hint:** The results may be slightly inaccurate for paths containing arcs due
> to the loss of accuracy during arc -> cubic bezier conversion.

The function works as follows: For each subpath,

1. compute the area of the polygon created by the path's vertices:

For a line with coordinates (x_0, y_0) and (x_1, y_1), the area
of the trapezoid of its projection on the x axis is given by

\frac{1}{2} (y_1 + y_0) (x_1 - x_0)

Summing the contribution of all lines of the polygon yields the polygon's area
(lines from left to right have a positive contribution, while those right-to
left have a negative area contribution, canceling out the computed area not
inside the polygon), so we find (setting x_{0} = x_N etc.):

A = \frac{1}{2} * \sum_{i=1}^N (x_i y_i - x_{i-1} y_{i-1} + x_i y_{i-1}
- x_{i-1} y_{i})

The first two terms cancel out in the summation over all points, and the second
two terms can be regrouped as

A = \frac{1}{2} * \sum_{i=1}^N x_i (y_{i+1} -y_{i-1})

1. The contribution by the bezier curve is considered: We compute
the integral \int_{x(t=0)}^{x(t=1)} y dx, i.e. the area between the x
axis and the curve, where y = y(t) (the Bezier curve). By substitution
dx = x'(t) dt, performing the integration and
subtracting the trapezoid we already considered above, we find (with control
points (x_{c1}, y_{c1}) and (x_{c2}, y_{c2}))

\Delta A &= \int_0^1 y(t) x'(t) dt - \frac{1}{2} (y_1 + y_0) (x_1 - x_0) \
&= \frac{3}{20} \cdot \begin{pmatrix}
& y_0(& & 2x_{c1} & + x_{c2} & -3x_1&) \
- & y_{c1}(& -2x_0 & & + x_{c2} &+ x_1&) \
- & y_{c2}(& -x_0 & -x_{c1} & & + 2x_1&) \
- & y_1(& 3x_0 & - x_{c1} & -2 x_{c2} &&)
\end{pmatrix}

This is computed for every bezier and added to the area. Again, this is a signed
area: convex beziers have a positive area and concave ones a negative area
contribution.

## cspcofm

```python
def cspcofm(csp)
```

Get center of area / gravity for a cubic superpath.

> **Hint:** The results may be slightly inaccurate for paths containing arcs due
> to the loss of accuracy during arc -> cubic bezier conversion.

The function works similar to `csparea()`, only the computations are a bit more
difficult. Again all subpaths are considered. The total center of mass is given by

C_y = \frac{1}{A} \int_A y dA

The integral can be expressed as a weighted sum; first, the contributions
of the polygon created by the path's nodes is computed. Second, we compute the
contribution of the Bezier curve; this is again done by an integral from which
the weighted CofM of the trapezoid between end points and horizontal axis is
removed. For the integrals, we have

A * C_{y,bez} &= \int_A y dA = \int_{x(t=0)}^{y(t=1)} \int_{0}^{y(x)} y dy dx \
&= \int_{x(t=0)}^{y(t=1)} \frac 12 y(x)^2 dx
= \int_0^1 \frac 12 y(t)^2  x'(t) dt \
A * C_{x,bez} &= \int_A x dA = \int_{x(t=0)}^{y(t=1)} x \int_{0}^{y(x)} dy dx \
&= \int_{x(t=0)}^{y(t=1)} x y(x) dx = \int_0^1 x(t) y(t) x'(t) dt

from which the trapezoids are removed, in case of the y-CofM this amounts to

\frac{y_0}{2} (x_1-x_0)y_0 + \left(y_0 + \frac 13 (y_1 - y_0)\right)
\cdot  \frac 12 (y_1 - y_0) (x_1 - x_0)
