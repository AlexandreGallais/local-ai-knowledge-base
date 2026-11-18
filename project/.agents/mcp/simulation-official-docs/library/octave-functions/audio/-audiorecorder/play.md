# play

```octave
function player = play (recorder, start)
```

@deftypefn  {} {@var{player} =} play (@var{recorder})
@deftypefnx {} {@var{player} =} play (@var{recorder}, @var{start})
@deftypefnx {} {@var{player} =} play (@var{recorder}, [@var{start}, @var{end}])
Play the audio recorded in @var{recorder} without blocking and return a
corresponding audioplayer object.

If the optional argument @var{start} is provided, begin playing
@var{start} seconds into the recording.

If the optional argument @var{end} is provided, stop playing at
@var{end} seconds into the recording.
@seealso{@audiorecorder/getplayer, @audioplayer/audioplayer,
@audiorecorder/audiorecorder}
@end deftypefn
