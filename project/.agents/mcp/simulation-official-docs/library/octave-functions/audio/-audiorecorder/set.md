# set

```octave
function properties = set (recorder, varargin)
```

@deftypefn  {} {} set (@var{recorder}, @var{name}, @var{value})
@deftypefnx {} {} set (@var{recorder}, @var{name_cell}, @var{value_cell})
@deftypefnx {} {} set (@var{recorder}, @var{properties_struct})
@deftypefnx {} {@var{properties} =} set (@var{recorder})
Set the value of property specified by @var{name} to a given @var{value}.

If @var{name} and @var{value} are cell arrays, set each property to a
corresponding value.  Given a structure of properties with fields
corresponding to property names, set the value of those properties to the
corresponding field values.  Given only a recorder object, return a
structure of configurable properties (i.e., writeable properties).
@seealso{@audiorecorder/get, @audiorecorder/audiorecorder}
@end deftypefn
