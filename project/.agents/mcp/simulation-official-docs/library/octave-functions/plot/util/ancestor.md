# ancestor

```octave
function p = ancestor (h, type, toplevel)
```

@deftypefn  {} {@var{parent} =} ancestor (@var{h}, @var{type})
@deftypefnx {} {@var{parent} =} ancestor (@var{h}, @var{type}, "toplevel")
Return the first ancestor of handle object @var{h} whose type matches
@var{type}, where @var{type} is a character string.

If @var{type} is a cell array of strings, return the first parent whose
type matches any of the given type strings.

If the handle object @var{h} itself is of type @var{type}, return @var{h}.

If @qcode{"toplevel"} is given as a third argument, return the highest
parent in the object hierarchy that matches the condition, instead
of the first (nearest) one.
@seealso{findobj, findall, allchild}
@end deftypefn
