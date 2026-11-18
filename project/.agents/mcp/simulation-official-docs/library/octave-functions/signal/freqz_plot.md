# freqz_plot

```octave
function freqz_plot (w, h, freq_norm = false)
```

@deftypefn  {} {} freqz_plot (@var{w}, @var{h})
@deftypefnx {} {} freqz_plot (@var{w}, @var{h}, @var{freq_norm})
Plot the magnitude and phase response of @var{h}.

If the optional @var{freq_norm} argument is true, the frequency vector
@var{w} is in units of normalized radians.  If @var{freq_norm} is false, or
not given, then @var{w} is measured in Hertz.
@seealso{freqz}
@end deftypefn
