# pie3

```octave
function h = pie3 (varargin)
```

@deftypefn  {} {} pie3 (@var{x})
@deftypefnx {} {} pie3 (@dots{}, @var{explode})
@deftypefnx {} {} pie3 (@dots{}, @var{labels})
@deftypefnx {} {} pie3 (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} pie3 (@dots{})
Plot a 3-D pie chart.

Called with a single vector argument, produces a 3-D pie chart of the
elements in @var{x}.  The size of the ith slice is the percentage that the
element @var{x}i represents of the total sum of @var{x}:
@code{pct = @var{x}(i) / sum (@var{x})}.

The optional input @var{explode} is a vector of the same length as @var{x}
that, if nonzero, "explodes" the slice from the pie chart.

The optional input @var{labels} is a cell array of strings of the same
length as @var{x} specifying the label for each slice.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a list of graphics handles to the
patch, surface, and text objects generating the plot.

Note: If @code{sum (@var{x}) @leq{} 1} then the elements of @var{x} are
interpreted as percentages directly and are not normalized by @code{sum
(x)}.  Furthermore, if the sum is less than 1 then there will be a missing
slice in the pie plot to represent the missing, unspecified percentage.

@seealso{pie, bar, hist, rose}
@end deftypefn
