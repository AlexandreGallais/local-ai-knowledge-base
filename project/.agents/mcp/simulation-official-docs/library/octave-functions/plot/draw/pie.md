# pie

```octave
function h = pie (varargin)
```

@deftypefn  {} {} pie (@var{x})
@deftypefnx {} {} pie (@dots{}, @var{explode})
@deftypefnx {} {} pie (@dots{}, @var{labels})
@deftypefnx {} {} pie (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} pie (@dots{})
Plot a 2-D pie chart.

When called with a single vector argument, produce a pie chart of the
elements in @var{x}.  The size of the ith slice is the percentage that the
element @var{x}i represents of the total sum of @var{x}:
@code{pct = @var{x}(i) / sum (@var{x})}.

The optional input @var{explode} is a vector of the same length as @var{x}
that, if nonzero, "explodes" the slice from the pie chart.

The optional input @var{labels} is a cell array of strings of the same
length as @var{x} specifying the label for each slice.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a list of handles to the patch
and text objects generating the plot.

Note: If @code{sum (@var{x}) @leq{} 1} then the elements of @var{x} are
interpreted as percentages directly and are not normalized by @code{sum
(x)}.  Furthermore, if the sum is less than 1 then there will be a missing
slice in the pie plot to represent the missing, unspecified percentage.

@seealso{pie3, bar, hist, rose}
@end deftypefn
