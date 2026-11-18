# validatestring

```octave
function str = validatestring (str, strarray, varargin)
```

@deftypefn  {} {@var{validstr} =} validatestring (@var{str}, @var{strarray})
@deftypefnx {} {@var{validstr} =} validatestring (@var{str}, @var{strarray}, @var{funcname})
@deftypefnx {} {@var{validstr} =} validatestring (@var{str}, @var{strarray}, @var{funcname}, @var{varname})
@deftypefnx {} {@var{validstr} =} validatestring (@dots{}, @var{position})
Verify that @var{str} is an element, or substring of an element, in
@var{strarray}.

When @var{str} is a character string to be tested, and @var{strarray} is a
cell array of strings of valid values, then @var{validstr} will be the
validated form of @var{str} where validation is defined as @var{str} being
a member or substring of @var{validstr}.  This is useful for both verifying
and expanding short options, such as @qcode{"r"}, to their longer forms,
such as @qcode{"red"}.  If @var{str} is a substring of @var{validstr},
and there are multiple matches, the shortest match will be returned if
all matches are substrings of each other.  Otherwise, an error will be
raised because the expansion of @var{str} is ambiguous.  All comparisons
are case insensitive.

The additional inputs @var{funcname}, @var{varname}, and @var{position}
are optional and will make any generated validation error message more
specific.

Examples:
@c Set example in small font to prevent overfull line

@smallexample
@group
validatestring ("r", @{"red", "green", "blue"@})
@xresult{} "red"

validatestring ("b", @{"red", "green", "blue", "black"@})
@xresult{} error: validatestring: multiple unique matches were found for 'b':
   blue, black
@end group
@end smallexample

@seealso{strcmp, strcmpi, validateattributes, inputParser}
@end deftypefn
