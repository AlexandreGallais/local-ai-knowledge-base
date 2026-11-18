# synthesis

```octave
function x = synthesis (y, c)
```

@deftypefn {} {@var{x} =} synthesis (@var{y}, @var{c})
Compute a signal from its short-time Fourier transform @var{y} and a
3-element vector @var{c} specifying window size, increment, and window type.

The values @var{y} and @var{c} can be derived by

@example
[@var{y}, @var{c}] = stft (@var{x} , @dots{})
@end example
@seealso{stft}
@end deftypefn
