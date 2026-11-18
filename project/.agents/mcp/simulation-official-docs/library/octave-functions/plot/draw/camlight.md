# camlight

```octave
function h = camlight (varargin)
```

@deftypefn  {} {} camlight {}
@deftypefnx {} {} camlight right
@deftypefnx {} {} camlight left
@deftypefnx {} {} camlight headlight
@deftypefnx {} {} camlight (@var{az}, @var{el})
@deftypefnx {} {} camlight (@dots{}, @var{style})
@deftypefnx {} {} camlight (@var{hl}, @dots{})
@deftypefnx {} {} camlight (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} camlight (@dots{})
Add a light object to a figure using a simple interface.

When called with no arguments, a light object is added to the current plot
and is placed slightly above and to the right of the camera's current
position: this is equivalent to @code{camlight right}.  The commands
@code{camlight left} and @code{camlight headlight} behave similarly with
the placement being either left of the camera position or centered on the
camera position.

For more control, the light position can be specified by an azimuthal
rotation @var{az} and an elevation angle @var{el}, both in degrees,
relative to the current properties of the camera.

The optional string @var{style} specifies whether the light is a local point
source (@qcode{"local"}, the default) or placed at infinite distance
(@qcode{"infinite"}).

If the first argument @var{hl} is a handle to a light object, then act on
this light object rather than creating a new object.

If the first argument @var{hax} is an axes handle, then create a new light
object in this axes, rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the light object.
This can be used to move or further change properties of the light object.

Examples:

Add a light object to a plot

@example
@group
@c doctest: +SKIP
sphere (36);
camlight
@end group
@end example

Position the light source exactly

@example
@group
@c doctest: +SKIP
camlight (45, 30);
@end group
@end example

Here the light is first pitched upwards (@pxref{XREFcamup,,@code{camup}})
from the camera position (@pxref{XREFcampos,,@code{campos}}) by 30
degrees.  It is then yawed by 45 degrees to the right.  Both rotations
are centered around the camera target
(@pxref{XREFcamtarget,,@code{camtarget}}).

Return a handle to further manipulate the light object

@example
@group
@c doctest: +SKIP
clf
sphere (36);
hl = camlight ("left");
set (hl, "color", "r");
@end group
@end example

@seealso{light}
@end deftypefn
