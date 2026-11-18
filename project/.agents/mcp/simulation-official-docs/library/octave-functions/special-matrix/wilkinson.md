# wilkinson

```octave
function W = wilkinson (n)
```

@deftypefn {} {@var{W} =} wilkinson (@var{n})
Return the Wilkinson matrix of order @var{n}.

Wilkinson matrices are symmetric and tridiagonal with pairs of nearly, but
not exactly, equal eigenvalues.  They are useful in testing the behavior and
performance of eigenvalue solvers.

@seealso{rosser, eig}
@end deftypefn
