# stream2

```octave
function xy = stream2 (varargin)
```

@deftypefn  {} {@var{xy} =} stream2 (@var{x}, @var{y}, @var{u}, @var{v}, @var{sx}, @var{sy})
@deftypefnx {} {@var{xy} =} stream2 (@var{u}, @var{v}, @var{sx}, @var{sy})
@deftypefnx {} {@var{xy} =} stream2 (@dots{}, @var{options})
Compute 2-D streamline data.

Calculates streamlines of a vector field given by @code{[@var{u}, @var{v}]}.
The vector field is defined over a rectangular grid given by
@code{[@var{x}, @var{y}]}.  The streamlines start at the seed points
@code{[@var{sx}, @var{sy}]}.  The returned value @var{xy} contains a cell
array of vertex arrays.  If the starting point is outside the vector field,
@code{[]} is returned.

The input parameter @var{options} is a 2-D vector of the form
@code{[@var{stepsize}, @var{max_vertices}]}.  The first parameter
specifies the step size used for trajectory integration (default 0.1).  A
negative value is allowed which will reverse the direction of integration.
The second parameter specifies the maximum number of segments used to
create a streamline (default 10,000).

The return value @var{xy} is a @nospell{nverts x 2} matrix containing the
coordinates of the field line segments.

Example:

@example
@group
[x, y] = meshgrid (0:3);
u = 2 * x;
v = y;
xy = stream2 (x, y, u, v, 1.0, 0.5);
@end group
@end example

@seealso{streamline, stream3}
@end deftypefn
