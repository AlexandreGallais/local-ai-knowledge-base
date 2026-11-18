# fftfilt

```octave
function y = fftfilt (b, x, n)
```

@deftypefn  {} {@var{y} =} fftfilt (@var{b}, @var{x})
@deftypefnx {} {@var{y} =} fftfilt (@var{b}, @var{x}, @var{n})
Filter @var{x} with the FIR filter @var{b} using the FFT.

If @var{x} is a matrix, filter each column of the matrix.

Given the optional third argument, @var{n}, @code{fftfilt} uses the
overlap-add method to filter @var{x} with @var{b} using an N-point FFT@.
The FFT size must be an even power of 2 and must be greater than or equal to
the length of @var{b}.  If the specified @var{n} does not meet these
criteria, it is automatically adjusted to the nearest value that does.

@seealso{filter, filter2}
@end deftypefn
