# parseparams

```octave
function [reg, varargout] = parseparams (params, varargin)
```

@deftypefn  {} {[@var{reg}, @var{prop}] =} parseparams (@var{params})
@deftypefnx {} {[@var{reg}, @var{var1}, @dots{}] =} parseparams (@var{params}, @var{name1}, @var{default1}, @dots{})
Return in @var{reg} the cell elements of @var{param} up to the first
string element and in @var{prop} all remaining elements beginning with the
first string element.

For example:

@example
@group
[reg, prop] = parseparams (@{1, 2, "linewidth", 10@})
reg =
@{
  [1,1] = 1
  [1,2] = 2
@}
prop =
@{
  [1,1] = linewidth
  [1,2] = 10
@}
@end group
@end example

The parseparams function may be used to separate regular numeric arguments
from additional arguments given as property/value pairs of the
@var{varargin} cell array.

In the second form of the call, available options are specified directly
with their default values given as name-value pairs.  If @var{params} do
not form name-value pairs, or if an option occurs that does not match any
of the available options, an error occurs.

When called from an m-file function, the error is prefixed with the name
of the caller function.

The matching of options is case-insensitive.

@seealso{varargin, inputParser}
@end deftypefn
