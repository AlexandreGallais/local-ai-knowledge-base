# cart2sph

```octave
function [theta, phi, r] = cart2sph (x, y, z)
```

@deftypefn  {} {[@var{theta}, @var{phi}, @var{r}] =} cart2sph (@var{x}, @var{y}, @var{z})
@deftypefnx {} {[@var{theta}, @var{phi}, @var{r}] =} cart2sph (@var{C})
Transform Cartesian coordinates to spherical coordinates.

The inputs @var{x}, @var{y}, and @var{z} must be the same shape, or scalar.
If called with a single matrix argument then each row of @var{C} must
represent a Cartesian coordinate triplet (@var{x}, @var{y}, @var{z}).

The outputs @var{theta}, @var{phi}, @var{r} match the shape of the inputs.
For a matrix input @var{C} the outputs will be column vectors with rows
corresponding to the rows of the input matrix.

@var{theta} describes the azimuth angle relative to the positive x-axis
measured in the xy-plane.

@var{phi} is the elevation angle measured relative to the xy-plane.

@var{r} is the distance to the origin @w{(0, 0, 0)}.

The coordinate transformation is computed using:
@tex
$$ \theta = \arctan \left ({y \over x} \right ) $$
$$ \phi = \arctan \left ( {z \over {\sqrt{x^2+y^2}}} \right ) $$
$$ r = \sqrt{x^2 + y^2 + z^2} $$
@end tex
@ifnottex

@example
@group
@var{theta} = arctan (@var{y} / @var{x})
@var{phi} = arctan (@var{z} / sqrt (@var{x}^2 + @var{y}^2))
@var{r} = sqrt (@var{x}^2 + @var{y}^2 + @var{z}^2)
@end group
@end example

@end ifnottex

@seealso{sph2cart, cart2pol, pol2cart}
@end deftypefn
