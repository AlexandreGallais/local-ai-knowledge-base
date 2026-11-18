# camtarget

```octave
function t = camtarget (varargin)
```

@deftypefn  {} {@var{t} =} camtarget ()
@deftypefnx {} {} camtarget ([@var{x} @var{y} @var{z}])
@deftypefnx {} {@var{mode} =} camtarget ("mode")
@deftypefnx {} {} camtarget (@var{mode})
@deftypefnx {} {} camtarget (@var{hax}, @dots{})
Get or set where the camera is pointed.

The camera target is a point in space where the camera is pointing.
Usually, it is determined automatically based on the scene:

@example
@group
hf = figure();
sphere (36)
v = camtarget ()
  @xresult{} v =
      0   0   0
@end group
@end example

We can turn the camera to point at a new target:

@example
@group
camtarget ([1 1 1])
camtarget ()
  @xresult{}   1   1   1
@end group
@end example

Having done so, the camera target @var{mode} is manual:

@example
@group
camtarget ("mode")
  @xresult{} manual
@end group
@end example

This means, for example, adding new objects to the scene will not retarget
the camera:

@example
@group
hold on;
peaks ()
camtarget ()
  @xresult{}   1   1   1
@end group
@end example

We can reset it to be automatic:

@example
@group
@c doctest: +XFAIL
@c https://savannah.gnu.org/bugs/?44503
camtarget ("auto")
camtarget ()
  @xresult{}   0   0   0.76426
close (hf)
@end group
@end example

By default, these commands affect the current axis; alternatively, an axis
can be specified by the optional argument @var{hax}.

@seealso{campos, camup, camva}
@end deftypefn
