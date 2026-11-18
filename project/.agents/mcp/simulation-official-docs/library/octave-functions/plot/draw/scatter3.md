# scatter3

```octave
function h = scatter3 (varargin)
```

@deftypefn  {} {} scatter3 (@var{x}, @var{y}, @var{z})
@deftypefnx {} {} scatter3 (@var{x}, @var{y}, @var{z}, @var{s})
@deftypefnx {} {} scatter3 (@var{x}, @var{y}, @var{z}, @var{s}, @var{c})
@deftypefnx {} {} scatter3 (@dots{}, @var{style})
@deftypefnx {} {} scatter3 (@dots{}, "filled")
@deftypefnx {} {} scatter3 (@dots{}, @var{prop}, @var{val})
@deftypefnx {} {} scatter3 (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} scatter3 (@dots{})
Draw a 3-D scatter plot.

A marker is plotted at each point defined by the coordinates in the vectors
@var{x}, @var{y}, and @var{z}.

The size of the markers is determined by @var{s}, which can be a scalar
or a vector of the same length as @var{x}, @var{y}, and @var{z}.  If @var{s}
is not given, or is an empty matrix, then a default value of 8 points is
used.

The color of the markers is determined by @var{c}, which can be a string
defining a fixed color; a 3-element vector giving the red, green, and blue
components of the color; a vector of the same length as @var{x} that gives
a scaled index into the current colormap; or an @nospell{Nx3} matrix
defining the RGB color of each marker individually.

The marker to use can be changed with the @var{style} argument, that is a
string defining a marker in the same manner as the @code{plot} command.
If no marker is specified it defaults to @qcode{"o"} or circles.
If the argument @qcode{"filled"} is given then the markers are filled.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the scatter
object representing the points.

@example
@group
[x, y, z] = peaks (20);
scatter3 (x(:), y(:), z(:), [], z(:));
@end group
@end example

Programming Note: The full list of properties is documented at
@ref{Scatter Properties}.
@seealso{scatter, patch, plot}
@end deftypefn
