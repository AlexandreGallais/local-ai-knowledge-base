# normest

```octave
function [nest, iter] = normest (A, tol = 1e-6)
```

@deftypefn  {} {@var{nest} =} normest (@var{A})
@deftypefnx {} {@var{nest} =} normest (@var{A}, @var{tol})
@deftypefnx {} {[@var{nest}, @var{iter}] =} normest (@dots{})
Estimate the 2-norm of the matrix @var{A} using a power series analysis.

This is typically used for large matrices, where the cost of calculating
@code{norm (@var{A})} is prohibitive and an approximation to the 2-norm is
acceptable.

@var{tol} is the tolerance to which the 2-norm is calculated.  By default
@var{tol} is 1e-6.

The optional output @var{iter} returns the number of iterations that were
required for @code{normest} to converge.
@seealso{normest1, norm, cond, condest}
@end deftypefn
