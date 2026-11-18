# flag

```octave
function map = flag (n)
```

@deftypefn  {} {@var{map} =} flag ()
@deftypefnx {} {@var{map} =} flag (@var{n})
Create color colormap.  This colormap cycles through red, white, blue, and
black with each index change.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
