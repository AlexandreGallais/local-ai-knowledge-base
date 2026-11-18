# polyint

```octave
function q = polyint (p, k)
```

@deftypefn  {} {@var{q} =} polyint (@var{p})
@deftypefnx {} {@var{q} =} polyint (@var{p}, @var{k})
Return the coefficients of the integral of the polynomial whose
coefficients are represented by the vector @var{p}.

The variable @var{k} is the constant of integration, which by default is
set to zero.
@seealso{polyder, polyval}
@end deftypefn
