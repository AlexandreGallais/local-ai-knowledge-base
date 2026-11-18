# streamribbon

```octave
function h = streamribbon (varargin)
```

@deftypefn  {} {} streamribbon (@var{x}, @var{y}, @var{z}, @var{u}, @var{v}, @var{w}, @var{sx}, @var{sy}, @var{sz})
@deftypefnx {} {} streamribbon (@var{u}, @var{v}, @var{w}, @var{sx}, @var{sy}, @var{sz})
@deftypefnx {} {} streamribbon (@var{xyz}, @var{x}, @var{y}, @var{z}, @var{anlr_spd}, @var{lin_spd})
@deftypefnx {} {} streamribbon (@var{xyz}, @var{anlr_spd}, @var{lin_spd})
@deftypefnx {} {} streamribbon (@var{xyz}, @var{anlr_rot})
@deftypefnx {} {} streamribbon (@dots{}, @var{width})
@deftypefnx {} {} streamribbon (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} streamribbon (@dots{})
Calculate and display streamribbons.

The streamribbon is constructed by rotating a normal vector around a
streamline according to the angular rotation of the vector field.

The vector field is given by @code{[@var{u}, @var{v}, @var{w}]} and is
defined over a rectangular grid given by @code{[@var{x}, @var{y}, @var{z}]}.
The streamribbons start at the seed points
@code{[@var{sx}, @var{sy}, @var{sz}]}.

@code{streamribbon} can be called with a cell array that contains
pre-computed streamline data.  To do this, @var{xyz} must be created with
the @code{stream3} function.  @var{lin_spd} is the linear speed of the
vector field and can be calculated from @code{[@var{u}, @var{v}, @var{w}]}
by the square root of the sum of the squares.  The angular speed
@var{anlr_spd} is the projection of the angular velocity onto the velocity
of the normalized vector field and can be calculated with the @code{curl}
command.  This option is useful if you need to alter the integrator step
size or the maximum number of streamline vertices.

Alternatively, ribbons can be created from an array of vertices @var{xyz} of
a path curve.  @var{anlr_rot} contains the angles of rotation around the
edges between adjacent vertices of the path curve.

The input parameter @var{width} sets the width of the streamribbons.

Streamribbons are colored according to the total angle of rotation along the
ribbon.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the plot objects
created for each streamribbon.

Example:

@example
@group
[x, y, z] = meshgrid (0:0.2:4, -1:0.2:1, -1:0.2:1);
u = - x + 10;
v = 10 * z.*x;
w = - 10 * y.*x;
streamribbon (x, y, z, u, v, w, [0, 0], [0, 0.6], [0, 0]);
view (3);
@end group
@end example

@seealso{streamline, stream3, streamtube, ostreamtube}

@end deftypefn
