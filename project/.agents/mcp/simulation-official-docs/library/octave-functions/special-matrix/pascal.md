# pascal

```octave
function P = pascal (n, t = 0)
```

@deftypefn  {} {@var{P} =} pascal (@var{n})
@deftypefnx {} {@var{P} =} pascal (@var{n}, @var{t})
Return the Pascal matrix of order @var{n} if @code{@var{t} = 0}.

The default value of @var{t} is 0.

When @code{@var{t} = 1}, return the pseudo-lower triangular
Cholesky@tie{}factor of the Pascal matrix (The sign of some columns may be
negative).  This matrix is its own inverse, that is
@code{pascal (@var{n}, 1) ^ 2 == eye (@var{n})}.

If @code{@var{t} = -1}, return the true Cholesky@tie{}factor with strictly
positive values on the diagonal.

If @code{@var{t} = 2}, return a transposed and permuted version of
@code{pascal (@var{n}, 1)}, which is the cube root of the identity matrix.
That is, @code{pascal (@var{n}, 2) ^ 3 == eye (@var{n})}.

@seealso{chol}
@end deftypefn
