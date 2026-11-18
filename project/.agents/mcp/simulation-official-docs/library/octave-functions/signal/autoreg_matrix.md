# autoreg_matrix

```octave
function x = autoreg_matrix (y, k)
```

@deftypefn {} {@var{x} =} autoreg_matrix (@var{y}, @var{k})
Given a time series (vector) @var{y}, return a matrix with ones in the first
column and the first @var{k} lagged values of @var{y} in the other columns.

In other words, for @var{t} > @var{k},
@code{[1, @var{y}(@var{t}-1), @dots{}, @var{y}(@var{t}-@var{k})]} is the
t-th row of the result.

The resulting matrix may be used as a regressor matrix in autoregressions.
@end deftypefn
