# lines

```octave
function map = lines (n)
```

@deftypefn  {} {@var{map} =} lines ()
@deftypefnx {} {@var{map} =} lines (@var{n})
Create color colormap.  This colormap is composed of the list of colors
in the current axes @qcode{"ColorOrder"} property.  The default is blue,
orange, yellow, purple, green, light blue, and dark red.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
