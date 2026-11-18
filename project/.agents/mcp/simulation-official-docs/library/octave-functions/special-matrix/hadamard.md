# hadamard

```octave
function h = hadamard (n)
```

@deftypefn {} {@var{h} =} hadamard (@var{n})
Construct a Hadamard matrix (@nospell{Hn}) of size @var{n}-by-@var{n}.

The size @var{n} must be of the form @math{2^k * p} in which p is one of
1, 12, 20 or 28.  The returned matrix is normalized, meaning
@w{@code{Hn(:,1) == 1}}@ and @w{@code{Hn(1,:) == 1}}.

Some of the properties of Hadamard matrices are:

@itemize @bullet
@item
@code{kron (Hm, Hn)} is a Hadamard matrix of size @var{m}-by-@var{n}.

@item
@code{Hn * Hn' = @var{n} * eye (@var{n})}.

@item
The rows of @nospell{Hn} are orthogonal.

@item
@code{det (@var{A}) <= abs (det (Hn))} for all @var{A} with
@w{@code{abs (@var{A}(i, j)) <= 1}}.

@item
Multiplying any row or column by -1 and the matrix will remain a Hadamard
matrix.
@end itemize
@seealso{compan, hankel, toeplitz}
@end deftypefn
