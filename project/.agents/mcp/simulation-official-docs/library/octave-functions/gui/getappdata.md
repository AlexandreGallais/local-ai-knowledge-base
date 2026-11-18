# getappdata

```octave
function value = getappdata (h, name)
```

@deftypefn  {} {@var{value} =} getappdata (@var{h}, @var{name})
@deftypefnx {} {@var{appdata} =} getappdata (@var{h})
Return the @var{value} of the application data @var{name} for the graphics
object with handle @var{h}.

@var{h} may also be a vector of graphics handles.  If no second argument
@var{name} is given then @code{getappdata} returns a structure,
@var{appdata}, whose fields correspond to the appdata properties.

@seealso{setappdata, isappdata, rmappdata, guidata, get, set, getpref,
setpref}
@end deftypefn
