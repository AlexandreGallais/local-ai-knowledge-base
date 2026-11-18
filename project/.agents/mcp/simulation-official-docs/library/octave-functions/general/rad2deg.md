# rad2deg

```octave
function deg = rad2deg (rad)
```

@deftypefn {} {@var{deg} =} rad2deg (@var{rad})

Convert radians to degrees.

The input @var{rad} must be a scalar, vector, or N-dimensional array of
double or single floating point values.  @var{rad} may be complex in which
case the real and imaginary components are converted separately.

The output @var{deg} is the same size and shape as @var{rad} with radians
converted to degrees using the conversion constant @code{180/pi}.

Example:

@example
@group
rad2deg ([0, pi/2, pi, 3/2*pi, 2*pi])
  @xresult{}  0    90   180   270   360
@end group
@end example
@seealso{deg2rad}
@end deftypefn
