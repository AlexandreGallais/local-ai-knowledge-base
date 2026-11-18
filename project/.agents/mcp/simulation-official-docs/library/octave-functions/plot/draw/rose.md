# rose

```octave
function [thout, rout] = rose (varargin)
```

@deftypefn  {} {} rose (@var{theta})
@deftypefnx {} {} rose (@var{theta}, @var{nbins})
@deftypefnx {} {} rose (@var{theta}, @var{bins})
@deftypefnx {} {} rose (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} rose (@dots{})
@deftypefnx {} {[@var{th}, @var{r}] =} rose (@dots{})
Plot an angular histogram.

With one vector argument, @var{th}, plot the histogram with 20 angular bins.
If @var{th} is a matrix then each column of @var{th} produces a separate
histogram.

If @var{nbins} is given and is a scalar, then the histogram is produced with
@var{nbin} bins.  If @var{bins} is a vector, then the center of each bin is
defined by the values in @var{bins} and the number of bins is
given by the number of elements in @var{bins}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a vector of graphics handles to the
line objects representing each histogram.

If two output arguments are requested then no plot is made and
the polar vectors necessary to plot the histogram are returned instead.

Example

@example
@group
[th, r] = rose ([2*randn(1e5,1), pi + 2*randn(1e5,1)]);
polar (th, r);
@end group
@end example

@seealso{hist, polar}
@end deftypefn
