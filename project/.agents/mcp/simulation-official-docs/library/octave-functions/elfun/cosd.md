# cosd

```octave
function y = cosd (x)
```

@deftypefn {} {@var{y} =} cosd (@var{x})
Compute the cosine for each element of @var{x} in degrees.

The function is more accurate than @code{cos} for large values of @var{x}
and for multiples of 90 degrees (@code{@var{x} = 90 + 180*n} with n an
integer) where @code{cosd} returns 0 rather than a small value on the order
of eps.
@seealso{acosd, cos}
@end deftypefn
