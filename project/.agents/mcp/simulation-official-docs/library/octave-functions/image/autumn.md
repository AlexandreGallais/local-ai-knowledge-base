# autumn

```octave
function map = autumn (n)
```

@deftypefn  {} {@var{map} =} autumn ()
@deftypefnx {} {@var{map} =} autumn (@var{n})
Create color colormap.
This colormap ranges from red through orange to yellow.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
