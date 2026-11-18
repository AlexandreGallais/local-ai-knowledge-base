# pchip

```octave
function ret = pchip (x, y, xi)
```

@deftypefn  {} {@var{pp} =} pchip (@var{x}, @var{y})
@deftypefnx {} {@var{yi} =} pchip (@var{x}, @var{y}, @var{xi})
Return the Piecewise Cubic Hermite Interpolating Polynomial (pchip) of
points @var{x} and @var{y}.

If called with two arguments, return the piecewise polynomial @var{pp}
that may be used with @code{ppval} to evaluate the polynomial at specific
points.

When called with a third input argument, @code{pchip} evaluates the pchip
polynomial at the points @var{xi}.  The third calling form is equivalent to
@code{ppval (pchip (@var{x}, @var{y}), @var{xi})}.

The variable @var{x} must be a strictly monotonic vector (either increasing
or decreasing) of length @var{n}.

@var{y} can be either a vector or array.  If @var{y} is a vector then it
must be the same length @var{n} as @var{x}.  If @var{y} is an array then
the size of @var{y} must have the form
@tex
$$[s_1, s_2, \cdots, s_k, n]$$
@end tex
@ifnottex
@code{[@var{s1}, @var{s2}, @dots{}, @var{sk}, @var{n}]}
@end ifnottex
The array is reshaped internally to a matrix where the leading dimension is
given by
@tex
$$s_1 s_2 \cdots s_k$$
@end tex
@ifnottex
@code{@var{s1} * @var{s2} * @dots{} * @var{sk}}
@end ifnottex
and each row of this matrix is then treated separately.  Note that this is
exactly opposite to @code{interp1} but is done for @sc{matlab}
compatibility.

@seealso{spline, ppval, mkpp, unmkpp}
@end deftypefn
