# viridis

```octave
function map = viridis (n)
```

@deftypefn  {} {@var{map} =} viridis ()
@deftypefnx {} {@var{map} =} viridis (@var{n})
Create color colormap.  This colormap ranges from dark purplish-blue through
blue, green, to yellow.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
