# griddata

```octave
function [rx, ry, rz] = griddata (x, y, z, varargin)
```

@deftypefn  {} {@var{zi} =} griddata (@var{x}, @var{y}, @var{z}, @var{xi}, @var{yi})
@deftypefnx {} {@var{zi} =} griddata (@var{x}, @var{y}, @var{z}, @var{xi}, @var{yi}, @var{method})
@deftypefnx {} {[@var{xi}, @var{yi}, @var{zi}] =} griddata (@dots{})
@deftypefnx {} {@var{vi} =} griddata (@var{x}, @var{y}, @var{z}, @var{v}, @var{xi}, @var{yi}, @var{zi})
@deftypefnx {} {@var{vi} =} griddata (@var{x}, @var{y}, @var{z}, @var{v}, @var{xi}, @var{yi}, @var{zi}, @var{method})
@deftypefnx {} {@var{vi} =} griddata (@var{x}, @var{y}, @var{z}, @var{v}, @var{xi}, @var{yi}, @var{zi}, @var{method}, @var{options})

Interpolate irregular 2-D and 3-D source data at specified points.

For 2-D interpolation, the inputs @var{x} and @var{y} define the points
where the function @code{@var{z} = f (@var{x}, @var{y})} is evaluated.
The inputs @var{x}, @var{y}, @var{z} are either vectors of the same length,
or the unequal vectors @var{x}, @var{y} are expanded to a 2-D grid with
@code{meshgrid} and @var{z} is a 2-D matrix matching the resulting size of
the X-Y grid.

The interpolation points are (@var{xi}, @var{yi}).  If either @var{xi} or
@var{y} is a row vector and the other is a column vector, then
@code{meshgrid (@var{xi}, @var{yi})} will be used to create a mesh of
interpolation points.

For 3-D interpolation, the inputs @var{x}, @var{y}, and @var{z} define the
points where the function @code{@var{v} = f (@var{x}, @var{y}, @var{z})}
is evaluated.  The inputs @var{x}, @var{y}, @var{z} are either vectors of
the same length, or if they are of unequal length, then they are expanded to
a 3-D grid with @code{meshgrid}.  The size of the input @var{v} must match
the size of the original data, either as a vector or a matrix.

The outputs @var{zi} (for 2-D) or @var{vi} (for 3-D) will contain the
interpolated values of @var{z} or @var{v}, respectively, with the output
size matching that of the interpolation points.

The optional input interpolation @var{method} can be @qcode{"nearest"},
@qcode{"linear"}, or for 2-D data @qcode{"v4"}.  When the method is
@qcode{"nearest"}, the output @var{vi} will be the closest point in the
original data (@var{x}, @var{y}, @var{z}) to the query point (@var{xi},
@var{yi}, @var{zi}).  When the method is @qcode{"linear"}, the output
@var{vi} will be a linear interpolation between the two closest points in
the original source data in each dimension.  For 2-D cases only, the
@qcode{"v4"} method is also available which implements a biharmonic spline
interpolation.  If @var{method} is omitted or empty, it defaults to
@qcode{"linear"}.

For 3-D interpolation, the optional argument @var{options} is passed
directly to Qhull when computing the Delaunay triangulation used for
interpolation.  For more information on the defaults and how to pass
different values, @pxref{XREFdelaunayn,,@code{delaunayn}}.

Programming Notes: If the input is complex the real and imaginary parts
are interpolated separately.  Interpolation is normally based on a
Delaunay triangulation.  Any query values outside the convex hull of the
input points will return @code{NaN}.  However, the @qcode{"v4"} method does
not use the triangulation and will return values outside the original data
(extrapolation).
@seealso{griddata3, griddatan, delaunay}
@end deftypefn
