# quadv

```octave
function [q, nfev] = quadv (f, a, b, tol = [], trace = false, varargin)
```

@deftypefn  {} {@var{q} =} quadv (@var{f}, @var{a}, @var{b})
@deftypefnx {} {@var{q} =} quadv (@var{f}, @var{a}, @var{b}, @var{tol})
@deftypefnx {} {@var{q} =} quadv (@var{f}, @var{a}, @var{b}, @var{tol}, @var{trace})
@deftypefnx {} {@var{q} =} quadv (@var{f}, @var{a}, @var{b}, @var{tol}, @var{trace}, @var{p1}, @var{p2}, @dots{})
@deftypefnx {} {[@var{q}, @var{nfev}] =} quadv (@dots{})

Numerically evaluate the integral of @var{f} from @var{a} to @var{b}
using an adaptive Simpson's rule.

@var{f} is a function handle, inline function, or string containing the name
of the function to evaluate.  @code{quadv} is a vectorized version of
@code{quad} and the function defined by @var{f} must accept a scalar or
vector as input and return a scalar, vector, or array as output.

@var{a} and @var{b} are the lower and upper limits of integration.  Both
limits must be finite.

The optional argument @var{tol} defines the absolute tolerance used to stop
the adaptation procedure.  The default value is 1e-6.

The algorithm used by @code{quadv} involves recursively subdividing the
integration interval and applying Simpson's rule on each subinterval.
If @var{trace} is true then after computing each of these partial
integrals display: (1) the total number of function evaluations,
(2) the left end of the subinterval, (3) the length of the subinterval,
(4) the approximation of the integral over the subinterval.

Additional arguments @var{p1}, etc., are passed directly to the function
@var{f}.  To use default values for @var{tol} and @var{trace}, one may pass
empty matrices ([]).

The result of the integration is returned in @var{q}.

The optional output @var{nfev} indicates the total number of function
evaluations performed.

Note: @code{quadv} is written in Octave's scripting language and can be
used recursively in @code{dblquad} and @code{triplequad}, unlike the
@code{quad} function.
@seealso{quad, quadl, quadgk, quadcc, trapz, dblquad, triplequad, integral,
         integral2, integral3}
@end deftypefn
