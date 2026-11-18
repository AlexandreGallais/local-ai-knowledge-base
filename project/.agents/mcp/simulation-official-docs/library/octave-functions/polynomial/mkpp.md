# mkpp

```octave
function pp = mkpp (breaks, coefs, d)
```

@deftypefn  {} {@var{pp} =} mkpp (@var{breaks}, @var{coefs})
@deftypefnx {} {@var{pp} =} mkpp (@var{breaks}, @var{coefs}, @var{d})

Construct a piecewise polynomial (pp) structure from sample points
@var{breaks} and coefficients @var{coefs}.

@var{breaks} must be a vector of strictly increasing values.  The number of
intervals is given by @code{@var{ni} = length (@var{breaks}) - 1}.

When @var{m} is the polynomial order @var{coefs} must be of size:
@w{@var{ni}-by-(@var{m} + 1)}.

The i-th row of @var{coefs}, @code{@var{coefs}(@var{i},:)}, contains the
coefficients for the polynomial over the @var{i}-th interval, ordered from
highest (@var{m}) to lowest (@var{0}) degree.

@var{coefs} may also be a multi-dimensional array, specifying a
vector-valued or array-valued polynomial.  In that case the polynomial
order @var{m} is defined by the length of the last dimension of @var{coefs}.
The size of first dimension(s) are given by the scalar or vector @var{d}.
If @var{d} is not given it is set to @code{1}.  In this case
@code{@var{p}(@var{r}, @var{i}, :)} contains the coefficients for the
@var{r}-th polynomial defined on interval @var{i}.  In any case @var{coefs}
is reshaped to a 2-D matrix of size @code{[@var{ni}*prod(@var{d}) @var{m}]}.

Programming Note: @code{ppval} evaluates polynomials at
@code{@var{xi} - @var{breaks}(i)}, i.e., it subtracts the lower endpoint of
the current interval from @var{xi}.  This must be taken into account when
creating piecewise polynomials objects with @code{mkpp}.
@seealso{unmkpp, ppval, spline, pchip, ppder, ppint, ppjumps}
@end deftypefn
