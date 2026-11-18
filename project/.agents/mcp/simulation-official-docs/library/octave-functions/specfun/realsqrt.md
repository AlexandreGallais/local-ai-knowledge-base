# realsqrt

```octave
function y = realsqrt (x)
```

@deftypefn {} {@var{y} =} realsqrt (@var{x})
Return the real-valued square root of each element of @var{x}.

If any element results in a complex return value @code{realsqrt} aborts and
issues an error.
@seealso{sqrt, realpow, reallog}
@end deftypefn
