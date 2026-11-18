# dblquad

```octave
function q = dblquad (f, xa, xb, ya, yb, tol = 1e-6, quadf = @quadcc, varargin)
```

@deftypefn  {} {@var{q} =} dblquad (@var{f}, @var{xa}, @var{xb}, @var{ya}, @var{yb})
@deftypefnx {} {@var{q} =} dblquad (@var{f}, @var{xa}, @var{xb}, @var{ya}, @var{yb}, @var{tol})
@deftypefnx {} {@var{q} =} dblquad (@var{f}, @var{xa}, @var{xb}, @var{ya}, @var{yb}, @var{tol}, @var{quadf})
@deftypefnx {} {@var{q} =} dblquad (@var{f}, @var{xa}, @var{xb}, @var{ya}, @var{yb}, @var{tol}, @var{quadf}, @dots{})
Numerically evaluate the double integral of @var{f}.

@var{f} is a function handle, inline function, or string containing the name
of the function to evaluate.  The function @var{f} must have the form
@math{z = f(x,y)} where @var{x} is a vector and @var{y} is a scalar.  It
should return a vector of the same length and orientation as @var{x}.

@var{xa}, @var{ya} and @var{xb}, @var{yb} are the lower and upper limits of
integration for x and y respectively.  The underlying integrator determines
whether infinite bounds are accepted.

The optional argument @var{tol} defines the absolute tolerance used to
integrate each sub-integral.  The default value is 1e-6.

The optional argument @var{quadf} specifies which underlying integrator
function to use.  Any choice but @code{quad} is available and the default
is @code{quadcc}.

Additional arguments, are passed directly to @var{f}.  To use the default
value for @var{tol} or @var{quadf} one may pass @qcode{':'} or an empty
matrix ([]).
@seealso{integral2, integral3, triplequad, quad, quadv, quadl, quadgk,
         quadcc, trapz}
@end deftypefn
