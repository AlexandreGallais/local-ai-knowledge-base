# expm

```octave
function r = expm (A)
```

@deftypefn {} {@var{r} =} expm (@var{A})
Return the exponential of a matrix.

The matrix exponential is defined as the infinite Taylor series
@tex
$$
 \exp (A) = I + A + {A^2 \over 2!} + {A^3 \over 3!} + \cdots
$$
@end tex
@ifnottex

@example
expm (A) = I + A + A^2/2! + A^3/3! + @dots{}
@end example

@end ifnottex
However, the Taylor series is @emph{not} the way to compute the matrix
exponential; see @nospell{Moler and Van Loan}, "Nineteen Dubious Ways
to Compute the Exponential of a Matrix", @cite{SIAM Review}, 1978.  This
routine uses Ward's diagonal Pad@'e approximation method with three step
preconditioning (@cite{SIAM Journal on Numerical Analysis}, 1977).  Diagonal
Pad@'e approximations are rational polynomials of matrices
@tex
$D_q(A)^{-1}N_q(A)$
@end tex
@ifnottex

@example
@group
     -1
D (A)   N (A)
@end group
@end example

@end ifnottex
whose Taylor series matches the first
@tex
$2 q + 1 $
@end tex
@ifnottex
@code{2q+1}
@end ifnottex
terms of the Taylor series above; direct evaluation of the Taylor series
(with the same preconditioning steps) may be desirable in lieu of the
Pad@'e approximation when
@tex
$D_q(A)$
@end tex
@ifnottex
@code{Dq(A)}
@end ifnottex
is ill-conditioned.
@seealso{logm, sqrtm}
@end deftypefn
