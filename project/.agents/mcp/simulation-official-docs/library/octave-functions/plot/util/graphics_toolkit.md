# graphics_toolkit

```octave
function tkit = graphics_toolkit (name, hlist = [])
```

@deftypefn  {} {@var{tkit} =} graphics_toolkit ()
@deftypefnx {} {@var{tkit} =} graphics_toolkit (@var{hlist})
@deftypefnx {} {} graphics_toolkit (@var{name})
@deftypefnx {} {} graphics_toolkit (@var{hlist}, @var{name})
Query or set the default graphics toolkit which is assigned to new figures.

With no inputs, return the current default graphics toolkit.  If the input
is a list of figure graphic handles, @var{hlist}, then return the name
of the graphics toolkit in use for each figure.

When called with a single input @var{name} set the default graphics toolkit
to @var{name}.  If the toolkit is not already loaded, it is initialized by
calling the function @code{__init_@var{name}__}.  If the first input
is a list of figure handles, @var{hlist}, then the graphics toolkit is set
to @var{name} for these figures only.

@seealso{available_graphics_toolkits}
@end deftypefn
