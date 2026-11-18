# startsWith

```octave
function retval = startsWith (str, pattern, IgnoreCase, ignore_case)
```

@deftypefn  {} {@var{retval} =} startsWith (@var{str}, @var{pattern})
@deftypefnx {} {@var{retval} =} startsWith (@var{str}, @var{pattern}, "IgnoreCase", @var{ignore_case})
Check whether string(s) start with pattern(s).

Return an array of logical values that indicates which string(s) in the
input @var{str} (a single string or cell array of strings) begin with
the input @var{pattern} (a single string or cell array of strings).

If the value of the parameter @qcode{"IgnoreCase"} is true, then the
function will ignore the letter case of @var{str} and @var{pattern}.  By
default, the comparison is case sensitive.

Examples:

@example
@group
## one string and one pattern while considering case
startsWith ("hello", "he")
      @xresult{}  1
@end group

@group
## one string and one pattern while ignoring case
startsWith ("hello", "HE", "IgnoreCase", true)
      @xresult{}  1
@end group

@group
## multiple strings and multiple patterns while considering case
startsWith (@{"lab work.pptx", "data.txt", "foundations.ppt"@},
            @{"lab", "data"@})
      @xresult{}  1  1  0
@end group

@group
## multiple strings and one pattern while considering case
startsWith (@{"DATASHEET.ods", "data.txt", "foundations.ppt"@},
            "data", "IgnoreCase", false)
      @xresult{}  0  1  0
@end group

@group
## multiple strings and one pattern while ignoring case
startsWith (@{"DATASHEET.ods", "data.txt", "foundations.ppt"@},
            "data", "IgnoreCase", true)
      @xresult{}  1  1  0
@end group
@end example

@seealso{endsWith, regexp, strncmp, strncmpi}
@end deftypefn
