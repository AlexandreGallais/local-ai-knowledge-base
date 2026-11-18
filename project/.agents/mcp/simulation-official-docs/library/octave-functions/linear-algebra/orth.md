# orth

```octave
function B = orth (A, tol)
```

@deftypefn  {} {@var{B} =} orth (@var{A})
@deftypefnx {} {@var{B} =} orth (@var{A}, @var{tol})
Return an orthonormal basis of the range space of @var{A}.

The dimension of the range space is taken as the number of singular values
of @var{A} greater than @var{tol}.  If the argument @var{tol} is missing, it
is computed as

@example
max (size (@var{A})) * max (svd (@var{A})) * eps
@end example
@seealso{null}
@end deftypefn
