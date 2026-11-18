# trimesh

```octave
function h = trimesh (tri, x, y, z, varargin)
```

@deftypefn  {} {} trimesh (@var{tri}, @var{x}, @var{y}, @var{z}, @var{c})
@deftypefnx {} {} trimesh (@var{tri}, @var{x}, @var{y}, @var{z})
@deftypefnx {} {} trimesh (@var{tri}, @var{x}, @var{y})
@deftypefnx {} {} trimesh (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {@var{h} =} trimesh (@dots{})
Plot a 3-D triangular wireframe mesh.

In contrast to @code{mesh}, which plots a mesh using rectangles,
@code{trimesh} plots the mesh using triangles.

@var{tri} is typically the output of a Delaunay triangulation over the
grid of @var{x}, @var{y}.  Every row of @var{tri} represents one triangle
and contains three indices into [@var{x}, @var{y}] which are the
vertices of the triangles in the x-y plane.  @var{z} determines the
height above the plane of each vertex.  If no @var{z} input is given then
the triangles are plotted as a 2-D figure.

The color of the trimesh is computed by linearly scaling the @var{z} values
to fit the range of the current colormap.  Use @code{clim} and/or
change the colormap to control the appearance.

Optionally, the color of the mesh can be specified independently of @var{z}
by supplying @var{c}, which is a vector for colormap data, or a matrix with
three columns for RGB data.  The number of colors specified in @var{c} must
either equal the number of vertices in @var{z} or the number of triangles
in @var{tri}.

Any property/value pairs are passed directly to the underlying patch object.
The full list of properties is documented at @ref{Patch Properties}.

The optional return value @var{h} is a graphics handle to the created patch
object.
@seealso{mesh, tetramesh, triplot, trisurf, delaunay, patch, hidden}
@end deftypefn
