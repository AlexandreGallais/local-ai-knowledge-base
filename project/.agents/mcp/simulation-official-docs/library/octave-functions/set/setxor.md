# setxor

```octave
function [c, ia, ib] = setxor (a, b, varargin)
```

@deftypefn  {} {@var{c} =} setxor (@var{a}, @var{b})
@deftypefnx {} {@var{c} =} setxor (@var{a}, @var{b}, "rows")
@deftypefnx {} {@var{c} =} setxor (@dots{}, "sorted")
@deftypefnx {} {@var{c} =} setxor (@dots{}, "stable")
@deftypefnx {} {@var{c} =} setxor (@dots{}, "legacy")
@deftypefnx {} {[@var{c}, @var{ia}, @var{ib}] =} setxor (@dots{})

Return the unique elements exclusive to sets @var{a} or @var{b}.

If @var{a} and @var{b} are both row vectors then return a row vector;
Otherwise, return a column vector.  The inputs may also be cell arrays of
strings.

If the optional input @qcode{"rows"} is given then return the rows exclusive
to sets @var{a} and @var{b}.  The inputs must be 2-D numeric matrices to use
this option.

The optional argument @qcode{"sorted"}/@qcode{"stable"} controls the order
in which unique values appear in the output.  The default is
@qcode{"sorted"} and values in the output are placed in ascending order.
The alternative @qcode{"stable"} preserves the order found in the input.

The optional outputs @var{ia} and @var{ib} are column index vectors such
that @code{@var{a}(@var{ia})} and @code{@var{b}(@var{ib})} are disjoint sets
whose union is @var{c}.

Programming Note: The input flag @qcode{"legacy"} changes the algorithm
to be compatible with @sc{matlab} releases prior to R2012b.

@seealso{unique, union, intersect, setdiff, ismember}
@end deftypefn
