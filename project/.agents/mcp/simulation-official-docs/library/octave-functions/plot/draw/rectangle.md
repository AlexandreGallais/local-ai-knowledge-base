# rectangle

```octave
function h = rectangle (varargin)
```

@deftypefn  {} {} rectangle ()
@deftypefnx {} {} rectangle (@dots{}, "Position", @var{pos})
@deftypefnx {} {} rectangle (@dots{}, "Curvature", @var{curv})
@deftypefnx {} {} rectangle (@dots{}, "EdgeColor", @var{ec})
@deftypefnx {} {} rectangle (@dots{}, "FaceColor", @var{fc})
@deftypefnx {} {} rectangle (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} rectangle (@dots{})
Draw a rectangular patch defined by @var{pos} and @var{curv}.

The variable @code{@var{pos}(1:2)} defines the lower left-hand corner of
the patch and @code{@var{pos}(3:4)} defines its width and height.  By
default, the value of @var{pos} is @code{[0, 0, 1, 1]}.

The variable @var{curv} defines the curvature of the sides of the rectangle
and may be a scalar or two-element vector with values between 0 and 1.
A value of 0 represents no curvature of the side, whereas a value of 1
means that the side is entirely curved into the arc of a circle.
If @var{curv} is a two-element vector, then the first element is the
curvature along the x-axis of the patch and the second along y-axis.

If @var{curv} is a scalar, it represents the curvature of the shorter of the
two sides of the rectangle and the curvature of the other side is defined
by

@example
min (pos(1:2)) / max (pos(1:2)) * curv
@end example

Additional property/value pairs are passed to the underlying patch command.
The full list of properties is documented at @ref{Patch Properties}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created
rectangle object.
@seealso{patch, line, cylinder, ellipsoid, sphere}
@end deftypefn
