# curl

```octave
function varargout = curl (varargin)
```

@deftypefn  {} {[@var{cx}, @var{cy}, @var{cz}, @var{v}] =} curl (@var{x}, @var{y}, @var{z}, @var{fx}, @var{fy}, @var{fz})
@deftypefnx {} {[@var{cz}, @var{v}] =} curl (@var{x}, @var{y}, @var{fx}, @var{fy})
@deftypefnx {} {[@dots{}] =} curl (@var{fx}, @var{fy}, @var{fz})
@deftypefnx {} {[@dots{}] =} curl (@var{fx}, @var{fy})
@deftypefnx {} {@var{v} =} curl (@dots{})
Calculate curl of vector field given by the arrays @var{fx}, @var{fy}, and
@var{fz} or @var{fx}, @var{fy} respectively.
@tex
$$ {\rm curl \ {\bf F}}(x,y,z) \equiv \nabla \times {\rm \bf F} = \left( \frac{\partial{F_z}}{\partial{y}} - \frac{\partial{F_y}}{\partial{z}}, \frac{\partial{F_x}}{\partial{z}} - \frac{\partial{F_z}}{\partial{x}}, \frac{\partial{F_y}}{\partial{x}} - \frac{\partial{F_x}}{\partial{y}} \right)$$
@end tex
@ifnottex

@example
@group
                  / d         d       d         d       d         d     \
curl F(x,y,z)  =  | -- Fz  -  -- Fy,  -- Fx  -  -- Fz,  -- Fy  -  -- Fx |
                  \ dy        dz      dz        dx      dx        dy    /
@end group
@end example

@end ifnottex
The coordinates of the vector field can be given by the arguments @var{x},
@var{y}, @var{z} or @var{x}, @var{y} respectively.  @var{v} calculates the
scalar component of the angular velocity vector in direction of the z-axis
for two-dimensional input.  For three-dimensional input the scalar
rotation is calculated at each grid point in direction of the vector field
at that point.
@seealso{divergence, gradient, del2, cross}
@end deftypefn
