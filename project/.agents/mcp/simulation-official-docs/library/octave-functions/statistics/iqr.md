# iqr

```octave
function [r, q] = iqr (x, dim)
```

@deftypefn  {} {@var{r} =} iqr (@var{x})
@deftypefnx {} {@var{r} =} iqr (@var{x}, @var{dim})
@deftypefnx {} {@var{r} =} iqr (@var{x}, @var{vecdim})
@deftypefnx {} {@var{r} =} iqr (@var{x}, @qcode{"all"})
@deftypefnx {} {[@var{r}, @var{q}] =} iqr (@dots{})
Compute the interquartile range of the input data @var{x}.

The interquartile range is defined as the difference between the 75th and
25th percentile values of @var{x} calculated using

@example
quantile (x, [0.25 , 0.75])
@end example

If @var{x} is a vector, then @code{iqr (@var{x})} computes the interquartile
range of the elements in @var{x}.

If @var{x} is a matrix, then @code{iqr (@var{x})} returns a row vector with
each element containing the interquartile range of the corresponding column
in @var{x}.

If @var{x} is an array, then @code{iqr (@var{x})} computes the interquartile
range along the first non-singleton dimension of @var{x}.

The data in @var{x} must be numeric and any NaN values are ignored.  The
size of @var{r} is equal to the size of @var{x} except for the operating
dimension, which becomes 1.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension of @var{x},
including any dimension exceeding @code{ndims (@var{x})}, will return
@code{zeros (size (@var{x}))}.

Specifying multiple dimensions with input @var{vecdim}, a vector of
non-repeating dimensions, will operate along the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions of @var{x}, then it is
equivalent to the option @qcode{"all"}.  Any dimension in @var{vecdim}
greater than @code{ndims (@var{x})} is ignored.

Specifying the dimension as @qcode{"all"} will cause @code{iqr} to operate
on all elements of @var{x}, and is equivalent to @code{iqr (@var{x}(:))}.

The optional output @var{q} contains the quantiles for the 25th and 75th
percentile of the data.

Usage Note: As a measure of dispersion, the interquartile range is less
affected by outliers than either @code{range} or @code{std}.  The
interquartile range of a scalar is necessarily @code{0}.

@seealso{bounds, mad, range, std, prctile, quantile}
@end deftypefn
