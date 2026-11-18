# arch_fit

```octave
function [a, b] = arch_fit (y, x, p, iter, gamma, a0, b0)
```

@deftypefn {} {[@var{a}, @var{b}] =} arch_fit (@var{y}, @var{x}, @var{p}, @var{iter}, @var{gamma}, @var{a0}, @var{b0})
Fit an ARCH regression model to the time series @var{y} using the scoring
algorithm in @nospell{Engle's} original ARCH paper.

The model is

@example
@group
y(t) = b(1) * x(t,1) + @dots{} + b(k) * x(t,k) + e(t),
h(t) = a(1) + a(2) * e(t-1)^2 + @dots{} + a(p+1) * e(t-p)^2
@end group
@end example

@noindent
in which @math{e(t)} is @math{N(0, h(t))}, given a time-series vector
@var{y} up to time @math{t-1} and a matrix of (ordinary) regressors @var{x}
up to @math{t}.  The order of the regression of the residual variance is
specified by @var{p}.

If invoked as @code{arch_fit (@var{y}, @var{k}, @var{p})} with a positive
integer @var{k}, fit an ARCH(@var{k}, @var{p}) process, i.e., do the above
with the @math{t}-th row of @var{x} given by

@example
[1, y(t-1), @dots{}, y(t-k)]
@end example

Optionally, one can specify the number of iterations @var{iter}, the
updating factor @var{gamma}, and initial values @math{a0} and @math{b0}
for the scoring algorithm.
@end deftypefn
