# cumtrapz

```octave
function z = cumtrapz (x, y, dim)
```

@deftypefn  {} {@var{q} =} cumtrapz (@var{y})
@deftypefnx {} {@var{q} =} cumtrapz (@var{x}, @var{y})
@deftypefnx {} {@var{q} =} cumtrapz (@dots{}, @var{dim})
Cumulative numerical integration of points @var{y} using the trapezoidal
method.

@w{@code{cumtrapz (@var{y})}}@ computes the cumulative integral of @var{y}
along the first non-singleton dimension.  Where @code{trapz} reports only
the overall integral sum, @code{cumtrapz} reports the current partial sum
value at each point of @var{y}.

When the argument @var{x} is omitted an equally spaced @var{x} vector with
unit spacing (1) is assumed.  @code{cumtrapz (@var{x}, @var{y})} evaluates
the integral with respect to the spacing in @var{x} and the values in
@var{y}.  This is useful if the points in @var{y} have been sampled
unevenly.

If the optional @var{dim} argument is given, operate along this dimension.

Application Note: If @var{x} is not specified then unit spacing will be
used.  To scale the integral to the correct value you must multiply by the
actual spacing value (deltaX).
@seealso{trapz, cumsum}
@end deftypefn
