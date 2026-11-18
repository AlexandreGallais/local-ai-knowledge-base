# struct2hdl

```octave
function [h, pout] = struct2hdl (s, p=[], hilev = false)
```

@deftypefn  {} {@var{h} =} struct2hdl (@var{s})
@deftypefnx {} {@var{h} =} struct2hdl (@var{s}, @var{p})
@deftypefnx {} {@var{h} =} struct2hdl (@var{s}, @var{p}, @var{hilev})
Construct a graphics handle object @var{h} from the structure @var{s}.

The structure must contain the fields @qcode{"handle"}, @qcode{"type"},
@qcode{"children"}, @qcode{"properties"}, and @qcode{"special"}.

If the handle of an existing figure or axes is specified, @var{p}, the new
object will be created as a child of that object.  If no parent handle is
provided then a new figure and the necessary children will be constructed
using the default values from the root object.

A third boolean argument @var{hilev} can be passed to specify whether the
function should preserve listeners/callbacks, e.g., for legends or
hggroups.  The default is false.
@seealso{hdl2struct, hgload, findobj}
@end deftypefn
