# lscov

```octave
function [x, stdx, mse, S] = lscov (A, b, V = [], alg)
```

@deftypefn  {} {@var{x} =} lscov (@var{A}, @var{b})
@deftypefnx {} {@var{x} =} lscov (@var{A}, @var{b}, @var{V})
@deftypefnx {} {@var{x} =} lscov (@var{A}, @var{b}, @var{V}, @var{alg})
@deftypefnx {} {[@var{x}, @var{stdx}, @var{mse}, @var{S}] =} lscov (@dots{})

Compute a generalized linear least squares fit.

Estimate @var{x} under the model @var{b} = @var{A}@var{x} + @var{w}, where
the noise @var{w} is assumed to follow a normal distribution with covariance
matrix @math{{\sigma^2} V}.

If the size of the coefficient matrix @var{A} is n-by-p, the size of the
vector/array of constant terms @var{b} must be n-by-k.

The optional input argument @var{V} may be an n-element vector of positive
weights (inverse variances), or an n-by-n symmetric positive semi-definite
matrix representing the covariance of @var{b}.  If @var{V} is not supplied,
the ordinary least squares solution is returned.

The @var{alg} input argument, a guidance on solution method to use, is
currently ignored.

Besides the least-squares estimate matrix @var{x} (p-by-k), the function
also returns @var{stdx} (p-by-k), the error standard deviation of estimated
@var{x}; @var{mse} (k-by-1), the estimated data error covariance scale
factors (@math{\sigma^2}); and @var{S} (p-by-p, or p-by-p-by-k if k > 1),
the error covariance of @var{x}.

Reference: @nospell{Golub and Van Loan},
@cite{Matrix Computations (3rd Ed.)}, Johns Hopkins, Section 5.6.3, 1996.

@seealso{ols, gls, lsqnonneg}
@end deftypefn
