# qzhess

```octave
function [aa, bb, q, z] = qzhess (A, B)
```

@deftypefn {} {[@var{aa}, @var{bb}, @var{q}, @var{z}] =} qzhess (@var{A}, @var{B})
Compute the Hessenberg-triangular decomposition of the matrix pencil
@code{(@var{A}, @var{B})}, returning
@code{@var{aa} = @var{q} * @var{A} * @var{z}},
@code{@var{bb} = @var{q} * @var{B} * @var{z}}, with @var{q} and @var{z}
orthogonal.

For example:

@example
@group
[aa, bb, q, z] = qzhess ([1, 2; 3, 4], [5, 6; 7, 8])
  @xresult{} aa =
      -3.02244  -4.41741
       0.92998   0.69749
  @xresult{} bb =
      -8.60233  -9.99730
       0.00000  -0.23250
  @xresult{} q =
      -0.58124  -0.81373
      -0.81373   0.58124
  @xresult{} z =
     Diagonal Matrix
       1   0
       0   1
@end group
@end example

The Hessenberg-triangular decomposition is the first step in
@nospell{Moler and Stewart's} QZ@tie{}decomposition algorithm.

Algorithm taken from @nospell{Golub and Van Loan},
@cite{Matrix Computations, 2nd edition}.

@seealso{lu, chol, hess, qr, qz, schur, svd}
@end deftypefn
