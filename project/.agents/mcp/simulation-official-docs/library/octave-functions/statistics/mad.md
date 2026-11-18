# mad

```octave
function m = mad (x, opt = 0, dim)
```

@deftypefn  {} {@var{m} =} mad (@var{x})
@deftypefnx {} {@var{m} =} mad (@var{x}, @var{opt})
@deftypefnx {} {@var{m} =} mad (@var{x}, @var{opt}, @var{dim})
@deftypefnx {} {@var{m} =} mad (@var{x}, @var{opt}, @var{vecdim})
@deftypefnx {} {@var{m} =} mad (@var{x}, @var{opt}, "all")
Compute the mean or median absolute deviation (MAD) of the elements of
@var{x}.

The mean absolute deviation is defined as

@example
@var{mad} = mean (abs (@var{x} - mean (@var{x})))
@end example

The median absolute deviation is defined as

@example
@var{mad} = median (abs (@var{x} - median (@var{x})))
@end example

@code{mad} excludes NaN values from calculation similar to using the
@code{omitnan} option in @code{mean} and @code{median}.

If @var{x} is a vector, then @code{mad (@var{x})} returns the mean absolute
deviation of the elements in @var{x}.

If @var{x} is a matrix, then @code{mad (@var{x})} returns a row vector with
each element containing the mean absolute deviation of the corresponding
column in @var{x}.

If @var{x} is an array, then @code{mad (@var{x})} computes the mean absolute
deviation along the first non-singleton dimension of @var{x}.

The optional argument @var{opt} specifies whether mean or median absolute
deviation is calculated.  The default is @code{0} which corresponds to mean
absolute deviation; a value of @code{1} corresponds to median absolute
deviation.  Passing an empty input @code{[]} defaults to mean absolute
deviation.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension of @var{x},
including any dimension exceeding @code{ndims (@var{x})}, will return
@code{zeros (size (@var{x}))}.

Specifying the dimension as @var{vecdim}, a vector of non-repeating
dimensions, will return the @code{mad} over the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions of @var{x}, then it is
equivalent to the option @qcode{"all"}.  Any dimension in @var{vecdim}
greater than @code{ndims (@var{x})} is ignored.

Specifying the dimension as @qcode{"all"} will cause @code{mad} to operate
on all elements of @var{x}, and is equivalent to @code{mad (@var{x}(:))}.

Usage Note: As a measure of dispersion, @code{mad} is less affected by
outliers than @code{std}.

@seealso{bounds, range, iqr, std, mean, median}
@end deftypefn
