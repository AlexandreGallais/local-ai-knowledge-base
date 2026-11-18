# ranks

```octave
function y = ranks (x, dim, rtype = 0)
```

@deftypefn  {} {@var{y} =} ranks (@var{x})
@deftypefnx {} {@var{y} =} ranks (@var{x}, @var{dim})
@deftypefnx {} {@var{y} =} ranks (@var{x}, @var{dim}, @var{rtype})
Return the ranks (in the sense of order statistics) of @var{x} along the
first non-singleton dimension adjusted for ties.

If the optional @var{dim} argument is given, operate along this dimension.

The optional parameter @var{rtype} determines how ties are handled.  All
examples below assume an input of @code{[ 1, 2, 2, 4 ]}.

@table @asis
@item 0 or @qcode{"fractional"} (default) for fractional ranking (1, 2.5,
2.5, 4);

@item 1 or @qcode{"competition"} for competition ranking (1, 2, 2, 4);

@item 2 or @qcode{"modified"} for modified competition ranking (1, 3, 3, 4);

@item 3 or @qcode{"ordinal"} for ordinal ranking (1, 2, 3, 4);

@item 4 or @qcode{"dense"} for dense ranking (1, 2, 2, 3).
@end table

@seealso{spearman, kendall}
@end deftypefn
