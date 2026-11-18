# gray

```octave
function map = gray (n)
```

@deftypefn  {} {@var{map} =} gray ()
@deftypefnx {} {@var{map} =} gray (@var{n})
Create gray colormap.  This colormap varies from black to white with shades
of gray.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
