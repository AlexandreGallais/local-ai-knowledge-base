# deblank

```octave
function s = deblank (s)
```

@deftypefn {} {@var{s} =} deblank (@var{s})
Remove trailing whitespace and nulls from @var{s}.

If @var{s} is a matrix, @var{deblank} trims each row to the length of
the longest string.  If @var{s} is a cell array of strings, operate
recursively on each string element.

Examples:

@example
@group
deblank ("    abc  ")
     @xresult{}  "    abc"

deblank ([" abc   "; "   def   "])
     @xresult{}  [" abc  " ; "   def"]
@end group
@end example
@seealso{strtrim}
@end deftypefn
