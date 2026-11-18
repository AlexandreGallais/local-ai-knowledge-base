# slice

```octave
function h = slice (varargin)
```

@deftypefn  {} {} slice (@var{x}, @var{y}, @var{z}, @var{v}, @var{sx}, @var{sy}, @var{sz})
@deftypefnx {} {} slice (@var{x}, @var{y}, @var{z}, @var{v}, @var{xi}, @var{yi}, @var{zi})
@deftypefnx {} {} slice (@var{v}, @var{sx}, @var{sy}, @var{sz})
@deftypefnx {} {} slice (@var{v}, @var{xi}, @var{yi}, @var{zi})
@deftypefnx {} {} slice (@dots{}, @var{method})
@deftypefnx {} {} slice (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} slice (@dots{})
Plot slices of 3-D data/scalar fields.

Each element of the 3-dimensional array @var{v} represents a scalar value at
a location given by the parameters @var{x}, @var{y}, and @var{z}.  The
parameters @var{x}, @var{y}, and @var{z} are either 3-dimensional arrays of
the same size as the array @var{v} in the @qcode{"meshgrid"} format or
vectors.  The parameters @var{xi}, etc.@: respect a similar format to
@var{x}, etc., and they represent the points at which the array @var{vi}
is interpolated using interp3.  The vectors @var{sx}, @var{sy}, and
@var{sz} contain points of orthogonal slices of the respective axes.

If @var{x}, @var{y}, @var{z} are omitted, they are assumed to be
@code{x = 1:size (@var{v}, 2)}, @code{y = 1:size (@var{v}, 1)} and
@code{z = 1:size (@var{v}, 3)}.

@var{method} is one of:

@table @asis
@item @qcode{"nearest"}
Return the nearest neighbor.

@item @qcode{"linear"}
Linear interpolation from nearest neighbors.

@item @qcode{"cubic"}
Cubic interpolation from four nearest neighbors (not implemented yet).

@item @qcode{"spline"}
Cubic spline interpolation---smooth first and second derivatives
throughout the curve.
@end table

The default method is @qcode{"linear"}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created
surface object.

Examples:

@example
@group
[x, y, z] = meshgrid (linspace (-8, 8, 32));
v = sin (sqrt (x.^2 + y.^2 + z.^2)) ./ (sqrt (x.^2 + y.^2 + z.^2));
slice (x, y, z, v, [], 0, []);

[xi, yi] = meshgrid (linspace (-7, 7));
zi = xi + yi;
slice (x, y, z, v, xi, yi, zi);
@end group
@end example
@seealso{interp3, surface, pcolor}
@end deftypefn
