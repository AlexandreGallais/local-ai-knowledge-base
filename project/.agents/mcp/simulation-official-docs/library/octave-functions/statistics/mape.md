# mape

```octave
function E = mape (F, A, varargin)
```

@deftypefn  {} {@var{E} =} mape (@var{F}, @var{A})
@deftypefnx {} {@var{E} =} mape (@var{F}, @var{A}, @var{dim})
@deftypefnx {} {@var{E} =} mape (@var{F}, @var{A}, @var{vecdim})
@deftypefnx {} {@var{E} =} mape (@var{F}, @var{A}, "all")
@deftypefnx {} {@var{E} =} mape (@dots{}, @var{nanflag})
@deftypefnx {} {@var{E} =} mape (@dots{}, @var{zeroflag})
@deftypefnx {} {@var{E} =} mape (@dots{}, @qcode{'Weights'}, @var{W})
Compute the mean absolute percentage error between arrays.

The mean absolute percentage error is defined as
@tex
$$ {\rm mape}(F, A) = {E} = {1\over N} \sum_{i=1}^N \left| {A_i - F_i}\over{A_i} \right| \times 100 $$
where $N$ is the number of elements in @var{F} and @var{A} after
broadcasting is applied to the subtraction operation.
@end tex
@ifnottex

@example
mape (@var{F}, @var{A}) = SUM_i (abs ((@var{A}(i) - @var{F}(i)) / @var{A}(i))) * 100 / N
@end example

@noindent
where @math{N} is the number of elements in @var{F} and @var{A} after
broadcasting is applied to the subtraction operation.

@end ifnottex

The weighted mean absolute percentage error is defined as
@tex
$$ {\rm mape_w}(F, A) = {E_W} =  {{\sum_{i=1}^N W_i\left| {A_i - F_i}\over{A_i} \right| \times 100} \over {\sum_{i=1}^N W_i}} $$
where $N$ is the number of elements in @var{F} and @var{A} after
broadcasting is applied to the subtraction operation.
@end tex
@ifnottex

@example
weighted_mape (@var{F}, @var{A}) = SUM_i (@var{W}(i) * (abs ((@var{A}(i) - @var{F}(i)) / @var{A}(i)))) * 100 / SUM_i (@var{W}(i)
@end example

@noindent
where @math{N} is the number of elements in @var{F} and @var{A} after
broadcasting is applied to the subtraction operation.

@end ifnottex

@var{F} and @var{A} must either be the same size or have compatible sizes.

If @var{F} and @var{A} are vectors of the same size, then
@code{mape (@var{F}, @var{A})} returns a scalar with the MAPE between the
elements of @var{F} and @var{A}.

If @code{@var{A} - @var{F}} is a matrix, then @code{mape (@var{F}, @var{A})}
returns a row vector with each element containing the MAPE between the
corresponding columns of @code{@var{A} - @var{F}}.

If @code{@var{A} - @var{F}} is an array, then @code{mape (@var{F}, @var{A})}
computes the MAPE along the first non-singleton dimension of the difference
between the input arrays @var{F} and @var{A}.  The size of @var{E} along the
operating dimension is 1, while all other dimensions are the same as in
@code{@var{A} - @var{F}}.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension, including any
dimension exceeding @code{ndims (@var{A} - @var{F})}, will return
@code{abs ((@var{A} - @var{F}) ./ @var{A})}.

Specifying the dimensions as @var{vecdim}, a vector of non-repeating
dimensions, will return the mape over the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions in
@code{@var{A} - @var{F}}, then it is equivalent to the option @qcode{"all"}.
Any dimension in @var{vecdim} greater than @code{ndims (@var{A} - @var{F})}
is ignored.

Specifying the dimension as @qcode{"all"} will cause @code{mape} to operate
on all elements of @code{@var{A} - @var{F}}, and is equivalent to
@code{mape ((@var{A} - @var{F})(:))}.

The optional variable @var{nanflag} specifies whether to include or exclude
NaN values from the calculation using any of the previously specified input
argument combinations.  The default value for @var{nanflag} is
@qcode{"includenan"} which keeps NaN values in the calculation.  To exclude
NaN values set the value of @var{nanflag} to @qcode{"omitnan"}.  The output
will still contain NaN values if @code{@var{A} - @var{F}} consists of all
NaN values in the operating dimension.

The optional variable @var{zeroflag} specifies whether to include or omit
zero values from the calculation using any of the previously specified input
argument combinations.  The default value for @var{zeroflag} is
@qcode{"includezero"}, in which case the calculated MAPE is Inf, if @var{A}
contains one or more zeros.  To ignore any zero values in @var{A}, set the
value of @var{zeroflag} to @qcode{"omitzero"}.  If @var{A} consists of all
zero values in the operating dimension, then MAPE is NaN.

The optional paired argument @code{@dots{}, "Weights", @var{W}} specifies a
weighting scheme @var{W}, which is applied on the difference of the input
arrays @var{F} and @var{A}, so that @code{mape} computes the weighted MAPE.
When operating along a single dimension, @var{W} must be a vector of the
same length as the operating dimension or it must have the same size as
@var{x}.  When operating over an array slice defined by @var{vecdim},
@var{W} must have the same size as the operating array slice, i.e.
@code{size (@var{A} - @var{F})(@var{vecdim})}, or the same size as
@code{@var{A} - @var{F}}.

@seealso{rmse, mean, abs}
@end deftypefn
