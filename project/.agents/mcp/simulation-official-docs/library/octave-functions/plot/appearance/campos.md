# campos

```octave
function p = campos (varargin)
```

@deftypefn  {} {@var{p} =} campos ()
@deftypefnx {} {} campos ([@var{x} @var{y} @var{z}])
@deftypefnx {} {@var{mode} =} campos ("mode")
@deftypefnx {} {} campos (@var{mode})
@deftypefnx {} {} campos (@var{hax}, @dots{})
Get or set the camera position.

The default camera position is determined automatically based on the scene.
For example, to get the camera position:

@example
@group
hf = figure();
peaks()
p = campos ()
  @xresult{} p =
      -27.394  -35.701   64.079
@end group
@end example

We can then move the camera further up the z-axis:

@example
@group
campos (p + [0 0 10])
campos ()
  @xresult{} ans =
      -27.394  -35.701   74.079
@end group
@end example

Having made that change, the camera position @var{mode} is now manual:

@example
@group
campos ("mode")
  @xresult{} manual
@end group
@end example

We can set it back to automatic:

@example
@group
campos ("auto")
campos ()
  @xresult{} ans =
      -27.394  -35.701   64.079
close (hf)
@end group
@end example

By default, these commands affect the current axis; alternatively, an axis
can be specified by the optional argument @var{hax}.

@seealso{camup, camtarget, camva}
@end deftypefn
