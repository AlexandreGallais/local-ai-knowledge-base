# cool

```octave
function map = cool (n)
```

@deftypefn  {} {@var{map} =} cool ()
@deftypefnx {} {@var{map} =} cool (@var{n})
Create color colormap.  The colormap varies from cyan to magenta.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
