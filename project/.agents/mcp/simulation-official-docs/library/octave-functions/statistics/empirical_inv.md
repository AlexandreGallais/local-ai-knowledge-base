# empirical_inv

```octave
function q = empirical_inv (x, data)
```

@deftypefn {} {@var{q} =} empirical_inv (@var{x}, @var{data})
For each element of @var{x}, compute the quantile (the inverse of the CDF)
at @var{x} of the empirical distribution obtained from the
univariate sample @var{data}.
@end deftypefn
