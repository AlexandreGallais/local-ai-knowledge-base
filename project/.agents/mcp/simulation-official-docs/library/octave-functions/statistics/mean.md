# mean

```octave
function m = mean (x, varargin)
```

@deftypefn  {} {@var{m} =} mean (@var{x})
@deftypefnx {} {@var{m} =} mean (@var{x}, @var{dim})
@deftypefnx {} {@var{m} =} mean (@var{x}, @var{vecdim})
@deftypefnx {} {@var{m} =} mean (@var{x}, "all")
@deftypefnx {} {@var{m} =} mean (@dots{}, @var{nanflag})
@deftypefnx {} {@var{m} =} mean (@dots{}, @var{outtype})
@deftypefnx {} {@var{m} =} mean (@dots{}, @qcode{'Weights'}, @var{w})
Compute the mean of the elements of @var{x}.

The mean is defined as
@tex
$$ {\rm mean}(x) \equiv \bar{x} = {1\over N} \sum_{i=1}^N x_i $$
where $N$ is the number of elements of @var{x}.
@end tex
@ifnottex

@example
mean (@var{x}) = SUM_i @var{x}(i) / N
@end example

@noindent
where @math{N} is the number of elements in @var{x}.

@end ifnottex

The weighted mean is defined as
@tex
$$ {\rm mean_w}(x) \equiv \bar{x}_w = {\sum_{i=1}^N w_i x_i \over \sum_{i=1}^N w_i} $$
where $N$ is the number of elements of @var{x}.
@end tex
@ifnottex

@example
weighted_mean (@var{x}) = SUM_i (@var{w}(i) * @var{x}(i)) / SUM_i (@var{w}(i))
@end example

@noindent
where @math{N} is the number of elements in @var{x}.

@end ifnottex

If @var{x} is a vector, then @code{mean (@var{x})} returns the mean of the
elements in @var{x}.

If @var{x} is a matrix, then @code{mean (@var{x})} returns a row vector with
each element containing the mean of the corresponding column in @var{x}.

If @var{x} is an array, then @code{mean (@var{x})} computes the mean along
the first non-singleton dimension of @var{x}.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension of @var{x},
including any dimension exceeding @code{ndims (@var{x})}, will return
@var{x}.

Specifying multiple dimensions with input @var{vecdim}, a vector of
non-repeating dimensions, will operate along the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions of @var{x}, then it is
equivalent to the option @qcode{"all"}.  Any dimension in @var{vecdim}
greater than @code{ndims (@var{x})} is ignored.

Specifying the dimension as @qcode{"all"} will cause @code{mean} to operate
on all elements of @var{x}, and is equivalent to @code{mean (@var{x}(:))}.

The optional input @var{outtype} specifies the data type that is returned.
@var{outtype} can take the following values:

@table @asis
@item @qcode{'default'}
Output is of type double, unless the input is single in which case the
output is of type single.

@item @qcode{'double'}
Output is of type double.

@item @qcode{'native'}
Output is of the same type as the input as reported by
@code{class (@var{x})}, unless the input is logical in which case the output
is of type double.
@end table

The optional variable @var{nanflag} specifies whether to include or exclude
NaN values from the calculation using any of the previously specified input
argument combinations.  The default value for @var{nanflag} is
@qcode{"includenan"} which keeps NaN values in the calculation.  To exclude
NaN values set the value of @var{nanflag} to @qcode{"omitnan"}.  The output
will still contain NaN values if @var{x} consists of all NaN values in the
operating dimension.

The optional argument pair @code{"Weights", @var{w}} specifies a weighting
scheme @var{w}, which is applied on input @var{x}, so that @code{mean}
computes the weighted mean.  When operating along a single dimension,
@var{w} must be a vector of the same length as the operating dimension or it
must have the same size as @var{x}.  When operating over an array slice
defined by @var{vecdim}, @var{w} must have the same size as the operating
array slice, i.e., @code{size (w) == size (@var{x})(@var{vecdim})}, or the
same size as @var{x}.

@seealso{median, mode, movmean}
@end deftypefn
