# hdl2struct

```octave
function s = hdl2struct (h)
```

@deftypefn {} {@var{s} =} hdl2struct (@var{h})
Return a structure, @var{s}, whose fields describe the properties
of the object, and its children, associated with the handle, @var{h}.

The fields of the structure @var{s} are @qcode{"type"}, @qcode{"handle"},
@qcode{"properties"}, @qcode{"children"}, and @qcode{"special"}.
@seealso{struct2hdl, hgsave, findobj}
@end deftypefn
