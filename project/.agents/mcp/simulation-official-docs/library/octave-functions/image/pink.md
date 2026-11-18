# pink

```octave
function map = pink (n)
```

@deftypefn  {} {@var{map} =} pink ()
@deftypefnx {} {@var{map} =} pink (@var{n})
Create color colormap.  This colormap varies from black to white with
shades of gray-pink.

This colormap gives a sepia tone when used on grayscale images.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
