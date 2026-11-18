# camlookat

```octave
function camlookat (h)
```

@deftypefn  {} {} camlookat ()
@deftypefnx {} {} camlookat (@var{h})
@deftypefnx {} {} camlookat (@var{handle_list})
@deftypefnx {} {} camlookat (@var{hax})
Move the camera and adjust its properties to look at objects.

When the input is a handle @var{h}, the camera is set to point toward the
center of the bounding box of @var{h}.  The camera's position is adjusted so
the bounding box approximately fills the field of view.

This command fixes the camera's viewing direction
(@code{camtarget() - campos()}), camera up vector
(@pxref{XREFcamup,,@code{camup}}) and viewing angle
(@pxref{XREFcamva,,@code{camva}}).  The camera target
(@pxref{XREFcamtarget,,@code{camtarget}}) and camera position
(@pxref{XREFcampos,,@code{campos}}) are changed.

If the argument is a list @var{handle_list}, then a single bounding box for
all the objects is computed and the camera is then adjusted as above.

If the argument is an axis object @var{hax}, then the children of the axis
are used as @var{handle_list}.  When called with no inputs, it uses the
current axis (@pxref{XREFgca,,@code{gca}}).

@seealso{camorbit, camzoom, camroll}
@end deftypefn
