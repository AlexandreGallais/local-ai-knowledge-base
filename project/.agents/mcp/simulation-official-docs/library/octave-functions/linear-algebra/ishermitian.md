# ishermitian

```octave
function tf = ishermitian (A, skewopt = "nonskew", tol = 0)
```

@deftypefn  {} {@var{tf} =} ishermitian (@var{A})
@deftypefnx {} {@var{tf} =} ishermitian (@var{A}, @var{tol})
@deftypefnx {} {@var{tf} =} ishermitian (@var{A}, @qcode{"skew"})
@deftypefnx {} {@var{tf} =} ishermitian (@var{A}, @qcode{"skew"}, @var{tol})
Return true if @var{A} is a Hermitian or skew-Hermitian numeric matrix
within the tolerance specified by @var{tol}.

The default tolerance is zero (uses faster code).

The type of symmetry to check may be specified with the additional input
@qcode{"nonskew"} (default) for regular Hermitian or @qcode{"skew"} for
skew-Hermitian.

Background: A matrix is Hermitian if the complex conjugate transpose of the
matrix is equal to the original matrix: @w{@tcode{@var{A} == @var{A}'}}.  If
a tolerance is given then the calculation is
@code{norm (@var{A} - @var{A}', Inf) / norm (@var{A}, Inf) < @var{tol}}.

A matrix is skew-Hermitian if the complex conjugate transpose of the matrix
is equal to the negative of the original matrix:
@w{@tcode{@var{A} == -@var{A}'}}.  If a
tolerance is given then the calculation is
@code{norm (@var{A} + @var{A}', Inf) / norm (@var{A}, Inf) < @var{tol}}.
@seealso{issymmetric, isdefinite}
@end deftypefn
