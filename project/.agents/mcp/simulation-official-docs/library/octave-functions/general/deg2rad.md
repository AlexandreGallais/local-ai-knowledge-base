# deg2rad

```octave
function rad = deg2rad (deg)
```

@deftypefn {} {@var{rad} =} deg2rad (@var{deg})

Convert degrees to radians.

The input @var{deg} must be a scalar, vector, or N-dimensional array of
double or single floating point values.  @var{deg} may be complex in which
case the real and imaginary components are converted separately.

The output @var{rad} is the same size and shape as @var{deg} with degrees
converted to radians using the conversion constant @code{pi/180}.

Example:

@example
@group
deg2rad ([0, 90, 180, 270, 360])
  @xresult{}  0.00000   1.57080   3.14159   4.71239   6.28319
@end group
@end example
@seealso{rad2deg}
@end deftypefn
