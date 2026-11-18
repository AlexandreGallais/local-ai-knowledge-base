# stem

```octave
function h = stem (varargin)
```

@deftypefn  {} {} stem (@var{y})
@deftypefnx {} {} stem (@var{x}, @var{y})
@deftypefnx {} {} stem (@dots{}, @var{linespec})
@deftypefnx {} {} stem (@dots{}, "filled")
@deftypefnx {} {} stem (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} stem (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} stem (@dots{})
Plot a 2-D stem graph.

If only one argument is given, it is taken as the y-values and the
x-coordinates are taken from the indices of the elements.

If @var{y} is a matrix, then each column of the matrix is plotted as
a separate stem graph.  In this case @var{x} can either be a vector,
the same length as the number of rows in @var{y}, or it can be a
matrix of the same size as @var{y}.

The default color is @qcode{"b"} (blue), the default line style is
@qcode{"-"}, and the default marker is @qcode{"o"}.  The line style can
be altered by the @var{linespec} argument in the same manner as the
@code{plot} command.  If the @qcode{"filled"} argument is present the
markers at the top of the stems will be filled in.  For example,

@example
@group
x = 1:10;
y = 2*x;
stem (x, y, "r");
@end group
@end example

@noindent
plots 10 stems with heights from 2 to 20 in red;

Optional property/value pairs may be specified to control the appearance
of the plot.  The full list of properties is documented at
@ref{Line Properties}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a handle to a @nospell{"stem series"}
hggroup.  The single hggroup handle has all of the graphical elements
comprising the plot as its children; This allows the properties of
multiple graphics objects to be changed by modifying just a single
property of the @nospell{"stem series"} hggroup.

For example,

@example
@group
x = [0:10]';
y = [sin(x), cos(x)]
h = stem (x, y);
set (h(2), "color", "g");
set (h(1), "basevalue", -1)
@end group
@end example

@noindent
changes the color of the second @nospell{"stem series"} and moves the base
line of the first.

Stem Series Properties

@table @asis
@item linestyle
The linestyle of the stem.  (Default: @qcode{"-"})

@item linewidth
The width of the stem.  (Default: 0.5)

@item color
The color of the stem, and if not separately specified, the marker.
(Default: @qcode{"b"} [blue])

@item marker
The marker symbol to use at the top of each stem.  (Default: @qcode{"o"})

@item markeredgecolor
The edge color of the marker.  (Default: @qcode{"color"} property)

@item markerfacecolor
The color to use for @nospell{"filling"} the marker.
(Default: @qcode{"none"} [unfilled])

@item markersize
The size of the marker.  (Default: 6)

@item baseline
The handle of the line object which implements the baseline.  Use @code{set}
with the returned handle to change graphic properties of the baseline.

@item basevalue
The y-value where the baseline is drawn.  (Default: 0)
@end table
@seealso{stem3, bar, hist, plot, stairs}
@end deftypefn
