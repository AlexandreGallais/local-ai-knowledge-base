# ppder

```octave
function ppd = ppder (pp, m = 1)
```

@deftypefn  {} {ppd =} ppder (pp)
@deftypefnx {} {ppd =} ppder (pp, m)
Compute the piecewise @var{m}-th derivative of a piecewise polynomial
struct @var{pp}.

If @var{m} is omitted the first derivative is calculated.
@seealso{mkpp, ppval, ppint}
@end deftypefn
