# camup

```octave
function up = camup (varargin)
```

@deftypefn  {} {@var{up} =} camup ()
@deftypefnx {} {} camup ([@var{x} @var{y} @var{z}])
@deftypefnx {} {@var{mode} =} camup ("mode")
@deftypefnx {} {} camup (@var{mode})
@deftypefnx {} {} camup (@var{hax}, @dots{})
Get or set the camera up vector.

By default, the camera is oriented so that ``up'' corresponds to the
positive z-axis:

@example
@group
hf = figure ();
sphere (36)
v = camup ()
  @xresult{} v =
      0   0   1
@end group
@end example

Specifying a new ``up vector'' rolls the camera and sets the mode to manual:

@example
@group
camup ([1 1 0])
camup ()
  @xresult{}   1   1   0
camup ("mode")
  @xresult{} manual
@end group
@end example

Modifying the up vector does not modify the camera target
(@pxref{XREFcamtarget,,@code{camtarget}}).  Thus, the camera up vector might
not be orthogonal to the direction of the camera's view:

@example
@group
camup ([1 2 3])
dot (camup (), camtarget () - campos ())
  @xresult{} 6...
@end group
@end example

A consequence is that ``pulling back'' on the up vector does not pitch the
camera view (as that would require changing the target).  Setting the up
vector is thus typically used only to roll the camera.  A more intuitive
command for this purpose is @ref{XREFcamroll,,@code{camroll}}.

Finally, we can reset the up vector to automatic mode:

@example
@group
camup ("auto")
camup ()
  @xresult{}   0   0   1
close (hf)
@end group
@end example

By default, these commands affect the current axis; alternatively, an axis
can be specified by the optional argument @var{hax}.

@seealso{campos, camtarget, camva}
@end deftypefn
