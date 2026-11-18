# strcat

```octave
function str = strcat (varargin)
```

@deftypefn {} {@var{str} =} strcat (@var{s1}, @var{s2}, @dots{})
Return a string containing all the arguments concatenated horizontally.

If the arguments are cell strings, @code{strcat} returns a cell string
with the individual cells concatenated.  For numerical input, each element
is converted to the corresponding ASCII character.  Trailing white space
for any character string input is eliminated before the strings are
concatenated.  Note that cell string values do @strong{not} have
whitespace trimmed.

For example:

@example
@group
strcat ("|", " leading space is preserved", "|")
    @xresult{} | leading space is preserved|
@end group
@end example

@example
@group
strcat ("|", "trailing space is eliminated ", "|")
    @xresult{} |trailing space is eliminated|
@end group
@end example

@example
@group
strcat ("homogeneous space |", "  ", "| is also eliminated")
    @xresult{} homogeneous space || is also eliminated
@end group
@end example

@example
@group
s = [ "ab"; "cde" ];
strcat (s, s, s)
    @xresult{}
        "ababab   "
        "cdecdecde"
@end group
@end example

@example
@group
s = @{ "ab"; "cd " @};
strcat (s, s, s)
    @xresult{}
        @{
          [1,1] = ababab
          [2,1] = cd cd cd
        @}
@end group
@end example

@seealso{cstrcat, char, strvcat}
@end deftypefn
