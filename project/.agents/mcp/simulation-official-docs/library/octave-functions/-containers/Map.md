# Map

```octave
function this = Map (varargin)
```

@deftypefn  {} {@var{m} =} containers.Map ()
@deftypefnx {} {@var{m} =} containers.Map (@var{keys}, @var{vals})
@deftypefnx {} {@var{m} =} containers.Map (@var{keys}, @var{vals}, @qcode{"UniformValues"}, @var{is_uniform})
@deftypefnx {} {@var{m} =} containers.Map (@qcode{"KeyType"}, @var{kt}, @qcode{"ValueType"}, @var{vt})

Create an object of the containers.Map class that stores a list of
key/value pairs.

@var{keys} is an array of @emph{unique} keys for the map.  The keys can be
numeric scalars or strings.  The type for numeric keys may be one of
@qcode{"double"}, @qcode{"single"}, @qcode{"int32"}, @qcode{"uint32"},
@qcode{"int64"}, or @qcode{"uint64"}.  Other numeric or logical keys will
be converted to @qcode{"double"}.  A single string key may be entered as
is.  Multiple string keys are entered as a cell array of strings.

@var{vals} is an array of values for the map with the @emph{same} number
of elements as @var{keys}.

When called with no input arguments, a default map is created with strings
as the key type and @qcode{"any"} as the value type.

The @qcode{"UniformValues"} option specifies whether the values of the map
must be strictly of the same type.  If @var{is_uniform} is true, any
values which would be added to the map are first validated to ensure they
are of the correct type.

When called with @qcode{"KeyType"} and @qcode{"ValueType"} arguments,
create an empty map with the specified types.  The inputs @var{kt} and
@var{vt} are the types for the keys and values of the map, respectively.
Allowed values for @var{kt} are @qcode{"char"}, @qcode{"double"},
@qcode{"single"}, @qcode{"int32"}, @qcode{"uint32"}, @qcode{"int64"},
@qcode{"uint64"}.  Allowed values for @var{vt} are @qcode{"any"},
@qcode{"char"}, @qcode{"double"}, @qcode{"single"}, @qcode{"int32"},
@qcode{"uint32"}, @qcode{"int64"}, @qcode{"uint64"}, @qcode{"logical"}.

The return value @var{m} is an object of the containers.Map class.
@seealso{struct}
@end deftypefn
