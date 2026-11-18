# sound

```octave
function sound (y, fs, nbits)
```

@deftypefn  {} {} sound (@var{y})
@deftypefnx {} {} sound (@var{y}, @var{fs})
@deftypefnx {} {} sound (@var{y}, @var{fs}, @var{nbits})
Play audio data @var{y} at sample rate @var{fs} to the default audio
device.

The audio signal @var{y} can be a vector or a two-column array representing
mono or stereo audio, respectively.

If @var{fs} is not given, a default sample rate of 8000 samples per second
is used.

The optional argument @var{nbits} specifies the bit depth to play to the
audio device and defaults to 8 bits.

For more control over audio playback, use the @code{audioplayer} class.
@seealso{soundsc, @audioplayer/audioplayer, record}
@end deftypefn
