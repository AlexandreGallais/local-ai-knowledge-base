# cstrcat

```octave
function str = cstrcat (varargin)
```

@deftypefn {} {@var{str} =} cstrcat (@var{s1}, @var{s2}, @dots{})
Return a string containing all the arguments concatenated horizontally
with trailing white space preserved.

For example:

@example
@group
cstrcat ("ab   ", "cd")
      @xresult{} "ab   cd"
@end group
@end example

@example
@group
s = [ "ab"; "cde" ];
cstrcat (s, s, s)
      @xresult{} "ab ab ab "
         "cdecdecde"
@end group
@end example
@seealso{strcat, char, strvcat}
@end deftypefn
