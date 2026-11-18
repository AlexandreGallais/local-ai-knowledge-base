# gls

```octave
function [beta, v, r] = gls (y, x, o)
```

@deftypefn {} {[@var{beta}, @var{v}, @var{r}] =} gls (@var{y}, @var{x}, @var{o})
Generalized least squares (GLS) model.

Perform a generalized least squares estimation for the multivariate model
@tex
$@var{y} = @var{x}\,@var{b} + @var{e}$
@end tex
@ifnottex
@w{@math{@var{y} = @var{x}*@var{B} + @var{E}}}
@end ifnottex
where
@tex
$@var{y}$ is a $t \times p$ matrix, $@var{x}$ is a $t \times k$ matrix,
$@var{b}$ is a $k \times p$ matrix and $@var{e}$ is a $t \times p$ matrix.
@end tex
@ifnottex
@var{y} is a @math{t}-by-@math{p} matrix, @var{x} is a
@math{t}-by-@math{k} matrix, @var{b} is a @math{k}-by-@math{p} matrix
and @var{e} is a @math{t}-by-@math{p} matrix.
@end ifnottex

@noindent
Each row of @var{y} is a @math{p}-variate observation in which each column
represents a variable.  Likewise, the rows of @var{x} represent
@math{k}-variate observations or possibly designed values.  Furthermore,
the collection of observations @var{x} must be of adequate rank, @math{k},
otherwise @var{b} cannot be uniquely estimated.

The observation errors, @var{e}, are assumed to originate from an
underlying @math{p}-variate distribution with zero mean but possibly
heteroscedastic observations.  That is, in general,
@tex
$\bar{@var{e}} = 0$ and cov(vec(@var{e})) = $s^2@var{o}$
@end tex
@ifnottex
@code{@math{mean (@var{e}) = 0}} and
@code{@math{cov (vec (@var{e})) = (@math{s}^2)*@var{o}}}
@end ifnottex
in which @math{s} is a scalar and @var{o} is a
@tex
@math{t \, p \times t \, p}
@end tex
@ifnottex
@math{t*p}-by-@math{t*p}
@end ifnottex
matrix.

The return values @var{beta}, @var{v}, and @var{r} are
defined as follows.

@table @var
@item beta
The GLS estimator for matrix @var{b}.

@item v
The GLS estimator for scalar @math{s^2}.

@item r
The matrix of GLS residuals, @math{@var{r} = @var{y} - @var{x}*@var{beta}}.
@end table
@seealso{ols}
@end deftypefn
