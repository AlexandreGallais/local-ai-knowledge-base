# spline

```octave
function ret = spline (x, y, xi)
```

@deftypefn  {} {@var{pp} =} spline (@var{x}, @var{y})
@deftypefnx {} {@var{yi} =} spline (@var{x}, @var{y}, @var{xi})
Return the cubic spline interpolant of points @var{x} and @var{y}.

When called with two arguments, return the piecewise polynomial @var{pp}
that may be used with @code{ppval} to evaluate the polynomial at specific
points.

When called with a third input argument, @code{spline} evaluates the spline
at the points @var{xi}.  The third calling form
@code{spline (@var{x}, @var{y}, @var{xi})} is equivalent to
@code{ppval (spline (@var{x}, @var{y}), @var{xi})}.

The variable @var{x} must be a vector of length @var{n}.

@var{y} can be either a vector or array.  If @var{y} is a vector it must
have a length of either @var{n} or @code{@var{n} + 2}.  If the length of
@var{y} is @var{n}, then the @qcode{"not-a-knot"} end condition is used.
If the length of @var{y} is @code{@var{n} + 2}, then the first and last
values of the vector @var{y} are the values of the first derivative of the
cubic spline at the endpoints.

If @var{y} is an array, then the size of @var{y} must have the form
@tex
$$[s_1, s_2, \cdots, s_k, n]$$
@end tex
@ifnottex
@code{[@var{s1}, @var{s2}, @dots{}, @var{sk}, @var{n}]}
@end ifnottex
or
@tex
$$[s_1, s_2, \cdots, s_k, n + 2].$$
@end tex
@ifnottex
@code{[@var{s1}, @var{s2}, @dots{}, @var{sk}, @var{n} + 2]}.
@end ifnottex
The array is reshaped internally to a matrix where the leading
dimension is given by
@tex
$$s_1 s_2 \cdots s_k$$
@end tex
@ifnottex
@code{@var{s1} * @var{s2} * @dots{} * @var{sk}}
@end ifnottex
and each row of this matrix is then treated separately.  Note that this is
exactly the opposite of @code{interp1} but is done for @sc{matlab}
compatibility.

@seealso{pchip, ppval, mkpp, unmkpp}
@end deftypefn
