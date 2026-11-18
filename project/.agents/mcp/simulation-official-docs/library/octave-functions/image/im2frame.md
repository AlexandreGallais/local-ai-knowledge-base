# im2frame

```octave
function frame = im2frame (x, map = [])
```

@deftypefn  {} {@var{frame} =} im2frame (@var{rgb})
@deftypefnx {} {@var{frame} =} im2frame (@var{x}, @var{map})
Convert image to movie frame.

A movie frame is simply a struct with the fields @qcode{"cdata"} and
@qcode{"colormap"}.

Support for N-dimensional images is given when each image projection, matrix
sizes of @nospell{MxN and MxNx3} for RGB images, is concatenated along the
fourth dimension.  In such cases, the returned value is a struct array.

@seealso{frame2im}
@end deftypefn
