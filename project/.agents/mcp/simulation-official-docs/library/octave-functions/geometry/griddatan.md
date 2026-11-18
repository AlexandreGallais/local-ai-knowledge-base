# griddatan

```octave
function yi = griddatan (x, y, xi, method = "linear", varargin)
```

@deftypefn  {} {@var{yi} =} griddatan (@var{x}, @var{y}, @var{xi})
@deftypefnx {} {@var{yi} =} griddatan (@var{x}, @var{y}, @var{xi}, @var{method})
@deftypefnx {} {@var{yi} =} griddatan (@var{x}, @var{y}, @var{xi}, @var{method}, @var{options})

Interpolate irregular source data @var{x}, @var{y} at points specified by
@var{xi}.

The input @var{x} is an MxN matrix representing M points in an N-dimensional
space.  The input @var{y} is a single-valued column vector (Mx1)
representing a function evaluated at the points @var{x}, i.e.,
@code{@var{y} = fcn (@var{x})}.  The input @var{xi} is a list of points
for which the function output @var{yi} should be approximated through
interpolation.  @var{xi} must have the same number of columns (@var{N})
as @var{x} so that the dimensionality matches.

The optional input interpolation @var{method} can be @qcode{"nearest"} or
@qcode{"linear"}.  When the method is @qcode{"nearest"}, the output @var{yi}
will be the closest point in the original data @var{x} to the query point
@var{xi}.  When the method is @qcode{"linear"}, the output @var{yi} will
be a linear interpolation between the two closest points in the original
source data.  If @var{method} is omitted or empty, it defaults to
@qcode{"linear"}.

The optional argument @var{options} is passed directly to Qhull when
computing the Delaunay triangulation used for interpolation.  See
@code{delaunayn} for information on the defaults and how to pass different
values.

Example

@example
@group
## Evaluate sombrero() function at irregular data points
x = 16*gallery ("uniformdata", [200,1], 1) - 8;
y = 16*gallery ("uniformdata", [200,1], 11) - 8;
z = sin (sqrt (x.^2 + y.^2)) ./ sqrt (x.^2 + y.^2);
## Create a regular grid and interpolate data
[xi, yi] = ndgrid (linspace (-8, 8, 50));
zi = griddatan ([x, y], z, [xi(:), yi(:)]);
zi = reshape (zi, size (xi));
## Plot results
clf ();
plot3 (x, y, z, "or");
hold on
surf (xi, yi, zi);
legend ("Original Data", "Interpolated Data");
@end group
@end example

Programming Notes: If the input is complex the real and imaginary parts
are interpolated separately.  Interpolation is based on a Delaunay
triangulation and any query values outside the convex hull of the input
points will return @code{NaN}.  For 2-D and 3-D data additional
interpolation methods are available by using the @code{griddata} function.
@seealso{griddata, griddata3, delaunayn}
@end deftypefn
