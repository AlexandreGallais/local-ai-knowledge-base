# vech

```octave
function v = vech (x)
```

@deftypefn {} {@var{v} =} vech (@var{x})
Return the vector obtained by eliminating all superdiagonal elements of
the square matrix @var{x} and stacking the result one column above the
other.

This has uses in matrix calculus where the underlying matrix is symmetric
and it would be pointless to keep values above the main diagonal.
@seealso{vec}
@end deftypefn
