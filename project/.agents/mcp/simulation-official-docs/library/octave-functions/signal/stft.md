# stft

```octave
function [y, c] = stft (x, win_size = 80, inc = 24, num_coef = 64, win_type = 1)
```

@deftypefn  {} {@var{y} =} stft (@var{x})
@deftypefnx {} {@var{y} =} stft (@var{x}, @var{win_size})
@deftypefnx {} {@var{y} =} stft (@var{x}, @var{win_size}, @var{inc})
@deftypefnx {} {@var{y} =} stft (@var{x}, @var{win_size}, @var{inc}, @var{num_coef})
@deftypefnx {} {@var{y} =} stft (@var{x}, @var{win_size}, @var{inc}, @var{num_coef}, @var{win_type})
@deftypefnx {} {[@var{y}, @var{c}] =} stft (@dots{})
Compute the short-time Fourier transform of the vector @var{x} with
@var{num_coef} coefficients by applying a window of @var{win_size} data
points and an increment of @var{inc} points.

Before computing the Fourier transform, one of the following windows
is applied:

@table @asis
@item @qcode{"hanning"}
win_type = 1

@item @qcode{"hamming"}
win_type = 2

@item @qcode{"rectangle"}
win_type = 3
@end table

The window names can be passed as strings or by the @var{win_type} number.

The following defaults are used for unspecified arguments:
@var{win_size} = 80, @var{inc} = 24, @var{num_coef} = 64, and
@var{win_type} = 1.

@code{@var{y} = stft (@var{x}, @dots{})} returns the absolute values of the
Fourier coefficients according to the @var{num_coef} positive frequencies.

@code{[@var{y}, @var{c}] = stft (@var{x}, @dots{})} returns the entire
STFT-matrix @var{y} and a 3-element vector @var{c} containing the window
size, increment, and window type, which is needed by the @code{synthesis}
function.
@seealso{synthesis}
@end deftypefn
