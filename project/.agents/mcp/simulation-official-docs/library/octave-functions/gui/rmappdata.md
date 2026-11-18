# rmappdata

```octave
function rmappdata (h, varargin)
```

@deftypefn  {} {} rmappdata (@var{h}, @var{name})
@deftypefnx {} {} rmappdata (@var{h}, @var{name1}, @var{name2}, @dots{})
Delete the application data @var{name} from the graphics object with handle
@var{h}.

@var{h} may also be a vector of graphics handles.  Multiple application data
names may be supplied to delete several properties at once.

@seealso{setappdata, getappdata, isappdata}
@end deftypefn
