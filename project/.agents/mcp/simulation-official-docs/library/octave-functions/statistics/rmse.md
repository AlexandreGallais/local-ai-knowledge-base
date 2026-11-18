# rmse

```octave
function E = rmse (F, A, varargin)
```

@deftypefn  {} {@var{E} =} rmse (@var{F}, @var{A})
@deftypefnx {} {@var{E} =} rmse (@var{F}, @var{A}, @var{dim})
@deftypefnx {} {@var{E} =} rmse (@var{F}, @var{A}, @var{vecdim})
@deftypefnx {} {@var{E} =} rmse (@var{F}, @var{A}, "all")
@deftypefnx {} {@var{E} =} rmse (@dots{}, @var{nanflag})
@deftypefnx {} {@var{E} =} rmse (@dots{}, @qcode{'Weights'}, @var{W})
Compute the root mean squared error between arrays.

The root mean squared error is defined as
@tex
$$ {\rm rmse}(F, A) = {E} = \sqrt{{1\over N} \sum_{i=1}^N {\left| {A_i - F_i} \right|}^2} $$
where $N$ is the number of elements in @var{F} and @var{A} after
broadcasting is applied to the subtraction operation.
@end tex
@ifnottex

@example
rmse (@var{F}, @var{A}) = sqrt (SUM_i ((@var{A}(i) - @var{F}(i)) ^ 2) / N)
@end example

@noindent
where @math{N} is the number of elements in @var{F} and @var{A} after
broadcasting is applied to the subtraction operation.

@end ifnottex

The weighted root mean squared error is defined as
@tex
$$ {\rm rmse}(F, A) = {E_W} = \sqrt{\sum_{i=1}^N W_i{\left| {A_i - F_i} \right|}^2 \over \sum_{i=1}^N W_i} $$
where $N$ is the number of elements in @var{F} and @var{A} after
broadcasting is applied to the subtraction operation.
@end tex
@ifnottex

@example
weighted_rmse (@var{F}, @var{A}) = sqrt (SUM_i (@var{W}(i) * ((@var{A}(i) - @var{F}(i)) ^ 2)) / SUM_i (@var{W}(i)))
@end example

@noindent
where @math{N} is the number of elements in @var{F} and @var{A} after
broadcasting is applied to the subtraction operation.

@end ifnottex

@var{F} and @var{A} must either be the same size or have compatible sizes.

If @var{F} and @var{A} are vectors of the same size, then
@code{rmse (@var{F}, @var{A})} returns a scalar with the RMSE between the
elements of @var{F} and @var{A}.

If @code{@var{A} - @var{F}} is a matrix, then @code{rmse (@var{F}, @var{A})}
returns a row vector with each element containing the RMSE between the
corresponding columns of @code{@var{A} - @var{F}}.

If @code{@var{A} - @var{F}} is an array, then @code{rmse (@var{F}, @var{A})}
computes the RMSE along the first non-singleton dimension of the difference
between the input arrays @var{F} and @var{A}.  The size of @var{E} along the
operating dimension is 1, while all other dimensions are the same as in
@code{@var{A} - @var{F}}.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension, including any
dimension exceeding @code{ndims (@var{A} - @var{F})}, will return
@code{abs ((@var{A} - @var{F}) ./ @var{A})}.

Specifying the dimensions as @var{vecdim}, a vector of non-repeating
dimensions, will return the rmse over the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions in
@code{@var{A} - @var{F}}, then it is equivalent to the option @qcode{"all"}.
Any dimension in @var{vecdim} greater than @code{ndims (@var{A} - @var{F})}
is ignored.

Specifying the dimension as @qcode{"all"} will cause @code{rmse} to operate
on all elements of @code{@var{A} - @var{F}}, and is equivalent to
@code{rmse ((@var{A} - @var{F})(:))}.

The optional variable @var{nanflag} specifies whether to include or exclude
NaN values from the calculation using any of the previously specified input
argument combinations.  The default value for @var{nanflag} is
@qcode{"includenan"} which keeps NaN values in the calculation.  To exclude
NaN values set the value of @var{nanflag} to @qcode{"omitnan"}.  The output
will still contain NaN values if @code{@var{A} - @var{F}} consists of all
NaN values in the operating dimension.

The optional paired argument @code{@dots{}, "Weights", @var{W}} specifies a
weighting scheme @var{W}, which is applied on the difference of the input
arrays @var{F} and @var{A}, so that @code{rmse} computes the weighted RMSE.
When operating along a single dimension, @var{W} must be a vector of the
same length as the operating dimension or it must have the same size as
@var{x}.  When operating over an array slice defined by @var{vecdim},
@var{W} must have the same size as the operating array slice, i.e.
@code{size (@var{A} - @var{F})(@var{vecdim})}, or the same size as
@code{@var{A} - @var{F}}.

@seealso{mape, meansq, rms}
@end deftypefn
