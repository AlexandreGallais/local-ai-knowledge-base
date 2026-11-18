# lcm

```octave
function l = lcm (varargin)
```

@deftypefn  {} {@var{l} =} lcm (@var{x}, @var{y})
@deftypefnx {} {@var{l} =} lcm (@var{x}, @var{y}, @dots{})
Compute the least common multiple of @var{x} and @var{y}, or of the list of
all arguments.

All inputs must be of the same size, or scalar.  All elements must be
real integer or Gaussian (complex) integer.  For complex inputs, the result
is unique only up to a phase factor (multiplication by +1, +i, -1, or -i),
and one of the four is returned arbitrarily.

Example code:

@example
@group
lcm (5:8, 9:12)
   @xresult{}  45  30  77  24
@end group
@end example

Programming tip: To find the LCM of all the elements of a single array, use
@code{num2cell} instead of nested calls or a loop:

@example
@group
x = 1:10;    # vector or array of inputs
lcm (num2cell (x) @{:@})
   @xresult{}     2520
@end group
@end example
@seealso{factor, gcd, isprime}
@end deftypefn
