# camzoom

```octave
function camzoom (varargin)
```

@deftypefn  {} {} camzoom (@var{zf})
@deftypefnx {} {} camzoom (@var{hax}, @var{zf})
Zoom the camera in or out.

A value of @var{zf} larger than 1 ``zooms in'' such that the scene appears
magnified:

@example
@group
hf = figure ();
sphere (36)
camzoom (1.2)
@end group
@end example

A value smaller than 1 ``zooms out'' so the camera can see more of the
scene:

@example
@group
camzoom (0.5)
@end group
@end example

Technically speaking, zooming affects the ``viewing angle''.  The following
command resets to the default zoom:

@example
@group
camva ("auto")
close (hf)
@end group
@end example

By default, these commands affect the current axis; alternatively, an axis
can be specified by the optional argument @var{hax}.

@seealso{camroll, camorbit, camlookat, camva}
@end deftypefn
