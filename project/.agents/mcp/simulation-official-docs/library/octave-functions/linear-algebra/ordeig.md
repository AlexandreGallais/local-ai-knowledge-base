# ordeig

```octave
function lambda = ordeig (A, B)
```

@deftypefn  {} {@var{lambda} =} ordeig (@var{A})
@deftypefnx {} {@var{lambda} =} ordeig (@var{A}, @var{B})
Return the eigenvalues of quasi-triangular matrices in their order of
appearance in the matrix @var{A}.

The quasi-triangular matrix @var{A} is usually the result of a Schur
factorization.  If called with a second input @var{B} then the generalized
eigenvalues of the pair @var{A}, @var{B} are returned in the order of
appearance of the matrix @code{@var{A}-@var{lambda}*@var{B}}.  The pair
@var{A}, @var{B} is usually the result of a QZ decomposition.

@seealso{ordschur, ordqz, eig, schur, qz}
@end deftypefn
