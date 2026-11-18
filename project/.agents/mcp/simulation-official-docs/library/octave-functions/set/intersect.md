# intersect

```octave
function [c, ia, ib] = intersect (a, b, varargin)
```

@deftypefn  {} {@var{c} =} intersect (@var{a}, @var{b})
@deftypefnx {} {@var{c} =} intersect (@var{a}, @var{b}, "rows")
@deftypefnx {} {@var{c} =} intersect (@dots{}, "sorted")
@deftypefnx {} {@var{c} =} intersect (@dots{}, "stable")
@deftypefnx {} {@var{c} =} intersect (@dots{}, "legacy")
@deftypefnx {} {[@var{c}, @var{ia}, @var{ib}] =} intersect (@dots{})

Return the unique elements common to both @var{a} and @var{b}.

If @var{a} and @var{b} are both row vectors then return a row vector;
Otherwise, return a column vector.  The inputs may also be cell arrays of
strings.

If the optional input @qcode{"rows"} is given then return the common rows of
@var{a} and @var{b}.  The inputs must be 2-D numeric matrices to use this
option.

The optional argument @qcode{"sorted"}/@qcode{"stable"} controls the order
in which unique values appear in the output.  The default is
@qcode{"sorted"} and values in the output are placed in ascending order.
The alternative @qcode{"stable"} preserves the order found in the input.

If requested, return column index vectors @var{ia} and @var{ib} such that
@code{@var{c} = @var{a}(@var{ia})} and @code{@var{c} = @var{b}(@var{ib})}.

Programming Note: The input flag @qcode{"legacy"} changes the algorithm
to be compatible with @sc{matlab} releases prior to R2012b.

@seealso{unique, union, setdiff, setxor, ismember}
@end deftypefn
