# yline

```octave
function h = yline (varargin)
```

@deftypefn  {} {} yline (@var{y})
@deftypefnx {} {} yline (@var{y}, @var{linespec})
@deftypefnx {} {} yline (@var{y}, @var{linespec}, @var{labels})
@deftypefnx {} {} yline (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} yline (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} yline (@dots{})
Create horizontal lines at y-coordinates specified by @var{y}.

@var{y} is a scalar or vector of y-coordinates where horizontal lines
are to be drawn.

The optional @var{linespec} argument specifies the line style and color
using the same format as @code{plot}.  For example, @qcode{"r"} for a red
solid line, @qcode{"--b"} for a blue dashed line, or @qcode{":k"} for a
black dotted line.  If not specified, a solid black line is used.

The optional @var{labels} argument specifies labels for the lines.  It can
be a single string, a cell array of strings for a multiline label (when
@var{y} is scalar), or a cell array with one element per line (when @var{y}
is a vector).

Additional property/value pairs are passed directly to the underlying line
object.  The full list of line properties is documented at
@ref{Line Properties}.  Commonly used properties include:

@table @code
@item Color
Line color specified as an RGB triplet, a color name, or a short name.

@item LineStyle
Line style: @qcode{"-"} (solid, default), @qcode{"--"} (dashed),
@qcode{":"} (dotted), or @qcode{"-."} (dash-dot).

@item LineWidth
Width of the line (default is 0.5).

@item Alpha
Line transparency (0 = fully transparent, 1 = fully opaque).

@item Label
Text label to display on the line.

@item LabelHorizontalAlignment
Horizontal alignment of label: @qcode{"left"}, @qcode{"center"}, or
@qcode{"right"} (default).

@item LabelVerticalAlignment
Vertical alignment of label relative to the line: @qcode{"top"} (label
above line, default), @qcode{"middle"}, or @qcode{"bottom"} (label below
line).

@item LabelOrientation
Orientation of label text: @qcode{"aligned"} or @qcode{"horizontal"}
(default).
@end table

If the first argument @var{hax} is an axes handle, then draw the lines
in this axes, rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle (or vector of
handles for multiple lines) to the created constant line objects.

Example:

@example
@group
plot (1:10, rand (1, 10));
yline (0.5, "--r", "Threshold");
@end group
@end example

@example
@group
plot (1:10, rand (1, 10) * 100);
yline ([25, 50, 75], ":", @{"Q1", "Median", "Q3"@});
@end group
@end example

@seealso{xline, line, plot}
@end deftypefn
