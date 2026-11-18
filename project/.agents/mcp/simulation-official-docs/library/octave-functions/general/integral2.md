# integral2

```octave
function [q, err] = integral2 (f, xa, xb, ya, yb, varargin)
```

@deftypefn  {} {@var{q} =} integral2 (@var{f}, @var{xa}, @var{xb}, @var{ya}, @var{yb})
@deftypefnx {} {@var{q} =} integral2 (@var{f}, @var{xa}, @var{xb}, @var{ya}, @var{yb}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {[@var{q}, @var{err}] =} integral2 (@dots{})

Numerically evaluate the two-dimensional integral of @var{f} using adaptive
quadrature over the two-dimensional domain defined by @var{xa}, @var{xb},
@var{ya}, @var{yb} (scalars may be finite or infinite).  Additionally,
@var{ya} and @var{yb} may be scalar functions of @var{x}, allowing for
integration over non-rectangular domains.

@var{f} is a function handle, inline function, or string containing the
name of the function to evaluate.  The function @var{f} must be of the form
@math{z = f(x,y)}, and all operations must be vectorized such that @var{x}
and @var{y} accept array inputs and return array outputs of the same size.
(It can be assumed that @var{x} and @var{y} will either be same-size arrays
or one will be a scalar.)  The underlying integrators will input arrays of
integration points into @var{f} and/or use internal vector expansions to
speed computation that can produce unpredictable results if @var{f} is not
restricted to elementwise operations.  For integrands where this is
unavoidable, the @qcode("Vectorized") option described below may produce
more reliable results.

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
integrands @math{f(x,y)} that have not been vectorized or only accept
scalar values of @var{x} or @var{y}.  The default value is @code{true}.
Note that this is achieved by wrapping @math{f(x,y)} with the function
@code{arrayfun}, which may significantly decrease computation speed.
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

Example 1 : integrate a rectangular region in x-y plane

@example
@group
@var{f} = @@(@var{x},@var{y}) 2*ones (size (@var{x}));
@var{q} = integral2 (@var{f}, 0, 1, 0, 1)
  @xresult{} @var{q} =  2
@end group
@end example

The result is a volume, which for this constant-value integrand, is just
@w{@code{@var{Length} * @var{Width} * @var{Height}}}.

Example 2 : integrate a triangular region in x-y plane

@example
@group
@var{f} = @@(@var{x},@var{y}) 2*ones (size (@var{x}));
@var{ymax} = @@(@var{x}) 1 - @var{x};
@var{q} = integral2 (@var{f}, 0, 1, 0, @var{ymax})
  @xresult{} @var{q} =  1
@end group
@end example

The result is a volume, which for this constant-value integrand
@w{@math{@var{f} = 2}}, is the Triangle Area x Height or
@w{@code{1/2 * @var{Base} * @var{Width} * @var{Height}}}.

Example 3 : integrate a non-vectorized function over a square region

@example
@group
@var{f} = @@(@var{x},@var{y}) sinc (@var{x}) * sinc (@var{y}));
@var{q} = integral2 (@var{f}, -1, 1, -1, 1)
  @xresult{} @var{q} =  12.328  (incorrect)
@var{q} = integral2 (@var{f}, -1, 1, -1, 1, "Vectorized", false)
  @xresult{} @var{q} =  1.390 (correct)
@var{f} = @@(@var{x},@var{y}) sinc (@var{x}) .* sinc (@var{y});
@var{q} = integral2 (@var{f}, -1, 1, -1, 1)
  @xresult{} @var{q} =  1.390  (correct)
@end group
@end example

The first result is incorrect as the non-elementwise operator between the
sinc functions in @var{f} create unintended matrix multiplications between
the internal integration arrays used by @code{integral2}.  In the second
result, setting @qcode{"Vectorized"} to false forces @code{integral2} to
perform scalar internal operations to compute the integral, resulting in
the correct numerical result at the cost of about a 20x increase in
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

@seealso{quad2d, dblquad, integral, quad, quadgk, quadv, quadl, quadcc,
         trapz, integral3, triplequad}
@end deftypefn
