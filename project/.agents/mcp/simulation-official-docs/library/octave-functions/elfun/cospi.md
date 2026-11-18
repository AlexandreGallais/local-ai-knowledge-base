# cospi

```octave
function y = cospi (x)
```

@deftypefn {} {@var{y} =} cospi (@var{x})
Compute cosine (@var{x} * pi) for each element of @var{x} accurately.

The ordinary @code{cos} function uses IEEE@tie{}754 floating point numbers
and may produce results that are very close (within a few eps) of the
correct value, but which are not exact.  The @code{cospi} function is more
accurate and returns 0 exactly for half-integer values of @var{x} (e.g.,
@dots{}, -3/2, -1/2, 1/2, 3/2, @dots{}), and +1/-1 for integer values.

Example @*
comparison of @code{cos} and @code{cospi} for half-integer values of @var{x}

@example
@group
cos ([-3/2, -1/2, 1/2, 3/2] * pi)
@xresult{}
     -1.8370e-16   6.1232e-17   6.1232e-17  -1.8370e-16

cospi ([-3/2, -1/2, 1/2, 3/2])
@xresult{}
       0   0   0   0
@end group
@end example

@seealso{sinpi, cos}
@end deftypefn
