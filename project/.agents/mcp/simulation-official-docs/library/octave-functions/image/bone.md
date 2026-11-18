# bone

```octave
function map = bone (n)
```

@deftypefn  {} {@var{map} =} bone ()
@deftypefnx {} {@var{map} =} bone (@var{n})
Create color colormap.  This colormap varies from black to white with
gray-blue shades.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
