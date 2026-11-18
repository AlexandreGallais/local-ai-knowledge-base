# sinpi

```octave
function y = sinpi (x)
```

@deftypefn {} {@var{y} =} sinpi (@var{x})
Compute sine (@var{x} * pi) for each element of @var{x} accurately.

The ordinary @code{sin} function uses IEEE@tie{}754 floating point numbers
and may produce results that are very close (within a few eps) of the
correct value, but which are not exact.  The @code{sinpi} function is more
accurate and returns 0 exactly for integer values of @var{x} and +1/-1 for
half-integer values (e.g., @dots{}, -3/2, -1/2, 1/2, 3/2, @dots{}).

Example @*
comparison of @code{sin} and @code{sinpi} for integer values of @var{x}

@example
@group
sin ([0, 1, 2, 3] * pi)
@xresult{}
     0   1.2246e-16  -2.4493e-16   3.6739e-16

sinpi ([0, 1, 2, 3])
@xresult{}
       0   0   0   0
@end group
@end example

@seealso{cospi, sin}
@end deftypefn
