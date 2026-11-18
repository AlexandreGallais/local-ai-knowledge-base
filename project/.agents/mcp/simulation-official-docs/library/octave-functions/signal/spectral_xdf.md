# spectral_xdf

```octave
function sde = spectral_xdf (x, win, b)
```

@deftypefn  {} {@var{sde} =} spectral_xdf (@var{x})
@deftypefnx {} {@var{sde} =} spectral_xdf (@var{x}, @var{win})
@deftypefnx {} {@var{sde} =} spectral_xdf (@var{x}, @var{win}, @var{b})
Return the spectral density estimator given a data vector @var{x}, window
name @var{win}, and bandwidth, @var{b}.

The window name, e.g., @qcode{"triangle"} or @qcode{"rectangle"} is used to
search for a function called @code{@var{win}_sw}.

If @var{win} is omitted, the triangle window is used.

If @var{b} is omitted, @code{1 / sqrt (length (@var{x}))} is used.
@seealso{spectral_adf}
@end deftypefn
