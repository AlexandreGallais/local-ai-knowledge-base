# powerset

```octave
function p = powerset (a, byrows_arg)
```

@deftypefn  {} {@var{p} =} powerset (@var{a})
@deftypefnx {} {@var{p} =} powerset (@var{a}, "rows")
Compute the powerset (all subsets) of the set @var{a}.

The set @var{a} must be a numerical matrix or a cell array of strings.  The
output will always be a cell array of either vectors or strings.

With the optional argument @qcode{"rows"}, each row of the set @var{a} is
considered one element of the set.  The input must be a 2-D numeric matrix
to use this argument.

@seealso{unique, union, intersect, setdiff, setxor, ismember}
@end deftypefn
