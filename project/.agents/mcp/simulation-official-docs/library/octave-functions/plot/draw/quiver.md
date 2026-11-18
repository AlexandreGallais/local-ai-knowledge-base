# quiver

```octave
function h = quiver (varargin)
```

@deftypefn  {} {} quiver (@var{u}, @var{v})
@deftypefnx {} {} quiver (@var{x}, @var{y}, @var{u}, @var{v})
@deftypefnx {} {} quiver (@dots{}, @var{s})
@deftypefnx {} {} quiver (@dots{}, @var{style})
@deftypefnx {} {} quiver (@dots{}, "filled")
@deftypefnx {} {} quiver (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} quiver (@dots{})

Plot a 2-D vector field with arrows.

Plot the (@var{u}, @var{v}) components of a vector field at the grid points
defined by (@var{x}, @var{y}).  If the grid is uniform then @var{x} and
@var{y} can be specified as grid vectors and @code{meshgrid} is used to
create the 2-D grid.

If @var{x} and @var{y} are not given they are assumed to be
@code{(1:@var{m}, 1:@var{n})} where
@code{[@var{m}, @var{n}] = size (@var{u})}.

The optional input @var{s} is a scalar defining a scaling factor to use for
the arrows of the field relative to the mesh spacing.  A value of 1.0 will
result in the longest vector exactly filling one grid square.  A value of 0
or @qcode{"off"} disables all scaling.  The default value is 0.9.

The style to use for the plot can be defined with a line style, @var{style},
of the same format as the @code{plot} command.  If a marker is specified
then the markers are drawn at the origin of the vectors (which are the grid
points defined by @var{x} and @var{y}).  When a marker is specified, the
arrowhead is not drawn.  If the argument @qcode{"filled"} is given then the
markers are filled.  If name-value plot style properties are used, they must
appear in pairs and follow any other plot style arguments.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to a quiver object.
A quiver object regroups the components of the quiver plot (body, arrow,
and marker), and allows them to be changed together.

Example:

@example
@group
[x, y] = meshgrid (1:2:20);
h = quiver (x, y, sin (2*pi*x/10), sin (2*pi*y/10));
set (h, "maxheadsize", 0.33);
@end group
@end example

@seealso{quiver3, compass, feather, plot}
@end deftypefn
