# interpft

```octave
function y = interpft (x, n, dim)
```

@deftypefn  {} {@var{y} =} interpft (@var{x}, @var{n})
@deftypefnx {} {@var{y} =} interpft (@var{x}, @var{n}, @var{dim})

Fourier interpolation.

If @var{x} is a vector then @var{x} is resampled with @var{n} points.  The
data in @var{x} is assumed to be equispaced.  If @var{x} is a matrix or an
N-dimensional array, the interpolation is performed on each column of
@var{x}.

If @var{dim} is specified, then interpolate along the dimension @var{dim}.

@code{interpft} assumes that the interpolated function is periodic, and so
assumptions are made about the endpoints of the interpolation.
@seealso{interp1}
@end deftypefn
