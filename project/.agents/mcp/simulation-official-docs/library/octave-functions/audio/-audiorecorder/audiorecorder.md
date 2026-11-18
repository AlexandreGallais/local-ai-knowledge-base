# audiorecorder

```octave
function recorder = audiorecorder (varargin)
```

@deftypefn  {} {@var{recorder} =} audiorecorder ()
@deftypefnx {} {@var{recorder} =} audiorecorder (@var{fs}, @var{nbits}, @var{nchannels})
@deftypefnx {} {@var{recorder} =} audiorecorder (@var{fs}, @var{nbits}, @var{nchannels}, @var{id})
Create an audiorecorder object recording 8-bit mono audio at 8000 Hz
sample rate.

The optional arguments @var{fs}, @var{nbits}, @var{nchannels}, and @var{id}
specify the sample rate, number of bits per sample, number of channels, and
recording device ID, respectively.  Device IDs may be found using the
@code{audiodevinfo} function.

The list of actions for an audiorecorder object are shown below.  All
methods require an audiorecorder object as the first argument.

@multitable @columnfractions 0.22 0.73
@headitem Method @tab Description
@item get @tab Read audiorecorder property values
@item getaudiodata @tab Return audio data as a numeric matrix
@item getplayer @tab Return audioplayer loaded with data from audiorecorder
@item isrecording @tab Return true if audiorecorder is recording
@item pause @tab Pause recording
@item play @tab Play audio stored in audiorecorder object
@item record @tab Record audio in audiorecorder object w/o blocking
@item recordblocking @tab Record audio in audiorecorder object
@item resume @tab Resume recording after pause
@item set @tab Write audiorecorder property values
@item stop @tab Stop recording
@end multitable

@seealso{@audiorecorder/get, @audiorecorder/getaudiodata,
@audiorecorder/getplayer, @audiorecorder/isrecording,
@audiorecorder/pause, @audiorecorder/play, @audiorecorder/record,
@audiorecorder/recordblocking, @audioplayer/resume, @audiorecorder/set,
@audiorecorder/stop, audiodevinfo, @audioplayer/audioplayer, record}
@end deftypefn
