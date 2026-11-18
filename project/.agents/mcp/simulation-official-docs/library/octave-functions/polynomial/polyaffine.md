# polyaffine

```octave
function g = polyaffine (f, mu)
```

@deftypefn {} {@var{g} =} polyaffine (@var{f}, @var{mu})
Return the coefficients of the polynomial vector @var{f} after an affine
transformation.

If @var{f} is the vector representing the polynomial f(x), then
@code{@var{g} = polyaffine (@var{f}, @var{mu})} is the vector representing:

@example
g(x) = f( (x - @var{mu}(1)) / @var{mu}(2) )
@end example

@seealso{polyval, polyfit}
@end deftypefn
