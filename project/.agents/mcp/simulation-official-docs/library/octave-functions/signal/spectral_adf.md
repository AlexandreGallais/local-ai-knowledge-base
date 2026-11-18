# spectral_adf

```octave
function sde = spectral_adf (c, win, b)
```

@deftypefn  {} {@var{sde} =} spectral_adf (@var{c})
@deftypefnx {} {@var{sde} =} spectral_adf (@var{c}, @var{win})
@deftypefnx {} {@var{sde} =} spectral_adf (@var{c}, @var{win}, @var{b})
Return the spectral density estimator given a vector of autocovariances
@var{c}, window name @var{win}, and bandwidth, @var{b}.

The window name, e.g., @qcode{"triangle"} or @qcode{"rectangle"} is
used to search for a function called @code{@var{win}_lw}.

If @var{win} is omitted, the triangle window is used.

If @var{b} is omitted, @code{1 / sqrt (length (@var{x}))} is used.
@seealso{spectral_xdf}
@end deftypefn
