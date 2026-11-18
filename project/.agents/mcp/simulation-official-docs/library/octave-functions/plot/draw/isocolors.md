# isocolors

```octave
function cdat = isocolors (varargin)
```

@deftypefn  {} {@var{cdat} =} isocolors (@var{c}, @var{v})
@deftypefnx {} {@var{cdat} =} isocolors (@var{x}, @var{y}, @var{z}, @var{c}, @var{v})
@deftypefnx {} {@var{cdat} =} isocolors (@var{x}, @var{y}, @var{z}, @var{r}, @var{g}, @var{b}, @var{v})
@deftypefnx {} {@var{cdat} =} isocolors (@var{r}, @var{g}, @var{b}, @var{v})
@deftypefnx {} {@var{cdat} =} isocolors (@dots{}, @var{hp})
@deftypefnx {} {} isocolors (@dots{}, @var{hp})

Compute isosurface colors.

If called with one output argument, and the first input argument @var{c}
is a three-dimensional array that contains indexed color values, and the
second input argument @var{v} are the vertices of an isosurface geometry,
then return a matrix @var{cdat} with color data information for the geometry
at computed points @code{[x, y, z] = meshgrid (1:l, 1:m, 1:n)}.  The output
argument @var{cdat} can be used to manually set the
@qcode{"FaceVertexCData"} property of an isosurface patch object.

If called with additional input arguments @var{x}, @var{y} and @var{z} which
are three-dimensional arrays of the same size as @var{c} then the
color data is taken at those specified points.

Instead of indexed color data @var{c}, @code{isocolors} can also be called
with RGB values @var{r}, @var{g}, @var{b}.  If input arguments @var{x},
@var{y}, @var{z} are not given then @code{meshgrid} computed values are
used.

Optionally, a patch handle @var{hp} can be given as the last input argument
to all function call variations and the vertex data will be extracted
from the isosurface patch object.  Finally, if no output argument is given
then the colors of the patch given by the patch handle @var{hp} are changed.

@seealso{isosurface, isonormals}
@end deftypefn
