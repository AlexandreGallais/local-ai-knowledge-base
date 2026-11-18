# rotate

```octave
function rotate (h, direction, alpha, origin)
```

@deftypefn  {} {} rotate (@var{h}, @var{direction}, @var{alpha})
@deftypefnx {} {} rotate (@dots{}, @var{origin})
Rotate the plot object @var{h} through @var{alpha} degrees around the line
with direction @var{direction} and origin @var{origin}.

The default value of @var{origin} is the center of the axes object that is
the parent of @var{h}.

If @var{h} is a vector of handles, they must all have the same parent axes
object.

Graphics objects that may be rotated are lines, surfaces, patches, and
images.
@end deftypefn
