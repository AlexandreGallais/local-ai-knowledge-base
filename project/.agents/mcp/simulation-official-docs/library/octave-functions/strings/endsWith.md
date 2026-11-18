# endsWith

```octave
function retval = endsWith (str, pattern, IgnoreCase, ignore_case)
```

@deftypefn  {} {@var{retval} =} endsWith (@var{str}, @var{pattern})
@deftypefnx {} {@var{retval} =} endsWith (@var{str}, @var{pattern}, "IgnoreCase", @var{ignore_case})
Check whether string(s) end with pattern(s).

Return an array of logical values that indicates which string(s) in the
input @var{str} (a single string or cell array of strings) end with
the input @var{pattern} (a single string or cell array of strings).

If the value of the parameter @qcode{"IgnoreCase"} is true, then the
function will ignore the letter case of @var{str} and @var{pattern}.  By
default, the comparison is case sensitive.

Examples:

@example
@group
## one string and one pattern while considering case
endsWith ("hello", "lo")
      @xresult{}  1
@end group

@group
## one string and one pattern while ignoring case
endsWith ("hello", "LO", "IgnoreCase", true)
      @xresult{}  1
@end group

@group
## multiple strings and multiple patterns while considering case
endsWith (@{"tests.txt", "mydoc.odt", "myFunc.m", "results.pptx"@},
          @{".docx", ".odt", ".txt"@})
      @xresult{}  1  1  0  0
@end group

@group
## multiple strings and one pattern while considering case
endsWith (@{"TESTS.TXT", "mydoc.odt", "result.txt", "myFunc.m"@},
          ".txt", "IgnoreCase", false)
      @xresult{}  0  0  1  0
@end group

@group
## multiple strings and one pattern while ignoring case
endsWith (@{"TESTS.TXT", "mydoc.odt", "result.txt", "myFunc.m"@},
          ".txt", "IgnoreCase", true)
      @xresult{}  1  0  1  0
@end group
@end example

@seealso{startsWith, regexp, strncmp, strncmpi}
@end deftypefn
