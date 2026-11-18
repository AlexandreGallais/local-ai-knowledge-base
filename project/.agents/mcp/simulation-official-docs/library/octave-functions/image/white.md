# white

```octave
function map = white (n)
```

@deftypefn  {} {@var{map} =} white ()
@deftypefnx {} {@var{map} =} white (@var{n})
Create color colormap.  This colormap is completely white.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
