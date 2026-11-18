# surfc

```octave
function h = surfc (varargin)
```

@deftypefn  {} {} surfc (@var{x}, @var{y}, @var{z})
@deftypefnx {} {} surfc (@var{z})
@deftypefnx {} {} surfc (@dots{}, @var{c})
@deftypefnx {} {} surfc (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} surfc (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} surfc (@dots{})
Plot a 3-D surface mesh with underlying contour lines.

The surface mesh is plotted using shaded rectangles.  The vertices of the
rectangles [@var{x}, @var{y}] are typically the output of @code{meshgrid}.
over a 2-D rectangular region in the x-y plane.  @var{z} determines the
height above the plane of each vertex.  If only a single @var{z} matrix is
given, then it is plotted over the meshgrid
@code{@var{x} = 1:columns (@var{z}), @var{y} = 1:rows (@var{z})}.
Thus, columns of @var{z} correspond to different @var{x} values and rows
of @var{z} correspond to different @var{y} values.

The color of the surface is computed by linearly scaling the @var{z} values
to fit the range of the current colormap.  Use @code{clim} and/or
change the colormap to control the appearance.

Optionally, the color of the surface can be specified independently of
@var{z} by supplying a color matrix, @var{c}.

Any property/value pairs are passed directly to the underlying surface
object.  The full list of properties is documented at
@ref{Surface Properties}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created
surface object.

Note: The exact appearance of the surface can be controlled with the
@code{shading} command or by using @code{set} to control surface object
properties.
@seealso{ezsurfc, surf, surfl, surfnorm, trisurf, contour, mesh, surface,
meshgrid, hidden, shading, colormap, clim}
@end deftypefn
