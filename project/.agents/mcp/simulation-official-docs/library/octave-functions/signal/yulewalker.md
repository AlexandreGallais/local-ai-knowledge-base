# yulewalker

```octave
function [a, v] = yulewalker (c)
```

@deftypefn {} {[@var{a}, @var{v}] =} yulewalker (@var{c})
Fit an AR (p)-model with Yule-Walker estimates given a vector @var{c} of
autocovariances @code{[gamma_0, @dots{}, gamma_p]}.

Returns the AR coefficients, @var{a}, and the variance of white noise,
@var{v}.
@end deftypefn
