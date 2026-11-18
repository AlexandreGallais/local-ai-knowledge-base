# ocean

```octave
function map = ocean (n)
```

@deftypefn  {} {@var{map} =} ocean ()
@deftypefnx {} {@var{map} =} ocean (@var{n})
Create color colormap.  This colormap varies from black to white with shades
of blue.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
