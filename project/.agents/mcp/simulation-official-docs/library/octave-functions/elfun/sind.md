# sind

```octave
function y = sind (x)
```

@deftypefn {} {@var{y} =} sind (@var{x})
Compute the sine for each element of @var{x} in degrees.

The function is more accurate than @code{sin} for large values of @var{x}
and for multiples of 180 degrees (@code{@var{x}/180} is an integer) where
@code{sind} returns 0 rather than a small value on the order of eps.
@seealso{asind, sin}
@end deftypefn
