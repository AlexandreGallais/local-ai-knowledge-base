# rainbow

```octave
function map = rainbow (n)
```

@deftypefn  {} {@var{map} =} rainbow ()
@deftypefnx {} {@var{map} =} rainbow (@var{n})
Create color colormap.  This colormap ranges from red through orange,
yellow, green, blue, to violet.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
