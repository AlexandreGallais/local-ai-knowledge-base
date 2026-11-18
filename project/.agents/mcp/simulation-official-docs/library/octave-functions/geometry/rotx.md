# rotx

```octave
function T = rotx (angle)
```

@deftypefn {} {@var{T} =} rotx (@var{angle})

@code{rotx} returns the 3x3 transformation matrix corresponding to an active
rotation of a vector about the x-axis by the specified @var{angle}, given in
degrees, where a positive angle corresponds to a counterclockwise
rotation when viewing the y-z plane from the positive x side.

The form of the transformation matrix is:
@tex
$$
T = \left[\matrix{ 1 & 0 & 0 \cr
                   0 & \cos(angle) & -\sin(angle)\cr
                   0 & \sin(angle) & \cos(angle)}\right].
$$
@end tex
@ifnottex

@example
@group
     | 1      0           0      |
 T = | 0  cos(@var{angle}) -sin(@var{angle}) |
     | 0  sin(@var{angle})  cos(@var{angle}) |
@end group
@end example
@end ifnottex

This rotation matrix is intended to be used as a left-multiplying matrix
when acting on a column vector, using the notation
@code{@var{v} = @var{T}*@var{u}}.
For example, a vector, @var{u}, pointing along the positive y-axis, rotated
90-degrees about the x-axis, will result in a vector pointing along the
positive z-axis:

@example
@group
>> u = [0 1 0]'
u =
   0
   1
   0

>> T = rotx (90)
T =
   1.00000   0.00000   0.00000
   0.00000   0.00000  -1.00000
   0.00000   1.00000   0.00000

>> v = T*u
v =
   0.00000
   0.00000
   1.00000
@end group
@end example

@seealso{roty, rotz}
@end deftypefn
