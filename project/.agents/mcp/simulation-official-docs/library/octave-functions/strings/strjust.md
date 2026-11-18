# strjust

```octave
function str = strjust (s, pos = "right")
```

@deftypefn  {} {@var{str} =} strjust (@var{s})
@deftypefnx {} {@var{str} =} strjust (@var{s}, @var{pos})
Return the text, @var{s}, justified according to @var{pos}, which may
be @qcode{"left"}, @qcode{"center"}, or @qcode{"right"}.

If @var{pos} is omitted it defaults to @qcode{"right"}.

Null characters are replaced by spaces.  All other character data are
treated as non-white space.

Example:

@example
@group
strjust (["a"; "ab"; "abc"; "abcd"])
     @xresult{}
        "   a"
        "  ab"
        " abc"
        "abcd"
@end group
@end example
@seealso{deblank, strrep, strtrim, untabify}
@end deftypefn
