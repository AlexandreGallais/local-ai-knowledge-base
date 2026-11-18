# periodogram

```octave
function [pxx, f] = periodogram (x, varargin)
```

@deftypefn  {} {[@var{Pxx}, @var{w}] =} periodogram (@var{x})
@deftypefnx {} {[@var{Pxx}, @var{w}] =} periodogram (@var{x}, @var{win})
@deftypefnx {} {[@var{Pxx}, @var{w}] =} periodogram (@var{x}, @var{win}, @var{nfft})
@deftypefnx {} {[@var{Pxx}, @var{f}] =} periodogram (@var{x}, @var{win}, @var{nfft}, @var{Fs})
@deftypefnx {} {[@var{Pxx}, @var{f}] =} periodogram (@dots{}, "@var{range}")
@deftypefnx {} {} periodogram (@dots{})
Return the periodogram (Power Spectral Density) of @var{x}.

The possible inputs are:

@table @var
@item x

data vector.  If @var{x} is real-valued a one-sided spectrum is estimated.
If @var{x} is complex-valued, or @qcode{"@var{range}"} specifies
@qcode{"@nospell{twosided}"}, the full spectrum is estimated.

@item win
window weight data.  If window is empty or unspecified a default rectangular
window is used.  Otherwise, the window is applied to the signal
(@code{@var{x} .* @var{win}}) before computing the periodogram.  The window
data must be a vector of the same length as @var{x}.

@item nfft
number of frequency bins.  The default is 256 or the next higher power of
2 greater than the length of @var{x}
(@code{max (256, 2.^nextpow2 (length (x)))}).  If @var{nfft} is greater
than the length of the input then @var{x} will be zero-padded to the length
of @var{nfft}.

@item Fs
sampling rate.  The default is 1.

@item range
range of spectrum.  @qcode{"@nospell{onesided}"} computes spectrum from
[0:nfft/2+1].  @qcode{"@nospell{twosided}"} computes spectrum from
[0:nfft-1].
@end table

The optional second output @var{w} are the normalized angular frequencies.
For a one-sided calculation @var{w} is in the range [0, pi] if @var{nfft}
is even and [0, pi) if @var{nfft} is odd.  Similarly, for a two-sided
calculation @var{w} is in the range [0, 2*pi] or [0, 2*pi) depending on
@var{nfft}.

If a sampling frequency is specified, @var{Fs}, then the output frequencies
@var{f} will be in the range [0, @var{Fs}/2] or [0, @var{Fs}/2) for
one-sided calculations.  For two-sided calculations the range will be
[0, @var{Fs}).

When called with no outputs the periodogram is immediately plotted in the
current figure window.
@seealso{fft}
@end deftypefn
