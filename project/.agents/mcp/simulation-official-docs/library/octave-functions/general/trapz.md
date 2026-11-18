# trapz

```octave
function z = trapz (x, y, dim)
```

@deftypefn  {} {@var{q} =} trapz (@var{y})
@deftypefnx {} {@var{q} =} trapz (@var{x}, @var{y})
@deftypefnx {} {@var{q} =} trapz (@dots{}, @var{dim})

Numerically evaluate the integral of points @var{y} using the trapezoidal
method.

@w{@code{trapz (@var{y})}}@ computes the integral of @var{y} along the first
non-singleton dimension.  When the argument @var{x} is omitted an equally
spaced @var{x} vector with unit spacing (1) is assumed.
@code{trapz (@var{x}, @var{y})} evaluates the integral with respect to the
spacing in @var{x} and the values in @var{y}.  This is useful if the points
in @var{y} have been sampled unevenly.

If the optional @var{dim} argument is given, operate along this dimension.

Application Note: If @var{x} is not specified then unit spacing will be
used.  To scale the integral to the correct value you must multiply by the
actual spacing value (deltaX).  As an example, the integral of @math{x^3}
over the range [0, 1] is @math{x^4/4} or 0.25.  The following code uses
@code{trapz} to calculate the integral in three different ways.

@example
@group
x = 0:0.1:1;
y = x.^3;
## No scaling
q = trapz (y)
  @xresult{} q = 2.5250
## Approximation to integral by scaling
q * 0.1
  @xresult{} 0.25250
## Same result by specifying @var{x}
trapz (x, y)
  @xresult{} 0.25250
@end group
@end example

@seealso{cumtrapz}
@end deftypefn
