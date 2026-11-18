# __rotate_around_axis__

```octave
function [xr, yr, zr] = __rotate_around_axis__ (x, y, z, angle, dir, origin)
```

@deftypefn {} {[@var{xr}, @var{yr}, @var{zr}] =} __rotate_around_axis__ (@var{x}, @var{y}, @var{z}, @var{angle}, @var{dir}, @var{origin})
Rotate the points given by @var{x}, @var{y}, @var{z} about an axis by
@var{angle} degrees.

The axis is specified by the vector @var{dir} and the point @var{origin}.
@end deftypefn
