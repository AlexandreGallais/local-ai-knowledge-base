# sph2cart

```octave
function [x, y, z] = sph2cart (theta, phi, r)
```

@deftypefn  {} {[@var{x}, @var{y}, @var{z}] =} sph2cart (@var{theta}, @var{phi}, @var{r})
@deftypefnx {} {[@var{x}, @var{y}, @var{z}] =} sph2cart (@var{S})
Transform spherical coordinates to Cartesian coordinates.

The inputs @var{theta}, @var{phi}, and @var{r} must be the same shape, or
scalar.  If called with a single matrix argument then each row of @var{S}
must represent a spherical coordinate triplet (@var{theta}, @var{phi},
@var{r}).

The outputs @var{x}, @var{y}, @var{z} match the shape of the inputs.  For a
matrix input @var{S} the outputs are column vectors with rows corresponding
to the rows of the input matrix.

@var{theta} describes the azimuth angle relative to the positive x-axis
measured in the xy-plane.

@var{phi} is the elevation angle measured relative to the xy-plane.

@var{r} is the distance to the origin @w{(0, 0, 0)}.

The coordinate transformation is computed using:
@tex
$$ x = r \cos \phi  \cos \theta $$
$$ y = r \cos \phi  \sin \theta $$
$$ z = r \sin \phi $$
@end tex
@ifnottex

@example
@group
@var{x} = r * cos (@var{phi}) * cos (@var{theta})
@var{y} = r * cos (@var{phi}) * sin (@var{theta})
@var{z} = r * sin (@var{phi})
@end group
@end example

@end ifnottex

@seealso{cart2sph, pol2cart, cart2pol}
@end deftypefn
