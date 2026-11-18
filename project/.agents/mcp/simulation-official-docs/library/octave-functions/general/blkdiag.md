# blkdiag

```octave
function M = blkdiag (varargin)
```

@deftypefn {} {@var{M} =} blkdiag (@var{A}, @var{B}, @var{C}, @dots{})
Build a block diagonal matrix from @var{A}, @var{B}, @var{C}, @enddots{}

All arguments must be numeric and either two-dimensional matrices or
scalars.  If any argument is of type sparse, the output will also be sparse.
@seealso{diag, horzcat, vertcat, sparse}
@end deftypefn
