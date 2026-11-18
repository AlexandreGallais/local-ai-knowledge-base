# polyvalm

```octave
function y = polyvalm (c, x)
```

@deftypefn {} {@var{y} =} polyvalm (@var{c}, @var{x})
Evaluate a polynomial in the matrix sense.

@code{polyvalm (@var{c}, @var{x})} will evaluate the polynomial in the
matrix sense, i.e., matrix multiplication is used instead of element by
element multiplication as used in @code{polyval}.

The argument @var{x} must be a square matrix.
@seealso{polyval, roots, poly}
@end deftypefn
