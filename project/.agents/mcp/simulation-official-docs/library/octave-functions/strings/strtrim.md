# strtrim

```octave
function s = strtrim (s)
```

@deftypefn {} {@var{s} =} strtrim (@var{s})
Remove leading and trailing whitespace from @var{s}.

If @var{s} is a matrix, @var{strtrim} trims each row to the length of
longest string.  If @var{s} is a cell array of strings, operate recursively
on each string element.

For example:

@example
@group
strtrim ("    abc  ")
     @xresult{}  "abc"

strtrim ([" abc   "; "   def   "])
     @xresult{}  ["abc  "  ; "  def"]
@end group
@end example
@seealso{deblank}
@end deftypefn
