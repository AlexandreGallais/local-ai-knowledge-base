# hidden

```octave
function state = hidden (mode = "toggle")
```

@deftypefn  {} {} hidden
@deftypefnx {} {} hidden on
@deftypefnx {} {} hidden off
@deftypefnx {} {@var{mode} =} hidden (@dots{})
Control mesh hidden line removal.

When called with no argument the hidden line removal state is toggled.

When called with one of the modes @qcode{"on"} or @qcode{"off"} the state
is set accordingly.

The optional output argument @var{mode} is the current state.

Hidden Line Removal determines what graphic objects behind a mesh plot
are visible.  The default is for the mesh to be opaque and lines behind
the mesh are not visible.  If hidden line removal is turned off then
objects behind the mesh can be seen through the faces (openings) of the
mesh, although the mesh grid lines are still opaque.

@seealso{mesh, meshc, meshz, ezmesh, ezmeshc, trimesh, waterfall}
@end deftypefn
