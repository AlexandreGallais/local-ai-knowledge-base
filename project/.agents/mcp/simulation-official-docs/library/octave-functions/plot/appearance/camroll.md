# camroll

```octave
function camroll (varargin)
```

@deftypefn  {} {} camroll (@var{theta})
@deftypefnx {} {} camroll (@var{hax}, @var{theta})
Roll the camera.

Roll the camera clockwise by @var{theta} degrees.
For example, the following command will roll the camera by
30 degrees clockwise (to the right); this will cause the scene
to appear to roll by 30 degrees to the left:

@example
@group
@c doctest: +SKIP
peaks ()
camroll (30)
@end group
@end example

Roll the camera back:

@example
@group
@c doctest: +SKIP
camroll (-30)
@end group
@end example

The following command restores the default camera roll:

@example
@group
@c doctest: +SKIP
camup ("auto")
@end group
@end example

By default, these commands affect the current axis; alternatively, an axis
can be specified by the optional argument @var{hax}.

@seealso{camzoom, camorbit, camlookat, camup}
@end deftypefn
