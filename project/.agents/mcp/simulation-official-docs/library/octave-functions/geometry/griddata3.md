# griddata3

```octave
function vi = griddata3 (x, y, z, v, xi, yi, zi, method = "linear", varargin)
```

@deftypefn  {} {@var{vi} =} griddata3 (@var{x}, @var{y}, @var{z}, @var{v}, @var{xi}, @var{yi}, @var{zi})
@deftypefnx {} {@var{vi} =} griddata3 (@var{x}, @var{y}, @var{z}, @var{v}, @var{xi}, @var{yi}, @var{zi}, @var{method})
@deftypefnx {} {@var{vi} =} griddata3 (@var{x}, @var{y}, @var{z}, @var{v}, @var{xi}, @var{yi}, @var{zi}, @var{method}, @var{options})

Interpolate irregular 3-D source data at specified points.

The inputs @var{x}, @var{y}, and @var{z} define the points where the
function @code{@var{v} = f (@var{x}, @var{y}, @var{z})} is evaluated.  The
inputs @var{x}, @var{y}, @var{z} are either vectors of the same length, or
if they are of unequal length, then they are expanded to a 3-D grid with
@code{meshgrid}.  The size of the input @var{v} must match the size of the
original data, either as a vector or a matrix.

The interpolation points are specified by @var{xi}, @var{yi}, @var{zi}.

The optional input interpolation @var{method} can be @qcode{"nearest"} or
@qcode{"linear"}.  When the method is @qcode{"nearest"}, the output @var{vi}
will be the closest point in the original data (@var{x}, @var{y}, @var{z})
to the query point (@var{xi}, @var{yi}, @var{zi}).  When the method is
@qcode{"linear"}, the output @var{vi} will be a linear interpolation between
the two closest points in the original source data in each dimension.
If @var{method} is omitted or empty, it defaults to @qcode{"linear"}.

The optional argument @var{options} is passed directly to Qhull when
computing the Delaunay triangulation used for interpolation.  See
@code{delaunayn} for information on the defaults and how to pass different
values.

Programming Notes: If the input is complex the real and imaginary parts
are interpolated separately.  Interpolation is based on a Delaunay
triangulation and any query values outside the convex hull of the input
points will return @code{NaN}.
@seealso{griddata, griddatan, delaunayn}
@end deftypefn
