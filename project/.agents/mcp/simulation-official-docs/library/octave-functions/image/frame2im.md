# frame2im

```octave
function [x, map] = frame2im (frame)
```

@deftypefn {} {[@var{x}, @var{map}] =} frame2im (@var{frame})
Convert movie frame to indexed image.

A movie frame is simply a struct with the fields @qcode{"cdata"} and
@qcode{"colormap"}.

Support for N-dimensional images or movies is given when @var{frame} is a
struct array.  In such cases, @var{x} will be a @nospell{MxNx1xK or MxNx3xK}
for indexed and RGB movies respectively, with each frame concatenated
along the 4th dimension.

@seealso{im2frame, getframe}
@end deftypefn
