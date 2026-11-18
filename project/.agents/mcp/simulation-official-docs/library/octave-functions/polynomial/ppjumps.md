# ppjumps

```octave
function jumps = ppjumps (pp)
```

@deftypefn {} {@var{jumps} =} ppjumps (@var{pp})
Evaluate the boundary jumps of a piecewise polynomial.

If there are @math{n} intervals, and the dimensionality of @var{pp} is
@math{d}, the resulting array has dimensions @code{[d, n-1]}.
@seealso{mkpp}
@end deftypefn
