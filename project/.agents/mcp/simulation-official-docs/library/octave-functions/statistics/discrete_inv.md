# discrete_inv

```octave
function q = discrete_inv (x, v, p)
```

@deftypefn {} {@var{q} =} discrete_inv (@var{x}, @var{v}, @var{p})
For each element of @var{x}, compute the quantile (the inverse of the CDF)
at @var{x} of the univariate distribution which assumes the values in
@var{v} with probabilities @var{p}.
@end deftypefn
