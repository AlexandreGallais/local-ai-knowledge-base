# scatter

```octave
function h = scatter (varargin)
```

@deftypefn  {} {} scatter (@var{x}, @var{y})
@deftypefnx {} {} scatter (@var{x}, @var{y}, @var{s})
@deftypefnx {} {} scatter (@var{x}, @var{y}, @var{s}, @var{c})
@deftypefnx {} {} scatter (@dots{}, @var{style})
@deftypefnx {} {} scatter (@dots{}, "filled")
@deftypefnx {} {} scatter (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} scatter (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} scatter (@dots{})
Draw a 2-D scatter plot.

A marker is plotted at each point defined by the coordinates in the vectors
@var{x} and @var{y}.

The size of the markers is determined by @var{s}, which can be a scalar
or a vector of the same length as @var{x} and @var{y}.  If @var{s}
is not given, or is an empty matrix, then a default value of 36 square
points is used (The marker size itself is @code{sqrt (s)}).

The color of the markers is determined by @var{c}, which can be a string
defining a fixed color; a 3-element vector giving the red, green, and blue
components of the color; a vector of the same length as @var{x} that gives
a scaled index into the current colormap; or an @nospell{Nx3} matrix
defining the RGB color of each marker individually.

The marker to use can be changed with the @var{style} argument; it is a
string defining a marker in the same manner as the @code{plot} command.
If no marker is specified it defaults to @qcode{"o"} or circles.
If the argument @qcode{"filled"} is given then the markers are filled.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created
scatter object.

Example:

@example
@group
x = randn (100, 1);
y = randn (100, 1);
scatter (x, y, [], sqrt (x.^2 + y.^2));
@end group
@end example

Programming Note: The full list of properties is documented at
@ref{Scatter Properties}.
@seealso{scatter3, patch, plot}
@end deftypefn
