# stream3

```octave
function xyz = stream3 (varargin)
```

@deftypefn  {} {@var{xyz} =} stream3 (@var{x}, @var{y}, @var{z}, @var{u}, @var{v}, @var{w}, @var{sx}, @var{sy}, @var{sz})
@deftypefnx {} {@var{xyz} =} stream3 (@var{u}, @var{v}, @var{w}, @var{sx}, @var{sy}, @var{sz})
@deftypefnx {} {@var{xyz} =} stream3 (@dots{}, @var{options})
Compute 3-D streamline data.

Calculate streamlines of a vector field given by @code{[@var{u}, @var{v},
@var{w}]}.  The vector field is defined over a rectangular grid given by
@code{[@var{x}, @var{y}, @var{z}]}.  The streamlines start at the seed
points @code{[@var{sx}, @var{sy}, @var{sz}]}.  The returned value @var{xyz}
contains a cell array of vertex arrays.  If the starting point is outside
the vector field, @code{[]} is returned.

The input parameter @var{options} is a 2-D vector of the form
@code{[@var{stepsize}, @var{max_vertices}]}.  The first parameter
specifies the step size used for trajectory integration (default 0.1).  A
negative value is allowed which will reverse the direction of integration.
The second parameter specifies the maximum number of segments used to
create a streamline (default 10,000).

The return value @var{xyz} is a @nospell{nverts x 3} matrix containing the
coordinates of the field line segments.

Example:

@example
@group
[x, y, z] = meshgrid (0:3);
u = 2 * x;
v = y;
w = 3 * z;
xyz = stream3 (x, y, z, u, v, w, 1.0, 0.5, 0.0);
@end group
@end example

@seealso{stream2, streamline, streamribbon, streamtube, ostreamtube}
@end deftypefn
