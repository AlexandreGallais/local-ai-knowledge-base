# mode

```octave
function [m, f, c] = mode (x, dim)
```

@deftypefn  {} {@var{m} =} mode (@var{x})
@deftypefnx {} {@var{m} =} mode (@var{x}, @var{dim})
@deftypefnx {} {@var{m} =} mode (@var{x}, @var{vecdim})
@deftypefnx {} {@var{m} =} mode (@var{x}, "all")
@deftypefnx {} {[@var{m}, @var{f}, @var{c}] =} mode (@dots{})
Compute the most frequently occurring value in the input data @var{x}.

@code{mode} determines the frequency of values along the first non-singleton
dimension and returns the value with the highest frequency.  If two, or
more, values have the same frequency @code{mode} returns the smallest.

The optional input @var{dim} specifies the dimension to operate on and must
be a positive integer.  Specifying any singleton dimension of @var{x},
including any dimension exceeding @code{ndims (@var{x})}, will return
@var{x}.

Specifying multiple dimensions with input @var{vecdim}, a vector of
non-repeating dimensions, will operate along the array slice defined by
@var{vecdim}.  If @var{vecdim} indexes all dimensions of @var{x}, then it is
equivalent to the option @qcode{"all"}.  Any dimension in @var{vecdim}
greater than @code{ndims (@var{x})} is ignored.  If all dimensions in
@var{vecdim} are greater than @code{ndims (@var{x})}, then @code{mode}
will return @var{x}.

Specifying the dimension as @qcode{"all"} will cause @code{mode} to operate
on all elements of @var{x}, and is equivalent to @code{mode (@var{x}(:))}.

The return variable @var{f} is the number of occurrences of the mode in
the dataset.

The cell array @var{c} contains all of the elements with the maximum
frequency.
@seealso{mean, median}
@end deftypefn
