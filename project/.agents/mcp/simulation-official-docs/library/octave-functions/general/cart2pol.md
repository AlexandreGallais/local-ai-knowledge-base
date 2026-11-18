# cart2pol

```octave
function [theta, r, z] = cart2pol (x, y, z = [])
```

@deftypefn  {} {[@var{theta}, @var{r}] =} cart2pol (@var{x}, @var{y})
@deftypefnx {} {[@var{theta}, @var{r}, @var{z}] =} cart2pol (@var{x}, @var{y}, @var{z})
@deftypefnx {} {[@var{theta}, @var{r}] =} cart2pol (@var{C})
@deftypefnx {} {[@var{theta}, @var{r}, @var{z}] =} cart2pol (@var{C})

Transform Cartesian coordinates to polar or cylindrical coordinates.

The inputs @var{x}, @var{y} (, and @var{z}) must be the same shape, or
scalar.  If called with a single matrix argument then each row of @var{C}
represents the Cartesian coordinate pair (@var{x}, @var{y}) or triplet
(@var{x}, @var{y}, @var{z}).

The outputs @var{theta}, @var{r} (, and @var{z}) match the shape of the
inputs.  For a matrix input @var{C} the outputs will be column vectors with
rows corresponding to the rows of the input matrix.

@var{theta} describes the angle relative to the positive x-axis measured in
the xy-plane.

@var{r} is the distance to the z-axis @w{(0, 0, z)}.

@var{z}, if present, is unchanged by the transformation.

The coordinate transformation is computed using:
@tex
$$ \theta = \arctan \left ( {y \over x} \right ) $$
$$ r = \sqrt{x^2 + y^2} $$
$$ z = z $$
@end tex
@ifnottex

@example
@group
@var{theta} = arctan (@var{y} / @var{x})
@var{r} = sqrt (@var{x}^2 + @var{y}^2)
@var{z} = @var{z}
@end group
@end example

@end ifnottex

@seealso{pol2cart, cart2sph, sph2cart}
@end deftypefn
