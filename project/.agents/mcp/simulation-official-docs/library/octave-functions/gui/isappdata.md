# isappdata

```octave
function valid = isappdata (h, name)
```

@deftypefn {} {@var{valid} =} isappdata (@var{h}, @var{name})
Return true if the named application data, @var{name}, exists for the
graphics object with handle @var{h}.

@var{h} may also be a vector of graphics handles.
@seealso{getappdata, setappdata, rmappdata, guidata, get, set, getpref,
setpref}
@end deftypefn
