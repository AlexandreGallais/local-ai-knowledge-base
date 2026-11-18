# camorbit

```octave
function camorbit (varargin)
```

@deftypefn  {} {} camorbit (@var{theta}, @var{phi})
@deftypefnx {} {} camorbit (@var{theta}, @var{phi}, @var{coorsys})
@deftypefnx {} {} camorbit (@var{theta}, @var{phi}, @var{coorsys}, @var{dir})
@deftypefnx {} {} camorbit (@var{theta}, @var{phi}, "data")
@deftypefnx {} {} camorbit (@var{theta}, @var{phi}, "data", "z")
@deftypefnx {} {} camorbit (@var{theta}, @var{phi}, "data", "x")
@deftypefnx {} {} camorbit (@var{theta}, @var{phi}, "data", "y")
@deftypefnx {} {} camorbit (@var{theta}, @var{phi}, "data", [@var{x} @var{y} @var{z}])
@deftypefnx {} {} camorbit (@var{theta}, @var{phi}, "camera")
@deftypefnx {} {} camorbit (@var{hax}, @dots{})
Rotate the camera up/down and left/right around its target.

Move the camera @var{phi} degrees up and @var{theta} degrees to the right,
as if it were in an orbit around its target.
Example:

@example
@group
@c doctest: +SKIP
sphere ()
camorbit (30, 20)
@end group
@end example

These rotations are centered around the camera target
(@pxref{XREFcamtarget,,@code{camtarget}}).
First the camera position is pitched up or down by rotating it @var{phi}
degrees around an axis orthogonal to both the viewing direction
(specifically @code{camtarget() - campos()}) and the camera ``up vector''
(@pxref{XREFcamup,,@code{camup}}).
Example:

@example
@group
@c doctest: +SKIP
camorbit (0, 20)
@end group
@end example

The second rotation depends on the coordinate system @var{coorsys} and
direction @var{dir} inputs.
The default for @var{coorsys} is @qcode{"data"}.  In this case, the camera
is yawed left or right by rotating it @var{theta} degrees around an axis
specified by @var{dir}.
The default for @var{dir} is @qcode{"z"}, corresponding to the vector
@code{[0, 0, 1]}.
Example:

@example
@group
@c doctest: +SKIP
camorbit (30, 0)
@end group
@end example

When @var{coorsys} is set to @qcode{"camera"}, the camera is moved left or
right by rotating it around an axis parallel to the camera up vector
(@pxref{XREFcamup,,@code{camup}}).
The input @var{dir} should not be specified in this case.
Example:

@example
@group
@c doctest: +SKIP
camorbit (30, 0, "camera")
@end group
@end example

(Note: the rotation by @var{phi} is unaffected by @qcode{"camera"}.)

The @code{camorbit} command modifies two camera properties:
@ref{XREFcampos,,@code{campos}} and @ref{XREFcamup,,@code{camup}}.

By default, this command affects the current axis; alternatively, an axis
can be specified by the optional argument @var{hax}.

@seealso{camzoom, camroll, camlookat}
@end deftypefn
