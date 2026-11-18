# zscore

```octave
function [z, mu, sigma] = zscore (x, opt = 0, varargin)
```

@deftypefn  {} {@var{z} =} zscore (@var{x})
@deftypefnx {} {@var{z} =} zscore (@var{x}, @var{opt})
@deftypefnx {} {@var{z} =} zscore (@var{x}, @var{opt}, @var{dim})
@deftypefnx {} {@var{z} =} zscore (@var{x}, @var{opt}, @var{vecdim})
@deftypefnx {} {@var{z} =} zscore (@var{x}, @var{opt}, "all")
@deftypefnx {} {@var{z} =} zscore (@dots{}, @var{nanflag})
@deftypefnx {} {[@var{z}, @var{mu}, @var{sigma}] =} zscore (@dots{})
Compute the z-score of @var{x}.

@c FIXME: Document mathematical definition as a formula, not just text.
For a vector @var{x}, the z-score is calculated by subtracting the mean
and dividing by its standard deviation.  If the standard deviation is zero,
then divide by 1 instead.

If @var{x} is a vector, then @code{zscore (@var{x})} returns the z-score
of the elements in @var{x}.

If @var{x} is a matrix, then @code{zscore (@var{x})} returns a row vector
with each element containing the z-score of the corresponding column in
@var{x}.

If @var{x} is an array, then @code{zscore (@var{x})} computes the z-score
along the first non-singleton dimension of @var{x}.

@c FIXME: Don't reference other DOCSTRING.  Document values and what they
@c        mean in this function.
The optional parameter @var{opt} determines the normalization to use when
computing the standard deviation and has the same definition as the
corresponding parameter for @code{std}.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension of @var{x},
including any dimension exceeding @code{ndims (@var{x})}, will return
@code{zeros (size (@var{x}))}.

Specifying multiple dimensions with input @var{vecdim}, a vector of
non-repeating dimensions, will operate along the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions of @var{x}, then it is
equivalent to the option @qcode{"all"}.  Any dimension in @var{vecdim}
greater than @code{ndims (@var{x})} is ignored.

Specifying the dimension as @qcode{"all"} will cause @code{zscore} to
operate on all elements of @var{x}, and is equivalent to
@code{zscore (@var{x}(:))}.

The optional variable @var{nanflag} specifies whether to include or exclude
@code{NaN} values from the calculation using any of the previously specified
input argument combinations.  The default value for @var{nanflag} is
@qcode{"includenan"} which keeps @code{NaN} values in the calculation.  To
exclude @code{NaN} values, set the value of @var{nanflag} to
@qcode{"omitnan"}.  The output will still contain @code{NaN} values at the
same locations as in @var{x}.

The optional outputs @var{mu} and @var{sigma} contain the mean and standard
deviation.

@seealso{mean, std, center}
@end deftypefn
