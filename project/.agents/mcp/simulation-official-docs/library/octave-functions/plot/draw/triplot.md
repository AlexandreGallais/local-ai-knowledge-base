# triplot

```octave
function h = triplot (tri, x, y, varargin)
```

@deftypefn  {} {} triplot (@var{tri}, @var{x}, @var{y})
@deftypefnx {} {} triplot (@var{tri}, @var{x}, @var{y}, @var{linespec})
@deftypefnx {} {@var{h} =} triplot (@dots{})
Plot a 2-D triangular mesh.

@var{tri} is typically the output of a Delaunay triangulation over the
grid of @var{x}, @var{y}.  Every row of @var{tri} represents one triangle
and contains three indices into [@var{x}, @var{y}] which are the
vertices of the triangles in the x-y plane.

The linestyle to use for the plot can be defined with the argument
@var{linespec} of the same format as the @code{plot} command.

The optional return value @var{h} is a graphics handle to the created
patch object.
@seealso{plot, trimesh, trisurf, delaunay}
@end deftypefn
