# movie

```octave
function movie (varargin)
```

@deftypefn  {} {} movie (@var{mov})
@deftypefnx {} {} movie (@var{mov}, @var{n})
@deftypefnx {} {} movie (@var{mov}, @var{n}, @var{fps})
@deftypefnx {} {} movie (@var{h}, @dots{})
Play a movie defined by an array of frame structures.

The movie @var{mov} must be a struct array of frames with fields
@qcode{"cdata"} and @qcode{"colormap"}, as returned by the @code{getframe}
function.  By default all images are displayed once, at 12 fps, in the
current axes.

The optional argument @var{n} is a scalar or vector of integers that
controls the number of times the movie is displayed and which particular
frames are shown:

@table @asis
@item First element:

@table @asis
@item @var{n}(1) > 0
Play the movie @var{n}(1) times.

@item @var{n}(1) < 0
Play the movie @code{abs (@var{n}(1)} times alternatively in forward and
backward order.
@end table

@item Other elements (if any):
Indices of the frames in @var{mov} that will be displayed.
@end table

If the first argument is a handle to a figure or axes @var{h}, the movie is
played in that figure or axes instead of the current axes.

@seealso{getframe, im2frame, frame2im}
@end deftypefn
