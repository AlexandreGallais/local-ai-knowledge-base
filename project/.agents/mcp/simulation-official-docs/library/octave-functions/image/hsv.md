# hsv

```octave
function map = hsv (n)
```

@deftypefn  {} {@var{map} =} hsv ()
@deftypefnx {} {@var{map} =} hsv (@var{n})
Create color colormap.  This colormap begins with red, changes through
yellow, green, cyan, blue, and magenta, before returning to red.

It is useful for displaying periodic functions.  The map is obtained by
linearly varying the hue through all possible values while keeping constant
maximum saturation and value.  The equivalent code is
@code{hsv2rgb ([(0:N-1)'/N, ones(N,2)])}.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
