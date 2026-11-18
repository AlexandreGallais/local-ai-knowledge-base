# polyfit

```octave
function [p, s, mu] = polyfit (x, y, n)
```

@deftypefn  {} {@var{p} =} polyfit (@var{x}, @var{y}, @var{n})
@deftypefnx {} {[@var{p}, @var{s}] =} polyfit (@var{x}, @var{y}, @var{n})
@deftypefnx {} {[@var{p}, @var{s}, @var{mu}] =} polyfit (@var{x}, @var{y}, @var{n})
Return the coefficients of a polynomial @var{p}(@var{x}) of degree @var{n}
that minimizes the least-squares-error of the fit to the points
@code{[@var{x}(:), @var{y}(:)]}.

@var{n} is typically an integer @geq{} 0 specifying the degree of the
approximating polynomial.  If @var{n} is a logical vector, it is used as a
mask to selectively force the corresponding polynomial coefficients to be
used or ignored.

The polynomial coefficients are returned in the row vector @var{p}.  The
output @var{p} may be directly used with @code{polyval} to estimate values
using the fitted polynomial.

The optional output @var{s} is a structure containing the following fields:

@table @samp

@item yf
The values of the polynomial for each value of @var{x}.

@item V
The @nospell{Vandermonde} matrix used to compute the polynomial
coefficients.

@item X (deprecated, will be removed in Octave 13)
The @nospell{Vandermonde} matrix used to compute the polynomial
coefficients.

@item R
Triangular factor R from the QR@tie{}decomposition.

@item C
The unscaled covariance matrix, formally equal to the inverse of
@var{v'}*@var{v}, but computed in a way minimizing roundoff error
propagation.

@item df
The degrees of freedom.

@item normr
The norm of the residuals.

@item rsquared
Coefficient of determination, or R-squared.
@end table

The second output may be used by @code{polyval} to calculate the statistical
error limits of the predicted values.  In particular, the standard deviation
of @var{p} coefficients is given by

@code{sqrt (diag (@var{s.C})/@var{s.df}) * @var{s.normr}}.

When the third output, @var{mu}, is present the original data is centered
and scaled which can improve the numerical stability of the fit.  The
coefficients @var{p} are associated with a polynomial in

@code{@var{xhat} = (@var{x} - @var{mu}(1)) / @var{mu}(2)} @*
where @var{mu}(1) = mean (@var{x}), and @var{mu}(2) = std (@var{x}).

Example 1 : logical @var{n} and integer @var{n}

@example
@group
f = @@(x) x.^2 + 5;   # data-generating function
x = 0:5;
y = f (x);
## Fit data to polynomial A*x^3 + B*x^1
p = polyfit (x, y, logical ([1, 0, 1, 0]))
@xresult{} p = [ 0.0680, 0, 4.2444, 0 ]
## Fit data to polynomial using all terms up to x^3
p = polyfit (x, y, 3)
@xresult{} p = [ -4.9608e-17, 1.0000e+00, -1.6906e-15, 5.0000e+00 ]
@end group
@end example

Programming Note: If the desired polynomial degree @var{n} @geq{} number
of data points, the solution is not unique.  Instead, the fitting calculates
@code{@var{m} = numel (@var{x}) - 1} terms.  The return polynomial has
coefficients for @var{x}^@var{n}, @var{x}^@var{n}-1, @dots{},
@var{x}^@var{n}-@var{m}, and the constant term @var{x}^0, with all other
coefficients set to 0.
@seealso{polyval, polyaffine, roots, vander, zscore}
@end deftypefn
