# setappdata

```octave
function setappdata (h, varargin)
```

@deftypefn  {} {} setappdata (@var{h}, @var{name}, @var{value})
@deftypefnx {} {} setappdata (@var{h}, @var{name1}, @var{value1}, @var{name2}, @var{value2}, @dots{})
@deftypefnx {} {} setappdata (@var{h}, @{@var{name1}, @var{name2}, @dots{}@}, @{@var{value1}, @var{value2}, @dots{}@})
Set the application data @var{name} to @var{value} for the graphics object
with handle @var{h}.

@var{h} may also be a vector of graphics handles.  If the application data
with the specified @var{name} does not exist, it is created.

Multiple @var{name}/@var{value} pairs can be specified.  Alternatively, a
cell array of @var{names} and a corresponding cell array of @var{values} can
be specified.  For details on obtaining a list of valid application data
properties, @pxref{XREFgetappdata,,@code{getappdata}}.

@seealso{getappdata, isappdata, rmappdata, guidata, get, set, getpref,
setpref}
@end deftypefn
