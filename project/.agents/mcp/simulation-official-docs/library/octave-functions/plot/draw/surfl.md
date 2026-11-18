# surfl

```octave
function h = surfl (varargin)
```

@deftypefn  {} {} surfl (@var{z})
@deftypefnx {} {} surfl (@var{x}, @var{y}, @var{z})
@deftypefnx {} {} surfl (@dots{}, @var{lsrc})
@deftypefnx {} {} surfl (@var{x}, @var{y}, @var{z}, @var{lsrc}, @var{P})
@deftypefnx {} {} surfl (@dots{}, "cdata")
@deftypefnx {} {} surfl (@dots{}, "light")
@deftypefnx {} {} surfl (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} surfl (@dots{})
Plot a 3-D surface using shading based on various lighting models.

The surface mesh is plotted using shaded rectangles.  The vertices of the
rectangles [@var{x}, @var{y}] are typically the output of @code{meshgrid}.
over a 2-D rectangular region in the x-y plane.  @var{z} determines the
height above the plane of each vertex.  If only a single @var{z} matrix is
given, then it is plotted over the meshgrid
@code{@var{x} = 1:columns (@var{z}), @var{y} = 1:rows (@var{z})}.
Thus, columns of @var{z} correspond to different @var{x} values and rows
of @var{z} correspond to different @var{y} values.

The default lighting mode @qcode{"cdata"}, changes the cdata property of the
surface object to give the impression of a lighted surface.

The alternate mode @qcode{"light"} creates a light object to illuminate the
surface.

The light source location may be specified using @var{lsrc} which can be
a 2-element vector [azimuth, elevation] in degrees, or a 3-element vector
[lx, ly, lz].  The default value is rotated 45 degrees counterclockwise to
the current view.

The material properties of the surface can specified using a 4-element
vector @var{P} = [@var{AM} @var{D} @var{SP} @var{exp}] which defaults to
@var{p} = [0.55 0.6 0.4 10].

@table @asis
@item @qcode{"AM"} strength of ambient light

@item @qcode{"D"} strength of diffuse reflection

@item @qcode{"SP"} strength of specular reflection

@item @qcode{"EXP"} specular exponent
@end table

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created
surface object.

Example:

@example
@group
colormap (bone (64));
surfl (peaks);
shading interp;
@end group
@end example
@seealso{diffuse, specular, surf, shading, colormap, clim}
@end deftypefn
