# linkprop

```octave
function hlink = linkprop (h, prop)
```

@deftypefn  {} {@var{hlink} =} linkprop (@var{h}, "@var{prop}")
@deftypefnx {} {@var{hlink} =} linkprop (@var{h}, @{"@var{prop1}", "@var{prop2}", @dots{}@})
Link graphic object properties, such that a change in one is propagated to
the others.

The input @var{h} is a vector of graphic handles to link.

@var{prop} may be a string when linking a single property, or a cell array
of strings for multiple properties.  During the linking process all
properties in @var{prop} will initially be set to the values that exist on
the first object in the list @var{h}.

The function returns @var{hlink} which is a special object describing the
link.  As long as the reference @var{hlink} exists, the link between graphic
objects will be active.  This means that @var{hlink} must be preserved in
a workspace variable, a global variable, or otherwise stored using a
function such as @code{setappdata} or @code{guidata}.  To unlink properties,
execute @code{clear @var{hlink}}.

An example of the use of @code{linkprop} is

@example
@group
x = 0:0.1:10;
subplot (1,2,1);
h1 = plot (x, sin (x));
subplot (1,2,2);
h2 = plot (x, cos (x));
hlink = linkprop ([h1, h2], @{"color","linestyle"@});
set (h1, "color", "green");
set (h2, "linestyle", "--");
@end group
@end example

@seealso{linkaxes, addlistener}
@end deftypefn
