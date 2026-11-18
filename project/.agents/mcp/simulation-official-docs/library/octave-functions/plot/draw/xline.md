# xline

```octave
function h = xline (varargin)
```

@deftypefn  {} {} xline (@var{x})
@deftypefnx {} {} xline (@var{x}, @var{linespec})
@deftypefnx {} {} xline (@var{x}, @var{linespec}, @var{labels})
@deftypefnx {} {} xline (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} xline (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} xline (@dots{})
Create vertical lines at x-coordinates specified by @var{x}.

@var{x} is a scalar or vector of x-coordinates where vertical lines
are to be drawn.

The optional @var{linespec} argument specifies the line style and color
using the same format as @code{plot}.  For example, @qcode{"r"} for a red
solid line, @qcode{"--b"} for a blue dashed line, or @qcode{":k"} for a
black dotted line.  If not specified, a solid black line is used.

The optional @var{labels} argument specifies labels for the lines.  It can
be a single string, a cell array of strings for a multiline label (when
@var{x} is scalar), or a cell array with one element per line (when @var{x}
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
Horizontal alignment of label relative to the line: @qcode{"left"} (label
left of line), @qcode{"center"}, or @qcode{"right"} (label right of line,
default).

@item LabelVerticalAlignment
Vertical alignment of label: @qcode{"top"} (default), @qcode{"middle"}, or
@qcode{"bottom"}.

@item LabelOrientation
Orientation of label text: @qcode{"aligned"} (rotated 90@textdegree{}, default)
or @qcode{"horizontal"}.
@end table

If the first argument @var{hax} is an axes handle, then draw the lines
in this axes, rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle (or vector of
handles for multiple lines) to the created constant line objects.

Example:

@example
@group
plot (rand (1, 10) * 10, 1:10);
xline (5, "--r", "Threshold");
@end group
@end example

@example
@group
plot (1:100);
xline ([25, 50, 75], ":", @{"Q1", "Median", "Q3"@});
@end group
@end example

@seealso{yline, line, plot}
@end deftypefn
