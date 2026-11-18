# set

```octave
function properties = set (player, varargin)
```

@deftypefn  {} {} set (@var{player}, @var{name}, @var{value})
@deftypefnx {} {} set (@var{player}, @var{name_cell}, @var{value_cell})
@deftypefnx {} {} set (@var{player}, @var{properties_struct})
@deftypefnx {} {@var{properties} =} set (@var{player})
Set the value of property specified by @var{name} to a given @var{value}.

If @var{name} and @var{value} are cell arrays, set each property to the
corresponding value.  Given a structure of properties with fields
corresponding to property names, set the value of those properties to the
corresponding field values.  Given only an audioplayer object, return a
structure of configurable properties (i.e., writeable properties).
@seealso{@audioplayer/get, @audioplayer/audioplayer}
@end deftypefn
