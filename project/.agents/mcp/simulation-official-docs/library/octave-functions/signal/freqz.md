# freqz

```octave
function [h_r, f_r] = freqz (b, a, n, region, Fs)
```

@deftypefn  {} {[@var{h}, @var{w}] =} freqz (@var{b}, @var{a}, @var{n}, "whole")
@deftypefnx {} {[@var{h}, @var{w}] =} freqz (@var{b})
@deftypefnx {} {[@var{h}, @var{w}] =} freqz (@var{b}, @var{a})
@deftypefnx {} {[@var{h}, @var{w}] =} freqz (@var{b}, @var{a}, @var{n})
@deftypefnx {} {@var{h} =} freqz (@var{b}, @var{a}, @var{w})
@deftypefnx {} {[@var{h}, @var{w}] =} freqz (@dots{}, @var{Fs})
@deftypefnx {} {} freqz (@dots{})

Return the complex frequency response @var{h} of the rational IIR filter
whose numerator and denominator coefficients are @var{b} and @var{a},
respectively.

The response is evaluated at @var{n} angular frequencies between 0 and
@ifnottex
2*pi.
@end ifnottex
@tex
$2\pi$.
@end tex

@noindent
The output value @var{w} is a vector of the frequencies.

If @var{a} is omitted, the denominator is assumed to be 1 (this
corresponds to a simple FIR filter).

If @var{n} is omitted, a value of 512 is assumed.  For fastest computation,
@var{n} should factor into a small number of small primes.

If the fourth argument, @qcode{"whole"}, is omitted the response is
evaluated at frequencies between 0 and
@ifnottex
pi.
@end ifnottex
@tex
$\pi$.
@end tex

@code{freqz (@var{b}, @var{a}, @var{w})}

Evaluate the response at the specific frequencies in the vector @var{w}.
The values for @var{w} are measured in radians.

@code{[@dots{}] = freqz (@dots{}, @var{Fs})}

Return frequencies in Hz instead of radians assuming a sampling rate
@var{Fs}.  If you are evaluating the response at specific frequencies
@var{w}, those frequencies should be requested in Hz rather than radians.

@code{freqz (@dots{})}

Plot the magnitude and phase response of @var{h} rather than returning them.

@seealso{freqz_plot}
@end deftypefn
