# null

```octave
function Z = null (A, tol)
```

@deftypefn  {} {@var{Z} =} null (@var{A})
@deftypefnx {} {@var{Z} =} null (@var{A}, @var{tol})
Return an orthonormal basis @var{Z} of the null space of @var{A}.

The dimension of the null space @var{Z} is taken as the number of singular
values of @var{A} not greater than @var{tol}.  If the argument @var{tol}
is missing, it is computed as

@example
max (size (@var{A})) * max (svd (@var{A}, 0)) * eps
@end example
@seealso{orth, svd}
@end deftypefn
