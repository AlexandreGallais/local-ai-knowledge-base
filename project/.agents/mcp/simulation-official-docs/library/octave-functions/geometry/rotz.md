# rotz

```octave
function T = rotz (angle)
```

@deftypefn {} {@var{T} =} rotz (@var{angle})

@code{rotz} returns the 3x3 transformation matrix corresponding to an active
rotation of a vector about the z-axis by the specified @var{angle}, given in
degrees, where a positive angle corresponds to a counterclockwise
rotation when viewing the x-y plane from the positive z side.

The form of the transformation matrix is:
@tex
$$
T = \left[\matrix{ \cos(angle) & -\sin(angle) & 0 \cr
                   \sin(angle) & \cos(angle) & 0 \cr
                   0 & 0 & 1}\right].
$$
@end tex
@ifnottex

@example
@group
     | cos(@var{angle}) -sin(@var{angle}) 0 |
 T = | sin(@var{angle})  cos(@var{angle}) 0 |
     |     0           0      1 |
@end group
@end example
@end ifnottex

This rotation matrix is intended to be used as a left-multiplying matrix
when acting on a column vector, using the notation
@code{@var{v} = @var{T}*@var{u}}.
For example, a vector, @var{u}, pointing along the positive x-axis, rotated
90-degrees about the z-axis, will result in a vector pointing along the
positive y-axis:

@example
@group
  >> u = [1 0 0]'
   u =
      1
      0
      0

   >> T = rotz (90)
   T =
      0.00000  -1.00000   0.00000
      1.00000   0.00000   0.00000
      0.00000   0.00000   1.00000

   >> v = T*u
   v =
      0.00000
      1.00000
      0.00000
@end group
@end example

@seealso{rotx, roty}
@end deftypefn
