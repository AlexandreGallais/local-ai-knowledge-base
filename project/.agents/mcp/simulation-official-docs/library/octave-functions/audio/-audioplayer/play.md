# play

```octave
function play (player, length)
```

@deftypefn  {} {} play (@var{player})
@deftypefnx {} {} play (@var{player}, @var{start})
@deftypefnx {} {} play (@var{player}, [@var{start}, @var{end}])
Play audio stored in the audioplayer object @var{player} without blocking.

If the optional argument @var{start} is provided, begin playing
@var{start} samples in to the recording.

If the optional argument @var{end} is provided, stop playing at
@var{end} samples into the recording.
@seealso{@audioplayer/playblocking, @audioplayer/pause, @audioplayer/stop,
@audioplayer/audioplayer}
@end deftypefn
