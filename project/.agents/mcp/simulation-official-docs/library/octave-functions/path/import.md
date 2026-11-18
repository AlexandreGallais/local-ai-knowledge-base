# import

```octave
function list = import (varargin)
```

@deftypefn  {} {} import PACKAGE.FUNCTION
@deftypefnx {} {} import PACKAGE.CLASS
@deftypefnx {} {} import PACKAGE.*
@deftypefnx {} {} import
@deftypefnx {} {@var{list} =} import

Import function or classes into the current scope.

@strong{Warning:} This functionality is not yet implemented, and invoking
the function will emit an error.

When invoked with the name of a PACKAGE and a FUNCTION or CLASS name, that
name is made available in the current code without having to use namespace
qualifiers.  This can facilitate the readability of the code, and require
less typing by programmers.

Example

@example
@group
import containers.Map;

m = Map (@{"A", "B"@}, @{[1], [2]@});
@end group
@end example

When called with no inputs and no outputs @code{import} prints a list of
any import definitions.

When called with no inputs and one output, a cell array of strings
@var{list} is returned with any import definitions.

@end deftypefn
