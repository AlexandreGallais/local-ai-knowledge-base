# get

```octave
function value = get (recorder, name)
```

@deftypefn  {} {@var{value} =} get (@var{recorder}, @var{name})
@deftypefnx {} {@var{values} =} get (@var{recorder}, @lbracechar{}@var{name1}, @var{name2}, @dots{}@rbracechar{})
@deftypefnx {} {@var{values} =} get (@var{recorder})
Return the @var{value} of the property identified by @var{name}.

If @var{name} is a cell array return the values of the properties
identified by the elements of the cell array.  Given only the recorder
object, return a scalar structure with values for all properties of
@var{recorder}.  The field names of the structure correspond to the property
names.
@seealso{@audiorecorder/set, @audiorecorder/audiorecorder}
@end deftypefn
