# isosurface

```octave
function varargout = isosurface (varargin)
```

@deftypefn  {} {@var{fv} =} isosurface (@var{v}, @var{isoval})
@deftypefnx {} {@var{fv} =} isosurface (@var{v})
@deftypefnx {} {@var{fv} =} isosurface (@var{x}, @var{y}, @var{z}, @var{v}, @var{isoval})
@deftypefnx {} {@var{fv} =} isosurface (@var{x}, @var{y}, @var{z}, @var{v})
@deftypefnx {} {@var{fvc} =} isosurface (@dots{}, @var{col})
@deftypefnx {} {@var{fv} =} isosurface (@dots{}, "noshare")
@deftypefnx {} {@var{fv} =} isosurface (@dots{}, "verbose")
@deftypefnx {} {[@var{f}, @var{v}] =} isosurface (@dots{})
@deftypefnx {} {[@var{f}, @var{v}, @var{c}] =} isosurface (@dots{})
@deftypefnx {} {} isosurface (@dots{})

Calculate isosurface of 3-D volume data.

An isosurface connects points with the same value and is analogous to a
contour plot, but in three dimensions.

The input argument @var{v} is a three-dimensional array that contains data
sampled over a volume.

The input @var{isoval} is a scalar that specifies the value for the
isosurface.  If @var{isoval} is omitted or empty, a @nospell{"good"} value
for an isosurface is determined from @var{v}.

When called with a single output argument @code{isosurface} returns a
structure array @var{fv} that contains the fields @var{faces} and
@var{vertices} computed at the points
@code{[@var{x}, @var{y}, @var{z}] = meshgrid (1:l, 1:m, 1:n)} where
@code{[l, m, n] = size (@var{v})}.  The output @var{fv} can be
used directly as input to the @code{patch} function.

If called with additional input arguments @var{x}, @var{y}, and @var{z}
that are three-dimensional arrays with the same size as @var{v} or
vectors with lengths corresponding to the dimensions of @var{v}, then the
volume data is taken at the specified points.  If @var{x}, @var{y}, or
@var{z} are empty, the grid corresponds to the indices (@code{1:n}) in
the respective direction (@pxref{XREFmeshgrid,,@code{meshgrid}}).

The optional input argument @var{col}, which is a three-dimensional array
of the same size as @var{v}, specifies coloring of the isosurface.  The
color data is interpolated, as necessary, to match @var{isoval}.  The
output structure array, in this case, has the additional field
@var{facevertexcdata}.

If given the string input argument @qcode{"noshare"}, vertices may be
returned multiple times for different faces.  The default behavior is to
eliminate vertices shared by adjacent faces.

The string input argument @qcode{"verbose"} is supported for @sc{matlab}
compatibility, but has no effect.

Any string arguments must be passed after the other arguments.

If called with two or three output arguments, return the information about
the faces @var{f}, vertices @var{v}, and color data @var{c} as separate
arrays instead of a single structure array.

If called with no output argument, the isosurface geometry is directly
plotted with the @code{patch} command and a light object is added to
the axes if not yet present.

For example,

@example
@group
[x, y, z] = meshgrid (1:5, 1:5, 1:5);
v = rand (5, 5, 5);
isosurface (x, y, z, v, .5);
@end group
@end example

@noindent
will directly draw a random isosurface geometry in a graphics window.

An example of an isosurface geometry with different additional coloring:
@c Set example in small font to prevent overfull line

@smallexample
N = 15;    # Increase number of vertices in each direction
iso = .4;  # Change isovalue to .1 to display a sphere
lin = linspace (0, 2, N);
[x, y, z] = meshgrid (lin, lin, lin);
v = abs ((x-.5).^2 + (y-.5).^2 + (z-.5).^2);
figure ();

subplot (2,2,1); view (-38, 20);
[f, vert] = isosurface (x, y, z, v, iso);
p = patch ("Faces", f, "Vertices", vert, "EdgeColor", "none");
pbaspect ([1 1 1]);
isonormals (x, y, z, v, p)
set (p, "FaceColor", "green", "FaceLighting", "gouraud");
light ("Position", [1 1 5]);

subplot (2,2,2); view (-38, 20);
p = patch ("Faces", f, "Vertices", vert, "EdgeColor", "blue");
pbaspect ([1 1 1]);
isonormals (x, y, z, v, p)
set (p, "FaceColor", "none", "EdgeLighting", "gouraud");
light ("Position", [1 1 5]);

subplot (2,2,3); view (-38, 20);
[f, vert, c] = isosurface (x, y, z, v, iso, y);
p = patch ("Faces", f, "Vertices", vert, "FaceVertexCData", c, ...
           "FaceColor", "interp", "EdgeColor", "none");
pbaspect ([1 1 1]);
isonormals (x, y, z, v, p)
set (p, "FaceLighting", "gouraud");
light ("Position", [1 1 5]);

subplot (2,2,4); view (-38, 20);
p = patch ("Faces", f, "Vertices", vert, "FaceVertexCData", c, ...
           "FaceColor", "interp", "EdgeColor", "blue");
pbaspect ([1 1 1]);
isonormals (x, y, z, v, p)
set (p, "FaceLighting", "gouraud");
light ("Position", [1 1 5]);
@end smallexample

@seealso{isonormals, isocolors, isocaps, smooth3, reducevolume, reducepatch,
patch}
@end deftypefn
