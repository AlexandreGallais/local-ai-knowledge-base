# var

```octave
function [v, m] = var (x, varargin)
```

@deftypefn  {} {@var{v} =} var (@var{x})
@deftypefnx {} {@var{v} =} var (@var{x}, @var{w})
@deftypefnx {} {@var{v} =} var (@var{x}, @var{w}, @var{dim})
@deftypefnx {} {@var{v} =} var (@var{x}, @var{w}, @var{vecdim})
@deftypefnx {} {@var{v} =} var (@var{x}, @var{w}, @qcode{"all"})
@deftypefnx {} {@var{v} =} var (@dots{}, @var{nanflag})
@deftypefnx {} {[@var{v}, @var{m}] =} var (@dots{})
Compute the variance of the elements of @var{x}.

The variance is defined as
@tex
$$ {\rm var}(x) = {1\over N-1} \sum_{i=1}^N (x_i - \bar x )^2 $$
where $\bar{x}$ is the mean value of @var{x} and $N$ is the number of
elements of @var{x}.
@end tex
@ifnottex

@example
@group
var (@var{x}) = (1 / (N-1)) * SUM_i ((@var{x}(i) - mean(@var{x}))^2)
@end group
@end example

@noindent
where @math{N} is the number of elements of @var{x}.
@end ifnottex

If @var{x} is a vector, then @code{var (@var{x})} returns the variance of
the elements in @var{x}.

If @var{x} is a matrix, then @code{var (@var{x})} returns a row vector with
each element containing the variance of the corresponding column in @var{x}.

If @var{x} is an array, then @code{var (@var{x})} computes the variance
along the first non-singleton dimension of @var{x}.

The optional argument @var{w} determines the weighting scheme to use.  Valid
values are:

@table @asis
@item 0 [default]:
Normalize with @math{N-1} (population variance).  This provides the square
root of the best unbiased estimator of the variance.

@item 1:
Normalize with @math{N} (sample variance).  This provides the square root of
the second moment around the mean.

@item a vector:
Compute the weighted variance with non-negative weights.  The length of
@var{w} must equal the size of @var{x} in the operating dimension.  NaN
values are permitted in @var{w}, will be multiplied with the associated
values in @var{x}, and can be excluded by the @var{nanflag} option.

@item an array:
Similar to vector weights, but @var{w} must be the same size as @var{x}.  If
the operating dimension is supplied as @var{vecdim} or @qcode{"all"} and
@var{w} is not a scalar, then @var{w} must match the size of the specified
array slice.
@end table

Note: @var{w} must always be specified before specifying any of the
following dimension options.  To use the default value for @var{w} you
may pass an empty input argument @code{[]}.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension of @var{x},
including any dimension exceeding @code{ndims (@var{x})}, will return
@code{zeros (size (@var{x}))}.

Specifying multiple dimensions with input @var{vecdim}, a vector of
non-repeating dimensions, will operate along the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions of @var{x}, then it is
equivalent to the option @qcode{"all"}.  Any dimension in @var{vecdim}
greater than @code{ndims (@var{x})} is ignored.

Specifying the dimension as @qcode{"all"} will cause @code{var} to operate
on all elements of @var{x}, and is equivalent to @code{var (@var{x}(:))}.

The optional variable @var{nanflag} specifies whether to include or exclude
NaN values from the calculation using any of the previously specified input
argument combinations.  The default value for @var{nanflag} is
@qcode{"includenan"} which keeps NaN values in the calculation.  To
exclude NaN values set the value of @var{nanflag} to @qcode{"omitnan"}.
The output will still contain NaN values if @var{x} consists of all NaN
values in the operating dimension.

The optional second output variable @var{m} contains the mean of the
elements of @var{x} used to calculate the variance.  If @var{v} is the
weighted variance, then @var{m} is also the weighted mean.

@seealso{std, mean, cov, skewness, kurtosis, moment}
@end deftypefn
