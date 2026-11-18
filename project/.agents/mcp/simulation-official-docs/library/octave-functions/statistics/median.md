# median

```octave
function m = median (x, varargin)
```

@deftypefn  {} {@var{m} =} median (@var{x})
@deftypefnx {} {@var{m} =} median (@var{x}, @var{dim})
@deftypefnx {} {@var{m} =} median (@var{x}, @var{vecdim})
@deftypefnx {} {@var{m} =} median (@var{x}, "all")
@deftypefnx {} {@var{m} =} median (@dots{}, @var{nanflag})
@deftypefnx {} {@var{m} =} median (@dots{}, @var{outtype})
Compute the median value of the elements of @var{x}.

The median is defined on the sorted data @var{s}
(@w{@code{@var{s} = sort (@var{x})}}) as
@tex
$$
{\rm median} (x) =
  \cases{s(\lceil N/2\rceil), & $N$ odd;\cr
          (s(N/2)+s(N/2+1))/2, & $N$ even.}
$$
where $N$ is the number of elements of @var{x}.

@end tex
@ifnottex

@example
@group
             |  @var{s}(ceil (N/2))          N odd
median (@var{x}) = |
             | (@var{s}(N/2) + @var{s}(N/2+1))/2   N even
@end group
@end example

@end ifnottex

If @var{x} is a vector, then @code{median (@var{x})} returns the median of
the elements in @var{x}.

If @var{x} is a matrix, then @code{median (@var{x})} returns a row vector
with each element containing the median of the corresponding column in
@var{x}.

If @var{x} is an array, then @code{median (@var{x})} computes the median
along the first non-singleton dimension of @var{x}.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension of @var{x},
including any dimension exceeding @code{ndims (@var{x})}, will return
@var{x}.

Specifying multiple dimensions with input @var{vecdim}, a vector of
non-repeating dimensions, will operate along the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions of @var{x}, then it is
equivalent to the option @qcode{"all"}.  Any dimension in @var{vecdim}
greater than @code{ndims (@var{x})} is ignored.

Specifying the dimension as @qcode{"all"} will cause @code{median} to
operate on all elements of @var{x}, and is equivalent to
@code{median (@var{x}(:))}.

@code{median (@dots{}, @var{outtype})} returns the median with a specified
data type, using any of the input arguments in the previous syntaxes.
@var{outtype} can take the following values:

@table @asis
@item @qcode{"default"}
Output is of type double, unless the input is single in which case the
output is of type single.

@item @qcode{"double"}
Output is of type double.

@item @qcode{"native"}.
Output is of the same type as the input (@code{class (@var{x})}), unless the
input is logical in which case the output is of type double.
@end table

The optional variable @var{nanflag} specifies whether to include or exclude
NaN values from the calculation using any of the previously specified input
argument combinations.  The default value for @var{nanflag} is
@qcode{"includenan"} which keeps NaN values in the calculation.  To
exclude NaN values set the value of @var{nanflag} to @qcode{"omitnan"}.
The output will still contain NaN values if @var{x} consists of all NaN
values in the operating dimension.

@seealso{mean, mode, movmedian}
@end deftypefn
