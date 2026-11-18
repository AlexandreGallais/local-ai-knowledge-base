# strtok

```octave
function [tok, rem] = strtok (str, delim)
```

@deftypefn  {} {[@var{tok}, @var{rem}] =} strtok (@var{str})
@deftypefnx {} {[@var{tok}, @var{rem}] =} strtok (@var{str}, @var{delim})

Find all characters in the string @var{str} up to, but not including, the
first character which is in the string @var{delim}.

@var{str} may also be a cell array of strings in which case the function
executes on every individual string and returns a cell array of tokens and
remainders.

Leading delimiters are ignored.  If @var{delim} is not specified,
whitespace is assumed.

If @var{rem} is requested, it contains the remainder of the string, starting
at the first delimiter.

Examples:

@example
@group
strtok ("this is the life")
     @xresult{} "this"

[tok, rem] = strtok ("14*27+31", "+-*/")
     @xresult{}
        tok = 14
        rem = *27+31
@end group
@end example
@seealso{index, strsplit, strchr, isspace}
@end deftypefn
