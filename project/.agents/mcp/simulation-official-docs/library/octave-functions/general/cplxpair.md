# cplxpair

```octave
function zsort = cplxpair (z, tol, dim)
```

@deftypefn  {} {@var{zsort} =} cplxpair (@var{z})
@deftypefnx {} {@var{zsort} =} cplxpair (@var{z}, @var{tol})
@deftypefnx {} {@var{zsort} =} cplxpair (@var{z}, @var{tol}, @var{dim})
Sort the numbers @var{z} into complex conjugate pairs ordered by increasing
real part.

The negative imaginary complex numbers are placed first within each pair.
All real numbers (those with
@code{abs (imag (@var{z})) / abs (@var{z}) < @var{tol}}) are placed after
the complex pairs.

@var{tol} is a weighting factor in the range [0, 1) which determines the
tolerance of the matching.  The default value is @code{100 * eps} and the
resulting tolerance for a given complex pair is
@code{@var{tol} * abs (@var{z}(i)))}.

By default the complex pairs are sorted along the first non-singleton
dimension of @var{z}.  If @var{dim} is specified, then the complex pairs are
sorted along this dimension.

Signal an error if some complex numbers could not be paired.  Signal an
error if all complex numbers are not exact conjugates (to within @var{tol}).
Note that there is no defined order for pairs with identical real parts but
differing imaginary parts.
@c Set example in small font to prevent overfull line

@smallexample
cplxpair (exp (2i*pi*[0:4]'/5)) == exp (2i*pi*[3; 2; 4; 1; 0]/5)
@end smallexample
@end deftypefn
