# sprandn

```octave
function s = sprandn (m, n, d, rc)
```

@deftypefn  {} {@var{s} =} sprandn (@var{m}, @var{n}, @var{d})
@deftypefnx {} {@var{s} =} sprandn (@var{m}, @var{n}, @var{d}, @var{rc})
@deftypefnx {} {@var{s} =} sprandn (@var{s})
Generate a sparse matrix with normally distributed random values.

The size of the matrix is @var{m}x@var{n} with a density of values @var{d}.
@var{d} must be between 0 and 1.  Values will be normally distributed with a
mean of 0 and a variance of 1.

If called with a single matrix argument, a sparse matrix is generated with
random values wherever the matrix @var{s} is nonzero.

If called with a scalar fourth argument @var{rc}, a random sparse matrix
with reciprocal condition number @var{rc} is generated.  If @var{rc} is
a vector, then it specifies the first singular values of the generated
matrix (@code{length (@var{rc}) <= min (@var{m}, @var{n})}).

@seealso{sprand, sprandsym, randn}
@end deftypefn
