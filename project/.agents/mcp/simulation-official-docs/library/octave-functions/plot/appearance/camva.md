# camva

```octave
function a = camva (varargin)
```

@deftypefn  {} {@var{a} =} camva ()
@deftypefnx {} {} camva (@var{a})
@deftypefnx {} {@var{mode} =} camva ("mode")
@deftypefnx {} {} camva (@var{mode})
@deftypefnx {} {} camva (@var{hax}, @dots{})
Get or set the camera viewing angle.

The camera has a viewing angle which determines how much can be seen.  By
default this is:

@example
@group
hf = figure();
sphere (36)
a = camva ()
  @xresult{} a =  10.340
@end group
@end example

To get a wider-angle view, we could double the viewing angle.  This will
also set the mode to manual:

@example
@group
camva (2*a)
camva ("mode")
  @xresult{} manual
@end group
@end example

We can set it back to automatic:

@example
@group
camva ("auto")
camva ("mode")
  @xresult{} auto
camva ()
  @xresult{} ans =  10.340
close (hf)
@end group
@end example

By default, these commands affect the current axis; alternatively, an axis
can be specified by the optional argument @var{hax}.

@seealso{campos, camtarget, camup}
@end deftypefn
