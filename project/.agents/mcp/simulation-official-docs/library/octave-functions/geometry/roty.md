# roty

```octave
function T = roty (angle)
```

@deftypefn {} {@var{T} =} roty (@var{angle})

@code{roty} returns the 3x3 transformation matrix corresponding to an active
rotation of a vector about the y-axis by the specified @var{angle}, given in
degrees, where a positive angle corresponds to a counterclockwise
rotation when viewing the z-x plane from the positive y side.

The form of the transformation matrix is:
@tex
$$
T = \left[\matrix{ \cos(angle) & 0 & \sin(angle) \cr
                   0 & 1 & 0 \cr
                   -\sin(angle) & 0 & \cos(angle)}\right].
$$
@end tex
@ifnottex

@example
@group
     |  cos(@var{angle})  0  sin(@var{angle}) |
 T = |      0       1      0      |
     | -sin(@var{angle})  0  cos(@var{angle}) |
@end group
@end example
@end ifnottex

This rotation matrix is intended to be used as a left-multiplying matrix
when acting on a column vector, using the notation
@code{@var{v} = @var{T}*@var{u}}.
For example, a vector, @var{u}, pointing along the positive z-axis, rotated
90-degrees about the y-axis, will result in a vector pointing along the
positive x-axis:

@example
@group
  >> u = [0 0 1]'
   u =
      0
      0
      1

   >> T = roty (90)
   T =
      0.00000   0.00000   1.00000
      0.00000   1.00000   0.00000
     -1.00000   0.00000   0.00000

   >> v = T*u
   v =
      1.00000
      0.00000
      0.00000
@end group
@end example

@seealso{rotx, rotz}
@end deftypefn
