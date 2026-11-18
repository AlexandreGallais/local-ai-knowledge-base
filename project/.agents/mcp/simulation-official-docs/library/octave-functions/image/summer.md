# summer

```octave
function map = summer (n)
```

@deftypefn  {} {@var{map} =} summer ()
@deftypefnx {} {@var{map} =} summer (@var{n})
Create color colormap.  This colormap varies from green to yellow.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
