# prism

```octave
function map = prism (n)
```

@deftypefn  {} {@var{map} =} prism ()
@deftypefnx {} {@var{map} =} prism (@var{n})
Create color colormap.  This colormap cycles through red, orange, yellow,
green, blue and violet with each index change.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
