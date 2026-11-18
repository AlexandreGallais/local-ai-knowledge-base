# moment

```octave
function m = moment (x, p, dim = [], type = 'c')
```

@deftypefn  {} {@var{m} =} moment (@var{x}, @var{p})
@deftypefnx {} {@var{m} =} moment (@var{x}, @var{p}, @var{dim})
@deftypefnx {} {@var{m} =} moment (@var{x}, @var{p}, @var{vecdim})
@deftypefnx {} {@var{m} =} moment (@var{x}, @var{p}, "all")
@deftypefnx {} {@var{m} =} moment (@var{x}, @var{p}, @dots{}, @var{type})
Compute the @var{p}-th central moment of the input data @var{x}.

The @var{p}-th central moment of @var{x} is defined as:
@tex
$$
{{1 \over N} \sum_{i=1}^N (x_i - \bar{x})^p}
$$
where $\bar{x}$ is the mean value of @var{x} and $N$ is the number of
elements of @var{x}.

@end tex
@ifnottex

@example
@group
1/N SUM_i (@var{x}(i) - mean(@var{x}))^@var{p}
@end group
@end example

@noindent
where @math{N} is the length of the @var{x} vector.

@end ifnottex

If @var{x} is a vector, then @code{moment (@var{x})} computes the @var{p}-th
central moment of the data in @var{x}.

If @var{x} is a matrix, then @code{moment (@var{x})} returns a vector with
element containing the @var{p}-th central moment of the corresponding column
in @var{x}.

If @var{x} is an array, then @code{moment (@var{x})} computes the @var{p}-th
central moment along the first non-singleton dimension of @var{x}.

The data in @var{x} must be a non-empty numeric array and any NaN values
along the operating dimension will return NaN for central moment.  The size
of @var{m} is equal to the size of @var{x} except for the operating
dimension, which becomes 1.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension of @var{x},
including any dimension exceeding @code{ndims (@var{x})}, will return
@var{x}.

Specifying multiple dimensions with input @var{vecdim}, a vector of
non-repeating dimensions, will operate along the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions of @var{x}, then it is
equivalent to the option @qcode{"all"}.  Any dimension in @var{vecdim}
greater than @code{ndims (@var{x})} is ignored.  If all dimensions in
@var{vecdim} are greater than @code{ndims (@var{x})}, then @code{moment}
will return @var{x}.

Specifying the dimension as @qcode{"all"} will cause @code{moment} to
operate on all elements of @var{x}, and is equivalent to
@code{moment (@var{x}(:))}.

The optional fourth input argument, @var{type}, is a string specifying the
type of moment to be computed.
Valid options are:

@table @asis
@item @qcode{"c"}
Central Moment (default).

@item  @qcode{"a"}
@itemx @qcode{"ac"}
Absolute Central Moment.  The moment about the mean ignoring sign
defined as
@tex
$$
{{1 \over N} \sum_{i=1}^N {| x_i - \bar{x} |}^p}
$$
@end tex
@ifnottex

@example
@group
1/N SUM_i (abs (@var{x}(i) - mean(@var{x})))^@var{p}
@end group
@end example

@end ifnottex

@item @qcode{"r"}
Raw Moment.  The moment about zero defined as
@tex
$$
{{1 \over N} \sum_{i=1}^N {x_i}^p}
$$
@end tex
@ifnottex

@example
@group
moment (@var{x}) = 1/N SUM_i @var{x}(i)^@var{p}
@end group
@end example

@end ifnottex

@item @nospell{@qcode{"ar"}}
Absolute Raw Moment.  The moment about zero ignoring sign defined as
@tex
$$
{{1 \over N} \sum_{i=1}^N {|x_i|}^p}
$$
@end tex
@ifnottex

@example
@group
1/N SUM_i ( abs (@var{x}(i)) )^@var{p}
@end group
@end example

@end ifnottex
@end table
@seealso{var, skewness, kurtosis}
@end deftypefn
