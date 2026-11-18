# triplequad

```octave
function q = triplequad (f, xa, xb, ya, yb, za, zb, tol = 1e-6, quadf = @quadcc, varargin)
```

@deftypefn  {} {@var{q} =} triplequad (@var{f}, @var{xa}, @var{xb}, @var{ya}, @var{yb}, @var{za}, @var{zb})
@deftypefnx {} {@var{q} =} triplequad (@var{f}, @var{xa}, @var{xb}, @var{ya}, @var{yb}, @var{za}, @var{zb}, @var{tol})
@deftypefnx {} {@var{q} =} triplequad (@var{f}, @var{xa}, @var{xb}, @var{ya}, @var{yb}, @var{za}, @var{zb}, @var{tol}, @var{quadf})
@deftypefnx {} {@var{q} =} triplequad (@var{f}, @var{xa}, @var{xb}, @var{ya}, @var{yb}, @var{za}, @var{zb}, @var{tol}, @var{quadf}, @dots{})
Numerically evaluate the triple integral of @var{f}.

@var{f} is a function handle, inline function, or string containing the name
of the function to evaluate.  The function @var{f} must have the form
@math{w = f(x,y,z)} where either @var{x} or @var{y} is a vector and the
remaining inputs are scalars.  It should return a vector of the same length
and orientation as @var{x} or @var{y}.

@var{xa}, @var{ya}, @var{za} and @var{xb}, @var{yb}, @var{zb} are the lower
and upper limits of integration for x, y, and z respectively.  The
underlying integrator determines whether infinite bounds are accepted.

The optional argument @var{tol} defines the absolute tolerance used to
integrate each sub-integral.  The default value is 1e-6.

The optional argument @var{quadf} specifies which underlying integrator
function to use.  Any choice but @code{quad} is available and the default
is @code{quadcc}.

Additional arguments, are passed directly to @var{f}.  To use the default
value for @var{tol} or @var{quadf} one may pass @qcode{':'} or an empty
matrix ([]).
@seealso{integral3, integral2, dblquad, quad, quadv, quadl, quadgk, quadcc,
         trapz}
@end deftypefn
