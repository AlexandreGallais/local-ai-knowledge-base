# fftconv

```octave
function c = fftconv (x, y, n)
```

@deftypefn  {} {@var{c} =} fftconv (@var{x}, @var{y})
@deftypefnx {} {@var{c} =} fftconv (@var{x}, @var{y}, @var{n})
Convolve two vectors using the FFT for computation.

@code{c = fftconv (@var{x}, @var{y})} returns a vector of length equal to
@code{length (@var{x}) + length (@var{y}) - 1}.  If @var{x} and @var{y}
are the coefficient vectors of two polynomials, the returned value is the
coefficient vector of the product polynomial.

The computation uses the FFT by calling the function @code{fftfilt}.  If
the optional argument @var{n} is specified, an N-point FFT is used.
@seealso{deconv, conv, conv2}
@end deftypefn
