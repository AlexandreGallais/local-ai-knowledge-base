# isstring

```octave
function tf = isstring (s)
```

@deftypefn {} {@var{tf} =} isstring (@var{s})
Return true if @var{s} is a string array.

A string array is a data type that stores strings (row vectors of
characters) at each element in the array.  It is distinct from character
arrays which are N-dimensional arrays where each element is a single 1x1
character.  It is also distinct from cell arrays of strings which store
strings at each element, but use cell indexing @samp{@{@}} to access
elements rather than string arrays which use ordinary array indexing
@samp{()}.

Programming Note: Octave does not yet implement string arrays so this
function will always return false.
@seealso{ischar, iscellstr, isfloat, isinteger, islogical, isnumeric, isa}
@end deftypefn
