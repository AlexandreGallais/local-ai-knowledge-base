# playblocking

```octave
function playblocking (player, start)
```

@deftypefn  {} {} playblocking (@var{player})
@deftypefnx {} {} playblocking (@var{player}, @var{start})
@deftypefnx {} {} playblocking (@var{player}, [@var{start}, @var{end}])
Play audio stored in the audioplayer object @var{player} with blocking
(synchronous I/O).

If the optional argument @var{start} is provided, begin playing
@var{start} samples into the recording.

If the optional argument @var{end} is provided, stop playing at
@var{end} samples into the recording.
@seealso{@audioplayer/play, @audioplayer/pause, @audioplayer/stop,
@audioplayer/audioplayer}
@end deftypefn
