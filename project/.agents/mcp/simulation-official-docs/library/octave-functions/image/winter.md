# winter

```octave
function map = winter (n)
```

@deftypefn  {} {@var{map} =} winter ()
@deftypefnx {} {@var{map} =} winter (@var{n})
Create color colormap.  This colormap varies from blue to green.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
