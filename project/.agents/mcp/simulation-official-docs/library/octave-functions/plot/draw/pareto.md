# pareto

```octave
function h = pareto (varargin)
```

@deftypefn  {} {} pareto (@var{y})
@deftypefnx {} {} pareto (@var{y}, @var{x})
@deftypefnx {} {} pareto (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} pareto (@dots{})
Draw a Pareto chart.

A Pareto chart is a bar graph that arranges information in such a way
that priorities for process improvement can be established; It organizes
and displays information to show the relative importance of data.  The chart
is similar to the histogram or bar chart, except that the bars are arranged
in decreasing magnitude from left to right along the x-axis.

The fundamental idea (Pareto principle) behind the use of Pareto
diagrams is that the majority of an effect is due to a small subset of the
causes.  For quality improvement, the first few contributing causes
(leftmost bars as presented on the diagram) to a problem usually account for
the majority of the result.  Thus, targeting these "major causes" for
elimination results in the most cost-effective improvement scheme.

Typically only the magnitude data @var{y} is present in which case
@var{x} is taken to be the range @code{1 : length (@var{y})}.  If @var{x}
is given it may be a string array, a cell array of strings, or a numerical
vector.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a 2-element vector with a graphics
handle for the created bar plot and a second handle for the created line
plot.

An example of the use of @code{pareto} is

@example
@group
Cheese = @{"Cheddar", "Swiss", "Camembert", ...
          "Munster", "Stilton", "Blue"@};
Sold = [105, 30, 70, 10, 15, 20];
pareto (Sold, Cheese);
@end group
@end example
@seealso{bar, barh, hist, pie, plot}
@end deftypefn
