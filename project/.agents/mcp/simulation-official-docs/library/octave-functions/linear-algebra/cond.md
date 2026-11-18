# cond

```octave
function c = cond (A, p = 2)
```

@deftypefn  {} {@var{c} =} cond (@var{A})
@deftypefnx {} {@var{c} =} cond (@var{A}, @var{p})
Compute the @var{p}-norm condition number of a matrix with respect to
inversion.

@code{cond (@var{A})} is defined as
@tex
$ {\parallel A \parallel_p * \parallel A^{-1} \parallel_p .} $
@end tex
@ifnottex
@code{norm (@var{A}, @var{p}) * norm (inv (@var{A}), @var{p})}.
@end ifnottex

By default, @code{@var{p} = 2} is used which implies a (relatively slow)
singular value decomposition.  Other possible selections are
@code{@var{p} = 1, Inf, "fro"} which are generally faster.  For a full
discussion of possible @var{p} values, @pxref{XREFnorm,,@code{norm}}.

The condition number of a matrix quantifies the sensitivity of the matrix
inversion operation when small changes are made to matrix elements.  Ideally
the condition number will be close to 1.  When the number is large this
indicates small changes (such as underflow or round-off error) will produce
large changes in the resulting output.  In such cases the solution results
from numerical computing are not likely to be accurate.
@seealso{condest, rcond, condeig, norm, svd}
@end deftypefn
