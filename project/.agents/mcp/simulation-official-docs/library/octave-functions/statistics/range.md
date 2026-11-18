# range

```octave
function y = range (x, varargin)
```

@deftypefn  {} {@var{y} =} range (@var{x})
@deftypefnx {} {@var{y} =} range (@var{x}, @var{dim})
@deftypefnx {} {@var{y} =} range (@var{x}, @var{vecdim})
@deftypefnx {} {@var{y} =} range (@var{x}, "all")
@deftypefnx {} {@var{y} =} range (@dots{}, @var{nanflag})
Return the difference between the maximum and the minimum values of the
input data @var{x}.

If @var{x} is a vector, then @code{range (@var{x})} returns the difference
between the maximum and minimum values of the elements in @var{x}.

If @var{x} is a matrix, then @code{range (@var{x})} returns a row vector
@var{y} with the difference between the maximum and minimum values for each
column of @var{x}.

If @var{x} is an array, then @code{range (@var{x})} computes the difference
between the maximum and minimum values along the first non-singleton
dimension of @var{x}.

The data in @var{x} must be numeric.  By default, any NaN values are
ignored.  The size of @var{r} is equal to the size of @var{x} except for
the operating dimension, which becomes 1.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension of @var{x},
including any dimension exceeding @code{ndims (@var{x})}, will return
@code{@var{x}}.

Specifying multiple dimensions with input @var{vecdim}, a vector of
non-repeating dimensions, will operate along the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions of @var{x}, then it is
equivalent to the option @qcode{"all"}.  Any dimension in @var{vecdim}
greater than @code{ndims (@var{x})} is ignored.

Specifying the dimension as @qcode{"all"} will cause @code{range} to operate
on all elements of @var{x}, and is equivalent to @code{range (@var{x}(:))}.

The optional variable @var{nanflag} specifies whether to include or exclude
NaN values from the calculation using any of the previously specified input
argument combinations.  The default value for @var{nanflag} is
@qcode{"omitnan"} which does not include NaN values in the result.  If the
argument @qcode{"includenan"} is given, and there is a NaN present, then the
corresponding result will be NaN.

Usage Note: The range is a quickly computed measure of the dispersion of a
data set, but is less accurate than @code{iqr} if there are outlying data
points.
@seealso{bounds, iqr, mad, std}
@end deftypefn
