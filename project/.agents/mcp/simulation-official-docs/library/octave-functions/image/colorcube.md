# colorcube

```octave
function map = colorcube (n)
```

@deftypefn  {} {@var{map} =} colorcube ()
@deftypefnx {} {@var{map} =} colorcube (@var{n})
Create color colormap.  This colormap is composed of as many equally
spaced colors (not grays) in the RGB color space as possible.

If there are not a perfect number @var{n} of regularly spaced colors then
the remaining entries in the colormap are gradients of pure red, green,
blue, and gray.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
