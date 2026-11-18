# rms

```octave
function y = rms (x, varargin)
```

@deftypefn  {} {@var{y} =} rms (@var{x})
@deftypefnx {} {@var{y} =} rms (@var{x}, @var{dim})
@deftypefnx {} {@var{y} =} rms (@var{x}, @var{vecdim})
@deftypefnx {} {@var{y} =} rms (@var{x}, "all")
@deftypefnx {} {@var{y} =} rms (@dots{}, @var{nanflag})
Compute the root mean square of the input data @var{x}.

The root mean square is defined as
@tex
$$
{\rm rms} (x) = {\sqrt{{1 \over N} \sum_{i=1}^N {|x_i|}^2}}
$$
where $N$ is the number of elements of @var{x}.

@end tex
@ifnottex

@example
@group
rms (@var{x}) = sqrt (1/N SUM_i @var{x}(i)^2)
@end group
@end example

@noindent
where @math{N} is the length of the @var{x} vector.

@end ifnottex
If @var{x} is a vector, then @code{rms (@var{x})} returns the root mean
square of the elements in @var{x}.

If @var{x} is a matrix, then @code{rms (@var{x})} returns a row vector
with each element containing the root mean square of the corresponding
column in @var{x}.

If @var{x} is an array, then @code{rms (@var{x})} computes the root mean
square along the first non-singleton dimension of @var{x}.

The data in @var{x} must be numeric.  The size of @var{y} is equal to the
size of @var{x} except for the operating dimension, which becomes 1.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension of @var{x},
including any dimension exceeding @code{ndims (@var{x})}, will return
@code{@var{x}}.

Specifying multiple dimensions with input @var{vecdim}, a vector of
non-repeating dimensions, will operate along the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions of @var{x}, then it is
equivalent to the option @qcode{"all"}.  Any dimension in @var{vecdim}
greater than @code{ndims (@var{x})} is ignored.

Specifying the dimension as @qcode{"all"} will cause @code{rms} to operate
on all elements of @var{x}, and is equivalent to @code{rms (@var{x}(:))}.

The optional variable @var{nanflag} specifies whether to include or exclude
NaN values from the calculation using any of the previously specified input
argument combinations.  The default value for @var{nanflag} is
@qcode{"includenan"} which keeps NaN values in the calculation.  To exclude
NaN values set the value of @var{nanflag} to @qcode{"omitnan"}.  The output
will still contain NaN values if @var{x} consists of all NaN values in the
operating dimension.

@seealso{meansq, var, std, moment}
@end deftypefn
