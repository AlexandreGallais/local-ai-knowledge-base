# audioplayer

```octave
function player = audioplayer (varargin)
```

@deftypefn  {} {@var{player} =} audioplayer (@var{y}, @var{fs})
@deftypefnx {} {@var{player} =} audioplayer (@var{y}, @var{fs}, @var{nbits})
@deftypefnx {} {@var{player} =} audioplayer (@var{y}, @var{fs}, @var{nbits}, @var{id})
@deftypefnx {} {@var{player} =} audioplayer (@var{recorder})
@deftypefnx {} {@var{player} =} audioplayer (@var{recorder}, @var{id})
Create an audioplayer object that will play back data @var{y} at sample
rate @var{fs}.

The signal @var{y} can be a vector (mono audio) or a two-dimensional array
(multi-channel audio).

The optional arguments @var{nbits} and @var{id} specify the number of bits
per sample and player device ID, respectively.  Device IDs may be found
using the @code{audiodevinfo} function.

Given an audiorecorder object @var{recorder}, use the data from the object
to initialize the player.

The list of actions for an audioplayer object are shown below.  All
methods require an audioplayer object as the first argument.

@multitable @columnfractions 0.2 0.75
@headitem Method @tab Description
@item get @tab Read audioplayer property values
@item isplaying @tab Return true if audioplayer is playing
@item pause @tab Pause audioplayer playback
@item play @tab Play audio stored in audioplayer object w/o blocking
@item playblocking @tab Play audio stored in audioplayer object
@item resume @tab Resume playback after pause
@item set @tab Write audioplayer property values
@item stop @tab Stop playback
@end multitable

Example

Create an audioplayer object that will play back one second of white noise
at 44100 sample rate using 8 bits per sample.

@example
@group
y = 0.25 * randn (2, 44100);
player = audioplayer (y, 44100, 8);
play (player);
@end group
@end example
@seealso{@audioplayer/get, @audioplayer/isplaying, @audioplayer/pause,
@audioplayer/play, @audioplayer/playblocking, @audioplayer/resume,
@audioplayer/set, @audioplayer/stop, audiodevinfo,
@audiorecorder/audiorecorder, sound, soundsc}
@end deftypefn
