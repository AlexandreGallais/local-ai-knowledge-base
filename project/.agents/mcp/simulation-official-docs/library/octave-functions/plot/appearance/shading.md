# shading

```octave
function shading (varargin)
```

@deftypefn  {} {} shading (@var{type})
@deftypefnx {} {} shading (@var{hax}, @var{type})
Set the shading of patch or surface graphic objects.

Valid arguments for @var{type} are

@table @asis
@item @qcode{"flat"}
Single colored patches with invisible edges.

@item @qcode{"faceted"}
Single colored patches with black edges.

@item @qcode{"interp"}
Colors between patch vertices are interpolated and the patch edges are
invisible.
@end table

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.
@seealso{fill, mesh, patch, pcolor, surf, surface, hidden, lighting}
@end deftypefn
