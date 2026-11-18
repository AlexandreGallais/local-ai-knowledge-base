# polygcd

```octave
function x = polygcd (b, a, tol)
```

@deftypefn  {} {@var{q} =} polygcd (@var{b}, @var{a})
@deftypefnx {} {@var{q} =} polygcd (@var{b}, @var{a}, @var{tol})

Find the greatest common divisor of two polynomials.

This is equivalent to the polynomial found by multiplying together all the
common roots.  Together with deconv, you can reduce a ratio of two
polynomials.

The tolerance @var{tol} defaults to @code{sqrt (eps)}.

@strong{Caution:} This is a numerically unstable algorithm and should not
be used on large polynomials.

Example code:

@example
@group
polygcd (poly (1:8), poly (3:12)) - poly (3:8)
@xresult{} [ 0, 0, 0, 0, 0, 0, 0 ]
deconv (poly (1:8), polygcd (poly (1:8), poly (3:12))) - poly (1:2)
@xresult{} [ 0, 0, 0 ]
@end group
@end example
@seealso{poly, roots, conv, deconv, residue}
@end deftypefn
