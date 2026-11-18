# trisurf

```octave
function h = trisurf (tri, x, y, z, varargin)
```

@deftypefn  {} {} trisurf (@var{tri}, @var{x}, @var{y}, @var{z}, @var{c})
@deftypefnx {} {} trisurf (@var{tri}, @var{x}, @var{y}, @var{z})
@deftypefnx {} {} trisurf (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {@var{h} =} trisurf (@dots{})
Plot a 3-D triangular surface.

In contrast to @code{surf}, which plots a surface mesh using rectangles,
@code{trisurf} plots the mesh using triangles.

@var{tri} is typically the output of a Delaunay triangulation over the
grid of @var{x}, @var{y}.  Every row of @var{tri} represents one triangle
and contains three indices into [@var{x}, @var{y}] which are the vertices of
the triangles in the x-y plane.  @var{z} determines the height above the
plane of each vertex.

The color of the trisurf is computed by linearly scaling the @var{z} values
to fit the range of the current colormap.  Use @code{clim} and/or change
the colormap to control the appearance.

Optionally, the color of the mesh can be specified independently of @var{z}
by supplying @var{c}, which is a vector for colormap data, or a matrix with
three columns for RGB data.  The number of colors specified in @var{c} must
either equal the number of vertices in @var{z} or the number of triangles
in @var{tri}.  When specifying the color at each vertex the triangle will
be colored according to the color of the first vertex only (see patch
documentation and the @qcode{"FaceColor"} property when set to
@qcode{"flat"}).

Any property/value pairs are passed directly to the underlying patch object.
 The full list of properties is documented at @ref{Patch Properties}.

The optional return value @var{h} is a graphics handle to the created patch
object.
@seealso{surf, triplot, trimesh, delaunay, patch, shading}
@end deftypefn
