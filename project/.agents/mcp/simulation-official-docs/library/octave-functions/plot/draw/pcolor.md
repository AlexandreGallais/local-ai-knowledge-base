# pcolor

```octave
function h = pcolor (varargin)
```

@deftypefn  {} {} pcolor (@var{x}, @var{y}, @var{c})
@deftypefnx {} {} pcolor (@var{c})
@deftypefnx {} {} pcolor (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} pcolor (@dots{})
Produce a 2-D density plot.

A @code{pcolor} plot draws rectangles with colors from the matrix @var{c}
over the two-dimensional region represented by the matrices @var{x} and
@var{y}.  @var{x} and @var{y} are the coordinates of the mesh's vertices
and are typically the output of @code{meshgrid}.  If @var{x} and @var{y} are
vectors, then a typical vertex is (@var{x}(j), @var{y}(i), @var{c}(i,j)).
Thus, columns of @var{c} correspond to different @var{x} values and rows
of @var{c} correspond to different @var{y} values.

The values in @var{c} are scaled to span the range of the current
colormap.  Limits may be placed on the color axis by the command
@code{clim}, or by setting the @code{clim} property of the parent axis.

The face color of each cell of the mesh is determined by interpolating
the values of @var{c} for each of the cell's vertices; Contrast this with
@code{imagesc} which renders one cell for each element of @var{c}.

@code{shading} modifies an attribute determining the manner by which the
face color of each cell is interpolated from the values of @var{c},
and the visibility of the cells' edges.  By default the attribute is
@qcode{"faceted"}, which renders a single color for each cell's face with
the edge visible.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created
surface object.

@seealso{clim, shading, meshgrid, contour, imagesc}
@end deftypefn
