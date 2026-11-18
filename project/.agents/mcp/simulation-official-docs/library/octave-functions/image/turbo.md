# turbo

```octave
function map = turbo (n)
```

@deftypefn  {} {@var{map} =} turbo ()
@deftypefnx {} {@var{map} =} turbo (@var{n})
Create color colormap.  This colormap ranges from dark blue through green
to dark red; similar to the outdated @code{jet} colormap but perceptually
uniform.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.
@seealso{colormap}
@end deftypefn
