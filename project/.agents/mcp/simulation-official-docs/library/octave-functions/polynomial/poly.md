# poly

```octave
function y = poly (x)
```

@deftypefn  {} {@var{y} =} poly (@var{A})
@deftypefnx {} {@var{y} =} poly (@var{x})
If @var{A} is a square @math{N}-by-@math{N} matrix, @code{poly (@var{A})}
is the row vector of the coefficients of @code{det (z * eye (N) - A)},
the characteristic polynomial of @var{A}.

For example, the following code finds the eigenvalues of @var{A} which are
the roots of @code{poly (@var{A})}.

@example
@group
roots (poly (eye (3)))
    @xresult{} 1.00001 + 0.00001i
       1.00001 - 0.00001i
       0.99999 + 0.00000i
@end group
@end example

In fact, all three eigenvalues are exactly 1 which emphasizes that for
numerical performance the @code{eig} function should be used to compute
eigenvalues.

If @var{x} is a vector, @code{poly (@var{x})} is a vector of the
coefficients of the polynomial whose roots are the elements of @var{x}.
That is, if @var{c} is a polynomial, then the elements of
@code{@var{d} = roots (poly (@var{c}))} are contained in @var{c}.  The
vectors @var{c} and @var{d} are not identical, however, due to sorting and
numerical errors.
@seealso{roots, eig}
@end deftypefn
