# get

```octave
function value = get (player, name)
```

@deftypefn  {} {@var{value} =} get (@var{player}, @var{name})
@deftypefnx {} {@var{values} =} get (@var{player}, @lbracechar{}@var{name1}, @var{name2}, @dots{}@rbracechar{})
@deftypefnx {} {@var{values} =} get (@var{player})
Return the @var{value} of the property identified by @var{name}.

If @var{name} is a cell array return the values of the properties
identified by the elements of the cell array.  Given only the player
object, return a scalar structure with values for all properties of
@var{player}.  The field names of the structure correspond to the property
names.
@seealso{@audioplayer/set, @audioplayer/audioplayer}
@end deftypefn
