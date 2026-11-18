# hggroup

```octave
function h = hggroup (varargin)
```

@deftypefn  {} {} hggroup ()
@deftypefnx {} {} hggroup (@var{hax})
@deftypefnx {} {} hggroup (@dots{}, @var{property}, @var{value}, @dots{})
@deftypefnx {} {@var{h} =} hggroup (@dots{})
Create handle graphics group object with axes parent @var{hax}.

If no parent is specified, the group is created in the current axes.

Multiple property/value pairs may be specified for the hggroup, but they
must appear in pairs.  The full list of properties is documented at
@ref{Axes Properties}.

The optional return value @var{h} is a graphics handle to the created
hggroup object.

Programming Note: An hggroup is a way to group base graphics objects such
as line objects or patch objects into a single unit which can react
appropriately.  For example, the individual lines of a contour plot are
collected into a single hggroup so that they can be made visible/invisible
with a single command, @code{set (hg_handle, "visible", "off")}.

@seealso{addproperty, addlistener}
@end deftypefn
