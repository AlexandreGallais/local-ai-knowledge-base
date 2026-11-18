# type

```octave
function text = type (varargin)
```

@deftypefn  {} {} type @var{name} @dots{}
@deftypefnx {} {} type -q @var{name} @dots{}
@deftypefnx {} {text =} type ("@var{name}", @dots{})
Display the contents of @var{name} which may be a file, function (m-file),
variable, operator, or keyword.

@code{type} normally prepends a header line describing the category of
@var{name} such as function or variable; The @option{-q} option suppresses
this behavior.

If no output variable is used the contents are displayed on screen.
Otherwise, a cell array of strings is returned, where each element
corresponds to the contents of each requested function.
@end deftypefn
