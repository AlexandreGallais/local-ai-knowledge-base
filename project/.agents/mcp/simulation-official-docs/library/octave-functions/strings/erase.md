# erase

```octave
function newstr = erase (str, ptn)
```

@deftypefn {} {@var{newstr} =} erase (@var{str}, @var{ptn})
Delete all occurrences of @var{ptn} within @var{str}.

@var{str} and @var{ptn} can be ordinary strings, cell array of strings, or
character arrays.

Examples

@example
@group
## string, single pattern
erase ("Hello World!", " World")
    @xresult{} "Hello!"

## cellstr, single pattern
erase (@{"Hello", "World!"@}, "World")
    @xresult{} @{"Hello", "!"@}

## string, multiple patterns
erase ("The Octave interpreter is fabulous", ...
       @{"interpreter ", "The "@})
    @xresult{} "Octave is fabulous"

## cellstr, multiple patterns
erase (@{"The ", "Octave interpreter ", "is fabulous"@}, ...
       @{"interpreter ", "The "@})
    @xresult{} @{"", "Octave ", "is fabulous"@}
@end group
@end example

Programming Note: @code{erase} deletes the first instance of a pattern in a
string when there are overlapping occurrences.  For example:

@example
@group
erase ("abababa", "aba")
    @xresult{} "b"
@end group
@end example

For processing overlaps, @pxref{XREFstrrep,,@code{strrep}}.

@seealso{strrep, regexprep}
@end deftypefn
