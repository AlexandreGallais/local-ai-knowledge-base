# setdiff

```octave
function [c, ia] = setdiff (a, b, varargin)
```

@deftypefn  {} {@var{c} =} setdiff (@var{a}, @var{b})
@deftypefnx {} {@var{c} =} setdiff (@var{a}, @var{b}, "rows")
@deftypefnx {} {@var{c} =} setdiff (@dots{}, "sorted")
@deftypefnx {} {@var{c} =} setdiff (@dots{}, "stable")
@deftypefnx {} {@var{c} =} setdiff (@dots{}, "legacy")
@deftypefnx {} {[@var{c}, @var{ia}] =} setdiff (@dots{})
Return the unique elements in @var{a} that are not in @var{b}.

If @var{a} is a row vector return a row vector; Otherwise, return a
column vector.  The inputs may also be cell arrays of strings.

If the optional input @qcode{"rows"} is given then return the rows in
@var{a} that are not in @var{b}.  The inputs must be 2-D numeric matrices to
use this option.

The optional argument @qcode{"sorted"}/@qcode{"stable"} controls the order
in which unique values appear in the output.  The default is
@qcode{"sorted"} and values in the output are placed in ascending order.
The alternative @qcode{"stable"} preserves the order found in the input.

If requested, return the index vector @var{ia} such that
@code{@var{c} = @var{a}(@var{ia})}.

Programming Note: The input flag @qcode{"legacy"} changes the algorithm
to be compatible with @sc{matlab} releases prior to R2012b.

@seealso{unique, union, intersect, setxor, ismember}
@end deftypefn
