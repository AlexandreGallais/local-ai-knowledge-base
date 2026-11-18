# getaudiodata

```octave
function data = getaudiodata (recorder, datatype)
```

@deftypefn  {} {@var{data} =} getaudiodata (@var{recorder})
@deftypefnx {} {@var{data} =} getaudiodata (@var{recorder}, @var{datatype})
Return audio data from audiorecorder object @var{recorder} as a double
matrix with values between -1.0 and 1.0 and with as many columns as there
are channels in @var{recorder}.

Given the optional argument @var{datatype}, convert the recorded data
to the specified type, which may be one of @qcode{"double"},
@qcode{"single"}, @qcode{"int16"}, @qcode{"int8"} or @qcode{"uint8"}.
@seealso{@audiorecorder/audiorecorder}
@end deftypefn
