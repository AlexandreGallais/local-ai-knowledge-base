# sprandsym

```octave
function S = sprandsym (n, d)
```

@deftypefn  {} {@var{S} =} sprandsym (@var{n}, @var{d})
@deftypefnx {} {@var{S} =} sprandsym (@var{s})
Generate a symmetric random sparse matrix.

The size of the matrix will be @var{n}x@var{n}, with a density of values
given by @var{d}.  @var{d} must be between 0 and 1 inclusive.  Values will
be normally distributed with a mean of zero and a variance of 1.

If called with a single matrix argument, a random sparse matrix is generated
wherever the matrix @var{s} is nonzero in its lower triangular part.
@seealso{sprand, sprandn, spones, sparse}
@end deftypefn
