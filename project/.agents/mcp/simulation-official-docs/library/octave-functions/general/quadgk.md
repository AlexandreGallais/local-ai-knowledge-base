# quadgk

```octave
function [q, err] = quadgk (f, a, b, varargin)
```

@deftypefn  {} {@var{q} =} quadgk (@var{f}, @var{a}, @var{b})
@deftypefnx {} {@var{q} =} quadgk (@var{f}, @var{a}, @var{b}, @var{abstol})
@deftypefnx {} {@var{q} =} quadgk (@var{f}, @var{a}, @var{b}, @var{abstol}, @var{trace})
@deftypefnx {} {@var{q} =} quadgk (@var{f}, @var{a}, @var{b}, "@var{prop}", @var{val}, @dots{})
@deftypefnx {} {[@var{q}, @var{err}] =} quadgk (@dots{})

Numerically evaluate the integral of @var{f} from @var{a} to @var{b}
using adaptive @nospell{Gauss-Kronrod} quadrature.

@var{f} is a function handle, inline function, or string containing the name
of the function to evaluate.  The function @var{f} must be vectorized and
return a vector of output values when given a vector of input values (See
property @qcode{"ArrayValued"} for an exception to this rule).

@var{a} and @var{b} are the lower and upper limits of integration.  Either
or both limits may be infinite or contain weak end singularities.  Variable
transformation will be used to treat any infinite intervals and weaken the
singularities.  For example:

@example
quadgk (@@(x) 1 ./ (sqrt (x) .* (x + 1)), 0, Inf)
@end example

@noindent
Note that the formulation of the integrand uses the element-by-element
operator @code{./} and all user functions to @code{quadgk} should do the
same.

The optional argument @var{abstol} defines the absolute tolerance used to
stop the integration procedure.  The default value is 1e-10 (1e-5 for
single).

The algorithm used by @code{quadgk} involves subdividing the integration
interval and evaluating each subinterval.  If @var{trace} is true then after
computing each of these partial integrals display: (1) the number of
subintervals at this step, (2) the current estimate of the error @var{err},
(3) the current estimate for the integral @var{q}.

The behavior of the algorithm can be configured by passing arguments to
@code{quadgk} as pairs @qcode{"@var{prop}", @var{val}}.  Valid properties
are

@table @code
@item AbsTol
Define the absolute error tolerance for the quadrature.  The default
absolute tolerance is 1e-10 (1e-5 for single).

@item RelTol
Define the relative error tolerance for the quadrature.  The default
relative tolerance is 1e-6 (1e-4 for single).

@item ArrayValued
When set to true, the function @var{f} produces an array output for a scalar
input.  The default is false which requires that @var{f} produce an output
that is the same size as the input.  For example,

@example
quadgk (@@(x) x .^ (1:5), 0, 2, "ArrayValued", 1)
@end example

@noindent
will integrate @code{[x.^1, x.^2, x.^3, x.^4, x.^5]} in one function call
rather than having to repeatedly define a single anonymous function and
use a normal invocation of @code{quadgk}.

@item WayPoints
Specify points which will become endpoints for subintervals in the
algorithm which can result in significantly improved estimation of the error
in the integral, faster computation, or both.  It can be useful to specify
more subintervals around a region where the integrand is rapidly changing or
to flag locations where there is a discontinuity in the first derivative
of the function.  For example, the signum function has a discontinuity at
@code{x == 0} and by specifying a waypoint

@example
quadgk (@@(x) sign (x), -0.5, 1, "Waypoints", [0])
@end example

@noindent
the error bound is reduced from 4e-7 to 1e-13.

If the function has @strong{singularities} within the region of integration
those should not be addressed with waypoints.  Instead, the overall integral
should be decomposed into a sum of several smaller integrals such that the
singularity occurs as one of the bounds of integration in the call to
@code{quadgk}.

If any of the waypoints are complex then contour integration is performed as
documented below.

@item MaxIntervalCount
@code{quadgk} initially subdivides the interval on which to perform the
quadrature into 10 intervals or, if WayPoints are given, at each waypoint.
Subintervals that have an unacceptable error are subdivided and
re-evaluated.  If the number of subintervals exceeds 650 subintervals at any
point then a poor convergence is signaled and the current estimate of the
integral is returned.  The property @qcode{"MaxIntervalCount"} can be used
to alter the number of subintervals that can exist before exiting.

@item Trace
If logically true @code{quadgk} prints information on the convergence of the
quadrature at each iteration.
@end table

If any of @var{a}, @var{b}, or @var{waypoints} is complex then the
quadrature is treated as a contour integral along a piecewise linear
path defined by
@code{[@var{a}, @var{waypoints}(1), @var{waypoints}(2), @dots{}, @var{b}]}.
In this case the integral is assumed to have no edge singularities.  For
example,

@example
@group
quadgk (@@(z) log (z), 1+1i, 1+1i, "WayPoints",
        [-1+1i, -1-1i, +1-1i])
@end group
@end example

@noindent
integrates @code{log (z)} along the square defined by
@code{[1+1i, -1+1i, -1-1i, +1-1i]}.

The result of the integration is returned in @var{q}.

@var{err} is an approximate bound on the error in the integral
@w{@code{abs (@var{q} - @var{I})}}, where @var{I} is the exact value of the
integral.  If the adaptive integration did not converge, the value of
@var{err} will be larger than the requested tolerance.  If only a single
output is requested then a warning will be emitted when the requested
tolerance is not met.  If the second output @var{err} is requested then no
warning is issued and it is the responsibility of the programmer to inspect
and determine whether the results are satisfactory.

Reference: @nospell{L.F. Shampine},
"Vectorized adaptive quadrature in @sc{matlab}",
@cite{Journal of Computational and Applied Mathematics}, @w{Vol.@: 211},
@w{Issue 2}, @w{pp.@: 131}--140, Feb 2008.

@seealso{quad, quadv, quadl, quadcc, trapz, dblquad, triplequad, integral,
         integral2, integral3}
@end deftypefn
