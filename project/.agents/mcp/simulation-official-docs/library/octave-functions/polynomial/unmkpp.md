# unmkpp

```octave
function [x, P, n, k, d] = unmkpp (pp)
```

@deftypefn {} {[@var{x}, @var{p}, @var{n}, @var{k}, @var{d}] =} unmkpp (@var{pp})

Extract the components of a piecewise polynomial structure @var{pp}.

This function is the inverse of @code{mkpp}: it extracts the inputs to
@code{mkpp} needed to create the piecewise polynomial structure @var{pp}.
The code below makes this relation explicit:

@example
@group
[breaks, coefs, numinter, order, dim] = unmkpp (pp);
pp2  = mkpp (breaks, coefs, dim);
@end group
@end example

The piecewise polynomial structure @code{pp2} obtained in this way, is
identical to the original @code{pp}.  The same can be obtained by directly
accessing the fields of the structure @code{pp}.

The components are:

@table @asis
@item @var{x}
Sample points or breaks.

@item @var{p}
Polynomial coefficients for points in sample interval.
@code{@var{p}(@var{i}, :)} contains the coefficients for the polynomial
over interval @var{i} ordered from highest to lowest degree.
If @code{@var{d} > 1}, then @var{p} is a matrix of size
@code{[@var{n}*prod(@var{d}) @var{m}]}, where the
@code{@var{i} + (1:@var{d})} rows are the coefficients of all the @var{d}
polynomials in the interval @var{i}.

@item @var{n}
Number of polynomial pieces or intervals,
@code{@var{n} = length (@var{x}) - 1}.

@item @var{k}
Order of the polynomial plus 1.

@item @var{d}
Number of polynomials defined for each interval.
@end table

@seealso{mkpp, ppval, spline, pchip}
@end deftypefn
