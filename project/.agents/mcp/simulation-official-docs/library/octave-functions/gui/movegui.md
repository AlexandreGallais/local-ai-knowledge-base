# movegui

```octave
function movegui (varargin)
```

@deftypefn  {} {} movegui
@deftypefnx {} {} movegui (@var{h})
@deftypefnx {} {} movegui (@var{pos})
@deftypefnx {} {} movegui (@var{h}, @var{pos})
@deftypefnx {} {} movegui (@var{h}, @var{event})
@deftypefnx {} {} movegui (@var{h}, @var{event}, @var{pos})
Move a figure specified by figure handle @var{h} to a position on the screen
defined by @var{pos}.

@var{h} is a figure handle, or a handle to a graphics object.  In the latter
case, its parent figure will be used.  If unspecified, @var{h} will be
set to the handle of the relevant figure if a callback is being executed
(@code{gcbf}), otherwise it will be set to the handle of the current figure
(@code{gcf}).

@var{pos} is either a two-value numeric vector or a string.  If @var{pos} is
numeric then it must be of the form @code{[h, v]} specifying the horizontal
and vertical offsets of the figure with respect to the screen.  A positive
value indicates the offset between the left (or bottom for the vertical
component) of the screen, and the left (or bottom) of the figure.  A
negative value indicates the offset between the right (or top) of the screen
and the right (or top) of the figure.

Possible values for @var{pos} as a string are

@table @code
@item north
Top center of the screen.

@item south
Bottom center of the screen.

@item east
Right center of the screen.

@item west
Left center of the screen.

@item northeast
Top right of the screen.

@item northwest
Top left of the screen.

@item southeast
Bottom right of the screen.

@item southwest
Bottom left of the screen.

@item center
Center of the screen.

@item onscreen (default)
The figure will be minimally moved to be entirely visible on the screen,
with a 30 pixel extra padding from the sides of the screen.  This is the
default value if none is provided.
@end table

@var{event} contains event data that will be ignored.  This construct
facilitates a call to movegui from a callback.

@end deftypefn
