# streamline

```octave
function h = streamline (varargin)
```

@deftypefn  {} {} streamline (@var{x}, @var{y}, @var{z}, @var{u}, @var{v}, @var{w}, @var{sx}, @var{sy}, @var{sz})
@deftypefnx {} {} streamline (@var{u}, @var{v}, @var{w}, @var{sx}, @var{sy}, @var{sz})
@deftypefnx {} {} streamline (@dots{}, @var{options})
@deftypefnx {} {} streamline (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} streamline (@dots{})
Plot streamlines of 2-D or 3-D vector fields.

Plot streamlines of a 2-D or 3-D vector field given by
@code{[@var{u}, @var{v}]} or @code{[@var{u}, @var{v}, @var{w}]}.  The vector
field is defined over a rectangular grid given by @code{[@var{x}, @var{y}]}
or @code{[@var{x}, @var{y}, @var{z}]}.  The streamlines start at the seed
points @code{[@var{sx}, @var{sy}]} or @code{[@var{sx}, @var{sy}, @var{sz}]}.

The input parameter @var{options} is a 2-D vector of the form
@code{[@var{stepsize}, @var{max_vertices}]}.  The first parameter
specifies the step size used for trajectory integration (default 0.1).  A
negative value is allowed which will reverse the direction of integration.
The second parameter specifies the maximum number of segments used to
create a streamline (default 10,000).

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the hggroup
comprising the field lines.

Example:

@example
@group
[x, y] = meshgrid (-1.5:0.2:2, -1:0.2:2);
u = - x / 4 - y;
v = x - y / 4;
streamline (x, y, u, v, 1.7, 1.5);
@end group
@end example

@seealso{stream2, stream3, streamribbon, streamtube, ostreamtube}
@end deftypefn
