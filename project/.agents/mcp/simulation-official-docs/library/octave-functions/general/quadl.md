# quadl

```octave
function [q, nfev] = quadl (f, a, b, tol = [], trace = false, varargin)
```

@deftypefn  {} {@var{q} =} quadl (@var{f}, @var{a}, @var{b})
@deftypefnx {} {@var{q} =} quadl (@var{f}, @var{a}, @var{b}, @var{tol})
@deftypefnx {} {@var{q} =} quadl (@var{f}, @var{a}, @var{b}, @var{tol}, @var{trace})
@deftypefnx {} {@var{q} =} quadl (@var{f}, @var{a}, @var{b}, @var{tol}, @var{trace}, @var{p1}, @var{p2}, @dots{})
@deftypefnx {} {[@var{q}, @var{nfev}] =} quadl (@dots{})

Numerically evaluate the integral of @var{f} from @var{a} to @var{b} using
an adaptive @nospell{Lobatto} rule.

@var{f} is a function handle, inline function, or string containing the name
of the function to evaluate.  The function @var{f} must be vectorized and
return a vector of output values when given a vector of input values.

@var{a} and @var{b} are the lower and upper limits of integration.  Both
limits must be finite.

The optional argument @var{tol} defines the absolute tolerance with which
to perform the integration.  The default value is 1e-6.

The algorithm used by @code{quadl} involves recursively subdividing the
integration interval.  If @var{trace} is defined then for each subinterval
display: (1) the total number of function evaluations, (2) the left end of
the subinterval, (3) the length of the subinterval, (4) the approximation of
the integral over the subinterval.

Additional arguments @var{p1}, etc., are passed directly to the function
@var{f}.  To use default values for @var{tol} and @var{trace}, one may pass
empty matrices ([]).

The result of the integration is returned in @var{q}.

The optional output @var{nfev} indicates the total number of function
evaluations performed.

Reference: @nospell{W. Gander and W. Gautschi}, @cite{Adaptive Quadrature -
Revisited}, BIT @w{Vol.@: 40}, @w{No.@: 1}, March 2000, @w{pp.@: 84}--101.
@url{https://www.inf.ethz.ch/personal/gander/}
@seealso{quad, quadv, quadgk, quadcc, trapz, dblquad, triplequad, integral,
         integral2, integral3}
@end deftypefn
