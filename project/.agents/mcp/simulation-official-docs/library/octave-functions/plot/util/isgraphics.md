# isgraphics

```octave
function tf = isgraphics (h, type = "")
```

@deftypefn  {} {@var{tf} =} isgraphics (@var{h})
@deftypefnx {} {@var{tf} =} isgraphics (@var{h}, @var{type})
Return true if @var{h} is a graphics handle (of type @var{type}) and false
otherwise.

When no @var{type} is specified the function is equivalent to
@code{ishghandle}.
@seealso{ishghandle, ishandle, isaxes, isfigure}
@end deftypefn
