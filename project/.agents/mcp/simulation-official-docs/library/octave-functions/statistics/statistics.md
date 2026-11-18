# statistics

```octave
function stats = statistics (x, varargin)
```

@deftypefn  {} {@var{stats} =} statistics (@var{x})
@deftypefnx {} {@var{stats} =} statistics (@var{x}, @var{dim})
@deftypefnx {} {@var{stats} =} statistics (@var{x}, @var{vecdim})
@deftypefnx {} {@var{stats} =} statistics (@var{x}, "all")
@deftypefnx {} {@var{stats} =} statistics (@dots{}, @var{nanflag})
Return a vector with statistics parameters over the input data @var{x}.

@code{statistics (@var{x}} operates along the first non-singleton dimension
of @var{x} and calculates the following statistical parameters:
@enumerate
@item minimum
@item first quartile
@item median
@item third quartile
@item maximum
@item mean
@item standard deviation
@item skewness
@item kurtosis
@end enumerate

If @var{x} is a row vector, then @code{statistics (@var{x})} returns a row
vector with the aforementioned statistical parameters.  If @var{x} is a
column vector, then it returns a column vector.

If @var{x} is a matrix, then @code{statistics (@var{x})} returns a matrix
such that each column contains the statistical parameters calculated over
the corresponding column of @var{x}.

If @var{x} is an array, then @code{statistics (@var{x})} computes the
statistical parameters along the first non-singleton dimension of @var{x}.

The data in @var{x} must be numeric and by default any NaN values are
ignored from the computations of statistical parameters except for the
mean and the standard deviation.  Set the optional argument @var{nanflag}
to @qcode{"omitnan"} to exclude the NaN values from the calculation of
the mean and standard deviation parameters.  Setting @var{nanflag} to
@qcode{"includenan"} is ignored and it is equivalent to calling the
@code{statistics} function without the @var{nanflag} argument.

The size of @var{stats} is equal to the size of @var{x} except for the
operating dimension, which equals to 9 (i.e., the number of statistical
parameters returned).

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension of @var{x},
including any dimension exceeding @code{ndims (@var{x})}, will return
@code{@var{x}}.

Specifying multiple dimensions with input @var{vecdim}, a vector of
non-repeating dimensions, will operate along the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions of @var{x}, then it is
equivalent to the option @qcode{"all"}.  Any dimension in @var{vecdim}
greater than @code{ndims (@var{x})} is ignored.

Specifying the dimension as @qcode{"all"} will cause @code{statistics} to
operate on all elements of @var{x}, and is equivalent to
@code{statistics (@var{x}(:))}.
@seealso{min, max, median, mean, std, skewness, kurtosis}
@end deftypefn
