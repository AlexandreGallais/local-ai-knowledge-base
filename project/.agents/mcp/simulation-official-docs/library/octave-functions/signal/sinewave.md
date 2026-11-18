# sinewave

```octave
function y = sinewave (m, n, d = 0)
```

@deftypefn {} {@var{y} =} sinewave (@var{m}, @var{n}, @var{d})
Return an @var{m}-element vector with @var{i}-th element given by
@code{sin (2 * pi * (@var{i}+@var{d}-1) / @var{n})}.

The default value for @var{d} is 0 and the default value for @var{n} is
@var{m}.
@seealso{sinetone}
@end deftypefn
