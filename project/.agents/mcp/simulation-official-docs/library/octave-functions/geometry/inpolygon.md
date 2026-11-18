# inpolygon

```octave
function [in, on] = inpolygon (x, y, xv, yv)
```

@deftypefn  {} {@var{in} =} inpolygon (@var{x}, @var{y}, @var{xv}, @var{yv})
@deftypefnx {} {[@var{in}, @var{on}] =} inpolygon (@var{x}, @var{y}, @var{xv}, @var{yv})

For a polygon defined by vertex points @code{(@var{xv}, @var{yv})}, return
true if the points @code{(@var{x}, @var{y})} are inside (or on the boundary)
of the polygon; Otherwise, return false.

The input variables @var{x} and @var{y}, must have the same dimension.

The optional output @var{on} returns true if the points are exactly on the
polygon edge, and false otherwise.
@seealso{delaunay}
@end deftypefn
