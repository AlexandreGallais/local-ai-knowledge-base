# pol2cart

```octave
function [x, y, z] = pol2cart (theta, r, z = [])
```

@deftypefn  {} {[@var{x}, @var{y}] =} pol2cart (@var{theta}, @var{r})
@deftypefnx {} {[@var{x}, @var{y}, @var{z}] =} pol2cart (@var{theta}, @var{r}, @var{z})
@deftypefnx {} {[@var{x}, @var{y}] =} pol2cart (@var{P})
@deftypefnx {} {[@var{x}, @var{y}, @var{z}] =} pol2cart (@var{P})
Transform polar or cylindrical coordinates to Cartesian coordinates.

The inputs @var{theta}, @var{r}, (and @var{z}) must be the same shape, or
scalar.  If called with a single matrix argument then each row of @var{P}
represents the polar coordinate pair (@var{theta}, @var{r}) or the
cylindrical triplet (@var{theta}, @var{r}, @var{z}).

The outputs @var{x}, @var{y} (, and @var{z}) match the shape of the inputs.
For a matrix input @var{P} the outputs will be column vectors with rows
corresponding to the rows of the input matrix.

@var{theta} describes the angle relative to the positive x-axis measured in
the xy-plane.

@var{r} is the distance to the z-axis @w{(0, 0, z)}.

@var{z}, if present, is unchanged by the transformation.

The coordinate transformation is computed using:
@tex
$$ x = r \cos \theta $$
$$ y = r \sin \theta $$
$$ z = z $$
@end tex
@ifnottex

@example
@group
@var{x} = @var{r} * cos (@var{theta})
@var{y} = @var{r} * sin (@var{theta})
@var{z} = @var{z}
@end group
@end example

@end ifnottex

@seealso{cart2pol, sph2cart, cart2sph}
@end deftypefn
