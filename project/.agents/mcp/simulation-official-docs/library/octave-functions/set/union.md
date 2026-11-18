# union

```octave
function [y, ia, ib] = union (a, b, varargin)
```

@deftypefn  {} {@var{c} =} union (@var{a}, @var{b})
@deftypefnx {} {@var{c} =} union (@var{a}, @var{b}, "rows")
@deftypefnx {} {@var{c} =} union (@dots{}, "sorted")
@deftypefnx {} {@var{c} =} union (@dots{}, "stable")
@deftypefnx {} {@var{c} =} union (@dots{}, "legacy")
@deftypefnx {} {[@var{c}, @var{ia}, @var{ib}] =} union (@dots{})

Return the unique elements that are in either @var{a} or @var{b}.

If @var{a} and @var{b} are both row vectors then return a row vector;
Otherwise, return a column vector.  The inputs may also be cell arrays of
strings.

If the optional input @qcode{"rows"} is given then return rows that are in
either @var{a} or @var{b}.  The inputs must be 2-D numeric matrices to use
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

@seealso{unique, intersect, setdiff, setxor, ismember}
@end deftypefn
