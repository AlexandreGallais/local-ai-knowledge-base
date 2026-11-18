# lighting

```octave
function lighting (varargin)
```

@deftypefn  {} {} lighting (@var{type})
@deftypefnx {} {} lighting (@var{hax}, @var{type})
Set the lighting of patch or surface graphic objects.

Valid arguments for @var{type} are

@table @asis
@item @qcode{"flat"}
Draw objects with faceted lighting effects.

@item @qcode{"gouraud"}
Draw objects with linear interpolation of the lighting effects between the
vertices.

@item @qcode{"none"}
Draw objects without light and shadow effects.
@end table

If the first argument @var{hax} is an axes handle, then change the lighting
effects of objects in this axes, rather than the current axes returned by
@code{gca}.

The lighting effects are only visible if at least one light object is
present and visible in the same axes.

@seealso{light, fill, mesh, patch, pcolor, surf, surface, shading}
@end deftypefn
