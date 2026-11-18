# integral

```octave
function [q, err] = integral (f, a, b, varargin)
```

@deftypefn  {} {@var{q} =} integral (@var{f}, @var{a}, @var{b})
@deftypefnx {} {@var{q} =} integral (@var{f}, @var{a}, @var{b}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {[@var{q}, @var{err}] =} integral (@dots{})

Numerically evaluate the integral of @var{f} from @var{a} to @var{b} using
adaptive quadrature.

@code{integral} is a wrapper for @code{quadcc} (general real-valued, scalar
integrands and limits), and @code{quadgk} (integrals with specified
integration paths and array-valued integrands) that is intended to provide
@sc{matlab} compatibility.  More control of the numerical integration may be
achievable by calling the various quadrature functions directly.

@var{f} is a function handle, inline function, or string containing the name
of the function to evaluate.  The function @var{f} must be vectorized and
return a vector of output values when given a vector of input values.

@var{a} and @var{b} are the lower and upper limits of integration.  Either
or both limits may be infinite or contain weak end singularities.  If either
or both limits are complex, @code{integral} will perform a straight line
path integral.  Alternatively, a complex domain path can be specified using
the @qcode{"Waypoints"} option (see below).

Additional optional parameters can be specified using
@qcode{"@var{property}", @var{value}} pairs.  Valid properties are:

@table @code
@item Waypoints
Specifies points to be used in defining subintervals of the quadrature
algorithm, or if @var{a}, @var{b}, or @var{waypoints} are complex then
the quadrature is calculated as a contour integral along a piecewise
continuous path.  For more detail, @pxref{XREFquadgk,,@code{quadgk}}.

@item ArrayValued
@code{integral} expects @var{f} to return a scalar value unless
@var{arrayvalued} is specified as true.  This option will cause
@code{integral} to perform the integration over the entire array and return
@var{q} with the same dimensions as returned by @var{f}.  For more detail
@pxref{XREFquadgk,,@code{quadgk}}.

@item AbsTol
Define the absolute error tolerance for the quadrature.  The default
absolute tolerance is 1e-10 (1e-5 for single).

@item RelTol
Define the relative error tolerance for the quadrature.  The default
relative tolerance is 1e-6 (1e-4 for single).
@end table

The optional output @var{err} contains the absolute error estimate used by
the called integrator.

Adaptive quadrature is used to minimize the estimate of error until the
following is satisfied:
@tex
$$error \leq \max \left( AbsTol, RelTol\cdot\vert q\vert \right)$$
@end tex
@ifnottex

@example
@group
  @var{error} <= max (@var{AbsTol}, @var{RelTol}*|@var{q}|).
@end group
@end example

@end ifnottex

Known @sc{matlab} incompatibilities:

@enumerate
@item
If tolerances are left unspecified, and any integration limits or waypoints
are of type @code{single}, then Octave's integral functions automatically
reduce the default absolute and relative error tolerances as specified
above.  If tighter tolerances are desired they must be specified.
@sc{matlab} leaves the tighter tolerances appropriate for @code{double}
inputs in place regardless of the class of the integration limits.
@end enumerate

@seealso{integral2, integral3, quad, quadgk, quadv, quadl, quadcc, trapz,
         dblquad, triplequad}
@end deftypefn
