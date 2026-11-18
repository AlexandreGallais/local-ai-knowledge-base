# soundsc

```octave
function soundsc (y, fs, nbits, yrange = [])
```

@deftypefn  {} {} soundsc (@var{y})
@deftypefnx {} {} soundsc (@var{y}, @var{fs})
@deftypefnx {} {} soundsc (@var{y}, @var{fs}, @var{nbits})
@deftypefnx {} {} soundsc (@dots{}, [@var{ymin}, @var{ymax}])
Scale the audio data @var{y} and play it at sample rate @var{fs} to the
default audio device.

The audio signal @var{y} can be a vector or a two-column array representing
mono or stereo audio, respectively.

If @var{fs} is not given, a default sample rate of 8000 samples per second
is used.

The optional argument @var{nbits} specifies the bit depth to play to the
audio device and defaults to 8 bits.

By default, @var{y} is automatically normalized to the range [-1, 1].  If
the range [@var{ymin}, @var{ymax}] is given, then elements of @var{y}
that fall within the range @var{ymin} @leq{} @var{y} @leq{} @var{ymax}
are scaled to the range [-1, 1] instead.

For more control over audio playback, use the @code{audioplayer} class.
@seealso{sound, @audioplayer/audioplayer, record}
@end deftypefn
