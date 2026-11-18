# divergence

```octave
function retval = divergence (varargin)
```

@deftypefn  {} {@var{div} =} divergence (@var{x}, @var{y}, @var{z}, @var{fx}, @var{fy}, @var{fz})
@deftypefnx {} {@var{div} =} divergence (@var{fx}, @var{fy}, @var{fz})
@deftypefnx {} {@var{div} =} divergence (@var{x}, @var{y}, @var{fx}, @var{fy})
@deftypefnx {} {@var{div} =} divergence (@var{fx}, @var{fy})
Calculate divergence of a vector field given by the arrays @var{fx},
@var{fy}, and @var{fz} or @var{fx}, @var{fy} respectively.
@tex
$$
{\rm div \ {\bf F}}(x,y,z) \equiv \nabla \cdot {\rm \bf F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}
$$

@end tex
@ifnottex

@example
@group
                  d               d               d
div F(x,y,z)  =   -- F(x,y,z)  +  -- F(x,y,z)  +  -- F(x,y,z)
                  dx              dy              dz
@end group
@end example

@end ifnottex
The coordinates of the vector field can be given by the arguments @var{x},
@var{y}, @var{z} or @var{x}, @var{y} respectively.

@seealso{curl, gradient, del2, dot}
@end deftypefn
