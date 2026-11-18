# ostreamtube

```octave
function h = ostreamtube (varargin)
```

@deftypefn  {} {} ostreamtube (@var{x}, @var{y}, @var{z}, @var{u}, @var{v}, @var{w}, @var{sx}, @var{sy}, @var{sz})
@deftypefnx {} {} ostreamtube (@var{u}, @var{v}, @var{w}, @var{sx}, @var{sy}, @var{sz})
@deftypefnx {} {} ostreamtube (@var{xyz}, @var{x}, @var{y}, @var{z}, @var{u}, @var{v}, @var{w})
@deftypefnx {} {} ostreamtube (@dots{}, @var{options})
@deftypefnx {} {} ostreamtube (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} ostreamtube (@dots{})
Calculate and display streamtubes.

Streamtubes are approximated by connecting circular crossflow areas
along a streamline.  The expansion of the flow is determined by the local
crossflow divergence.

The vector field is given by @code{[@var{u}, @var{v}, @var{w}]} and is
defined over a rectangular grid given by @code{[@var{x}, @var{y}, @var{z}]}.
The streamtubes start at the seed points
@code{[@var{sx}, @var{sy}, @var{sz}]}.

The tubes are colored based on the local vector field strength.

The input parameter @var{options} is a 2-D vector of the form
@code{[@var{scale}, @var{n}]}.  The first parameter scales the start radius
of the streamtubes (default 1).  The second parameter specifies the number
of vertices that are used to construct the tube circumference (default 20).

@code{ostreamtube} can be called with a cell array containing pre-computed
streamline data.  To do this, @var{xyz} must be created with the
@code{stream3} function.  This option is useful if you need to alter the
integrator step size or the maximum number of vertices of the streamline.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the plot
objects created for each streamtube.

Example:

@example
@group
[x, y, z] = meshgrid (-1:0.1:1, -1:0.1:1, -3:0.1:0);
u = -x / 10 - y;
v = x - y / 10;
w = - ones (size (x)) / 10;
ostreamtube (x, y, z, u, v, w, 1, 0, 0);
@end group
@end example

@seealso{stream3, streamline, streamribbon, streamtube}
@end deftypefn
