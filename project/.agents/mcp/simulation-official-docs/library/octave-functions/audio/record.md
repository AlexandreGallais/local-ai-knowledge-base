# record

```octave
function data = record (sec, fs = 8000)
```

@deftypefn  {} {@var{data} =} record (@var{sec})
@deftypefnx {} {@var{data} =} record (@var{sec}, @var{fs})
Record @var{sec} seconds of audio from the system's default audio input at
a sampling rate of 8000 samples per second.

If the optional argument @var{fs} is given, it specifies the sampling rate
for recording.

For more control over audio recording, use the @code{audiorecorder} class.
@seealso{@audiorecorder/audiorecorder, sound, soundsc}
@end deftypefn
