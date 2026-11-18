# sinetone

```octave
function y = sinetone (freq, rate = 8000, sec = 1, ampl = 64)
```

@deftypefn {} {@var{y} =} sinetone (@var{freq}, @var{rate}, @var{sec}, @var{ampl})
Return a sinetone of frequency @var{freq} with a length of @var{sec}
seconds at sampling rate @var{rate} and with amplitude @var{ampl}.

The arguments @var{freq} and @var{ampl} may be vectors of common size.

The defaults are @var{rate} = 8000, @var{sec} = 1, and @var{ampl} = 64.
@seealso{sinewave}
@end deftypefn
