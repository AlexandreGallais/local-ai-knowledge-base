# hot

```octave
function map = hot (n)
```

@deftypefn  {} {@var{map} =} hot ()
@deftypefnx {} {@var{map} =} hot (@var{n})
Create color colormap.  This colormap ranges from black through dark red,
red, orange, yellow, to white.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
