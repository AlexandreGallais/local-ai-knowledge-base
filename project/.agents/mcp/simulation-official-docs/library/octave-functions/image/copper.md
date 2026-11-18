# copper

```octave
function map = copper (n)
```

@deftypefn  {} {@var{map} =} copper ()
@deftypefnx {} {@var{map} =} copper (@var{n})
Create color colormap.  This colormap varies from black to a light copper
tone.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
