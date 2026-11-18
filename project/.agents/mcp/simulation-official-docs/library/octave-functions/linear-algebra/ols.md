# ols

```octave
function [beta, sigma, r] = ols (y, x)
```

@deftypefn {} {[@var{beta}, @var{sigma}, @var{r}] =} ols (@var{y}, @var{x})
Ordinary least squares (OLS) estimation.

OLS applies to the multivariate model
@tex
$@var{y} = @var{x}\,@var{b} + @var{e}$
@end tex
@ifnottex
@w{@math{@var{y} = @var{x}*@var{b} + @var{e}}}
@end ifnottex
where
@tex
$@var{y}$ is a $t \times p$ matrix, $@var{x}$ is a $t \times k$ matrix,
$@var{b}$ is a $k \times p$ matrix, and $@var{e}$ is a $t \times p$ matrix.
@end tex
@ifnottex
@math{@var{y}} is a @math{t}-by-@math{p} matrix, @math{@var{x}} is a
@math{t}-by-@math{k} matrix, @var{b} is a @math{k}-by-@math{p} matrix, and
@var{e} is a @math{t}-by-@math{p} matrix.
@end ifnottex

Each row of @var{y} is a @math{p}-variate observation in which each column
represents a variable.  Likewise, the rows of @var{x} represent
@math{k}-variate observations or possibly designed values.  Furthermore,
the collection of observations @var{x} must be of adequate rank, @math{k},
otherwise @var{b} cannot be uniquely estimated.

The observation errors, @var{e}, are assumed to originate from an
underlying @math{p}-variate distribution with zero mean and
@math{p}-by-@math{p} covariance matrix @var{S}, both constant conditioned
on @var{x}.  Furthermore, the matrix @var{S} is constant with respect to
each observation such that
@tex
$\bar{@var{e}} = 0$ and cov(vec(@var{e})) =  kron(@var{s},@var{I}).
@end tex
@ifnottex
@code{mean (@var{e}) = 0} and
@code{cov (vec (@var{e})) = kron (@var{s}, @var{I})}.
@end ifnottex
(For cases
that don't meet this criteria, such as autocorrelated errors, see
generalized least squares, gls, for more efficient estimations.)

The return values @var{beta}, @var{sigma}, and @var{r} are defined as
follows.

@table @var
@item beta
The OLS estimator for matrix @var{b}.
@tex
@var{beta} is calculated directly via $(@var{x}^T@var{x})^{-1} @var{x}^T
@var{y}$ if the matrix $@var{x}^T@var{x}$ is of full rank.
@end tex
@ifnottex
@var{beta} is calculated directly via
@code{inv (@var{x}'*@var{x}) * @var{x}' * @var{y}} if the matrix
@code{@var{x}'*@var{x}} is of full rank.
@end ifnottex
Otherwise, @code{@var{beta} = pinv (@var{x}) * @var{y}} where
@code{pinv (@var{x})} denotes the pseudoinverse of @var{x}.

@item sigma
The OLS estimator for the matrix @var{s},

@example
@group
@var{sigma} = (@var{y}-@var{x}*@var{beta})' * (@var{y}-@var{x}*@var{beta}) / (@math{t}-rank(@var{x}))
@end group
@end example

@item r
The matrix of OLS residuals, @code{@var{r} = @var{y} - @var{x}*@var{beta}}.
@end table
@seealso{gls, pinv}
@end deftypefn
