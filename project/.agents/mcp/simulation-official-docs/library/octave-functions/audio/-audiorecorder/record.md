# record

```octave
function record (recorder, length)
```

@deftypefn  {} {} record (@var{recorder})
@deftypefnx {} {} record (@var{recorder}, @var{length})
Record audio without blocking using the audiorecorder object
@var{recorder} until paused or stopped by the @var{pause} or @var{stop}
methods.

Given the optional argument @var{length}, record for @var{length} seconds.
@seealso{@audiorecorder/recordblocking, @audiorecorder/audiorecorder}
@end deftypefn
