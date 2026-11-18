# trace

```octave
function t = trace (A)
```

@deftypefn {} {@var{t} =} trace (@var{A})
Compute the trace of @var{A}, the sum of the elements along the main
diagonal.

The implementation is straightforward: @code{sum (diag (@var{A}))}.
@seealso{eig}
@end deftypefn
