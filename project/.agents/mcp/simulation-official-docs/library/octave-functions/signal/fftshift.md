# fftshift

```octave
function y = fftshift (x, dim)
```

@deftypefn  {} {@var{y} =} fftshift (@var{x})
@deftypefnx {} {@var{y} =} fftshift (@var{x}, @var{dim})
Perform a shift of the vector @var{x}, for use with the @code{fft} and
@code{ifft} functions, in order to move the frequency 0 to the center of
the vector or matrix.

If @var{x} is a vector of @math{N} elements corresponding to @math{N} time
samples spaced by @nospell{@math{dt}}, then
@code{fftshift (fft (@var{x}))} corresponds to frequencies

@example
f = [ -(ceil((N-1)/2):-1:1), 0, (1:floor((N-1)/2)) ] * df
@end example

@noindent
where @nospell{@math{df = 1 / (N * dt)}}.

If @var{x} is a matrix, the same holds for rows and columns.  If @var{x}
is an array, then the same holds along each dimension.

The optional @var{dim} argument can be used to limit the dimension along
which the permutation occurs.
@seealso{ifftshift}
@end deftypefn
