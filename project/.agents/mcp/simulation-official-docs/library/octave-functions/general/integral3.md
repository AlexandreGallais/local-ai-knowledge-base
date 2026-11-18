# integral3

```octave
function q = integral3 (f, xa, xb, ya, yb, za, zb, varargin)
```

@deftypefn  {} {@var{q} =} integral3 (@var{f}, @var{xa}, @var{xb}, @var{ya}, @var{yb}, @var{za}, @var{zb})
@deftypefnx {} {@var{q} =} integral3 (@var{f}, @var{xa}, @var{xb}, @var{ya}, @var{yb}, @var{za}, @var{zb}, @var{prop}, @var{val}, @dots{})

Numerically evaluate the three-dimensional integral of @var{f} using
adaptive quadrature over the three-dimensional domain defined by
@var{xa}, @var{xb}, @var{ya}, @var{yb}, @var{za}, @var{zb} (scalars may
be finite or infinite).  Additionally, @var{ya} and @var{yb} may be
scalar functions of @var{x} and @var{za}, and @var{zb} maybe be scalar
functions of @var{x} and @var{y}, allowing for integration over
non-rectangular domains.

@var{f} is a function handle, inline function, or string containing the
name of the function to evaluate.  The function @var{f} must be of the form
@math{z = f(x,y,z)}, and all operations must be vectorized such that
@var{x}, @var{y}, and @var{z} accept array inputs and return array outputs
of the same size.  (It can be assumed that @var{x}, @var{y}, and @var{z}
will either be same-size arrays or scalars.)  The underlying integrators
will input arrays of integration points into @var{f} and/or use internal
vector expansions to speed computation that can produce unpredictable
results if @var{f} is not restricted to elementwise operations.  For
integrands where this is unavoidable, the @qcode("Vectorized") option
described below may produce more reliable results.

Additional optional parameters can be specified using
@qcode{"@var{property}", @var{value}} pairs.  Valid properties are:

@table @code
@item AbsTol
Define the absolute error tolerance for the quadrature.  The default
value is 1e-10 (1e-5 for single).

@item RelTol
Define the relative error tolerance for the quadrature.  The default
value is 1e-6 (1e-4 for single).

@item Method
Specify the two-dimensional integration method to be used, with valid
options being @qcode{"auto"} (default), @qcode{"tiled"}, or
@qcode{"iterated"}.  When using @qcode{"auto"}, Octave will choose the
@qcode{"tiled"} method unless any of the integration limits are infinite.

@item Vectorized
Enable or disable vectorized integration.  A value of @code{false} forces
Octave to use only scalar inputs when calling the integrand, which enables
integrands @math{f(x,y,z)} that have not been vectorized or only accept
scalar values of @var{x}, @var{y}, or @var{z}.  The default value is
@code{true}.  Note that this is achieved by wrapping @math{f(x,y,z)} with
the function @code{arrayfun}, which may significantly decrease computation
speed.
@end table

Adaptive quadrature is used to minimize the estimate of error until the
following is satisfied:
@tex
$$error \leq \max \left( AbsTol, RelTol\cdot\vert q\vert \right)$$
@end tex
@ifnottex

@example
@group
        @var{error} <= max (@var{AbsTol}, @var{RelTol}*|@var{q}|)
@end group
@end example

@end ifnottex

@var{err} is an approximate bound on the error in the integral
@code{abs (@var{q} - @var{I})}, where @var{I} is the exact value of the
integral.

Example 1 : integrate over a rectangular volume

@example
@group
@var{f} = @@(@var{x},@var{y},@var{z}) ones (size (@var{x}));
@var{q} = integral3 (@var{f}, 0, 1, 0, 1, 0, 1)
  @xresult{} @var{q} =  1.00000
@end group
@end example

For this constant-value integrand, the result is a volume which is just
@code{@var{Length} * @var{Width} * @var{Height}}.

Example 2 : integrate over a spherical volume

@example
@group
@var{f} = @@(@var{x},@var{y}) ones (size (@var{x}));
@var{ymax} = @@(@var{x}) sqrt (1 - @var{x}.^2);
@var{zmax} = @@(@var{x},@var{y}) sqrt (1 - @var{x}.^2 - @var{y}.^2);
@var{q} = integral3 (@var{f}, 0, 1, 0, @var{ymax}, 0, @var{zmax})
  @xresult{} @var{q} =  0.52360
@end group
@end example

For this constant-value integrand, the result is a volume which is 1/8th
of a unit sphere or @code{1/8 * 4/3 * pi}.

Example 3 : integrate a non-vectorized function over a cubic volume

@example
@group
@var{f} = @@(@var{x},@var{y}) sinc (@var{x}) * sinc (@var{y}), * sinc (@var{z});
@var{q} = integral3 (@var{f}, -1, 1, -1, 1, -1, 1)
  @xresult{} @var{q} =  14.535  (incorrect)
@var{q} = integral3 (@var{f}, -1, 1, -1, 1, -1, 1, "Vectorized", false)
  @xresult{} @var{q} =  1.6388 (correct)
@var{f} = @@(@var{x},@var{y},@var{z}) sinc (@var{x}) .* sinc (@var{y}), .* sinc (@var{z});
@var{q} = integral3 (@var{f}, -1, 1, -1, 1, -1, 1)
  @xresult{} @var{q} =  1.6388  (correct)
@end group
@end example

The first result is incorrect as the non-elementwise operator between the
sinc functions in @var{f} create unintended matrix multiplications between
the internal integration arrays used by @code{integral3}.  In the second
result, setting @qcode{"Vectorized"} to false forces @code{integral3} to
perform scalar internal operations to compute the integral, resulting in
the correct numerical result at the cost of about a 30x increase in
computation time.  In the third result, vectorizing the integrand @var{f}
using the elementwise multiplication operator gets the correct result
without increasing computation time.

Programming Notes: If there are singularities within the integration region
it is best to split the integral and place the singularities on the
boundary.

Known @sc{matlab} incompatibility: If tolerances are left unspecified, and
any integration limits are of type @code{single}, then Octave's integral
functions automatically reduce the default absolute and relative error
tolerances as specified above.  If tighter tolerances are desired they
must be specified.  @sc{matlab} leaves the tighter tolerances appropriate
for @code{double} inputs in place regardless of the class of the
integration limits.

Reference: @nospell{L.F. Shampine},
"@sc{matlab} program for quadrature in 2D",
@cite{Applied Mathematics and Computation}, @w{Vol.@: 1},
@w{pp.@: 266}--274, 2008.

@seealso{triplequad, integral, quad, quadgk, quadv, quadl,
         quadcc, trapz, integral2, quad2d, dblquad}
@end deftypefn
