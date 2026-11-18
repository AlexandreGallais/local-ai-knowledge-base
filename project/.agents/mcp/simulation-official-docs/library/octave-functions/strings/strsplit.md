# strsplit

```octave
function [cstr, matches] = strsplit (str, del, varargin)
```

@deftypefn  {} {[@var{cstr}] =} strsplit (@var{str})
@deftypefnx {} {[@var{cstr}] =} strsplit (@var{str}, @var{del})
@deftypefnx {} {[@var{cstr}] =} strsplit (@dots{}, @var{name}, @var{value})
@deftypefnx {} {[@var{cstr}, @var{matches}] =} strsplit (@dots{})
Split the string @var{str} using the delimiters specified by @var{del} and
return a cell string array of substrings.

If a delimiter is not specified the string is split at whitespace
@code{@{" ", "\f", "\n", "\r", "\t", "\v"@}}.  Otherwise, the delimiter,
@var{del} must be a string or cell array of strings.  By default,
consecutive delimiters in the input string @var{s} are collapsed into one
resulting in a single split.

Supported @var{name}/@var{value} pair arguments are:

@itemize
@item @var{collapsedelimiters} which may take the value of @code{true}
(default) or @code{false}.

@item @var{delimitertype} which may take the value of @qcode{"simple"}
(default) or @nospell{@qcode{"regularexpression"}}.  A simple delimiter
matches the text exactly as written.  Otherwise, the syntax for regular
expressions outlined in @code{regexp} is used.
@end itemize

The optional second output, @var{matches}, returns the delimiters which were
matched in the original string.

Examples with simple delimiters:

@example
strsplit ("a b c")
      @xresult{}
          @{
            [1,1] = a
            [1,2] = b
            [1,3] = c
          @}

strsplit ("a,b,c", ",")
      @xresult{}
          @{
            [1,1] = a
            [1,2] = b
            [1,3] = c
          @}

strsplit ("a foo b,bar c", @{" ", ",", "foo", "bar"@})
      @xresult{}
          @{
            [1,1] = a
            [1,2] = b
            [1,3] = c
          @}

strsplit ("a,,b, c", @{",", " "@}, "collapsedelimiters", false)
      @xresult{}
          @{
            [1,1] = a
            [1,2] =
            [1,3] = b
            [1,4] =
            [1,5] = c
          @}

@end example

Examples with @nospell{regularexpression} delimiters:

@smallexample
strsplit ("a foo b,bar c", ',|\s|foo|bar', ...
          "delimitertype", "regularexpression")
      @xresult{}
          @{
            [1,1] = a
            [1,2] = b
            [1,3] = c
          @}

strsplit ("a,,b, c", '[, ]', "collapsedelimiters", false, ...
          "delimitertype", "regularexpression")
      @xresult{}
          @{
            [1,1] = a
            [1,2] =
            [1,3] = b
            [1,4] =
            [1,5] = c
          @}

strsplit ("a,\t,b, c", @{',', '\s'@}, "delimitertype", "regularexpression")
      @xresult{}
          @{
            [1,1] = a
            [1,2] = b
            [1,3] = c
          @}

strsplit ("a,\t,b, c", @{',', ' ', '\t'@}, "collapsedelimiters", false)
      @xresult{}
          @{
            [1,1] = a
            [1,2] =
            [1,3] =
            [1,4] = b
            [1,5] =
            [1,6] = c
          @}
@end smallexample

@seealso{ostrsplit, strjoin, strtok, regexp}
@end deftypefn
