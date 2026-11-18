# barh

```octave
function varargout = barh (varargin)
```

@deftypefn  {} {} barh (@var{y})
@deftypefnx {} {} barh (@var{x}, @var{y})
@deftypefnx {} {} barh (@dots{}, @var{w})
@deftypefnx {} {} barh (@dots{}, @var{style})
@deftypefnx {} {} barh (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} barh (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} barh (@dots{}, @var{prop}, @var{val}, @dots{})
Produce a horizontal bar graph from two vectors of X-Y data.

If only one argument is given, it is taken as a vector of Y values
and the X coordinates are the range @code{1:numel (@var{y})}.

The optional input @var{w} controls the width of the bars.  A value of
1.0 will cause each bar to exactly touch any adjacent bars.
The default width is 0.8.

If @var{y} is a matrix, then each column of @var{y} is taken to be a
separate bar graph plotted on the same graph.  By default the columns
are plotted side-by-side.  This behavior can be changed by the @var{style}
argument which can take the following values:

@table @asis
@item @qcode{"grouped"} (default)
Side-by-side bars with a gap between bars and centered over the
Y-coordinate.

@item  @qcode{"stacked"}
Bars are stacked so that each Y value has a single bar composed of
multiple segments.

@item @qcode{"hist"}
Side-by-side bars with no gap between bars and centered over the
Y-coordinate.

@item @qcode{"histc"}
Side-by-side bars with no gap between bars and left-aligned to the
Y-coordinate.
@end table

Optional property/value pairs are passed directly to the underlying patch
objects.  The full list of properties is documented at
@ref{Patch Properties}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created
bar series hggroup.  For a description of the use of the
bar series, @pxref{XREFbar,,@code{bar}}.
@seealso{bar, hist, pie, plot, patch}
@end deftypefn
