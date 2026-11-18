# quiver3

```octave
function h = quiver3 (varargin)
```

@deftypefn  {} {} quiver3 (@var{x}, @var{y}, @var{z}, @var{u}, @var{v}, @var{w})
@deftypefnx {} {} quiver3 (@var{z}, @var{u}, @var{v}, @var{w})
@deftypefnx {} {} quiver3 (@dots{}, @var{s})
@deftypefnx {} {} quiver3 (@dots{}, @var{style})
@deftypefnx {} {} quiver3 (@dots{}, "filled")
@deftypefnx {} {} quiver3 (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} quiver3 (@dots{})

Plot a 3-D vector field with arrows.

Plot the (@var{u}, @var{v}, @var{w}) components of a vector field at the
grid points defined by (@var{x}, @var{y}, @var{z}).  If the grid is uniform
then @var{x}, @var{y}, and @var{z} can be specified as grid vectors and
@code{meshgrid} is used to create the 3-D grid.

If @var{x} and @var{y} are not given they are assumed to be
@code{(1:@var{m}, 1:@var{n})} where
@code{[@var{m}, @var{n}] = size (@var{u})}.

The optional input @var{s} is a scalar defining a scaling factor to use for
the arrows of the field relative to the mesh spacing.  A value of 1.0 will
result in the longest vector exactly filling one grid cube.  A value of 0
or @qcode{"off"} disables all scaling.  The default value is 0.9.

The style to use for the plot can be defined with a line style @var{style}
of the same format as the @code{plot} command.  If a marker is specified
then the markers are drawn at the origin of the vectors (which are the grid
points defined by @var{x}, @var{y}, @var{z}).  When a marker is specified,
the arrowhead is not drawn.  If the argument @qcode{"filled"} is given then
the markers are filled.  If name-value plot style properties are used, they
must appear in pairs and follow any other plot style arguments.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to a quiver object.
A quiver object regroups the components of the quiver plot (body, arrow,
and marker), and allows them to be changed together.

@example
@group
[x, y, z] = peaks (25);
surf (x, y, z);
hold on;
[u, v, w] = surfnorm (x, y, z / 10);
h = quiver3 (x, y, z, u, v, w);
set (h, "maxheadsize", 0.33);
@end group
@end example

@seealso{quiver, compass, feather, plot}
@end deftypefn
