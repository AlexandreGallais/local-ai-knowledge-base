# hist

```octave
function [nn, xx] = hist (varargin)
```

@deftypefn  {} {} hist (@var{y})
@deftypefnx {} {} hist (@var{y}, @var{nbins})
@deftypefnx {} {} hist (@var{y}, @var{x})
@deftypefnx {} {} hist (@var{y}, @var{x}, @var{norm})
@deftypefnx {} {} hist (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} hist (@var{hax}, @dots{})
@deftypefnx {} {[@var{nn}, @var{xx}] =} hist (@dots{})
Produce histogram counts or plots.

With one vector input argument, @var{y}, plot a histogram of the values
with 10 bins.  The range of the histogram bins is determined by the
range of the data (difference between maximum and minimum value in @var{y}).
Extreme values are lumped into the first and last bins.  If @var{y} is a
matrix then plot a histogram where each bin contains one bar per input
column of @var{y}.

If the optional second argument is a scalar, @var{nbins}, it defines the
number of bins.

If the optional second argument is a vector, @var{x}, it defines the centers
of the bins.  The width of the bins is determined from the adjacent values
in the vector.  The total number of bins is @code{numel (@var{x})}.

If a third argument @var{norm} is provided, the histogram is normalized.
In case @var{norm} is a positive scalar, the resulting bars are normalized
to @var{norm}.  If @var{norm} is a vector of positive scalars of length
@code{columns (@var{y})}, then the resulting bar of @code{@var{y}(:,i)} is
normalized to @code{@var{norm}(i)}.

@example
@group
[nn, xx] = hist (rand (10, 3), 5, [1 2 3]);
sum (nn, 1)
@xresult{} ans =
      1   2   3
@end group
@end example

The histogram's appearance may be modified by specifying property/value
pairs to the underlying patch object.  For example, the face and edge color
may be modified:

@example
@group
hist (randn (1, 100), 25, "facecolor", "r", "edgecolor", "b");
@end group
@end example

@noindent
The full list of patch properties is documented at @ref{Patch Properties}.
property.  If not specified, the default colors for the histogram are taken
from the @qcode{"Colormap"} property of the axes or figure.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

If an output is requested then no plot is made.  Instead, return the values
@var{nn} (numbers of elements) and @var{xx} (bin centers) such that
@code{bar (@var{xx}, @var{nn})} will plot the histogram.  If @var{y} is a
vector, @var{nn} and @var{xx} will be row vectors.  If @var{y} is an array,
@var{nn} will be a 2-D array with one column of element counts for each
column in @var{y}, and @var{xx} will be a column vector of bin centers.

@seealso{histc, bar, pie, rose}
@end deftypefn
